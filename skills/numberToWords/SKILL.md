---
name: numberToWords
description: Convert a number (integer up to Number.MAX_SAFE_INTEGER) into its Persian-words representation, with optional ordinal suffix. Use when generating invoice text, receipt amounts in words, reading numbers aloud, or accessibility output. Triggers on mentions of numberToWords, number to Persian words, to Persian words, ordinal Persian, "say this number in Farsi", or invoice amount in letters.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# numberToWords — number → Persian words

```ts
import { numberToWords } from "@persian-tools/persian-tools";
// CommonJS
const { numberToWords } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
numberToWords(
  numberValue: number | string,
  options?: NumberToWordsOptions,
): string | PersianToolsTypeError

interface NumberToWordsOptions {
  ordinal?: boolean;   // append ordinal suffix via addOrdinalSuffix(...)
}
```

## Basic usage

```ts
import { numberToWords } from "@persian-tools/persian-tools";

numberToWords(0);                       // "صفر"
numberToWords(7);                       // "هفت"
numberToWords(123);                     // "صد و بیست و سه"
numberToWords(1234);                    // "یک هزار و دویست و سی و چهار"
numberToWords(1_000_000);               // "یک میلیون"
numberToWords("12,345");                // "دوازده هزار و سیصد و چهل و پنج"
numberToWords(-100);                    // "منفی صد"

// Ordinal
numberToWords(3, { ordinal: true });    // "سوم"
numberToWords(21, { ordinal: true });   // appends ordinal suffix via addOrdinalSuffix
```

## Input rules

- Accepts `number | string`.
- Strings are first run through `removeCommas(...)` (so `"12,345"` → `12345`).
- The numeric value **must be a safe integer** (`Number.isSafeInteger(...)`). Otherwise the function **returns** (not throws) a `PersianToolsTypeError` instance.
- This means the return type is `string | PersianToolsTypeError`. Treat it as a tagged union:

```ts
import { numberToWords } from "@persian-tools/persian-tools";
import { PersianToolsTypeError } from "@persian-tools/persian-tools"; // re-exported from helpers

const result = numberToWords(userInput);
if (result instanceof PersianToolsTypeError) {
  console.error(result.message);
} else {
  console.log(result);
}
```

## Range

- Maximum: `Number.MAX_SAFE_INTEGER` (= `2^53 - 1` ≈ 9.007e15). Larger numbers lose precision in JS itself and are rejected with a `PersianToolsTypeError`.
- Minimum: `-Number.MAX_SAFE_INTEGER`. Negative integers are accepted; the result is prefixed with `منفی`.
- Decimals (e.g. `1.5`) are rejected — the safe-integer guard catches them.

## Ordinal mode

`{ ordinal: true }` runs the result through `addOrdinalSuffix(...)`. The suffix rules are conservative:

- Words ending in `سه` → strip last 2 chars, append `سوم` (`سه` → `سوم`, `سی و سه` → `سی و سوم`).
- Words ending in `ی` → append ` اُم` (with a leading space).
- Anything else → append `م`.

This produces *machine-correct* ordinals but not all idiomatic forms — e.g. `1 → "یک"` becomes `"یک اُم"`, which is grammatically valid but uncommon (`"یکم"` is colloquial). Confirm against your locale style guide before using ordinal mode in user-facing copy.

## Common pitfalls

- **Return type isn't pure `string`.** Don't blindly assign to a `string` variable without checking. Several existing call sites in this codebase wrap `numberToWords` in a type guard against `PersianToolsTypeError`.
- **Persian-digit string inputs (`"۱۲۳"`) are NOT auto-normalized.** `removeCommas` only handles commas. Pass the digit-normalized number first or call `autoConvertDigitsToEN` upstream.
- **Floats** silently get rejected, not rounded. If you intend to round, do it before calling.
- **The result has no commas or other separators** — it's Persian words separated by `و` (and). For an invoice line that needs both numeric and word forms, combine with `addCommas` separately.

## Composition with addCommas

```ts
import { numberToWords, addCommas } from "@persian-tools/persian-tools";

const formatInvoice = (n: number) =>
  `${addCommas(n)} ریال (${numberToWords(n)})`;

formatInvoice(1_234_567);
// "1,234,567 ریال (یک میلیون و دویست و سی و چهار هزار و پانصد و شصت و هفت)"
```

## References

- Tests: `test/NumberToWords.spec.ts`
- Inverse: `wordsToNumber` skill
- Ordinal mechanics: `addOrdinalSuffix` skill
