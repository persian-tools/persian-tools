---
name: getBankNameFromCardNumber
description: Resolve the issuing Iranian bank's Persian name from a card number by looking up its 6-digit BIN prefix. Use when displaying "Card from بانک سامان" next to a captured card number. Triggers on mentions of getBankNameFromCardNumber, bank from card, BIN lookup, نام بانک از شماره کارت.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# getBankNameFromCardNumber — bank name from card BIN

```ts
import { getBankNameFromCardNumber } from "@persian-tools/persian-tools";
// CommonJS
const { getBankNameFromCardNumber } = require("@persian-tools/persian-tools");
```

## Public export

```ts
getBankNameFromCardNumber(digits?: number | string): string | null | undefined

interface IBank {
  code: string;
  name: string;
}
```

## Behaviour

```ts
import { getBankNameFromCardNumber } from "@persian-tools/persian-tools";

getBankNameFromCardNumber("6219861034529007");   // "بانک سامان"
getBankNameFromCardNumber("603799");              // "بانک ملی ایران" — accepts BIN-only (≥ 6 digits)
getBankNameFromCardNumber("123");                 // null — too short
getBankNameFromCardNumber("9999999999999999");    // null — BIN not in cardBank table
getBankNameFromCardNumber(undefined);             // undefined
```

## Algorithm

1. Falsy input → `undefined`.
2. Stringified length must be in `[6, 16]`. Outside that range → `null`.
3. Take the leading 6 characters as the BIN.
4. Look up `cardBank[bin]` from the data table (`src/modules/getBankNameFromCardNumber/banksCode.skip.ts`).
5. Return the bank's Persian name or `null` if the BIN isn't mapped.

## Return-type triple

- **`undefined`** = falsy input, we didn't even try.
- **`null`** = ran the lookup, BIN unknown or wrong length.
- **`string`** = bank's Persian name.

Use `=== "string"` or an explicit null/undefined check; don't truthy-test alone.

## Quirks

- **Does NOT validate the card.** It only inspects the BIN. A garbage tail (e.g. `"603799 garbage"`) doesn't matter as long as the leading 6 chars match a known BIN AND total length ∈ [6, 16].
- **Persian/Arabic digit input is NOT normalized.** Lookup is keyed by English-digit string. Pre-normalize with `autoConvertDigitsToEN` if needed.
- **The data table is stored under `banksCode.skip.ts`** (the `.skip` suffix marks it as a heavy data file — see the `bundle-size-guardian` skill in `.agents/`).

## Adding a new bank

1. Add its BIN entries to `cardBank` in `banksCode.skip.ts`.
2. Add the same BIN(s) to `iranianBankPrefixes` in `src/modules/verifyCardNumber/constants.ts` so `verifyCardNumber` accepts cards from the new issuer.
3. Add a test case in `test/getBankNameFromCardNumber.spec.ts` and `test/verifyCardNumber.spec.ts`.

## References

- Tests: `test/getBankNameFromCardNumber.spec.ts`
- Related: `verifyCardNumber` skill (validates), `extractCardNumbers` skill (extracts from free text)
