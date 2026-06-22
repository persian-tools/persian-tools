---
name: persian-module-author
description: Author a new utility module under src/modules/ of the persian-tools library. Use when the user asks to "add a new module", "create a utility", "implement a feature", "add a function to persian-tools", or wants to extend the public API with a new Persian/Iranian text or validation helper. Encodes the exact directory layout, export rules, JSDoc tags, error-message format, and index.ts wiring that the rest of the codebase already uses.
---

# Authoring a new module in persian-tools

This skill is the **authoritative checklist** for adding a new utility to `@persian-tools/persian-tools`. Follow it end-to-end before opening a PR — partial adherence breaks tree-shaking, JSDoc generation, or the public type surface.

## 1. Decide where the module lives

| Scope | Location | Example |
|---|---|---|
| Generic utility, exported publicly | `src/modules/<kebab-name>/` | `src/modules/halfSpace/` |
| Composite utility built on top of multiple modules | `src/<name>/` (sibling of `modules/`) | `src/moneyWordsToNumber/` |
| Internal helper (not exported) | `src/helpers/` | `src/helpers/zero-pad.ts` |

**Rule of thumb:** if it has its own public API and tests, it goes under `src/modules/`. If it composes existing modules into a higher-level workflow, put it as a sibling of `modules/` (mirror the `moneyWordsToNumber/` precedent).

## 2. Directory layout

A standard module directory must look like this:

```
src/modules/<moduleName>/
├── index.ts            # Public surface — re-exports only
├── <moduleName>.ts     # Main implementation (or split into multiple files)
├── types.ts            # Public type definitions (only if non-trivial)
├── constants.ts        # Small constants and regex
├── helpers.ts          # Module-private helpers (not exported from index)
└── data.skip.ts        # OPTIONAL: heavy lookup data — see bundle-size-guardian
```

`.skip.ts` files are a project convention: large lookup tables live there so the tree-shaker treats them as side-effect-free leaf data. Mirror what `src/modules/sheba/codes.skip.ts` and `src/modules/getBankNameFromCardNumber/` do.

## 3. The `index.ts` rule

`src/modules/<name>/index.ts` re-exports **only** what is part of the public API. No implementation lives here. Pattern from `src/modules/digits/index.ts`:

```ts
export * from "./converters";
export * from "./digits.types";
export * from "./digits.constants";
```

Then add a single line to `src/index.ts` so the module is re-exported from the package root:

```ts
export * from "./modules/<moduleName>";
```

The list in `src/index.ts:1-29` is the canonical ordering — append at the bottom unless the module is closely related to an existing group.

## 4. Function signatures and type safety

- **Always** declare an explicit return type. `function foo(x: string) {}` (with inferred return) is rejected.
- Use `unknown` instead of `any` for inputs that may be misused. Narrow with the guards from `src/helpers/type-guards.ts` (`isString`, `isNumber`, `isNullish`, `isTruthy`, `isError`).
- Prefer discriminated unions for results that can fail without throwing:

```ts
export type ValidationResult =
  | { valid: true; normalized: string }
  | { valid: false; error: string };
```

- For options, use an options object with `?` modifiers and JSDoc `@default` annotations. Mirror `MoneyWordsToNumberOptions` in `src/moneyWordsToNumber/index.ts`.

## 5. Error messages — exact format

All thrown errors must follow this template:

```
PersianTools: <functionName> - <reason>
```

Examples from the codebase:

```ts
// src/modules/digits/converters/en.ts
throw TypeError("PersianTools: digitsEnToFa - The input must be string or number");
```

For richer errors with a `subject` field, use `PersianToolsTypeError` or `PersianToolsError` from `src/helpers/errors.ts`. **Tests assert against the exact message string** (see `test/digits.spec.ts:11`), so changing the format silently breaks them.

## 6. JSDoc — what TypeDoc needs

The project publishes API docs via TypeDoc (`typedoc.json`). Every exported symbol must carry JSDoc with these tags where applicable:

```ts
/**
 * One-line summary.
 *
 * @category Digits                 // groups in the generated docs
 * @public                          // explicit visibility
 * @since 5.1.0                     // version it was added
 * @param value - what it accepts
 * @returns what it returns
 * @throws {TypeError} when the input is invalid
 * @example
 * ```ts
 * import { myFn } from "@persian-tools/persian-tools";
 * myFn("سلام"); // "Hello"
 * ```
 */
export function myFn(value: string): string { ... }
```

Look at `src/modules/sheba/index.ts:6-23` for a complete reference of the tag style used.

## 7. Persian-language correctness

Before writing your implementation, load the **persian-text-expert** skill — it covers the Persian/Arabic character split, ZWNJ/half-space, digit systems (`enNums`, `faNums`, `arNums` from `src/modules/digits/digits.constants.ts`), and the existing normalization helpers you should reuse instead of re-implementing.

Common mistakes to avoid:
- Using `/[؀-ۿ]/` as "Persian" — this is the Arabic Unicode block and matches both. Use `isPersian` / `isArabic` from existing modules.
- Stripping ZWNJ (`‌`) — it is a *real character* in Persian; preserve it unless the user explicitly asked to remove it.
- Hardcoding digit replacements — always go through `digitsEnToFa` / `digitsFaToEn` / `digitsArToEn` / `autoConvertDigitsToEN`.

## 8. Tests are mandatory

For every new module, create `test/<moduleName>.spec.ts`. Load the **persian-test-author** skill for the exact Vitest patterns used here (parameterized cases, error-throw shape, edge cases). Tests must:

- cover the happy path
- cover each thrown error (asserting the literal `PersianTools: ...` message)
- cover edge cases: empty string, only Persian, only Arabic, mixed, ZWNJ-laden
- run as part of `bun run test` with zero failures

Coverage target: ≥ 90 % per the `vitest.config.ts` setup.

## 9. README and CHANGELOG

- Add a section to `README.md` under the matching category with a runnable example. Keep it short — link to the TypeDoc page for full details.
- **Do not** edit `CHANGELOG.md` by hand. `bun run release` (powered by `standard-version`) generates it from Conventional Commits. Use a commit message like `feat(modules): add <moduleName> utility` so the entry appears under the right heading.

## 10. Final pre-PR checklist

Run these in order. Any failure blocks the PR:

```bash
bun run lint           # ESLint with security + import + promise plugins
bun run format:check   # Prettier
bun run test           # Vitest with coverage
bun run test:types     # tsc --noEmit
bun run build          # bunup — must succeed and stay under size budget
```

`bun run build` runs `bun run test:size` as a `postbuild`. If your module pushes the JS bundle over **860 kB** or the type-definition bundle over **100 kB** (`.size-limit.json`), load the **bundle-size-guardian** skill to fix it before merging.

## References

- Existing reference modules to study: `src/modules/digits/`, `src/modules/sheba/`, `src/modules/halfSpace/`, `src/modules/numberplate/`.
- Helper inventory: `src/helpers/index.ts`.
- Public surface contract: `src/index.ts`.
- Domain instructions: `.github/instructions/typescript.instructions.md`, `.github/instructions/api-design.instructions.md`.
