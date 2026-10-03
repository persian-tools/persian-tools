---
name: persian-tools-release
description: Cut a release of @persian-tools/persian-tools — version bump, changelog generation, bundle verification, and publish to npm. Use when the user asks to "release", "publish", "ship a new version", "tag a release", "bump version", or "release beta". Encodes the exact `standard-version`-driven flow, Conventional Commits requirement, the pre-release validation sequence, and the difference between stable and beta releases.
---

# Releasing persian-tools

Releases are driven by **`standard-version`**: it reads Conventional Commit messages since the last tag, decides the next semver bump, updates `package.json`, regenerates `CHANGELOG.md`, and creates a git tag. No manual version edits.

## Prerequisites

- Working tree is clean (no uncommitted changes).
- You're on `master` and synced with `origin/master`.
- You have npm publish rights on `@persian-tools/persian-tools`.
- All commits since the last tag follow Conventional Commits (enforced by `commitlint.config.js`, which extends `@commitlint/config-conventional`).
- Husky's `pre-commit` runs `bun run format:ci`, `bun run lint`, `bun run test` — so a release commit must pass all of them.

## The stable release flow

The orchestration is in `package.json` `scripts`:

```jsonc
"prerelease":  "bun run test && bun run build",
"release":     "standard-version",
"postrelease": "git push --follow-tags origin master && bun run publish",
```

So `bun run release` does, in order:

1. **`prerelease`** — `bun run test && bun run build`
   - Tests must pass.
   - `build` runs `clean → bunup` and then `test:size` (`postbuild`). If the bundle exceeds 860 kB (JS) or 100 kB (types), the build fails. Load **bundle-size-guardian** if it does.
2. **`release`** — `standard-version`
   - Determines the next version from commit types since the last tag (`feat:` → minor, `fix:` → patch, `BREAKING CHANGE:` or `!:` → major).
   - Updates `package.json` `version`.
   - Regenerates `CHANGELOG.md`.
   - Creates a release commit and tag (`vX.Y.Z`).
3. **`postrelease`** — `git push --follow-tags origin master && bun run publish`
   - Pushes the new tag and commit.
   - Publishes to npm.

A typical release session:

```bash
git checkout master
git pull --rebase origin master
make prepare-release    # extra safety: install + lint + format:ci + test + build
bun run release         # bumps + tags + pushes + publishes
```

`make prepare-release` (`Makefile:1-7`) is a belt-and-suspenders check that exercises the *exact* commands CI uses.

## Beta / pre-release flow

For beta releases, the wiring is:

```jsonc
"release:beta":     "bun run build",
"postrelease:beta": "standard-version --prerelease beta",
```

So:

```bash
bun run release:beta    # builds + invokes standard-version --prerelease beta
```

This produces versions like `5.0.0-beta.0`, `5.0.0-beta.1`, ... — matching the current pre-1.0 of v5 (`package.json:version`).

Push and publish are **not automated** for beta — run them explicitly:

```bash
git push --follow-tags origin master
bun publish --tag beta    # critical: publishes to the `beta` dist-tag, not `latest`
```

Using `--tag beta` means `npm install @persian-tools/persian-tools` still pulls the stable line, while `npm install @persian-tools/persian-tools@beta` opts into the pre-release. **Never** publish a beta without `--tag beta`.

## Commit message rules that drive the version bump

`standard-version` reads commit types from the last tag. Use them deliberately:

| Prefix | Effect | Example |
|---|---|---|
| `feat:` | Minor bump | `feat(modules): add moneyWordsToNumber utility` |
| `fix:` | Patch bump | `fix(sheba): handle IBAN with embedded spaces` |
| `perf:` | Patch bump | `perf(digits): inline regex compile` |
| `refactor:` | No bump (appears in changelog) | `refactor(helpers): extract isString guard` |
| `docs:` | No bump | `docs(readme): add halfSpace example` |
| `test:` / `chore:` / `ci:` / `build:` / `style:` | No bump | `chore(deps): bump vitest to 4.0.18` |
| Any with `!:` or footer `BREAKING CHANGE: ...` | Major bump | `feat(api)!: rename digitsArToFa to digitsArabicToFarsi` |

A breaking change in *any* commit forces the major bump even if other commits are minor/patch.

The scope (text in parens) is free-form but should match a module directory or area: `modules`, `helpers`, `nationalId`, `sheba`, `release`, `deps`, etc. The existing changelog is the best reference for accepted scopes.

## Pre-flight checklist (run before `bun run release`)

```bash
git status                # must be clean
git log $(git describe --tags --abbrev=0)..HEAD --oneline   # commits since last tag — sanity-check messages

bun install                # ensure lockfile is honored
bun run lint
bun run format:check       # NOT --write — we just check
bun run test
bun run test:types
bun run build              # includes test:size
```

If any step fails, fix it in a **separate commit** (not in the release commit) and re-run.

## Docs publishing — separate flow

API docs (TypeDoc) live on `gh-pages` and are published with:

```bash
make publish-docs
```

This runs `npx typedoc`, copies the output, and force-pushes it to the `gh-pages` branch. **Do not run this from a personal fork** — it must run from a maintainer's checkout. Docs are usually republished alongside a release but not gated on it.

## After the release

- Verify the new version appears at https://www.npmjs.com/package/@persian-tools/persian-tools.
- Verify the git tag exists: `git tag | tail -3`.
- Verify the GitHub release notes (auto-generated from the changelog) look right at https://github.com/persian-tools/persian-tools/releases.
- If a regression slips through, **do not** force-push the tag. Cut a patch release (`fix: ...`) and let `standard-version` produce a new tag.

## Rollback

If a bad version was published:

```bash
# Within 72 hours of publish, you can unpublish a single version:
npm unpublish @persian-tools/persian-tools@X.Y.Z

# After 72 hours, deprecate it instead:
npm deprecate @persian-tools/persian-tools@X.Y.Z "Use vX.Y.Z+1 — see issue #NNN"
```

Then cut a patch release with the fix. Never reuse a deprecated version number.

## References

- `package.json` — scripts that wire the release flow
- `Makefile` — `prepare-release` and `publish-docs` targets
- `commitlint.config.js` — commit-message gating
- `.husky/pre-commit` — local lint/test gate
- `CHANGELOG.md` — append-only; do not edit manually
- `standard-version` docs: https://github.com/conventional-changelog/standard-version
- Conventional Commits: https://www.conventionalcommits.org/
