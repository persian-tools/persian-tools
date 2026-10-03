---
name: isPersian
description: Detect whether a string is Persian (Farsi) or contains Persian characters, and normalize Arabic-script characters to their Persian equivalents. Use when validating Persian input, deciding whether to apply Persian-specific formatting, or auto-converting Arabic characters typed on an Arabic keyboard. Triggers on requests mentioning isPersian, hasPersian, isFarsi, autoArabicToPersian, Farsi detection, Persian validation, or "is this text Persian".
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# isPersian — Persian/Farsi script detection and normalization

```ts
import {
  isPersian,
  hasPersian,
  isFarsi,
  hasFarsi,
  autoArabicToPersian,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  isPersian,
  hasPersian,
  isFarsi,
  hasFarsi,
  autoArabicToPersian,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
isPersian(str: string, isComplex?: boolean, trimPattern?: RegExp): boolean
isFarsi(str: string, isComplex?: boolean, trimPattern?: RegExp): boolean   // alias of isPersian
hasPersian(str: string, isComplex?: boolean): boolean
hasFarsi(str: string, isComplex?: boolean): boolean                         // alias of hasPersian
autoArabicToPersian(value: string): string

// Constants
TRIM_REGEX: RegExp        // /["'-+()؟\s.]/g — characters trimmed from input before checking
// Plus exports re-routed from ./farsiChars (faText, faComplexText)
```

## isPersian vs hasPersian

- `isPersian(str)` — **all** of `str` (after trimming common punctuation) is Persian.
- `hasPersian(str)` — `str` **contains** at least one Persian character.

```ts
isPersian("سلام دنیا");          // true
isPersian("Hello سلام");         // false (English chars present)
hasPersian("Hello سلام");        // true (some Persian present)
hasPersian("Hello");             // false
```

## The `isComplex` flag

```ts
isPersian("سلام؟ ۱۲۳", true);   // true — complex mode accepts Persian digits & extended punctuation
isPersian("سلام؟ ۱۲۳");          // false — default mode is strict letter-only
```

Use `isComplex: true` when validating free-form Persian text that legitimately contains digits, exclamation/question marks, or other common Persian punctuation. Default (`false`) is for "is this a pure Persian word" checks.

## The `trimPattern` parameter

Before testing, characters matching `trimPattern` are stripped. Default is `TRIM_REGEX` = `/["'-+()؟\s.]/g`. Override when your input has additional separators that should be tolerated:

```ts
isPersian("سلام / دنیا", false, /[/\s]/g);   // true — strip slashes and whitespace
```

## autoArabicToPersian — Arabic-keyboard normalization

The most common Persian-input bug: users type on Arabic keyboards and produce text with `ي` (Arabic ya, U+064A) and `ك` (Arabic kaf, U+0643) instead of the Persian `ی` (U+06CC) and `ک` (U+06A9). These render identically but compare as different bytes.

```ts
import { autoArabicToPersian } from "@persian-tools/persian-tools";

autoArabicToPersian("علي بن أبي طالب");   // "علی بن أبی طالب"
autoArabicToPersian("كتاب");               // "کتاب"

// Idempotent — already-Persian text passes through
autoArabicToPersian("علی");                // "علی"
```

**Always run `autoArabicToPersian` on user input before any equality check, regex match, or Set/Map lookup keyed by Persian strings.** Several validators in this library (e.g. `moneyWordsToNumber`) do this automatically when their `autoConvertArabicCharsToPersian: true` option is on (which is the default).

## Common edge cases

| Input | `isPersian(...)` |
|---|---|
| `""` | passes the regex against empty string → `false` (no characters to match) |
| `"سلام"` | `true` |
| `"سلام  "` (trailing whitespace) | `true` — whitespace is trimmed |
| `"123"` | `false` — digits aren't Persian letters |
| `"۱۲۳"` (default mode) | `false` — strict mode treats digits as non-letters |
| `"۱۲۳"` (complex mode) | `true` — complex mode includes Persian digits |
| `"السلام"` (Arabic text) | `false` — Arabic-only chars like `ل` are still in the Arabic block; isPersian rejects strings that contain Persian-specific exclusions |

## Common pitfalls

- **Don't confuse `isPersian` with `isArabic`.** Both scripts share most letters; the discriminator is the Persian-specific letters (`پ چ ژ گ` and the *Persian* code-point versions of ya/kaf). If you need "is this Arabic", load the `isArabic` skill.
- **`isPersian("علي")` returns `false` despite looking Persian** — the `ي` is the Arabic code point. Normalize with `autoArabicToPersian` first when you want to accept either.
- **Whitespace-only strings**: empty string and pure whitespace both return `false`. If you want a clear validation message, check `.trim().length > 0` separately.

## References

- Sibling: `src/modules/isArabic/` (for the Arabic-script counterpart)
- Tests: `test/isPersian.spec.ts`
- Domain background: `.agents/persian-text-expert/SKILL.md`
