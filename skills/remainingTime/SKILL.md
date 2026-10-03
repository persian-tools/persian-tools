---
name: remainingTime
description: Calculate the structured (years/months/days/hours/minutes/seconds) breakdown of time remaining until a target Gregorian date, plus a stringified Persian phrase and an `isFinished` flag. Use when implementing countdown widgets, event timers, or deadline displays. Triggers on mentions of remainingTime, countdown Persian, زمان باقی‌مانده, time until, deadline.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# remainingTime — countdown to a Gregorian target

```ts
import { remainingTime } from "@persian-tools/persian-tools";
// CommonJS
const { remainingTime } = require("@persian-tools/persian-tools");
```

## Public export

```ts
remainingTime(date: string | number | Date): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  toString(): string;
  isFinished: boolean;
}
```

## Behaviour

```ts
import { remainingTime } from "@persian-tools/persian-tools";

const r = remainingTime("2025-12-31T23:59:59Z");
r.years;            // e.g. 0
r.months;           // e.g. 7
r.days;             // ...
r.isFinished;       // false (target is in the future)
r.toString();       // Persian phrase composed of non-zero components, e.g. "۱ سال و ۲ ماه و ۱۵ روز"
```

Components are computed by floor-division using fixed second counts (`365 * 86400` per year, `30 * 86400` per month). It's an **approximation**, not calendar-aware — months are 30 days, years 365. Don't use this for legal/financial deadlines that need calendar correctness.

## When the target has passed

If `Number(dueDate) - Number(now) <= 0`, the function returns a zero-filled object with `isFinished: true` and `toString()` returning `""`.

```ts
const past = remainingTime(new Date("2000-01-01"));
past.isFinished;    // true
past.toString();    // ""
past.years;         // 0
```

## Input handling

- Accepts `string | number | Date`. Internally `new Date(date)` is used, so any value `Date` itself accepts works.
- Invalid date input (e.g. `"not-a-date"`) → `new Date(...)` is `Invalid Date` → `isNaN(dueDate.getDate())` → throws:
  `TypeError("PersianTools: remainingTime - The input must be a valid date")`.

## toString() — Persian digit output

The string method emits Persian digits (via `digitsEnToFa`). The phrase concatenates non-zero parts with `و`:

```ts
r.toString();   // "۱ سال و ۲ ماه و ۱۵ روز و ۳ ساعت و ۲۰ دقیقه و ۵ ثانیه"
```

If you want English digits, build the string yourself from the numeric fields.

## Common pitfalls

- **Calendar-naive math.** A year is 365 × 86400 seconds; a month is 30 × 86400 seconds. Leap years and varying month lengths are ignored. For precise legal countdowns, use a calendar-aware library.
- **`toString()` returns `""` when finished**, not `"0 ثانیه"`. If you want a "Finished" label, check `isFinished` first.
- **No Jalali support here.** For Persian-calendar-aware countdowns to a *Jalali* date, convert the Jalali date to Gregorian first.

## Companion: `timeAgo`

If you want "time *since*" rather than "time *until*", with a Jalali input format, use the `timeAgo` skill.

## References

- Tests: `test/remainingTime.spec.ts`
- Related: `timeAgo` skill (relative *past* time from a Jalali date string)
