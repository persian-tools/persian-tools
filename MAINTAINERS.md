# Maintainers Guide

This document describes how the Persian Tools project is maintained today and how we plan to scale it as the toolkit and community grow. It complements [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md), and the CI settings in [.github/workflows/](.github/workflows/).

- Project: persian-tools/persian-tools
- Scope: TypeScript utilities for Persian (Farsi) text, numbers, banking, validation, and locale features; works in Node.js, Bun, and the browser.
- Tech: TypeScript, Bun, Vitest, bunup, ESM-first with CJS builds.

## Current Maintainers

- [Ali Torki (Lead Maintainer)](https://github.com/ali-master)
- [Moh3n (Core Maintainer)](https://github.com/moh3n9595)

See the [Persian Tools Core Team](https://github.com/orgs/persian-tools/teams/core/members).

If you need help not covered here, please open an issue on the [issue tracker](https://github.com/persian-tools/persian-tools/issues) or mention a maintainer on the PR.

## Roles and Responsibilities

- Triage
  - Label, reproduce, and prioritize new issues within three business days.
  - Close duplicates and out-of-scope items with guidance where possible.
  - Convert support questions into docs improvements or discussions where appropriate.
- Reviews
  - At least one approval for docs/chore/non-functional changes.
  - At least two approvals for logic-heavy changes, security-sensitive code, or public API surface.
  - Enforce conventional commits in PR titles when possible and ensure CI is green.
- Releases
  - Follow the release process below; keep CHANGELOG up to date (standard-version).
  - Ensure artifacts and tags are correct and docs are updated.
- Security
  - Respect the coordinated disclosure process (see SECURITY.md).
  - Triage vulnerability reports quickly; avoid public reproduction until fixed.
- Stewardship
  - Maintain code quality, test coverage, and performance budgets.
  - Mentor contributors and help onboard new maintainers.

## Decision-Making

We use lazy consensus. If no objections are raised within 72 hours on a proposal (issue/PR), it may proceed. For contentious or breaking decisions, we seek explicit consensus from at least two maintainers. If needed, escalate to the Core Team for a vote.

## Branching, Versioning, and Releases

- Branching
  - master: stable, release-only merges.
  - develop: integration branch for features and fixes.
  - `feature/*` or `fix/*`: short-lived branches; rebase or squash into develop.
- Versioning: Semantic Versioning (semver)
  - MAJOR: breaking API/runtime changes.
  - MINOR: new features without breaking existing contracts.
  - PATCH: fixes and internal improvements.
- Changelog: Managed by standard-version.
- Release cadence: As-needed; aim for monthly minors, weekly patches when there are fixes.

### Release Checklist (maintainers)

1. Ensure CI is green on develop and master.
2. Verify tests (bun run test) and size limits (bun run test:size) locally if needed.
3. Bump version and generate changelog:
   - Stable: npm run release
   - Beta/RC: npm run release:beta (then standard-version --prerelease beta)
4. Push tags/commits (script does this): postrelease pushes tags to master.
5. Publish to npm from a clean state:
   - npm publish --access public (prepack will build via bun run build)
6. Announce in the PR/issue and update README/website if user-facing changes.

Notes

- CI/CD lives in .github/workflows/ci.yml with jobs: changes, lint (build/typecheck/lint/format), test (matrix across OS + runtimes), security (CodeQL, Trivy, TruffleHog), summary.
- Coverage is uploaded to Codecov; SonarCloud is optional (requires secrets).

## CI, Quality, and Testing Expectations

- TypeScript: tsc --noEmit must pass (see scripts in package.json).
- Tests: Vitest; keep and improve coverage where practical. Prefer fast, deterministic tests.
- Lint/Format: ESLint + Prettier; markdownlint for docs.
- Build: bunup; ESM builds + CJS for compatibility. Avoid breaking ESM/CJS exports.
- Performance: monitor bundle size (size-limit) after significant changes.

## Module Areas and Ownership

While all core maintainers can review any change, the following areas are commonly touched. Ping the listed owners for deep reviews:

- Validation: nationalId, legalId, verifyCardNumber, sheba/IBAN — owners: @ali-master
- Numbers/Text: numberToWords, wordsToNumber, digits conversions, comma formatting — owners: @ali-master
- Text Processing: half-space, ZWNJ handling, URL fixes, slugify, textAnalyzer — owners: @moh3n9595
- Geographic/Plates: numberplate and province/city utilities — owners: @moh3n9595
- Build/Infra: CI, release tooling, docs site — owners: @ali-master

If you frequently contribute to an area, propose co-ownership in an issue. We can later formalize CODEOWNERS if needed.

## Security and Responsible Disclosure

- Do not file public issues for vulnerabilities.
- Follow SECURITY.md for private reporting and timelines.
- Use GitHub Security advisories when coordinated disclosures are required.

## Backporting and Support Window

- Node.js: support active LTS and current (see package.json engines).
- Bun: latest stable per CI matrix.
- We will consider backporting critical fixes to the latest MINOR if the patch is low risk.

## Deprecation Policy

- Mark APIs as @deprecated in JSDoc and README, provide migration paths.
- Keep deprecated APIs for at least one MINOR release before removal in the next MAJOR.
- Log deprecation notes in CHANGELOG under Deprecations.

## Community Health and Triage

- Labels
  - good first issue, help wanted — newcomer-friendly.
  - area/* — tag modules or domains.
  - type/bug, type/feature, type/docs, type/chore.
  - priority/p0..p3 — optional for planning.
- SLA
  - Initial triage: within 3 business days.
  - First maintainer response on PRs: within 3 business days.
  - Security reports: immediate acknowledgement where possible.

## Onboarding New Maintainers

- Consistent, high-quality contributions and reviews in an area.
- Nomination in an issue and approval by two existing maintainers.
- Grant permissions to the repo, npm, and CI secrets as needed.
- Read and agree to CODE_OF_CONDUCT.md and this guide.

## Roadmap — Current and Future Focus

### Short-term

- Improve type safety and strictness (address verbatimModuleSyntax export warnings).
- Increase test coverage for banking, text analysis, and edge cases.
- Performance passes on numberToWords/wordsToNumber and digit conversions.
- Documentation refresh with more examples and live playground snippets.

### Mid-term

- Extended phone number utilities (format/parse/normalize).
- Richer IBAN/Sheba parsing and bank metadata updates.
- Robust locale utilities: date/time formatting helpers, currency formatting.
- Browser bundle size optimizations and tree-shaking checks.

### Long-term

- New modules based on community needs (e.g., grammar helpers, punctuation rules, NLP-friendly tokenization for Persian).
- Enhanced fuzziness/diacritic-aware search utilities.
- First-class DX: website playground, recipes, and migration guides.

We will track these items in GitHub issues and project boards as they are proposed and refined.

## References

- [CONTRIBUTING.md](CONTRIBUTING.md) — contribution workflow and development setup.
- [SECURITY.md](SECURITY.md) — vulnerability reporting.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — community standards.
- [README.md](README.md) — features, API reference, and examples.
- [.github/workflows/ci.yml](.github/workflows/ci.yml) — CI/CD pipeline details.
- [package.json](package.json) — scripts, engines, and release tooling.
- [tsconfig.json](tsconfig.json) — TypeScript configuration.
- [vitest.config.ts](vitest.config.ts) — test setup and coverage.
- [size-limit.config.js](size-limit.config.js) — bundle size budgets.