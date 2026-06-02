---
name: removeOrdinalSuffix
description: Strip Persian ordinal endings (مین, ام, اُم, م, plus irregular forms like سوم → سه, یازدهم → یازده) from a Persian word, leaving the cardinal form. Use when canonicalizing user-typed ordinals before lookup or comparison. Triggers on mentions of removeOrdinalSuffix, strip Persian ordinal, "سوم → سه", "یازدهم → یازده", canonical Persian number word.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# removeOrdinalSuffix — strip Persian ordinal suffix

```ts
import { removeOrdinalSuffix } from "@persian-tools/persian-tools";
// CommonJS
const { removeOrdinalSuffix } = require("@persian-tools/persian-tools");
```

## Public export

```ts
removeOrdinalSuffix(word: string): string
```

## What it does

1. Falsy input is returned as-is (no throw, no `""` coercion).
2. Generic suffixes are removed: `مین`, `ام`, ` اُم` (note the leading space for the standalone `اُم` form).
3. A table of *irregular* ordinals is applied (longest matches first) — e.g. `سوم → سه`, `یکم → یک`, `یازدهم → یازده`, `دوازدهم → دوازده`, etc. See `src/modules/removeOrdinalSuffix/index.ts` for the full list.

```ts
import { removeOrdinalSuffix } from "@persian-tools/persian-tools";

removeOrdinalSuffix("سوم");           // "سه"
removeOrdinalSuffix("یازدهم");        // "یازده"
removeOrdinalSuffix("بیستم");         // "بیست"
removeOrdinalSuffix("سیزدهمین");      // "سیزده"
removeOrdinalSuffix("سه هزارم");      // "سه هزار"
removeOrdinalSuffix("چهاردهمین");     // "چهارده"
```

## Input rules

- Accepts `string`. Does **not** throw on `null`/`undefined`/`""`; they pass through unchanged.
- Does **not** normalize Arabic-typed characters (`ي`, `ك`). Run `autoArabicToPersian` upstream if input may originate from an Arabic keyboard, otherwise irregular-form matches will miss.

## What it does NOT recognize

- **`اول` → `یک`** is NOT a built-in mapping. `removeOrdinalSuffix("اول")` returns `"اول"` unchanged. The function only handles forms produced by `addOrdinalSuffix` plus the suffix-addition pattern; older idiomatic ordinals like `اول`/`اولی` are out of scope.
- **Latin-numeric ordinals** like `"1st"`, `"3rd"` are out of scope (return unchanged).

## Common use case — canonicalising user input for lookup

```ts
import { removeOrdinalSuffix, wordsToNumber } from "@persian-tools/persian-tools";

const numericValue = (s: string) => wordsToNumber(removeOrdinalSuffix(s));

numericValue("سومین نفر");   // wordsToNumber("سه نفر") drops "نفر" silently → 3
numericValue("بیستم");        // wordsToNumber("بیست") → 20
```

## References

- Tests: `test/removeOrdinalSuffix.spec.ts`
- Inverse: `addOrdinalSuffix` skill
