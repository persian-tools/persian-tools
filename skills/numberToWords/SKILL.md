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
  ordinal?: boolean;     // append ordinal suffix via addOrdinalSuffix(...)
  includeZero?: boolean; // include "صفر و" for numbers between -1 and 1 (default: false)
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

// Float and decimal numbers
numberToWords(5.3);                     // "پنج و سه دهم"
numberToWords("12.75");                 // "دوازده و هفتاد و پنج صدم"
numberToWords(0.5);                     // "پنج دهم"
numberToWords(0.5, { includeZero: true }); // "صفر و پنج دهم"
numberToWords(0.005);                   // "پنج هزارم"
numberToWords("۵٫۳");                   // "پنج و سه دهم" (supports Persian digits and ٫)

// Ordinal
numberToWords(3, { ordinal: true });    // "سوم"
numberToWords(21, { ordinal: true });   // appends ordinal suffix via addOrdinalSuffix
numberToWords(5.3, { ordinal: true });  // "پنج و سه دهمین"
```

## Input rules

- Accepts `number | string`.
- Both integer and decimal (floating point) numbers are supported.
- Strings are first stripped of commas (`"12,345.50"` → `"12345.50"`).
- Persian and Arabic digits and Persian decimal separators (`٫`) are automatically normalized.
- The numeric value must be a safe integer (for whole numbers) or a valid decimal with up to 15 decimal places. Otherwise the function **returns** (not throws) a `PersianToolsTypeError` instance.
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
- Minimum: `-Number.MAX_SAFE_INTEGER`. Negative numbers are accepted; the result is prefixed with `منفی`.
- Decimals (e.g. `5.3`, `12.75`, `0.05`) are decomposed into integer and fractional parts with appropriate scale words (`دهم`, `صدم`, `هزارم`, `ده هزارم`, etc.).

## Ordinal mode

`{ ordinal: true }` runs the result through `addOrdinalSuffix(...)`. The suffix rules are conservative:

- Words ending in `سه` → strip last 2 chars, append `سوم` (`سه` → `سوم`, `سی و سه` → `سی و سوم`).
- Words ending in `ی` → append ` اُم` (with a leading space).
- Decimal words ending in `م` (like `دهم`, `صدم`) → append `ین` (`دهمین`, `صدمین`).
- Anything else → append `م`.

This produces *machine-correct* ordinals but not all idiomatic forms — e.g. `1 → "یک"` becomes `"یک اُم"`, which is grammatically valid but uncommon (`"یکم"` is colloquial). Confirm against your locale style guide before using ordinal mode in user-facing copy.

## Common pitfalls

- **Return type isn't pure `string`.** Don't blindly assign to a `string` variable without checking. Several existing call sites in this codebase wrap `numberToWords` in a type guard against `PersianToolsTypeError`.
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
