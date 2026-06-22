---
name: bundle-size-guardian
description: Keep the persian-tools published bundle small, tree-shakable, and side-effect-free. Use whenever a change might add or grow the bundle — a new dataset, a new module, a new dependency, or a refactor that moves code between files. Also use when "JS bundle" or "Type definitions" size-limit checks fail in CI. Covers the .skip.ts convention, sideEffects: false, the 860 kB JS / 100 kB types budget, and how to investigate which symbols pushed it over.
---

# Keeping the bundle small

The package is published as ESM + CJS with TypeScript declarations. The published size is enforced by `size-limit` via the `test:size` step that runs after every build. This skill explains the rules and how to fix overages.

## The current budget

From `.size-limit.json`:

| Artifact | Path | Limit |
|---|---|---|
| JS bundle | `build/index.js` + `build/index.mjs` | **860 kB** |
| Type definitions | `build/index.d.ts` + `build/index.d.mts` | **100 kB** |

These are *un-gzipped* sizes (`gzip: false`, `brotli: false`). When you raise the limit, justify it in the PR description and update both numbers together if both grew.

## Tree-shaking is on — keep it that way

`package.json` declares `"sideEffects": false`. Bundlers can therefore drop any module the user didn't import. To preserve this guarantee:

1. **Never run effectful code at module top-level.** No `console.log`, no global registration, no `Object.defineProperty(globalThis, ...)`. Top-level should only declare constants/types/functions.
2. **Don't import modules just for side effects.** A bare `import "./foo"` is a side effect and will pin `foo` in the bundle.
3. **Keep `index.ts` files re-export-only.** Every existing `src/modules/<name>/index.ts` only contains `export ... from "./..."`. Mirror that.
4. **Prefer named exports** over default exports. The repo uses named exports everywhere; tree-shakers handle them more reliably across CJS/ESM dual builds.

## The `.skip.ts` / `.skip.json` convention

Files ending in `.skip.ts` or `.skip.json` hold **heavy lookup data** (lists of bank prefixes, city codes, plate codes, etc.). The naming is a project convention with two purposes:

1. **Code review signal** — the `.skip` suffix tells reviewers "this file is data, not logic; please scan but don't dwell."
2. **Coverage exclusion** — `vitest.config.ts` does not specifically exclude `.skip.ts`, but tests don't need to cover data files; reviewers expect that.

Examples already in the codebase:

```
src/modules/banksRegex/data.skip.json
src/modules/getBankNameFromCardNumber/banksCode.skip.ts
src/modules/getPlaceByIranNationalId/nationalId.skip.ts
src/modules/getPlaceByIranNationalId/provincesCodes.skip.ts
src/modules/numberplate/codes.skip.ts
src/modules/numberplate/types.skip.ts
src/modules/sheba/codes.skip.ts
```

When you add a new dataset:

- Put it in `src/modules/<yourModule>/<descriptive>.skip.ts`.
- Export it as `const NAME = {...} as const;` — the `as const` keeps the inferred type narrow without bloating runtime size.
- Import it only from the module that uses it. **Do not** re-export it from `src/index.ts` (that would force every consumer to ship it).
- If the dataset is JSON-shaped, prefer `.skip.json` + `import data from "./data.skip.json" assert { type: "json" }` (see `src/modules/banksRegex/index.ts:1`).

## Bundler configuration — don't touch unless you mean to

`bunup.config.ts` enables:

| Option | Effect |
|---|---|
| `splitting: true` | Code-splits shared chunks (useful for ESM consumers) |
| `dts: true` | Emits `.d.ts` and `.d.mts` |
| `minify: true` + `minifyWhitespace/Identifiers/Syntax: true` | Aggressive minification |
| `unused: true` | Reports unused exports — fix these before they grow |
| `report: { brotli, gzip }` | Build-time compressed size report (informational) |

The big banner/footer comments (`bunup.config.ts:31-118`) are emitted **before** minification and survive into the published bundle. They cost ~3 kB. Don't expand them.

## When `bun run test:size` fails

The `postbuild` step runs `bun run test:size`, which is `size-limit`. A failure looks like:

```
Package size limit has exceeded by 12.3 KB
  Size limit:   860 KB
  Size:         872.3 KB
```

### Diagnose, then fix

1. **Find what grew.** Compare with `master`:
   ```bash
   git stash && bun run build && du -b build/index.mjs
   git stash pop && bun run build && du -b build/index.mjs
   ```
   The delta tells you how much your change added.
2. **Check the build report** — `bunup` prints brotli/gzip sizes per chunk during the build. Identify the chunk that grew.
3. **Locate the offending symbol.** Most common causes:
   - A new dataset checked in as a regular `.ts` file (not `.skip.ts`) and re-exported from `src/index.ts`.
   - A function that pulled in a heavy dependency at module top-level instead of inside the function body.
   - A `Map` or `Set` literal that should have been declared `as const` and shipped as a plain object.
   - Duplicated regex tables — check if one of the existing constants in `src/modules/digits/digits.constants.ts` already has what you need.
4. **Fix without expanding the budget.** Move heavy data to `.skip.ts`, lazy-load with a dynamic `import()` for genuinely optional features, or eliminate duplication.
5. **If the budget legitimately must rise**, edit `.size-limit.json` and call it out in the PR description. The previous bumps in `git log -- .size-limit.json` are good examples of what justification looks like.

## Types budget (100 kB)

Types can grow surprisingly fast when:
- A module exports a deep union/intersection that TypeScript serializes literally.
- A large `as const` literal is re-exported with its full type rather than a narrowed signature.
- `unknown`/`any` is replaced with a giant inferred type.

Mitigations:
- Type the *public* return as the narrow interface (`BankInfo`), not the literal `as const` value.
- Use `export type { Foo } from "./types"` rather than `export *` from a types file when you only need a subset.
- Avoid `infer` in public types — push it into the implementation file and export the resolved type.

## Dependencies — be conservative

The only runtime dependency is `fastest-levenshtein` (see `package.json`). Before adding any new `dependencies` entry, ask:

1. Is the helper small enough to vendor (≤ ~50 lines)?
2. Does it have its own dependencies? They count toward consumers' install size.
3. Does it support ESM + CJS dual export? If not, it will break our build.

`devDependencies` are free — go wild.

## Checklist before opening a PR that touches code size

- [ ] `bun run build` succeeds and `bun run test:size` passes locally.
- [ ] New data files use the `.skip.ts` (or `.skip.json`) suffix.
- [ ] No bare `import "./foo"` (side-effect imports).
- [ ] No top-level statements with side effects in new files.
- [ ] If size limit was bumped, the PR description says why and quotes the new number.

## References

- `.size-limit.json` — the source of truth for budgets
- `bunup.config.ts` — bundler config
- `package.json` — `"sideEffects": false`
- Existing data files: `src/modules/sheba/codes.skip.ts`, `src/modules/getBankNameFromCardNumber/banksCode.skip.ts`
- `size-limit` docs: https://github.com/ai/size-limit
