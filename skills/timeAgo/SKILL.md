---
name: timeAgo
description: Convert a Jalali (Persian) date-time string ("yyyy/mm/dd hh:mm:ss") into a human-readable "time ago" phrase in Persian ("اکنون", "5 دقیقه قبل", "حدود 1 سال قبل"). Use when displaying activity timestamps in Persian UIs. Triggers on mentions of timeAgo, چند دقیقه قبل, زمان نسبی, Jalali time ago, Persian relative time.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# timeAgo — Jalali date → "X ago" Persian phrase

```ts
import { timeAgo } from "@persian-tools/persian-tools";
// CommonJS
const { timeAgo } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
timeAgo(
  datetime?: string,
  since?: Date,
  timeZone?: string,
): string

// Helpers re-exported via `export * from "./helpers"`
checkFormatDateTime(s: string): boolean
getTimeNow(timeZone: string, since: Date): number
standardizeFaDateTime(s: string): string
```

## Signature

- `datetime`: a **Jalali** date-time string in `"yyyy/mm/dd hh:mm:ss"` format (e.g. `"1402/06/15 13:05:20"`). Default `""`.
- `since`: the reference "now". Default `new Date()`.
- `timeZone`: IANA TZ. Default `"Asia/Tehran"`.

> **Input is a STRING (Jalali), not a JS `Date` or number.** Passing `new Date(...)` will throw.

## Basic usage

```ts
import { timeAgo } from "@persian-tools/persian-tools";

timeAgo("1400/03/17 17:55:00");                           // e.g. "حدود 4 سال قبل"
timeAgo();                                                 // "اکنون"
timeAgo("1402/06/15 13:05:20", new Date("2023-09-06"));   // explicit reference date
```

## Output vocabulary

The function returns Persian phrases using **قبل** / **بعد** (not پیش):

- `"اکنون"` — within ~1s
- `"چند ثانیه قبل"` / `"چند ثانیه بعد"` — within the short-second window
- `"X دقیقه قبل"`, `"X ساعت قبل"`, `"X روز قبل"`, ...
- `"حدود X سال قبل"` for larger spans (the "حدود" — "about" — prefix)

The full mapping lives in `src/modules/timeAgo/constants.ts`.

## Input format requirements

The string must be normalizable to `"yyyy/mm/dd hh:mm:ss"`:

```ts
standardizeFaDateTime("1402/6/5 1:5:0");   // "1402/06/05 01:05:00"
```

`standardizeFaDateTime` zero-pads months/days/hours/minutes/seconds. After that, `checkFormatDateTime` validates the final shape; if it still doesn't match, `timeAgo` throws:

`TypeError("PersianTools: timeAgo - The input format must be yyyy/mm/dd hh:mm:ss")`

A non-string `datetime` throws:

`TypeError("PersianTools: timeAgo - The input must be a string")`

## Common pitfalls

- **Don't pass a JS `Date` as the first argument.** That's the `since` parameter. The first argument is the *Jalali* string.
- **Time zone matters.** The default `"Asia/Tehran"` is correct for Iran-domestic content. Override only if your reference time is in a different zone.
- **Output uses "قبل" / "بعد"**, not "پیش". Don't expect "X دقیقه پیش".
- **Future dates** return `"... بعد"` phrases. So `timeAgo` is bidirectional — works for past and future.
- **No Gregorian input.** If you have a Gregorian `Date`, convert to Jalali first (with `date-fns-jalali`, `moment-jalaali`, etc.) before passing.

## Companion: `remainingTime`

If you need a *structured* breakdown (years, months, days, ...) toward a future date, use the `remainingTime` skill — it accepts Gregorian `string | number | Date` and returns numeric components plus a `toString()`.

## References

- Tests: `test/timeAgo.spec.ts`
- Related: `remainingTime` skill (Gregorian-input structured countdown)
