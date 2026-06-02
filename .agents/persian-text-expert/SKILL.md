---
name: persian-text-expert
description: Domain knowledge for processing Persian (Farsi) text correctly inside the persian-tools codebase. Use whenever the work touches Persian or Arabic strings, half-space (ZWNJ), RTL direction, digit conversion, character normalization, or "looks Persian but isn't" bugs. Triggers on requests mentioning Farsi, Persian text, half-space, نیم‌فاصله, ZWNJ, Arabic vs Persian characters, ی vs ي, ک vs ك, digit conversion, ۰-۹, or RTL.
---

# Persian text — domain knowledge for persian-tools

This is the language-domain reference. Load it before writing code that *parses, validates, transforms, or pattern-matches* Persian or Arabic text.

## The Persian vs. Arabic trap

Persian uses the Arabic script *plus four extra letters* and *two letters that look identical to Arabic but have different code points*. Mixing them is the #1 source of bugs in this codebase.

| Persian | Arabic | Codepoint (Persian / Arabic) | Notes |
|---|---|---|---|
| `پ` | — | U+067E | Persian-only |
| `چ` | — | U+0686 | Persian-only |
| `ژ` | — | U+0698 | Persian-only |
| `گ` | — | U+06AF | Persian-only |
| `ی` | `ي` | U+06CC / U+064A | **Look identical, different bytes** |
| `ک` | `ك` | U+06A9 / U+0643 | **Look identical, different bytes** |

User input from Arabic keyboards almost always contains `ي`/`ك`. Normalize them before any equality check, regex match, or hash. The canonical helpers are:

- `autoArabicToPersian` from `src/modules/isPersian` — Arabic → Persian char fix
- `toPersianChars` from `src/modules/toPersianChars`
- `isPersian` / `isArabic` from `src/modules/isPersian` and `src/modules/isArabic` — script detection

## Digit systems — three of them

Three disjoint code-point ranges, all rendered as "0–9" in casual conversation:

| System | Glyph | Codepoint range | Constant in code |
|---|---|---|---|
| English (Latin) | 0123456789 | U+0030 – U+0039 | `enNums` |
| Persian (Farsi) | ۰۱۲۳۴۵۶۷۸۹ | U+06F0 – U+06F9 | `faNums` |
| Arabic-Indic | ٠١٢٣٤٥٦٧٨٩ | U+0660 – U+0669 | `arNums` |

Defined in `src/modules/digits/digits.constants.ts`. **Never** hand-roll digit conversion — go through these converters:

```ts
import {
  digitsEnToFa, digitsEnToAr,
  digitsFaToEn, digitsFaToAr,
  digitsArToEn, digitsArToFa,
  autoConvertDigitsToEN,           // handles both fa and ar → en
} from "@persian-tools/persian-tools";
```

`autoConvertDigitsToEN` is the right default when ingesting user input that may use any digit system (see `src/modules/digits/converters/auto.ts`).

## Half-space (ZWNJ) — U+200C

The Zero-Width Non-Joiner (`‌`, U+200C, also called نیم‌فاصله) is a **real character**, not whitespace. It separates word parts that should not visually join while keeping them in the same word. Examples:

- `می‌خواهم` (I want) — correct
- `میخواهم` — looks wrong, glyphs join together
- `می خواهم` — wrong, full space breaks the word

### Rules when handling ZWNJ

1. **Never strip ZWNJ implicitly.** Use `.trim()`, not `.replace(/\s/g, "")`.
2. Standard whitespace regexes (`\s`) *do* match U+200C in some engines; use `[ \t\n\r]` or explicit character classes when you need to preserve it.
3. To collapse multiple ZWNJ into one: `text.replace(/‌+/g, "‌")`.
4. To insert ZWNJ between Persian word parts according to grammar rules, use `halfSpace` from `src/modules/halfSpace` — do not re-implement.

The existing `halfSpace` implementation in `src/modules/halfSpace/index.ts` tokenizes by whitespace and applies prefix/suffix/compound rules (`utils.ts`) — study it before adding any ZWNJ-aware logic.

## RTL (right-to-left) considerations

Persian text is RTL but contains LTR runs (numbers, English words, URLs). The Unicode Bidirectional Algorithm handles rendering — your *code* should be RTL-agnostic. Two practical consequences:

- String indices are **logical**, not visual. `str[0]` is the first *typed* character, which renders on the right.
- Don't try to "reverse" Persian strings to right-align them — the renderer already does this.
- When emitting strings that mix Persian and Latin, you usually do **not** need explicit LRM/RLM marks; only add them if a test demonstrates a rendering bug.

## Character normalization — the project's standard recipe

When user input crosses a boundary (form field, file, API), normalize first:

```ts
import { autoArabicToPersian } from "@persian-tools/persian-tools";
import { autoConvertDigitsToEN } from "@persian-tools/persian-tools";

function normalize(input: string): string {
  return autoConvertDigitsToEN(autoArabicToPersian(input)).trim();
}
```

This is the same pipeline used by `src/moneyWordsToNumber/index.ts` when `autoConvertDigitsToEn` and `autoConvertArabicCharsToPersian` options are true (which is the default).

## Regex patterns you'll need

Defined and exported from `src/modules/digits/digits.constants.ts`:

```ts
export const enDigitsRegex: RegExp = /[0-9]/g;
export const faDigitsRegex: RegExp = /[۰۱۲۳۴۵۶۷۸۹]/g;
export const arDigitsRegex: RegExp = /[٠١٢٣٤٥٦٧٨٩]/g;
```

Persian/Arabic *letters* span roughly U+0600 – U+06FF, but using that range alone over-matches. Always prefer the dedicated detector functions in `src/modules/isPersian` and `src/modules/isArabic`.

## Iranian-specific data sources to reuse

Don't hardcode lists of provinces, banks, mobile prefixes, or ID prefixes. They already exist:

- Provinces and capitals: `src/modules/findCapitalByProvince/`, `src/modules/findProvinceFromCoordinate/`
- National ID prefixes per city: `src/modules/getPlaceByIranNationalId/`, with the prefix set at `src/modules/nationalId/index.ts:3`
- Bank codes (card number prefixes): `src/modules/getBankNameFromCardNumber/`
- IBAN/Sheba bank codes: `src/modules/sheba/codes.skip.ts`
- Mobile operator prefixes: `src/modules/phoneNumber/`
- License plate codes per province: `src/modules/numberplate/`

If a dataset you need *isn't* in this list, propose adding it under a `*.skip.ts` file — see the **bundle-size-guardian** skill for why the `.skip.ts` suffix matters.

## Common pitfalls (checklist before merging)

- [ ] Input normalization runs **before** any regex match or `.includes()`
- [ ] No raw `\s` regex on text that may contain ZWNJ
- [ ] Digit conversion uses the project's helpers, not `String.fromCharCode` math
- [ ] String comparisons either normalize first or document that they are byte-strict
- [ ] No `String.prototype.normalize("NFC")` calls — they shouldn't be needed here and have caused regressions in the past with combining marks

## References

- `.github/instructions/persian-language.instructions.md` — repo's high-level Persian guidance
- `src/modules/digits/` — digit conversion primitives
- `src/modules/isPersian/` and `src/modules/isArabic/` — script detection
- `src/modules/halfSpace/` — ZWNJ insertion rules
- `src/modules/toPersianChars/` — character normalization
- Unicode reference: https://www.unicode.org/charts/PDF/U0600.pdf (Arabic block, contains Persian extensions)
