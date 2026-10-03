---
name: bill
description: Parse and validate Iranian utility bills (water, electricity, gas, landline, mobile, municipal, tax, traffic fines) given a bill ID + payment ID pair, or a combined barcode. Use when implementing bill-pay flows, validating user-entered bill numbers, or extracting bill type and amount. Triggers on mentions of Bill class, قبض, billId, paymentId, شناسه قبض, شناسه پرداخت, bill barcode, utility bill validation.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# bill — Iranian utility bill parsing & validation

```ts
import { Bill } from "@persian-tools/persian-tools";
// CommonJS
const { Bill } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
class Bill { ... }

type BillTypes =
  | "آب" | "برق" | "گاز" | "تلفن ثابت" | "تلفن همراه"
  | "عوارض شهرداری" | "سازمان مالیات"
  | "جرایم راهنمایی و رانندگی" | "unknown";

type Currency = "toman" | "rial";

const billTypes: { [k: number]: BillTypes };   // numeric code → BillTypes

interface BillParams {
  billId?: number;
  paymentId?: number;
  currency?: Currency;
  barcode?: string;
}

interface BillResult {
  amount: number;
  type: string;                  // NB: field is `type`, not `billType`
  barcode: string;
  isValid: boolean;
  isValidBillId: boolean;
  isValidBillPayment: boolean;
}
```

## Construction

```ts
import { Bill } from "@persian-tools/persian-tools";

// From bill ID + payment ID
const b = new Bill({ billId: 1117753200, paymentId: 1234567890 });

// With currency (default "toman")
const b2 = new Bill({ billId: 1117753200, paymentId: 1234567890, currency: "rial" });

// From barcode (combined 26-digit string)
const b3 = new Bill({ barcode: "1117753200000123456789..." });
```

All params are optional, but most methods require either `billId + paymentId` or `barcode` to do real work.

## Public methods

```ts
b.getAmount(): number               // amount in the chosen currency
b.getBillType(): BillTypes          // service category (water/electricity/...)
b.getBarcode(): string              // billId + "000" + paymentId
b.findByBarcode(barcode?: string): { billId: number; paymentId: number }
b.verificationBillId(): boolean     // check digit on the bill ID
b.verificationBillPayment(): boolean // check digit on the payment ID
b.verificationBill(): boolean       // both must pass
b.getResult(): BillResult           // single object with everything above
```

```ts
const r = b.getResult();
// {
//   amount: ...,
//   type: "برق",           // ← field is `type` (NOT `billType`)
//   barcode: "...",
//   isValid: true,
//   isValidBillId: true,
//   isValidBillPayment: true,
// }
```

## Algorithm — the check digit

`CalTheBit(num)` (private) iterates digits right-to-left multiplying by cycling weights 2..7 (resets to 2 after 7), sums % 11. Mapped 0/1 → 0, otherwise `11 - sum`.

- **Bill ID validity**: last digit must equal `CalTheBit(billId.slice(0, -1))`, AND the bill type (extracted from `billId.slice(-2, -1)`) must not be `"unknown"`.
- **Payment ID validity**: last two digits are control bits; first checks `CalTheBit(paymentIdWithoutLastTwo)`, second checks `CalTheBit(billId + paymentIdWithoutLastTwo + firstControlBit)`.

## Bill type encoding

The penultimate digit of the bill ID encodes the service:

| Digit | Type |
|---|---|
| 1 | آب |
| 2 | برق |
| 3 | گاز |
| 4 | تلفن ثابت |
| 5 | تلفن همراه |
| 6 | عوارض شهرداری |
| 8 | سازمان مالیات |
| 9 | جرایم راهنمایی و رانندگی |
| anything else | `"unknown"` (causes `verificationBillId()` to fail) |

## Amount calculation

```ts
amount = parseInt(paymentId.slice(0, -5)) * (currency === "rial" ? 1000 : 100)
```

The last 5 digits of payment ID are control + scaling; the rest are the amount in 100s of toman / 1000s of rial. Pick `currency` to match your downstream domain — getting it wrong is a 10× error.

## Common pitfalls

- **Field name is `type`, not `billType`** — older docs use `billType`. Accessing `result.billType` will be `undefined`.
- **Constructor params are optional**, but `getResult()` on an empty `Bill` returns `{ amount: NaN, type: "unknown", barcode: "nullnull", isValid: false, ... }`. Guard upstream.
- **Persian/Arabic digit barcodes aren't normalized.** Pass English digits or normalize first with `autoConvertDigitsToEN`.
- **Bill type "unknown" forces `verificationBillId()` to return `false`** even if the math checks out. This is intentional — only known service categories are accepted.

## Composition with phone-number bill type

The penultimate digit `4` and `5` correspond to landline and mobile bills respectively. If you want to display "تلفن همراه 0912xxxxxxx" with operator info, combine with `phoneNumber` skill's `phoneNumberDetail`.

## References

- Tests: `test/bill.spec.ts`
- Related: `phoneNumber` skill (for telecom bill detail)
