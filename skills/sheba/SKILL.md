---
name: sheba
description: Validate and parse Iranian Sheba codes (IBAN — "IR" + 24 digits) and resolve them to bank info plus, for many banks, the underlying account number. Use when validating IBAN entry in wire-transfer forms, displaying bank name from an IBAN, or extracting account number for legacy systems. Triggers on mentions of sheba, شبا, IBAN, isShebaValid, getShebaInfo, Iranian IBAN, bank from IBAN.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# sheba — Iranian IBAN (Sheba) validation & info lookup

```ts
import { isShebaValid, getShebaInfo } from "@persian-tools/persian-tools";
// CommonJS
const { isShebaValid, getShebaInfo } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
isShebaValid(shebaCode: string): boolean
getShebaInfo(shebaCode: string): ShebaResultWithAccountNumber | ShebaResultWithoutAccountNumber | null

const shebaPattern: RegExp;       // /IR[0-9]{24}/
const shebaPatternCode: RegExp;   // /IR[0-9]{2}([0-9]{3})[0-9]{19}/

type ShebaResultWithAccountNumber = {
  name: string;
  nickname: string;
  persianName: string;
  code: string;
  accountNumberAvailable: true;
  accountNumber: string;
  formattedAccountNumber: string;
};
type ShebaResultWithoutAccountNumber = {
  name: string;
  nickname: string;
  persianName: string;
  code: string;
  accountNumberAvailable: false;
};
```

> The valid function is **`isShebaValid`**, not `verifySheba`. The latter does not exist.

## Basic usage

```ts
import { isShebaValid, getShebaInfo } from "@persian-tools/persian-tools";

isShebaValid("IR820540102680020817909002");   // true
isShebaValid("IR82054010268002081790900X");   // false (non-digit)

getShebaInfo("IR820540102680020817909002");
// {
//   name: "Parsian Bank",
//   nickname: "parsian",
//   persianName: "بانک پارسیان",
//   code: "054",
//   accountNumberAvailable: true,
//   accountNumber: "020817909002",
//   formattedAccountNumber: "020-8179-090-02",
// }

getShebaInfo("IR000000000000000000000000");   // null (invalid)
```

## Validation algorithm (ISO 7064 mod-97)

1. Match the regex `/IR[0-9]{24}/`.
2. Move first 4 chars (`IR` + 2-digit check) to the end.
3. Replace letters with digits: `I=18`, `R=27` (so `IR` → `1827`).
4. Compute `mod 97`. Because the result is a 26-digit number too big for `Number`, the helper `shebaIso7064Mod97` (`src/modules/sheba/helpers.ts`) chunks 9 digits at a time:
   ```ts
   while (remainder.length > 2) {
     block = remainder.slice(0, 9);
     remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
   }
   return parseInt(remainder, 10) % 97;
   ```
5. Valid iff the result === 1.

This 9-digit chunking is **intentional** — it avoids needing `BigInt` (which would add polyfill weight on older browsers). Do not "simplify" it to `BigInt(...) % 97n`.

## Bank info lookup

After validation, the 3-digit bank code (positions 4–6, after `IR` + 2 check digits) is extracted via `shebaPatternCode` and looked up in `shebaMapCodesMap` (from `codes.skip.ts`).

Some bank entries include a `process(iban: string)` function that extracts the account number. When present, the result type is `ShebaResultWithAccountNumber` with `accountNumberAvailable: true`; otherwise `ShebaResultWithoutAccountNumber` with `accountNumberAvailable: false`.

Discriminate via the flag:

```ts
const info = getShebaInfo(input);
if (!info) return notify("invalid IBAN");
if (info.accountNumberAvailable) {
  use(info.accountNumber);    // typed string
} else {
  use(info.persianName);      // bank name only
}
```

## Common pitfalls

- **`verifySheba` does NOT exist.** The exported validator is `isShebaValid`.
- **`getShebaInfo` returns the bank's *Persian* name as `persianName`**, not `bankName`. There is no `bankName` field. Older docs are wrong.
- **No automatic whitespace stripping.** `isShebaValid("IR82 0540 ...")` returns `false`. Strip spaces in the caller, or use a small wrapper:
  ```ts
  const clean = (s: string) => s.replace(/\s/g, "").toUpperCase();
  isShebaValid(clean(userInput));
  ```
- **No Persian/Arabic digit normalization.** Run `autoConvertDigitsToEN` upstream if input may contain them.
- **`accountNumberAvailable` is a real discriminant** — use it in `if` to narrow the union.

## References

- Tests: `test/sheba.spec.ts`
- Standard: ISO 13616 (IBAN), ISO 7064 (mod-97 checksum)
- Related: `iranian-validation-expert` in `.agents/`
