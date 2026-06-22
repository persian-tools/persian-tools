---
name: getPlaceByIranNationalId
description: Look up the registering city and province for an Iranian National ID by its leading 3-digit prefix. Use when displaying provenance information alongside a National ID in admin tools or KYC flows. Triggers on requests about getPlaceByIranNationalId, city from national id, province from کد ملی, محل صدور.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# getPlaceByIranNationalId — city/province lookup by ID prefix

```ts
import { getPlaceByIranNationalId } from "@persian-tools/persian-tools";
// CommonJS
const { getPlaceByIranNationalId } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
getPlaceByIranNationalId(nationalId?: string): IPlaceByNationalId | null | undefined

interface IPlaceByNationalId {
  codes: number[] | string[];   // all 3-digit codes that map to this city
  city: string;
  province: string;
}

interface IProvince  { code: number | string; city: string }
interface INationalId extends IProvince { parentCode: number }
```

The lookup tables live in `nationalId.skip.ts` and `provincesCodes.skip.ts` (heavy datasets, kept under the `.skip.ts` convention so reviewers know they're data files).

## Behaviour

```ts
import { getPlaceByIranNationalId } from "@persian-tools/persian-tools";

getPlaceByIranNationalId("0084575948");
// { codes: [...], city: "تهران مرکزی", province: "تهران" }

getPlaceByIranNationalId("0000000000");
// null — prefix "000" not in the dataset

getPlaceByIranNationalId(undefined);
// undefined — falsy short-circuit
getPlaceByIranNationalId("");
// undefined
```

## Algorithm

1. Falsy input → `undefined`.
2. **Length must be exactly 10** (`src/modules/getPlaceByIranNationalId/index.ts`). Anything else → falls through, returns `undefined`.
3. Slice the first 3 characters as the prefix.
4. Filter `NationalIdJSON` rows whose stringified code includes the prefix; pick the first match.
5. Resolve the parent province via `ProvincesJSON.code === match.parentCode`.
6. Return `{ codes, city, province }`; `province` falls back to `"unknown"` if the parent code is not found.

## Important caveats

- **This function does NOT validate the checksum.** A nonsense ID like `"1234567890"` (which fails `verifyIranianNationalId`) may still return a valid `IPlaceByNationalId` because the prefix `"123"` exists in the dataset. **Always pair with `verifyIranianNationalId` if validity matters.**

  ```ts
  import { verifyIranianNationalId, getPlaceByIranNationalId } from "@persian-tools/persian-tools";

  const safeLookup = (id: string) =>
    verifyIranianNationalId(id) ? getPlaceByIranNationalId(id) : null;
  ```

- **No digit normalization.** Persian/Arabic digit input (`"۰۰۸۴۵۷۵۹۴۸"`) hits the `.substring(0,3)` directly and the resulting prefix (`"۰۰۸"` etc.) isn't in the English-digit-keyed dataset → `null`. Normalize with `autoConvertDigitsToEN` first.
- **Return type is `IPlaceByNationalId | null | undefined`.** `undefined` = couldn't even start (falsy input); `null` = ran, prefix not found.

## Common pitfalls

- **Don't use this as a validator.** It's a lookup, not a check. Use `verifyIranianNationalId` for validation.
- **`province === "unknown"` is a real return**, not an error — it means the prefix matched a city whose parent code is missing from the provinces table. Surface gracefully in UI.
- **Adding new prefixes**: edit `nationalId.skip.ts` and `provincesCodes.skip.ts`, then re-run the test suite. Both the validator's `validNationalIdPrefixes` and this lookup should stay in sync — see the `nationalId` skill.

## References

- Tests: `test/getPlaceByIranNationalId.spec.ts`
- Related: `nationalId` skill (for the checksum validator)
