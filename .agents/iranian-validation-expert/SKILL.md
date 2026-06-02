---
name: iranian-validation-expert
description: Validate, parse, or generate Iranian identity and financial identifiers — National ID (کد ملی), Legal ID (شناسه ملی حقوقی), Sheba/IBAN, debit card number, bill ID/payment ID, mobile and landline phone numbers, license plates. Use whenever the user asks to "verify a card number", "validate national id", "check sheba", "parse iban", "bill validation", "generate a fake national id for tests", or otherwise touches Iranian identifier checksums and the data tables behind them.
---

# Iranian identifier validation — algorithms and rules

Every checksum below is **already implemented** in this repo. The first job of this skill is to make sure agents *reuse* the existing function instead of re-implementing it (and re-introducing the bugs we already fixed). The second job is to document the algorithm so changes to the existing code are made with full understanding.

## Quick lookup — which function for which identifier?

| Identifier | Verifier | Generator / Parser | Source |
|---|---|---|---|
| National ID (کد ملی, 10 digits) | `verifyIranianNationalId` | `getPlaceByIranNationalId`, plus `create-national-id` helpers | `src/modules/nationalId/`, `src/modules/getPlaceByIranNationalId/` |
| Legal ID (شناسه ملی, 11 digits) | `verifyIranianLegalId` | — | `src/modules/legalId/` |
| Card number (16 digits) | `verifyCardNumber` | `extractCardNumbers`, `getBankNameFromCardNumber` | `src/modules/verifyCardNumber/`, `src/modules/extractCardNumbers/`, `src/modules/getBankNameFromCardNumber/` |
| Sheba / IBAN (`IR` + 24 digits) | `isShebaValid`, `getShebaInfo` | `shebaPattern`, `shebaPatternCode` | `src/modules/sheba/` |
| Bill ID + payment ID | `Bill` class | — | `src/modules/bill/` |
| Mobile number | `phoneNumberValidator` and friends | `getPhoneNumberPrefix`, `getPhoneNumberDetail` | `src/modules/phoneNumber/` |
| Plate number | `numberPlate` | — | `src/modules/numberplate/` |
| Bank-code regex | `banksRegex` constants | — | `src/modules/banksRegex/` |

## 1. National ID (کد ملی) — 10 digits

The standard 10-digit code with a check digit. The implementation lives at `src/modules/nationalId/index.ts`.

### Algorithm
1. Reject if length ≠ 10 or non-numeric.
2. Reject if all digits are identical (e.g. `1111111111`) — covered by `invalidNationalIdSequences`.
3. Optionally reject if the 3-digit prefix is not in `validNationalIdPrefixes` (a city-code prefix list). This is *strict mode*; the default in `verifyIranianNationalId` exposes an option for it.
4. Compute the check digit:
   ```
   sum = Σ digits[i] * (10 - i)  for i in 0..8
   r   = sum mod 11
   expected = r < 2 ? r : 11 - r
   valid = digits[9] === expected
   ```

### Pitfalls
- The check-digit math is **dead simple but easy to invert by mistake** — note the `< 2 ? r : 11 - r` branch.
- `getPlaceByIranNationalId` resolves the 3-digit prefix to a city/province via the data in the same module. Don't add cities by editing tests — add them to the constants and the look-up will pick them up.
- For test fixtures, prefer `create-national-id.ts` helpers over hand-typed IDs so the check digits stay consistent.

## 2. Legal ID (شناسه ملی حقوقی) — 11 digits

Different algorithm from the National ID. Reference implementation at `src/modules/legalId/index.ts`.

### Algorithm
1. Length must be ≥ 11.
2. The middle 6 digits (indices 3..9) cannot all be zero.
3. Let `d = digit[9] + 2` and the coefficient vector `z = [29, 27, 23, 19, 17]`.
4. `sum = Σ (d + digit[i]) * z[i mod 5]  for i in 0..9`
5. `sum = sum mod 11`; if `sum === 10` then `sum = 0`.
6. Valid iff `digit[10] === sum`.

### Pitfalls
- Note the iteration uses the **first 10 digits** to compute the check digit at position 10, not the conventional reverse-direction Luhn pass. This catches `0` mistakes that pass naive validators.
- The coefficient vector cycles with period 5 (`z[i % 5]`).

## 3. Card number (16 digits) — Luhn + Iranian prefix

Implementation at `src/modules/verifyCardNumber/index.ts`. Validation is **two-stage**:

### Algorithm
1. Strip whitespace, must match `/^\d{16}$/`.
2. Reject if the middle 10 digits or last 6 digits are all zero (`slice(1,11)` and `slice(10,16)`).
3. The 6-digit BIN prefix (`slice(0,6)`) must be in `iranianBankPrefixes` (set in `constants.ts`).
4. Apply the Luhn algorithm right-to-left, doubling every second digit; if doubled digit > 9, subtract 9. Sum must be divisible by 10.

