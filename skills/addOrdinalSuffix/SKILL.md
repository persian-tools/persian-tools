---
name: addOrdinalSuffix
description: Append the Persian ordinal suffix to a Persian word so "سه" becomes "سوم", "دو" becomes "دوم", etc. Use when generating ordinal phrases ("نفر سوم", "صفحه پنجم") from cardinal Persian number words. Triggers on mentions of addOrdinalSuffix, Persian ordinal, "سوم/پنجم/سیزدهم", ordinal Farsi suffix.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# addOrdinalSuffix — append Persian ordinal suffix

```ts
import { addOrdinalSuffix } from "@persian-tools/persian-tools";
// CommonJS
const { addOrdinalSuffix } = require("@persian-tools/persian-tools");
```

## Public export

```ts
addOrdinalSuffix(number?: string): string
```

## Algorithm

Three rules applied in order (`src/modules/addOrdinalSuffix/addOrdinalSuffix.ts:9`):

1. If the input ends with `ی` → return `input + " اُم"` (with a leading space and standalone `اُم`).
2. If the input ends with `سه` → strip the trailing `سه` and append `سوم` (`سه` → `سوم`, `سی و سه` → `سی و سوم`).
3. Otherwise → append `م` (`دو` → `دوم`, `پنج` → `پنجم`).

```ts
import { addOrdinalSuffix } from "@persian-tools/persian-tools";

addOrdinalSuffix("سه");           // "سوم"
addOrdinalSuffix("دو");           // "دوم"
addOrdinalSuffix("پنج");          // "پنجم"
addOrdinalSuffix("سی و سه");     // "سی و سوم"
addOrdinalSuffix("یکصد");        // "یکصدم"
addOrdinalSuffix("سی");           // "سی اُم" (rule 1: ends with ی)
```

## Input rules

- Input must be a string. Otherwise throws:
  `TypeError("PersianTools: addOrdinalSuffix - The input must be string")`.
- Empty string `""` does **not** throw. It hits rule 3 and returns `"م"` (a single character). Validate non-emptiness upstream if that matters.
- `null` / `undefined` throw the TypeError (because they fail `isString`).

## When NOT to use directly

`numberToWords(n, { ordinal: true })` already calls `addOrdinalSuffix` internally. For end-user ordinal output starting from a number, prefer:

```ts
numberToWords(5, { ordinal: true });   // "پنجم"
// equivalent to
addOrdinalSuffix(numberToWords(5));    // "پنجم"
```

Use `addOrdinalSuffix` directly only when you already have a Persian-word cardinal and need the suffix applied.

## Coverage warning

The rule set is **simple and intentionally conservative**. Some idiomatic ordinals (e.g. `یک` → idiomatic `یکم`, not `یک اُم`) are not produced. The output is grammatical but may not match colloquial usage. For user-facing copy, confirm against your style guide.

## References

- Tests: `test/addOrdinalSuffix.spec.ts`
- Inverse: `removeOrdinalSuffix` skill
- Often used via: `numberToWords({ ordinal: true })` — see `numberToWords` skill
