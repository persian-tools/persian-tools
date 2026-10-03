---
name: moneyWordsToNumber
description: Parse Persian money phrases ("یک میلیون تومان", "دو هزار ریال", "سه تومن" colloquial) into a number, with toman/rial unit detection and optional cross-currency conversion. Use when parsing user-typed prices, voice/chat input for money amounts, or invoice OCR results. Triggers on mentions of moneyWordsToNumber, rialsWordsToNumber, tomansWordsToNumber, پارس پول, money words, toman, rial, تومان, ریال, قیمت به حروف.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# moneyWordsToNumber — Persian money phrase → number

```ts
import {
  moneyWordsToNumber,
  rialsWordsToNumber,
  tomansWordsToNumber,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  moneyWordsToNumber,
  rialsWordsToNumber,
  tomansWordsToNumber,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
moneyWordsToNumber(moneyWords: string, options?: MoneyWordsToNumberOptions): number
rialsWordsToNumber(rialsWords: string, options?: Omit<MoneyWordsToNumberOptions, "from">): number
tomansWordsToNumber(tomansWords: string, options?: Omit<MoneyWordsToNumberOptions, "from">): number

interface MoneyWordsToNumberOptions {
  formal?: boolean;                          // default false — colloquial mode
  from?: "toman" | "rial";                   // default: auto-detected
  to?: "toman" | "rial";                     // default: same as `from`
  fuzzy?: boolean;                            // default false
  autoConvertDigitsToEn?: boolean;            // default true
  autoConvertArabicCharsToPersian?: boolean; // default true
}
```

## Formal vs. colloquial — the key distinction

Iranian colloquial Persian routinely uses "تومن" (or "تومان") with an *implicit* thousand-multiplier when the leading number is small. Example:

| Phrase | Formal | Colloquial |
|---|---|---|
| `"یک تومان"` | `1` | `1` |
| `"یک تومن"` | `1` | **`1000`** — implicit ×1000 |
| `"دویست تومن"` | `200` | **`200000`** |
| `"دو هزار تومن"` | `2000` | `2000` (no multiplier when number ≥ 1000) |

Use `{ formal: true }` for invoice-text parsing where the user definitely meant `1 تومان`. Default (`formal: false`) is correct for chat / voice transcription where colloquial usage dominates.

## Basic usage

```ts
import { moneyWordsToNumber } from "@persian-tools/persian-tools";

moneyWordsToNumber("یک میلیون تومان");                  // 1_000_000
moneyWordsToNumber("دو هزار ریال");                      // 2000
moneyWordsToNumber("سه تومن");                            // 3000 (colloquial multiplier)
moneyWordsToNumber("سه تومن", { formal: true });          // 3 (literal)
```

## Cross-currency conversion

```ts
// 1 toman = 10 rials
moneyWordsToNumber("صد تومان", { from: "toman", to: "rial" });    // 1000
moneyWordsToNumber("ده هزار ریال", { from: "rial", to: "toman" }); // 1000
```

Conversion happens after the words are parsed into a base number.

## Convenience wrappers

`rialsWordsToNumber` and `tomansWordsToNumber` hard-code the `from` unit so you can omit it:

```ts
rialsWordsToNumber("یک میلیون ریال");          // 1_000_000
tomansWordsToNumber("یک میلیون تومان");        // 1_000_000
```

## Auto-normalization (on by default)

- `autoConvertDigitsToEn: true` — runs `autoConvertDigitsToEN` first so input may use Persian or Arabic digits.
- `autoConvertArabicCharsToPersian: true` — runs `autoArabicToPersian` first so Arabic-keyboarded `ك`/`ي` are corrected.

Both default to `true`; disable only if your input is already normalized and you want to skip the work.

## Fuzzy mode

`{ fuzzy: true }` enables typo correction (delegates to `wordsToNumber`'s fuzzy machinery). Useful for voice-transcript input; keep off for high-throughput structured input.

## Pipeline

Internally:
1. Optional digit + character normalization.
2. Detect currency unit from the text (`from`) if not provided.
3. Strip currency keywords (`تومان`, `تومن`, `ریال`, ...).
4. Parse the remaining words with `wordsToNumber`.
5. Apply colloquial multiplier if `!formal` AND the parsed number is < 1000.
6. Convert `from → to` if they differ.

## Common pitfalls

- **The default is colloquial** (`formal: false`). For invoice/legal text, set `formal: true`.
- **Numbers ≥ 1000 are not multiplied** in colloquial mode. `"دو هزار تومن"` is `2000`, not `2,000,000`. This matches how speakers actually use the phrase.
- **The colloquial multiplier is always ×1000**, not ×100 or ×10000. It's an *implicit* thousand-toman shorthand.
- **Output is always a `number`.** No `addCommas` / `digits` options here — for formatted output, combine with `addCommas` afterward.
- **Mixed currency phrases** like `"یک تومان و ده ریال"` aren't supported — pick a single unit per call.

## References

- Tests: `test/moneyWordsToNumber.spec.ts`
- Related: `wordsToNumber` skill (the underlying parser), `commas` (for output formatting)