### Pitfalls
- A card that passes Luhn but starts with a non-Iranian BIN is rejected — this is intentional. Don't relax it without a corresponding test.
- New Iranian banks ship new BIN ranges occasionally. Update `iranianBankPrefixes` (and `getBankNameFromCardNumber`) together so the verifier and the lookup stay in sync.
- For test fixtures, use the prefixes already present in `constants.ts` then complete with a valid Luhn check digit.

## 4. Sheba / IBAN (`IR` + 24 digits)

Implementation at `src/modules/sheba/index.ts`. Iran uses standard ISO 13616 (IBAN) with country code `IR`.

### Algorithm — ISO 7064 mod 97
1. Pattern check: matches `/IR[0-9]{24}/` (`shebaPattern`).
2. Move the first 4 characters (`IR` + 2-digit check) to the end.
3. Replace letters with digits: `I`=18, `R`=27. So `IR` → `1827`.
4. Compute `mod 97` on the resulting (very long) number. The repo's helper `shebaIso7064Mod97` (`src/modules/sheba/helpers.ts`) processes the string 9 digits at a time to avoid BigInt overflow:
   ```ts
   while (remainder.length > 2) {
     block = remainder.slice(0, 9);
     remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
   }
   return parseInt(remainder, 10) % 97;
   ```
5. Valid iff result === 1.

### Bank lookup from Sheba
The 3-digit bank code lives at positions 4-6 (after `IR` + 2 check digits). Use `shebaPatternCode` (`/IR[0-9]{2}([0-9]{3})[0-9]{19}/`) to extract it, then look it up in `shebaMapCodesMap` from `codes.skip.ts`. Some banks define a `process()` function that extracts the account number from the IBAN — see `ShebaResultWithAccountNumber` vs `ShebaResultWithoutAccountNumber`.

### Pitfalls
- **Do not** use BigInt for mod 97 — the chunked approach is faster and avoids polyfill weight for browsers.
- IBAN canonicalization: input may have spaces (`IR12 3456 ...`). Strip them before validation. `isShebaValid` does this; don't pre-strip in callers.

## 5. Bill (قبض)

The `Bill` class at `src/modules/bill/index.ts` handles Iranian utility bills — bill ID + payment ID pair with their own check digit and a type code embedded in the bill ID. Use the class API; never reimplement the math. The `BillTypes` union and `BillResult` shape are the public contract.

## 6. Mobile / landline phone numbers

`src/modules/phoneNumber/` has:
- `phoneNumberValidator` — accepts `+98`, `0098`, `0`, or bare prefix
- `getPhoneNumberPrefix` — returns the 4-digit operator prefix (e.g. `0912`)
- `getPhoneNumberDetail` — returns operator name + type (permanent/credit) using the dataset in the module

When normalizing user input, run `autoConvertDigitsToEN` first (see **persian-text-expert**) — otherwise `۰۹۱۲...` fails the regex.

## 7. License plate

`src/modules/numberplate/` parses Iranian civilian and government plates, mapping the Persian letter (e.g. `ج`, `پ`, `الف`) and the trailing 2-digit province code to a category and city. Source-of-truth data: the module's constants — don't hardcode mappings elsewhere.

## Cross-cutting guidance

### Always accept multiple input shapes for user-facing validators
Most validators in this codebase accept `string | number`, normalize digits, strip whitespace, then run the algorithm. Mirror that pattern — *do not* require pre-normalized input from the caller.

### Return-type convention
- `boolean | undefined` for verifiers that distinguish "invalid" from "couldn't even attempt" — e.g. `verifyCardNumber` returns `undefined` for falsy input, `false` for malformed.
- `null` (not `undefined`) for parsers that found no match — e.g. `getShebaInfo` returns `null`.
- Discriminated unions for richer results — see `ShebaResultWithAccountNumber | ShebaResultWithoutAccountNumber`.

### Adding a new validator
1. Confirm the official algorithm against an authoritative source (linked in JSDoc — see how `legalId/index.ts:6` links to `aliarash.com`).
2. Cover at least: empty/null, wrong length, all-zeros, all-same-digit, one-off check digit, valid known sample.
3. If the validator depends on a dataset, put it in `*.skip.ts` (see **bundle-size-guardian**).

### Test fixture safety
- Use synthetic IDs that pass the checksum. **Never** commit real personal data.
- The repo's existing tests (e.g. `test/verifyIranianNationalId.spec.ts`) use safe synthetic values — copy that style.

## References

- `src/modules/nationalId/`, `src/modules/getPlaceByIranNationalId/`
- `src/modules/legalId/`
- `src/modules/verifyCardNumber/`, `src/modules/extractCardNumbers/`, `src/modules/getBankNameFromCardNumber/`
- `src/modules/sheba/` (with `helpers.ts` for the mod-97 trick and `codes.skip.ts` for bank table)
- `src/modules/bill/`
- `src/modules/phoneNumber/`
- `src/modules/numberplate/`
- External: ISO 13616 (IBAN), ISO 7064 (mod 97 check), Iranian Central Bank BIN list
