---
name: digits
description: Convert digits between Persian (۰-۹), Arabic-Indic (٠-٩), and English (0-9) numeral systems. Use when normalizing user input that may contain mixed numeral systems, formatting numbers for Persian/Arabic display, or pattern-matching numeric content. Triggers on requests mentioning Persian digits, Farsi numbers, Arabic-Indic digits, digit conversion, autoConvert, ۰-۹, ٠-٩, faToEn, enToFa, arToFa, or normalizing numeric strings.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# digits — Persian/Arabic/English numeral conversion

```ts
import {
  digitsEnToFa,
  digitsEnToAr,
  digitsFaToEn,
  digitsFaToAr,
  digitsArToEn,
  digitsArToFa,
  autoConvertDigitsToEN,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  digitsEnToFa,
  digitsEnToAr,
  digitsFaToEn,
  digitsFaToAr,
  digitsArToEn,
  digitsArToFa,
  autoConvertDigitsToEN,
} = require("@persian-tools/persian-tools");
```

## What this module exports

```ts
// Converters
digitsEnToFa(value: string | number): string
digitsEnToAr(value: string | number): string
digitsFaToEn(value: string): string
digitsFaToAr(value: string): string
digitsArToEn(value: string): string
digitsArToFa(value: string): string

// Auto-converter — accepts mixed Persian + Arabic, normalizes to English
autoConvertDigitsToEN(value: string): string

// Constants
enNums: string[]              // ["0".."9"]
faNums: string[]              // ["۰".."۹"]
arNums: string[]              // ["٠".."٩"]
enDigitsRegex: RegExp         // /[0-9]/g
faDigitsRegex: RegExp         // /[۰۱۲۳۴۵۶۷۸۹]/g
arDigitsRegex: RegExp         // /[٠١٢٣٤٥٦٧٨٩]/g

// Types
type DigitsConverter<I = string, O = string> = (value: I) => O
```

## The three numeral systems

| System | Sample | Unicode range |
|---|---|---|
| English | `0123456789` | U+0030 – U+0039 |
| Persian (Farsi) | `۰۱۲۳۴۵۶۷۸۹` | U+06F0 – U+06F9 |
| Arabic-Indic | `٠١٢٣٤٥٦٧٨٩` | U+0660 – U+0669 |

These are three *disjoint* code-point ranges. Persian digits ≠ Arabic-Indic digits even though casual users often use the terms interchangeably.

## Pick the right function

```ts
import { digitsEnToFa, digitsFaToEn, autoConvertDigitsToEN } from "@persian-tools/persian-tools";

digitsEnToFa("Card 1234");            // "Card ۱۲۳۴"
digitsEnToFa(2025);                   // "۲۰۲۵"
digitsFaToEn("شماره ۰۹۱۲");          // "شماره 0912"
digitsArToFa("٧٨٩");                  // "۷۸۹"

// When input may contain BOTH Persian and Arabic digits — most user input
autoConvertDigitsToEN("تماس ۰۹۱۲ یا ٠٩١٣");  // "تماس 0912 یا 0913"
```

Use **`autoConvertDigitsToEN`** as the default when ingesting unknown user input (form field, copy-paste, OCR). It runs `digitsArToEn` then `digitsFaToEn` and is the helper that every higher-level validator in this library uses internally.

## Inputs and errors

- `digitsEnToFa` and `digitsEnToAr` accept `string | number`. Anything else throws:
  `TypeError("PersianTools: digitsEnToFa - The input must be string or number")`.
- `digitsFaToEn`, `digitsFaToAr`, `digitsArToEn`, `digitsArToFa` accept `string`. Anything else throws:
  `TypeError("PersianTools: <fn> - The input must be string")`.
- `autoConvertDigitsToEN` falsy input is returned as-is (does not throw); see `src/modules/digits/converters/auto.ts:9`.

## Edge cases

| Input | Output | Note |
|---|---|---|
| `""` | `""` | Empty string is preserved |
| `"123۴۵۶"` | `digitsEnToFa → "۱۲۳۴۵۶"` | Only English digits are converted; existing Persian digits pass through unchanged |
| `"89١٢٣4٥"` | `digitsArToEn → "8912345"` | Only Arabic digits are converted |
| Mixed Persian/Arabic | `autoConvertDigitsToEN → all English` | Use auto-converter |

## Common pitfalls

- **Hand-rolling conversion with `String.fromCharCode` math is fragile** — Arabic digits and Persian digits live in different code-point ranges, and a single off-by-one will corrupt them. Always use the dedicated converter.
- **Don't run `digitsFaToEn` on text that may contain Arabic digits** — Arabic digits will be left untouched and downstream regex matches will silently miss them. Use `autoConvertDigitsToEN` when in doubt.
- **`digitsEnToFa(0)` returns `"۰"`, not `"0"`** — the function returns a string, never a number.

## When to reach for the constants

If you need to build a custom regex that matches Persian or Arabic digits as part of a larger pattern, import `faDigitsRegex` / `arDigitsRegex` / `enDigitsRegex` (or the raw `faNums` / `arNums` / `enNums` arrays) — don't re-declare the character classes inline.

```ts
import { faDigitsRegex } from "@persian-tools/persian-tools";

const phoneStartsWithPersian = (s: string) => faDigitsRegex.test(s.slice(0, 4));
```

## References

- Tests: `test/digits.spec.ts`
- Persian/Arabic context: `.agents/persian-text-expert/SKILL.md`
