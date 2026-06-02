---
name: findCapitalByProvince
description: Look up the capital city of an Iranian province by its Persian name (e.g. "خراسان رضوی" → "مشهد"). Use when displaying capital info next to a province name, or building dropdowns/forms keyed by province. Triggers on mentions of findCapitalByProvince, capital of province, مرکز استان, پایتخت استان.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# findCapitalByProvince — province → capital (Persian)

```ts
import { findCapitalByProvince } from "@persian-tools/persian-tools";
// CommonJS
const { findCapitalByProvince } = require("@persian-tools/persian-tools");
```

## Public export

```ts
findCapitalByProvince(state: string): string
```

## Behaviour

```ts
import { findCapitalByProvince } from "@persian-tools/persian-tools";

findCapitalByProvince("خراسان رضوی");   // "مشهد"
findCapitalByProvince("تهران");          // "تهران"
findCapitalByProvince("اصفهان");         // "اصفهان"
findCapitalByProvince("ندارد");          // throws PersianToolsError
```

## What it does

1. Normalize the input via `toPersianChars(state)` — so Arabic-keyboarded `ك`/`ي` are tolerated.
2. Look up in the `IRAN_STATES` map (`src/modules/findCapitalByProvince/states.ts`).
3. If found, return the capital. If not, throw:
   `PersianToolsError("findCapitalByProvince", "no province found")`.

> Return type is **`string`**, never `undefined`. Older docs claim `string | undefined` — incorrect; the function throws instead. Wrap calls that may receive bad input in a `try/catch` or pre-validate against the province list.

## Common pitfalls

- **Throws** on unknown province; doesn't return `null`/`undefined`.
- **Input is Persian.** Latin transliterations (`"Tehran"`) won't match. No transliteration table.
- **`toPersianChars` is applied**, so Arabic-keyboarded variations like `"تهرآن"` with combining marks may still fail — normalize ZWNJ and diacritics upstream too if input is user-typed.
- **The dataset is a `Map`** — `IRAN_STATES.get(name)` exact match after normalization. To pre-filter or autocomplete, iterate `Array.from(IRAN_STATES.keys())`.

## Composition

For coordinate → province → capital chains, use this with `findProvinceFromCoordinate`:

```ts
import { findProvinceFromCoordinate, findCapitalByProvince } from "@persian-tools/persian-tools";

const province = findProvinceFromCoordinate({ longitude: 51.4, latitude: 35.7 });
const capital  = findCapitalByProvince(province.fa);
```

## References

- Tests: `test/findCapitalByProvince.spec.ts`
- Related: `findProvinceFromCoordinate` skill
