---
name: verifyCardNumber
description: Validate Iranian bank debit/credit card numbers (16 digits) using both the Luhn checksum and the Iranian BIN prefix list. Use when validating card-number entry in payment forms, or pre-flighting before calling a PSP. Triggers on requests mentioning verifyCardNumber, Iranian card validation, شماره کارت, Luhn check, BIN check.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# verifyCardNumber — Iranian card-number validation

```ts
import { verifyCardNumber } from "@persian-tools/persian-tools";
// CommonJS
const { verifyCardNumber } = require("@persian-tools/persian-tools");
```

## Public export

```ts
verifyCardNumber(digits: number | string): boolean | undefined
```

## Behaviour

```ts
import { verifyCardNumber } from "@persian-tools/persian-tools";

verifyCardNumber("6037701689095443");     // true
verifyCardNumber("6037 7016 8909 5443");   // true (whitespace stripped first)
verifyCardNumber(6037701689095443);        // true (number accepted)
verifyCardNumber("4111111111111111");      // false (Luhn-valid but non-Iranian BIN)
verifyCardNumber("0000000000000000");      // false (all-zero middle blocks)
verifyCardNumber(null as any);             // undefined
```

## Algorithm — two-stage validation

1. **Falsy → `undefined`.** Truthy check before anything else.
2. **Whitespace strip + format check.** `String(input).replace(/\s/g, "").trim()` must match `/^\d{16}$/`. Anything else → `false`.
3. **All-zero sub-block check.** Reject if `digits.slice(1,11)` is all zero, OR `digits.slice(10,16)` is all zero.
4. **BIN check.** The 6-digit BIN prefix (`slice(0,6)`) must be in `iranianBankPrefixes` (`src/modules/verifyCardNumber/constants.ts`). Non-Iranian Luhn-valid cards (e.g. test Visa numbers like `4111...`) are rejected here.
5. **Luhn checksum.** Standard mod-10, doubling every second digit from the right; if doubled > 9 subtract 9. Sum % 10 must equal 0.

## Quirks

- **Persian/Arabic digit input is NOT normalized.** `"۶۰۳۷۷۰۱۶۸۹۰۹۵۴۴۳"` fails the `/^\d{16}$/` step → `false`. Run `autoConvertDigitsToEN` first if input may contain them.
- **Return type is `boolean | undefined`.** `undefined` for falsy input, `boolean` after the algorithm runs. Use `=== true`, not truthy-check.
- **Non-Iranian cards are rejected even if Luhn-valid.** This is intentional. If you need *generic* Luhn validation (not BIN-gated), use a third-party Luhn library — `verifyCardNumber` is specifically Iranian.

## Companion functions

For richer card workflows in the same family:

- **`getBankNameFromCardNumber`** — given a card number, return the issuing bank's Persian name. See its skill.
- **`extractCardNumber`** — pull card numbers out of free-text input. See `extractCardNumbers` skill.

## Pipeline for free-text input

```ts
import {
  autoConvertDigitsToEN,
  verifyCardNumber,
  getBankNameFromCardNumber,
} from "@persian-tools/persian-tools";

const check = (raw: string) => {
  const norm = autoConvertDigitsToEN(raw.trim());
  const valid = verifyCardNumber(norm) === true;
  return { valid, bank: valid ? getBankNameFromCardNumber(norm) : null };
};
```

## Common pitfalls

- **Adding new BINs**: edit `iranianBankPrefixes` AND `getBankNameFromCardNumber`'s `cardBank` table together. Out-of-sync tables are a recurring source of "validator accepts the card but lookup says unknown bank" bugs.
- **For test fixtures**, generate cards by combining a known BIN (from `iranianBankPrefixes`) with a Luhn-valid tail. Don't paste real card numbers.

## References

- Tests: `test/verifyCardNumber.spec.ts`
- Related: `getBankNameFromCardNumber`, `extractCardNumbers` skills
- Algorithm: standard Luhn (mod-10) + Iranian BIN whitelist
