---
name: extractCardNumbers
description: Extract Iranian card numbers from free-form text — supports Persian/Arabic digits, separators (dashes, underscores, spaces), fuzzy matching for masked/typo'd cards, optional validation and bank lookup, and large-text optimization. Use when scraping chat logs, OCR output, payment confirmation emails, or any unstructured input for card numbers. Triggers on mentions of extractCardNumber, parse card numbers from text, card extraction, fuzzy card detection.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# extractCardNumbers — extract card numbers from free text

```ts
import { extractCardNumber } from "@persian-tools/persian-tools";
// CommonJS
const { extractCardNumber } = require("@persian-tools/persian-tools");
```

> The exported function is **`extractCardNumber`** (singular), even though the module is `extractCardNumbers` (plural).

## Public exports

```ts
// Main function — heavily overloaded for type-safe option combinations
function extractCardNumber(str: string, options?: ExtractCardNumberOptions): ExtractCardNumber[];
// (plus 8 overloads narrowing the return shape based on options — see below)

// Re-exports from ./types — option/result interfaces
ExtractCardNumberOptions
ExtractCardNumberOptionsBase
ExtractCardNumberOptionsWithValidation
ExtractCardNumberOptionsWithoutValidation
ExtractCardNumberOptionsWithBank
ExtractCardNumberOptionsWithoutBank
ExtractCardNumberOptionsWithContext
ExtractCardNumberOptionsWithoutContext
ExtractCardNumberBase
ExtractCardNumberComplete
ExtractCardNumberWithBank
ExtractCardNumberWithContext
ExtractCardNumberWithValidation
ExtractCardNumber                          // base union

// Re-exports from ./utils
cleanCardNumber, extractContext, splitTextIntoChunks, quickCardNumberCheck,
getOptimalChunkConfig, shouldUseFuzzyMatching, isValidCardNumberFormat,
sortCardNumbersByPosition, removeDuplicateCardNumbers

// Re-exports from ./constants
cardNumberRegex, fuzzyCardNumberRegex, defaultFuzzyConfig, performanceThresholds
```

> **Naming note:** the function is `extractCardNumber` (singular). Some legacy docs reference `extractCardNumbers` (plural) — that name does not exist. Likewise `extractCardNumberWithMetrics` referenced in older READMEs is not a current export.

## Result shape (always)

Each match has, at minimum:

```ts
{
  index: number;       // 1-based ordinal in this run
  base: string;        // raw matched text (may contain separators)
  pure: string;        // normalized digits-only form
  startIndex: number;  // byte offset in source string
  endIndex: number;
}
```

With `checkValidation: true` → adds `isValid: boolean`.
With `detectBankNumber: true` → adds `bankName: string | null`.
With `includeContext: true` → adds `context: { before, after }`.

## Basic usage

```ts
import { extractCardNumber } from "@persian-tools/persian-tools";

const text = "Cards: 6037701689095443 and 6219-8610-3452-9007";
const cards = extractCardNumber(text, {
  checkValidation: true,
  detectBankNumber: true,
});

// [
//   { index: 1, base: "6037701689095443", pure: "6037701689095443",
//     startIndex: 7, endIndex: 23, isValid: true, bankName: "بانک کشاورزی" },
//   { index: 2, base: "6219-8610-3452-9007", pure: "6219861034529007",
//     startIndex: 28, endIndex: 47, isValid: true, bankName: "بانک سامان" },
// ]
```

## Multi-format input

The extractor normalizes:
- Persian digits (`۰-۹`) and Arabic-Indic digits (`٠-٩`) → English digits inside `pure`.
- Common separators (dash, underscore, space) are recognized inside `base` and stripped in `pure`.

```ts
extractCardNumber("کارت: ۶۰۳۷۷۰۱۶۸۹۰۹۵۴۴۳");
// pure: "6037701689095443"

extractCardNumber("6037_7016_8909_5443");
// pure: "6037701689095443", base: "6037_7016_8909_5443"
```

## Fuzzy matching (masked / typo'd cards)

```ts
extractCardNumber("My card: 6037-****-8909-5443", {
  enableFuzzyMatching: true,
  checkValidation: false,
});
```

Fuzzy mode opens the regex (`fuzzyCardNumberRegex`) to tolerate `*`, `?`, and similar masking characters. Costs a perf hit; gate behind `shouldUseFuzzyMatching(text, config)` for large inputs.

## Large-text optimization

For multi-MB documents, set `optimizeForLargeText: true` (and optionally `maxResults`):

```ts
extractCardNumber(hugeDocument, {
  optimizeForLargeText: true,
  maxResults: 10,
});
```

Internally the text is chunked by `splitTextIntoChunks` (chunk size from `getOptimalChunkConfig`) so the regex doesn't backtrack across the whole document.

## Context capture

```ts
extractCardNumber(text, {
  includeContext: true,
  contextLength: 20,
});
// each match: { ..., context: { before: "Payment cards: ", after: " and 6219..." } }
```

Useful for surfacing UI snippets like "...در پیامک از ۶۰۳۷۷۰۱۶۸۹۰۹۵۴۴۳ خرید شد...".

## Option narrowing — the type-safe overloads

The function's eight overloads return *narrower* types based on option combinations. Treat the overload set as compile-time guidance:

```ts
const a = extractCardNumber(s, { checkValidation: true, detectBankNumber: true });
// ExtractCardNumberComplete[]   — has isValid + bankName

const b = extractCardNumber(s, { checkValidation: true, detectBankNumber: false });
// ExtractCardNumberWithValidation[]   — isValid but no bankName

const c = extractCardNumber(s);
// ExtractCardNumber[]   — base shape
```

## Common pitfalls

- **No metrics function exists.** Older docs reference `extractCardNumberWithMetrics` — it is **not** exported. Time the call yourself if you need throughput data.
- **`null` input** is not in the TS signature but the runtime guard returns `[]` for falsy input. Don't rely on that — pass a string.
- **Fuzzy mode is asymmetric.** `enableFuzzyMatching: true` will surface matches that fail `checkValidation` (because the matched digits include `*`). Combine with `checkValidation` carefully.
- **`pure`, not `base`**, is what you pass downstream to `verifyCardNumber` or `getBankNameFromCardNumber`.

## References

- Tests: `test/extractCardNumber.spec.ts`
- Related: `verifyCardNumber`, `getBankNameFromCardNumber` skills
