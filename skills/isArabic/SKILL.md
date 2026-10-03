---
name: isArabic
description: Detect whether a string is in the Arabic script or contains Arabic characters. Use when separating Arabic from Persian/Farsi input, validating that text is Arabic before applying Arabic-specific NLP, or routing multilingual input. Triggers on mentions of isArabic, hasArabic, Arabic detection, Arabic script validation, or "is this Arabic vs Persian".
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# isArabic — Arabic-script detection

```ts
import { isArabic, hasArabic } from "@persian-tools/persian-tools";
// CommonJS
const { isArabic, hasArabic } = require("@persian-tools/persian-tools");
```

## Public exports

```ts
isArabic(str: string, trimPattern?: RegExp): boolean
hasArabic(str: string): boolean
```

## isArabic vs hasArabic

- `isArabic(str)` — **all** of `str` (after trimming) is Arabic-script.
- `hasArabic(str)` — `str` **contains** at least one Arabic-script character.

```ts
isArabic("السلام عليكم");        // true
isArabic("Hello مرحبا");          // false
hasArabic("Hello مرحبا");         // true
```

## How it works

The check is two-pronged (`src/modules/isArabic/index.ts:11`):

1. The string (post-trim) matches `/^[؀-ۿ\s]+$/` — every character is in the Arabic Unicode block.
2. The string matches the project's `ArabicContextualForms` regex (`src/helpers/contextual-forms.ts`) — ensures actual Arabic letterforms are present (rules out e.g. pure punctuation in the Arabic block).

Both conditions must be true. `hasArabic` is the same logic but accepts any string that contains *at least one* qualifying character.

## The `trimPattern` parameter

Default: `/["'-+()\s.]/g` — common Arabic punctuation, parentheses, dots, quotes, and whitespace are stripped before the script check.

Override when your input has additional separators:

```ts
isArabic("السلام / عليكم", /[/\s]/g);   // true
```

## Persian vs Arabic — the critical distinction

The Persian alphabet is the Arabic script *plus* `پ چ ژ گ` and *minus* a few rarely-used Arabic letters. Many letters appear in both scripts at *different* code points:

| Glyph | Persian | Arabic |
|---|---|---|
| ya (ی/ي) | U+06CC | U+064A |
| kaf (ک/ك) | U+06A9 | U+0643 |

Practical implication:

- A string typed on an Arabic keyboard contains `ي` and `ك` and passes `isArabic` while *failing* `isPersian`.
- A string typed on a Persian keyboard contains `ی` and `ک` and passes `isPersian` while passing `isArabic` *too* (the Persian code points still fall in U+06xx).

So `isPersian(x) && !isArabic(x)` is **not** a clean partition. The two are not mutually exclusive. To detect "this is *Arabic and not Persian*":

```ts
import { isArabic, hasPersian } from "@persian-tools/persian-tools";

const isPureArabic = (s: string) => isArabic(s) && !hasPersian(s);
isPureArabic("السلام");        // true
isPureArabic("علی");           // false — contains Persian-specific ya
```

## Common edge cases

| Input | `isArabic(...)` |
|---|---|
| `""` | `false` |
| `"السلام"` | `true` |
| `"عليكم 123"` | `false` — Latin digits aren't in the Arabic block |
| `"عليكم ١٢٣"` | `true` — Arabic-Indic digits (٠-٩) ARE in the Arabic block |
| `"سلام"` (Persian) | also `true` — letters are in U+06xx; not a Persian-Arabic discriminator on its own |

## Common pitfalls

- **Don't use `isArabic` as the negation of `isPersian`** — see "Persian vs Arabic" above.
- **Arabic-Indic digits (٠-٩) pass as Arabic**, but Persian digits (۰-۹) do too because both ranges are in U+06xx. If you need digit-level distinction, use `arDigitsRegex` and `faDigitsRegex` from the `digits` module.
- **Empty/whitespace-only strings return `false`.** Validate non-emptiness separately if needed.

## References

- Helper: `src/helpers/contextual-forms.ts`
- Sibling: `src/modules/isPersian/` (for Persian-specific detection)
- Tests: `test/isArabic.spec.ts`
- Domain background: `.agents/persian-text-expert/SKILL.md`
