---
name: legalId
description: Validate Iranian Legal IDs (شناسه ملی حقوقی, 11-digit company identifiers) using the official check-digit algorithm. Use when verifying company registration numbers in B2B forms or invoices. Triggers on requests mentioning verifyIranianLegalId, شناسه ملی, شناسه حقوقی, legal id, Iranian company id.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# legalId — Iranian Legal ID (شناسه ملی حقوقی) validation

```ts
import { verifyIranianLegalId } from "@persian-tools/persian-tools";
// CommonJS
const { verifyIranianLegalId } = require("@persian-tools/persian-tools");
```

## Public export

```ts
verifyIranianLegalId(legalId: string | number): boolean | undefined
```

## Behaviour

```ts
import { verifyIranianLegalId } from "@persian-tools/persian-tools";

verifyIranianLegalId("10380284790");      // true
verifyIranianLegalId(10380284790);         // true — number accepted
verifyIranianLegalId("00000000000");      // false (all zeros)
verifyIranianLegalId(undefined as any);   // undefined
```

## Algorithm

1. Falsy input → `undefined`.
2. Stringify; length must be ≥ 11.
3. Reject if `parseInt(legalId)` is `0` (all-zero string).
4. Reject if the middle 6 digits (`slice(3, 9)`) are all zero.
5. Check digit:
   ```
   d  = digit[9] + 2
   z  = [29, 27, 23, 19, 17]   // 5-period coefficient vector
   sum = Σ (d + digit[i]) * z[i mod 5]  for i in 0..9
   sum = sum mod 11
   if (sum === 10) sum = 0
   valid = digit[10] === sum
   ```

## Quirks

- **Length check is `< 11`, not `=== 11`.** Inputs longer than 11 are accepted; the algorithm slices at fixed indices, so longer strings *can* still validate. If you need strict 11-digit input, check `String(input).length === 11` separately.
- **Persian/Arabic digit input is NOT normalized.** `parseInt("۱۰۳۸۰۲۸۴۷۹۰")` is `NaN`. Normalize with `autoConvertDigitsToEN` first.
- **Return type is `boolean | undefined`.** `undefined` for falsy input, `boolean` after the check runs. Don't truthy-test the result.

## When NOT to use

- **For Iranian *personal* IDs (10 digits)** — use `verifyIranianNationalId`. The algorithms are different.

## References

- Tests: `test/verifyIranianLegalId.spec.ts`
- Algorithm reference: `http://www.aliarash.com/article/shenasameli/shenasa_meli.htm` (linked in JSDoc)
- Related: `nationalId` skill (the personal-ID counterpart)
