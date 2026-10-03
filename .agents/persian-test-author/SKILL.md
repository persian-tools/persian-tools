---
name: persian-test-author
description: Write Vitest test files for persian-tools modules that match the repo's existing patterns. Use when adding a test alongside a new module, writing regression tests for a bug fix, or extending coverage. Encodes the exact assertion shape used for thrown errors ("PersianTools: <fn> - <reason>"), the parameterized-case style, the edge-case checklist (empty / Persian-only / Arabic-only / mixed / ZWNJ), and where to put the file.
---

# Authoring tests for persian-tools

This skill captures the *house style* for tests in this repo. Vitest is configured globally (`globals: true` in `vitest.config.ts`), so `describe`/`it`/`expect` are available without imports — but the existing code imports them anyway for clarity. Match that.

## Where the test file goes

| Test target | File location | Example |
|---|---|---|
| Module under `src/modules/<name>/` | `test/<name>.spec.ts` | `test/digits.spec.ts` |
| Composite module under `src/<name>/` | `test/<name>.spec.ts` | `test/moneyWordsToNumber.spec.ts` |
| Work-in-progress (excluded from CI) | `test/<name>.wip.ts` | `test/sortText.wip.ts` |
| Benchmarks | `benchmarks/<name>.bench.ts` | run via `bun run test:bench` |

Coverage configuration in `vitest.config.ts` excludes `*.spec.ts`, `*.bench.ts`, `*.d.ts`, `*.config.ts`, and index `index.ts` files from the *production* coverage stats — so don't put real logic in `index.ts` that needs testing; put it in a sibling implementation file and re-export.

## Basic file skeleton

```ts
import { describe, it, expect } from "vitest";
import { yourFn } from "../src"; // always import from the package root, not deep paths

describe("yourFn", () => {
  it("does the basic happy path", () => {
    expect(yourFn("input")).toBe("expected");
  });
});
```

Importing from `"../src"` (which resolves to `src/index.ts`) instead of `"../src/modules/yourModule"` is the convention used by every existing spec — it doubles as a smoke test that the public surface re-exports your function correctly. See `test/digits.spec.ts:1`.

## Asserting thrown errors — exact shape

Errors are asserted via a `try/catch` block that compares `(e as Error).message` to the literal string. This is the **only** style used in the repo; do not switch to `expect(...).toThrow(...)` — be consistent.

```ts
it("throws when input is missing", () => {
  try {
    // @ts-ignore — intentional misuse to test runtime guard
    digitsArToFa();
  } catch (e) {
    expect((e as Error).message).toEqual(
      "PersianTools: digitsArToFa - The input must be string",
    );
  }
});
```

The `@ts-ignore` comment is **required** — without it, the type checker rejects the deliberate misuse. Tests must compile with `bun run test:types`.

Equivalent existing pattern: `test/digits.spec.ts:7-12`.

## The edge-case checklist

For *every* function that accepts a string, write tests for all rows below that apply. Skip a row only if it is genuinely meaningless for the function.

| Edge case | Sample input | Why |
|---|---|---|
| Empty string | `""` | Most functions should return `""` or `false`, not throw |
| Only Persian | `"سلام"` | Happy path for Persian-only |
| Only Arabic | `"السلام"` | Validates the Persian-vs-Arabic split |
| Mixed Persian + English | `"hello سلام 123"` | Common real input |
| Persian + Persian digits | `"تست ۱۲۳"` | Catches missing digit normalization |
| Persian + Arabic digits | `"تست ١٢٣"` | Catches missing `autoConvertDigitsToEN` |
| ZWNJ-laden | `"می‌خواهم"` | Catches `\s`-based regexes that strip ZWNJ |
| Leading/trailing whitespace | `"  text  "` | Most functions should `.trim()` |
| `null` / `undefined` | `null`, `undefined` | Must throw the project-format TypeError |
| Wrong type | `123` for `string` input | Same TypeError |

Concrete examples for each row appear across `test/isPersian.spec.ts`, `test/isArabic.spec.ts`, and `test/halfSpace.spec.ts`.

## Parameterized cases — the preferred style for many similar inputs

Don't write 20 nearly-identical `it()` blocks. Use a `forEach` table:

```ts
describe("digit conversion", () => {
  const cases = [
    { input: "۱۲۳",     expected: "123", note: "Persian → English" },
    { input: "٠١٢",     expected: "012", note: "Arabic → English" },
    { input: "abc ۴ ٥", expected: "abc 4 5", note: "mixed" },
  ];

  cases.forEach(({ input, expected, note }) => {
    it(`converts ${note}: "${input}"`, () => {
      expect(autoConvertDigitsToEN(input)).toBe(expected);
    });
  });
});
```

This gives each case a distinct title in the Vitest output, making failures self-explanatory.

## Assertions style guide

- Prefer `.toBe(x)` for primitives and reference equality.
- Use `.toEqual(x)` for deep equality on objects/arrays.
- For boolean-returning verifiers, assert both `.toBe(true)` and `.toBe(false)` cases — never assert truthiness with `.toBeTruthy()` because `undefined` would pass and mask a bug (several validators return `boolean | undefined`).
- For `null` returns, use `.toBeNull()`, not `.toBe(null)` (consistent with `getShebaInfo` tests).

## Test data — keep it real *and* synthetic

- Don't commit real personal data even as a comment. Generate valid checksums (e.g. via `create-national-id.ts` for National IDs).
- Use known-good fixtures already present in tests when adding regression cases — they've been audited.
- For phone, card, and Sheba samples, prefer the BIN/operator prefixes already in `constants.ts` and complete with valid check digits.

## Performance tests

Persian text processing can chew CPU on large inputs. When a module touches large strings, add a perf guard:

```ts
it("processes 1 MB of text in under 100 ms", () => {
  const huge = "متن نمونه ".repeat(100_000);
  const t0 = performance.now();
  yourFn(huge);
  expect(performance.now() - t0).toBeLessThan(100);
});
```

For real benchmarking (statistically meaningful, repeatable), use Vitest's bench API in `benchmarks/<name>.bench.ts` and run with `bun run test:bench`.

## Running tests

```bash
bun run test            # one-shot, CI=true
bun run test:watch      # interactive
bun run test:coverage   # produces coverage/ — required to stay >= 90 %
bun run test:types      # tsc --noEmit
bun run test:bench      # benchmarks only
```

The pre-release flow (`make prepare-release`) runs lint → format → test → build in order; tests failing here block a release.

## Don'ts

- Don't `mock` Persian datasets — they're small and deterministic; test against real values.
- Don't import directly from `../src/modules/...` — go through the package root re-export.
- Don't use `expect.assertions(n)` — the repo doesn't, and async paths here are minimal.
- Don't snapshot Persian strings — they render differently across editors and create noisy diffs. Use explicit string equality.

## References

- Reference specs: `test/digits.spec.ts`, `test/verifyIranianNationalId.spec.ts`, `test/halfSpace.spec.ts`, `test/moneyWordsToNumber.spec.ts`
- Config: `vitest.config.ts`
- Repo testing guide: `.github/instructions/testing.instructions.md`
