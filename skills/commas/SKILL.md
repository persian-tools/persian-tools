---
name: commas
description: Add or strip thousands-separator commas in numeric strings, with support for Persian-digit input. Use when formatting money amounts, prices, or quantities for display, or parsing back a comma-formatted string into a number. Triggers on requests mentioning addCommas, removeCommas, thousands separator, formatNumber, or formatting numeric output.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# commas — thousands-separator add/remove

```ts
import { addCommas, removeCommas } from "@persian-tools/persian-tools";
// CommonJS
const { addCommas, removeCommas } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
addCommas(input: number | string): string
removeCommas(value: string): number
```

## addCommas

Inserts commas every three digits, working on the integer part and preserving any decimal portion.

```ts
import { addCommas } from "@persian-tools/persian-tools";

addCommas(30000);              // "30,000"
addCommas("1234567.89");       // "1,234,567.89"
addCommas(-2500);              // "-2,500"
addCommas("۱۲۳۴۵");           // "12,345" (Persian digits auto-converted to English first)
```

### Behaviour rules

- Accepts `number | string`. Anything else (`null`, `undefined`, `boolean`, `object`) returns `""` (no throw).
- Strings are first stripped of any pre-existing commas (`input.replace(/,/g, "")`).
- If the input string is **detected as Persian** (`isPersian(...)`) the digits are converted via `digitsFaToEn` before formatting.
- The cleaned string must match `/^-?\d+(\.\d+)?$/`. Anything else (letters, exponent notation, non-Persian non-Latin digits) returns `""`.

### Pitfalls

- **Arabic-Indic digits (`٠-٩`) are NOT handled.** `isPersian("٧٨")` is false, so the Arabic digits fall through and fail the final regex → `""`. Normalize first with `digitsArToEn` if input may come from Arabic keyboards.
- **`addCommas(NaN)`** → `""`, not `"NaN"` (NaN's stringification fails the regex).
- **`addCommas(1e21)`** → `""`. JavaScript's `Number.prototype.toString` switches to scientific notation around 1e21, which the regex rejects. For huge numbers, format as a string first.

## removeCommas

Strips commas (and any whitespace after each comma) and parses the result with `Number(...)`.

```ts
import { removeCommas } from "@persian-tools/persian-tools";

removeCommas("1,234,567");     // 1234567
removeCommas("30,000.5");      // 30000.5
removeCommas("-2,500");        // -2500
```

### Behaviour rules

- Input **must be a string**. Otherwise throws:
  `TypeError("PersianTools: removeCommas - The input must be string")`.
- Empty string returns `0` (since `Number("")` is `0`).
- Non-numeric content like `"abc"` returns `NaN` — the caller is responsible for checking with `Number.isNaN(...)`.
- **Does not** convert Persian/Arabic digits. `removeCommas("۱۲۳")` returns `NaN`. Run digit normalization first if needed.

### Pitfalls

- **`removeCommas("1,234,567")` returns a `number`, not a `string`.** For round-tripping (string → number → string) compose with `addCommas`.
- **No throw for malformed numbers** — `removeCommas("12abc")` returns `NaN`. Validate before use.

## Common patterns

### Sanitize → format pipeline for user input

```ts
import { addCommas, autoConvertDigitsToEN } from "@persian-tools/persian-tools";

const formatPrice = (raw: string) => addCommas(autoConvertDigitsToEN(raw));
formatPrice("۱۲۳۴۵");    // "12,345"
formatPrice("٧٨٩");      // "789"  (handles both Persian and Arabic digits)
```

### Parse a displayed price back to a number

```ts
import { removeCommas, autoConvertDigitsToEN } from "@persian-tools/persian-tools";

const parsePrice = (display: string) => removeCommas(autoConvertDigitsToEN(display));
parsePrice("۱۲,۳۴۵");   // 12345
```

## References

- Tests: `test/addCommas.spec.ts`, `test/removeCommas.spec.ts`
- Related: `digits` skill for the digit conversion functions
