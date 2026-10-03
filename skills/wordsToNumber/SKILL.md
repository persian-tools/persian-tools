---
name: wordsToNumber
description: Parse Persian number words ("سه هزار دویست و دوازده") into a number, with optional fuzzy typo correction and configurable output digit system. Use when parsing spoken/typed amounts, voice transcripts, or any free-form Persian numeric input. Triggers on mentions of wordsToNumber, parse Persian words, Farsi to number, fuzzy Persian number, "سه هزار" parsing.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# wordsToNumber — Persian words → number

```ts
import { wordsToNumber } from "@persian-tools/persian-tools";
// CommonJS
const { wordsToNumber } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
function wordsToNumber(words: string, config?: WordsToNumberOptions): string | number;

interface WordsToNumberOptions {
  digits?: "en" | "fa" | "ar";           // output digit system (default "en")
  addCommas?: boolean;                    // format result with thousands commas
  fuzzy?: boolean;                        // run typo correction via fastest-levenshtein
  autoConvertDigitsToEn?: boolean;        // normalize Persian/Arabic digits in input (default true)
  autoConvertArabicCharsToPersian?: boolean; // ي → ی, ك → ک before parsing (default true)
}
```

Function overloads narrow the return type:
- `addCommas: true` → returns `string`
- `digits: "fa" | "ar"` → returns `string`
- Otherwise → returns `number`
- Falsy input → returns `""` (string)

## Basic usage

```ts
import { wordsToNumber } from "@persian-tools/persian-tools";

wordsToNumber("سه هزار دویست و دوازده");      // 3212
wordsToNumber("دوازده هزار");                  // 12000
wordsToNumber("منفی یک میلیون");               // -1000000
wordsToNumber("");                              // ""
```

## Output formatting

```ts
wordsToNumber("دوازده هزار", { addCommas: true });  // "12,000"
wordsToNumber("دوازده هزار", { digits: "fa" });     // "۱۲۰۰۰"
wordsToNumber("دوازده هزار", { digits: "ar" });     // "١٢٠٠٠"
wordsToNumber("دوازده هزار", { digits: "fa", addCommas: true }); // "۱۲,۰۰۰"
```

## Fuzzy mode — typo correction

When `fuzzy: true`, common Persian misspellings are corrected via the `TYPO_LIST` table (`src/modules/wordsToNumber/constants.ts`) plus Levenshtein matching against the vocabulary.

```ts
wordsToNumber("یگصد و بنجاه هزار", { fuzzy: true });   // 150000
wordsToNumber("یگصد و بنجاه هزار");                     // would mis-parse without fuzzy
```

Use fuzzy mode sparingly — it makes the parse non-deterministic and slower. Good for voice-transcript input, bad for high-volume API endpoints with structured input.

## Auto-normalization (on by default)

- `autoConvertDigitsToEn: true` runs `autoConvertDigitsToEN` on the input first, so `"۱۲ هزار"` and `"١٢ هزار"` both work as if you typed `"12 هزار"`.
- `autoConvertArabicCharsToPersian: true` runs `autoArabicToPersian` so `"یكصد"` (with Arabic kaf) is corrected before lookup.

Disable these only if you have already normalized upstream and want to skip the work.

## Joiners and prefixes

Tokens are split on whitespace. The joiner `و` is filtered out (`src/modules/wordsToNumber/index.ts` `tokenize` helper). Number-prefix words (e.g. `منفی`) are handled via `PREFIXES`. Unknown tokens are silently skipped — the function tries to extract as much numeric meaning as it can rather than throwing.

```ts
wordsToNumber("یک هزار ناقص");           // 1000 — "ناقص" is unknown and skipped
wordsToNumber("نامعلوم");                  // 0 — no recognizable tokens
```

This is important to remember: **`wordsToNumber` rarely throws and rarely returns `null`.** A non-throwing return doesn't mean the input was clean. If you need strict validation, run the result back through `numberToWords` and compare.

## Common pitfalls

- **Output type depends on options.** Use the overloads to keep TypeScript inference correct, or cast at the call site:
  ```ts
  const n = wordsToNumber(input) as number;
  const s = wordsToNumber(input, { addCommas: true }) as string;
  ```
- **Empty/falsy input returns `""` (string), not `0` or `null`.** Different from many parsers — guard with a truthy check before doing math.
- **Silent token skipping** means you cannot use this to validate that input is *only* numeric words. Use a positive check (e.g. round-trip through `numberToWords`).
- **`digits: "persian"` does not exist.** Some older docs say so. The accepted values are `"en" | "fa" | "ar"`.

## References

- Tests: `test/wordsToNumber-fuzzy.spec.ts` plus inline cases in numberToWords spec
- Inverse: `numberToWords` skill
- Related: `moneyWordsToNumber` skill (currency-aware wrapper)
