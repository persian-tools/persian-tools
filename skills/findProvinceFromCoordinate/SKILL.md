---
name: findProvinceFromCoordinate
description: Resolve a GPS coordinate (longitude, latitude) to the Iranian province it falls inside, using GeoJSON polygon containment. Returns both Persian and English province names. Use when geo-tagging user locations, routing deliveries by province, or annotating uploaded points-of-interest. Triggers on mentions of findProvinceFromCoordinate, geocode Iran, GPS to province, استان از مختصات, polygon containment.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# findProvinceFromCoordinate — coordinate → Iranian province

```ts
import { findProvinceFromCoordinate } from "@persian-tools/persian-tools";
// CommonJS
const { findProvinceFromCoordinate } = require("@persian-tools/persian-tools");
```

## Public export

```ts
findProvinceFromCoordinate(pointToCheck: { longitude: number; latitude: number }): {
  fa: string;
  en: string;
}
```

## Behaviour

```ts
import { findProvinceFromCoordinate } from "@persian-tools/persian-tools";

findProvinceFromCoordinate({ longitude: 51.42, latitude: 35.69 });
// { fa: "تهران", en: "Tehran" }

findProvinceFromCoordinate({ longitude: 0, latitude: 0 });
// throws PersianToolsError — no province found
```

## What it does

1. Iterates the GeoJSON features in `irGeoJSON.ts` (each represents a province with its polygon).
2. For each feature, runs a point-in-polygon ray-cast test (`pointInPolygon`).
3. Returns `{ fa, en }` from the first matching feature's `properties`.
4. If no polygon contains the point, throws:
   `PersianToolsError("findProvinceFromCoordinate", "no province found")`.

> Return type is **the `{ fa, en }` object**, never `undefined` or a bare string. Older docs claim `string | undefined` — wrong on both counts.

## Algorithm — ray casting

`pointInPolygon` (`src/modules/findProvinceFromCoordinate/index.ts:23`) is a standard horizontal ray-cast. Numerical edge cases (point exactly on a polygon boundary, polygons spanning the antimeridian) are not specially handled — the algorithm assumes simple, well-formed polygons that don't cross the antimeridian, which holds for Iran's geometry.

## Common pitfalls

- **Throws** on out-of-Iran coordinates; doesn't return `null`. Wrap in `try/catch` for graceful fallback.
- **Coordinate order** is `{ longitude, latitude }` — not the GeoJSON `[lng, lat]` array form. Pass an object.
- **`fa` is the Persian name, `en` is the romanized English name.** Pick the field for your UI. Don't expect a plain string like `"تهران"` from the call — index into the object.
- **Polygon data is approximate.** This is a GeoJSON dataset, not survey-grade. Near administrative borders, expect occasional misclassification.

## Composition

```ts
import {
  findProvinceFromCoordinate,
  findCapitalByProvince,
} from "@persian-tools/persian-tools";

const point = { longitude: 51.42, latitude: 35.69 };
const province = findProvinceFromCoordinate(point);
const capital  = findCapitalByProvince(province.fa);
```

## References

- Tests: `test/findProvinceFromCoordinate.spec.ts`
- Related: `findCapitalByProvince` skill
