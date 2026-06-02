---
name: phoneNumber
description: Validate Iranian mobile numbers, normalize between formats (`0...`, `+98...`, `0098...`), extract the 4-digit operator prefix, and look up operator name plus province coverage. Use when validating SMS gateway input, building contact forms, or showing operator info next to a number. Triggers on mentions of isPhoneNumberValid, phoneNumberDetail, phoneNumberNormalizer, getPhoneNumberPrefix, ایرانسل, همراه اول, mobile validation, +98.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# phoneNumber — Iranian mobile number tooling

```ts
import {
  phoneNumberDetail,
  isPhoneNumberValid,
  phoneNumberNormalizer,
  getPhoneNumberPrefix,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  phoneNumberDetail,
  isPhoneNumberValid,
  phoneNumberNormalizer,
  getPhoneNumberPrefix,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
phoneNumberDetail(mobile: string): OperatorModel | null
isPhoneNumberValid(mobile: string): boolean
phoneNumberNormalizer(phoneNumber: string, token: "0" | "+98"): string
getPhoneNumberPrefix(mobile: string): string

interface OperatorModel {
  province: string[];           // provinces this prefix covers
  base: string;                 // home province
  type: ("permanent" | "credit")[];   // SIM type(s) available
  operator: { id: number; name: string; ... };   // operator metadata
  model?: string;
}
```

> The exported validator is **`isPhoneNumberValid`**, not `validatePhoneNumber`. The operator-detail function is **`phoneNumberDetail`**, not `getPhoneOperator`.

## isPhoneNumberValid

```ts
import { isPhoneNumberValid } from "@persian-tools/persian-tools";

isPhoneNumberValid("09123456789");      // true
isPhoneNumberValid("+989123456789");    // true
isPhoneNumberValid("989123456789");     // true
isPhoneNumberValid("00989123456789");   // true
isPhoneNumberValid("9123456789");       // true (bare)
isPhoneNumberValid("0212345678");       // false (landline, not mobile)
```

Regex: `/^(\+98|98|0098|0)?9(\d{2})\d{7}$/`. The function additionally checks that the 3-digit operator prefix (`9xx`) is in the known `prefixes` list (which excludes unassigned blocks). It **only validates mobile**, not landlines.

## phoneNumberNormalizer

Convert between `0` and `+98` representations. Throws if the input doesn't validate.

```ts
import { phoneNumberNormalizer } from "@persian-tools/persian-tools";

phoneNumberNormalizer("+989022002580", "0");   // "09022002580"
phoneNumberNormalizer("09022002580", "+98");   // "+989022002580"
phoneNumberNormalizer("989022002580", "0");    // "09022002580"
phoneNumberNormalizer("09802002580", "0");     // throws: "phone number is not valid"
```

`token` is exactly `"0" | "+98"` — no other prefixes supported.

## phoneNumberDetail

Look up operator + coverage by the 3-digit operator prefix.

```ts
import { phoneNumberDetail } from "@persian-tools/persian-tools";

phoneNumberDetail("09123456789");
// {
//   province: ["البرز", "تهران", ...],
//   base: "تهران",
//   type: ["permanent"],
//   operator: { id: 1, name: "همراه اول", ... },
// }

phoneNumberDetail("09000000000");
// null — prefix "900" not assigned
```

Don't compare `phoneNumberDetail(...) === "همراه اول"` — the return is an object. The operator name is `result.operator.name`.

## getPhoneNumberPrefix

Returns the 4-digit operator prefix (including the leading `9`) — e.g. `"0912"` for همراه اول prefixes:

```ts
getPhoneNumberPrefix("09123456789");   // "0912"
```

Useful for grouping numbers in dashboards.

## Common pitfalls

- **Validates mobile only.** Landlines (`021...`, `031...`, etc.) all return `false`. There's no landline validator in this module.
- **`phoneNumberDetail` returns `OperatorModel | null`** — not a string. Older docs claim it returns the operator name directly.
- **`phoneNumberNormalizer` throws** on invalid input. Always `isPhoneNumberValid` first or wrap in `try/catch`.
- **Persian/Arabic digit input is NOT normalized.** Run `autoConvertDigitsToEN` first if input may contain them.
- **`+98` token includes the `+`.** Don't pass `"98"` and expect the same result.

## Composition pattern for forms

```ts
import {
  autoConvertDigitsToEN,
  isPhoneNumberValid,
  phoneNumberNormalizer,
  phoneNumberDetail,
} from "@persian-tools/persian-tools";

function processPhone(raw: string) {
  const norm = autoConvertDigitsToEN(raw.trim());
  if (!isPhoneNumberValid(norm)) return { ok: false as const };
  return {
    ok: true as const,
    e164: phoneNumberNormalizer(norm, "+98"),
    local: phoneNumberNormalizer(norm, "0"),
    detail: phoneNumberDetail(norm),
  };
}
```

## References

- Tests: `test/phoneNumber.spec.ts`
- Related: `bill` skill — bill type `5` corresponds to mobile bills
