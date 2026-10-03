---
name: numberplate
description: Parse Iranian license plates (cars and motorcycles) — normalize the input, classify the plate type and category (personal, government, taxi, diplomat, etc.), and resolve the trailing 2-digit code to a province. Use when parsing OCR output from license-plate cameras or validating user-entered plates in vehicle-registration apps. Triggers on mentions of getNumberPlateInfo, پلاک, license plate Iran, car plate, motorcycle plate, شماره پلاک.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# numberplate — Iranian license plate parsing

```ts
import { getNumberPlateInfo } from "@persian-tools/persian-tools";
// CommonJS
const { getNumberPlateInfo } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
// Main API
getNumberPlateInfo(plate: PlateOptions): PlateResult
getPlateInfo(plate: NormalizedPlate): PlateResultApi
isPlateValid(plateInfo: PlateResultApi, plateNumber: string): boolean
getPlateHandler(plate: NormalizedPlate): (plate: NormalizedPlate) => PlateResultApi
carHandler(plate: NormalizedPlate): PlateResultApi
motorcycleHandler(plate: NormalizedPlate): PlateResultApi

// Types
type PlateOptions = string | PlateApi;       // PlateApi = { number: string; char?: string }
interface PlateResult { info: PlateResultApi; isValid: boolean }
enum PlateTypes { Car = 1, Motorcycle = 2 }
type PlateResultApiTypeString = "Car" | "Motorcycle"
interface PlateResultDetailModel {
  firstTwoDigits: string;
  plateCharacter: string | null;
  nextThreeDigits: string;
  provinceCode: string;
}
interface PlateResultMotorcycleDetailModel { digits: string; ... }
```

> **There is NO `Numberplate` class.** Older docs reference `new Numberplate(...)` — that does not exist. The library exports plain functions.

## Basic usage

```ts
import { getNumberPlateInfo } from "@persian-tools/persian-tools";

// Car — string form (compact)
const car = getNumberPlateInfo("12D45147");
car.info;
// {
//   template: "12 D 451 ایران 47",
//   province: "مرکزی",
//   type: "Car",
//   category: "دیپلمات",
//   details: { firstTwoDigits: "12", plateCharacter: "D", nextThreeDigits: "451", provinceCode: "47" },
// }
car.isValid;   // true

// Car — object form
getNumberPlateInfo({ number: "1245147", char: "ج" });

// Motorcycle — 8-digit numeric
const moto = getNumberPlateInfo(12345678);
moto.info;
// {
//   template: "123-45678",
//   province: "مرکز تهران",
//   type: "Motorcycle",
//   details: { digits: "12345678", ... },
// }
```

## Result shape — `PlateResult`

```ts
interface PlateResult {
  info: PlateResultApi;   // type, template, province, category, details, ...
  isValid: boolean;
}
```

`info.type` is the **string** `"Car"` or `"Motorcycle"` (`PlateResultApiTypeString`), not the Persian categories ("شخصی"/"دولتی" — those go in `info.category` for cars).

## Validation rules — `isPlateValid`

For cars:
- Plate numbers (combined) must not contain `0` and must consist of `[1-9]`.
- The plate `category` (from `info.category`) must exist (i.e., the letter+province combo is recognized).

For motorcycles:
- 8-digit numeric.

If you skip `getNumberPlateInfo` and call `getPlateInfo` directly, pair it with `isPlateValid(info, plateNumber)` to mirror what the main function does.

## Input shapes — `PlateOptions`

```ts
type PlateOptions = string | { number: string; char?: string };
```

- **String form** for compact plates: `"12D45147"` (car: 2-digit + letter + 3-digit + 2-digit province) or `"12345678"` (motorcycle).
- **Object form** when the Persian letter is separated: `{ number: "1245147", char: "ج" }`.

The function normalizes both into `NormalizedPlate` via `normalizePlate(...)` before downstream processing.

## Common pitfalls

- **There's no class.** Don't `new Numberplate(...)`. Call the plain function.
- **`info.type` is `"Car" | "Motorcycle"`** (English string), not a Persian category. Persian-language categorization sits in `info.category` (for cars: شخصی / دولتی / دیپلمات / etc.).
- **Province codes are data-driven** — see `src/modules/numberplate/codes.skip.ts`. Adding a new province means editing that file (not patching the function).
- **Plate "letters"** can be Persian (`ج`, `پ`, `الف`, ...) or their Latin abbreviations (`D` for diplomat in the example). The dataset maps both.
- **Plate numbers containing `0`** are rejected by `isPlateNumberValid` — this matches real-world plate rules.

## References

- Tests: `test/numberplate.spec.ts`
- Related: `findCapitalByProvince` for province → capital lookup
