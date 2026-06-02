---
name: toPersianChars
description: Normalize Arabic-script characters (ي, ى, ك) and Arabic diacritics inside a Persian string to their Persian-script equivalents (ی, ک), while preserving Arabic text inside `{{...}}` template segments. Use when sanitizing user input from Arabic keyboards, normalizing for storage/comparison, or preparing text for Persian-only matching. Triggers on requests to "normalize Persian characters", "fix Arabic chars in Persian", "clean ي ك", or "toPersianChars".
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# toPersianChars — Persian character normalizer

```ts
import { toPersianChars } from "@persian-tools/persian-tools";
// CommonJS
const { toPersianChars } = require("@persian-tools/persian-tools");
```

## Public export

```ts
toPersianChars(str: string): string
```

## What it does

Replaces Arabic-script characters that look identical to their Persian counterparts with the Persian code points, plus normalises certain Arabic diacritics. The most important conversions:

| Input | Output | Codepoint shift |
|---|---|---|
| `ي` | `ی` | U+064A → U+06CC |
| `ى` | `ی` | U+0649 → U+06CC |
| `ك` | `ک` | U+0643 → U+06A9 |

Diacritics (`ً ٌ ٍ َ ُ ِ ّ ْ`) and Arabic punctuation like `٫`/`٬` are also normalized — see `src/modules/toPersianChars/index.ts` for the full table.

```ts
import { toPersianChars } from "@persian-tools/persian-tools";

toPersianChars("علي");                          // "علی"
toPersianChars("كتاب");                          // "کتاب"
toPersianChars("عبدالله بن عبدالعزیز");        // "عبدالله بن عبدالعزیز" (already Persian — no change)
```

## Template preservation — `{{...}}`

Anything inside `{{ ... }}` (double curly braces) is **preserved verbatim**. This is for templating use cases where you embed Arabic text intentionally:

```ts
toPersianChars("كشتى ىيكى {{ARABIC|كلمه}}");
// "کشتی یکی {{ARABIC|كلمه}}"
// note: the standalone words got Persian-normalized, but "كلمه" inside {{...}} kept its Arabic ك
```

The implementation does this by extracting `{{...}}` segments into placeholders, transforming the rest, then restoring the segments.

## What it does NOT do

The audit of the older website doc revealed common mistaken assumptions. Be explicit about what `toPersianChars` **does not** touch:

- **Does not** convert Latin `y`/`k` to Persian `ی`/`ک`.
- **Does not** convert percent `%` to `٪`.
- **Does not** convert digits (use the `digits` module for that).
- **Does not** convert Arabic-Indic digits `٠١٢٣...` (use `digitsArToFa`).
- **Does not** normalize whitespace, ZWNJ, or line breaks (use `halfSpace` and `src/helpers/line-breaks.ts`).

If you want a *full* normalization pipeline (digits + chars + trim), compose:

```ts
import { toPersianChars, autoConvertDigitsToEN, autoArabicToPersian } from "@persian-tools/persian-tools";

const normalize = (s: string) =>
  toPersianChars(autoArabicToPersian(autoConvertDigitsToEN(s))).trim();
```

Note that `autoArabicToPersian` (from the `isPersian` module) does the *character* normalization on a smaller but overlapping set. For most use cases `toPersianChars` is the more thorough helper.

## Falsy input

`toPersianChars(""), toPersianChars(null as any), toPersianChars(undefined as any)` all return `""`. No throw.

## Common pitfalls

- **Running `toPersianChars` on text that contains intentional Arabic content** will silently corrupt it. Wrap protected sections in `{{...}}` or skip the call for those fields.
- **Be wary on long documents** — the regex/replace pipeline runs O(n) per replacement rule. For multi-MB strings consider chunking or running once on each user-input field rather than the whole doc.

## References

- Sibling: `src/modules/isPersian/` (`autoArabicToPersian` — overlapping but narrower)
- Tests: `test/toPersianChars.spec.ts`
- Domain background: `.agents/persian-text-expert/SKILL.md`
