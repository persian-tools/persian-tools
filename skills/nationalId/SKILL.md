---
name: nationalId
description: Validate and generate Iranian National IDs (کد ملی, 10-digit). Use when verifying a user's submitted National ID, generating valid synthetic IDs for tests/fixtures, or checking whether a 3-digit prefix corresponds to a registered city. Triggers on requests mentioning national id, کد ملی, verifyIranianNationalId, createIranianNationalId, کد ملی validation, or Iranian identity number.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# nationalId — Iranian National ID validation & generation

```ts
import {
  verifyIranianNationalId,
  createIranianNationalId,
  createIranianNationalIdDetailed,
  validateNationalIdChecksum,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  verifyIranianNationalId,
  createIranianNationalId,
  createIranianNationalIdDetailed,
  validateNationalIdChecksum,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
// Validation
verifyIranianNationalId(
  nationalId: string | number | undefined,
  options?: VerifyIranianNationalIdOptions,
): boolean | undefined

interface VerifyIranianNationalIdOptions {
  checkPrefix?: boolean;   // default true — also validate 3-digit city prefix
}

// Data
validNationalIdPrefixes: Set<string>      // ~600 valid 3-digit city codes
invalidNationalIdSequences: Set<string>   // codes that pass the checksum but are reserved

// Generation
createIranianNationalId(opts?: NationalIdGenerationOptions): string
createIranianNationalIdDetailed(opts?: NationalIdGenerationOptions): NationalIdGenerationResult
createIranianRoundNationalId(opts?: NationalIdGenerationOptions): string
isValidNationalIdFormat(value: string): boolean
validateNationalIdChecksum(value: string): boolean

interface NationalIdGenerationOptions {
  preventRepeatedDigits?: boolean;
  maxRetries?: number;
  randomGenerator?: () => number;
}
interface NationalIdGenerationResult {
  nationalId: string;
  checkDigit: number;
  attempts: number;
  hasRepeatedDigits: boolean;
  digits: number[];
}
```

## Validation

```ts
import { verifyIranianNationalId } from "@persian-tools/persian-tools";

verifyIranianNationalId("0499370899");    // true
verifyIranianNationalId("1234567890");    // false (checksum fails)
verifyIranianNationalId(undefined);        // undefined (falsy input → undefined return)

// Skip the city-prefix check
verifyIranianNationalId("9999970899", { checkPrefix: false });   // boolean based on checksum only
```

### Algorithm

1. Reject `undefined`/falsy → returns `undefined`.
2. Length must be ≥ 8; shorter inputs are zero-padded to 10 (so `499370899` is accepted as `0499370899`).
3. Reject if the digits are in `invalidNationalIdSequences` (e.g. `0000000000`, `1111111111`).
4. If `checkPrefix !== false`, the leading 3 digits must be in `validNationalIdPrefixes`.
5. Check digit:
   ```
   sum   = Σ digit[i] * (10 - i)  for i in 0..8
   r     = sum mod 11
   valid = (r < 2 && digit[9] === r) || (r >= 2 && digit[9] === 11 - r)
   ```

### Important quirks

- **Persian/Arabic digit input is NOT auto-normalized.** `verifyIranianNationalId("۰۴۹۹۳۷۰۸۹۹")` returns `false` because `parseInt` of Persian digits is `NaN`. Run `autoConvertDigitsToEN` first if input may contain them.
- **Return type is `boolean | undefined`** — `undefined` for empty/falsy input, `boolean` after the checksum runs. Don't truthy-check; use `=== true`.

## Generation (for tests / fixtures)

```ts
import {
  createIranianNationalId,
  createIranianNationalIdDetailed,
  validateNationalIdChecksum,
} from "@persian-tools/persian-tools";

createIranianNationalId();
// e.g. "0499370899" — random valid ID with a valid city prefix and check digit

createIranianNationalId({ preventRepeatedDigits: true });
// guarantees the ten digits are not all identical, with bounded retry

const detailed = createIranianNationalIdDetailed({ preventRepeatedDigits: true, maxRetries: 50 });
// {
//   nationalId: "1234567890",
//   checkDigit: 0,
//   attempts: 1,
//   hasRepeatedDigits: false,
//   digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
// }

validateNationalIdChecksum(detailed.nationalId);   // true
```

For deterministic test seeds, pass `randomGenerator`:

```ts
createIranianNationalId({ randomGenerator: () => 0.5 });
// reproducible — always uses 0.5 for every digit draw
```

## Common pitfalls

- **Don't commit real National IDs as test fixtures.** Use `createIranianNationalId` to generate synthetic ones with valid checksums.
- **`getPlaceByIranNationalId` is a separate module** for city/province lookup. It does NOT validate the checksum — it only slices the first 3 digits and looks them up. See the `getPlaceByIranNationalId` skill.
- **City-prefix list is data, not law.** New prefixes get assigned over time. When extending the library, update `validNationalIdPrefixes` (and the place-lookup tables) together.

## References

- Tests: `test/verifyIranianNationalId.spec.ts`
- Related: `getPlaceByIranNationalId` skill, `iranian-validation-expert` (algorithm details) in `.agents/`
