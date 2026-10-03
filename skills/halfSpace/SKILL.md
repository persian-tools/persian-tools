---
name: halfSpace
description: Insert Zero-Width Non-Joiner (ZWNJ, U+200C, نیم‌فاصله) characters between Persian words and their prefixes/suffixes/compound parts according to Persian typography rules. Use when prettifying user-entered Persian text, preparing copy for typesetting, or fixing کلمات بد جدا شده. Triggers on requests mentioning half-space, نیم‌فاصله, ZWNJ, Persian typography, "می‌خواهم vs می خواهم", prefix/suffix joining, or compound word formatting.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# halfSpace — insert Persian ZWNJ where it belongs

```ts
import { halfSpace } from "@persian-tools/persian-tools";
// CommonJS
const { halfSpace } = require("@persian-tools/persian-tools");
```

## Public export

```ts
halfSpace(persianText: string): string
```

## What it does

Tokenises the input by whitespace and applies three rule families (in priority order) to decide where a space should be replaced with a ZWNJ (`‌`, U+200C):

1. **Compound rules** (`tryCompoundRule`) — e.g. comparative/superlative formation (`تر`, `ترین`).
2. **Suffix rules** (`trySuffixRule`) — e.g. `ها`, `هایم`, `ام`, `ای` attached to a preceding word.
3. **Prefix rules** (`tryPrefixRule`) — e.g. `می`, `نمی`, `بی` attaching to a following verb/noun.

```ts
import { halfSpace } from "@persian-tools/persian-tools";

halfSpace("می خواهم بروم");        // "می‌خواهم بروم"
halfSpace("کتاب ها");               // "کتاب‌ها"
halfSpace("بزرگ ترین");             // "بزرگ‌ترین"
halfSpace("نمی توانم");             // "نمی‌توانم"
```

Multiple ASCII spaces between tokens are collapsed to a single space *before* the rules run (`src/modules/halfSpace/index.ts:11`).

## What it does NOT do

- **Does not remove** ZWNJ — it only inserts. If you need to strip ZWNJ, do `s.replace(/‌/g, " ")` yourself.
- **Does not** validate the input is Persian; it processes any string but the rule files (`utils.ts`) only match Persian prefix/suffix patterns.
- **Does not** correct Arabic-character mistakes — run `toPersianChars` or `autoArabicToPersian` first if input may come from an Arabic keyboard.
- **Does not** insert ZWNJ inside a word that lacks a space — the algorithm only operates on space-separated tokens.

## Recommended pipeline

```ts
import { autoArabicToPersian, halfSpace, autoConvertDigitsToEN } from "@persian-tools/persian-tools";

const polishPersian = (s: string) =>
  halfSpace(autoArabicToPersian(autoConvertDigitsToEN(s)));
```

Order matters: normalize characters and digits *before* `halfSpace`, because the rule tables key off Persian-script code points and would miss Arabic-typed input.

## Edge cases

| Input | Output | Why |
|---|---|---|
| `""` | `""` | Empty stays empty |
| `"سلام"` (single word) | `"سلام"` | No internal space → no rule applies |
| `"می    خواهم"` (multi-space) | `"می‌خواهم"` | Multiple spaces collapsed first |
| `"می‌خواهم"` (already has ZWNJ) | `"می‌خواهم"` | ZWNJ is not whitespace; not re-processed |
| `"hello world"` (Latin) | `"hello world"` | Rules don't fire on non-Persian tokens |

## Why ZWNJ matters

`می خواهم` (full space) → wrong: the verb stem appears as two separate words to a Persian reader.
`میخواهم` (no space) → wrong: the glyphs of `ی` and `خ` join visually, producing an unreadable cluster.
`می‌خواهم` (ZWNJ) → correct: visually distinct, but recognized as one word for selection, search, and grammar.

`halfSpace` is what turns user-typed `می خواهم` into the typographically correct `می‌خواهم`.

## Common pitfalls

- **Removing ZWNJ with `replace(/\s/g, "")`** — depending on the JS engine, `\s` may or may not match ZWNJ. Be explicit with `‌`.
- **Running `halfSpace` on text that already has ZWNJ** is safe (idempotent for the cases the rules cover), but the rules are conservative — they don't try to fix existing wrong ZWNJ usage. For a more thorough cleanup, you'd need a higher-level grammar tool.
- **Performance**: tokenisation is O(n) and rules are O(rule-count) per token. For multi-MB strings, chunk per paragraph.

## References

- Tests: `test/halfSpace.spec.ts`
- Domain background: `.agents/persian-text-expert/SKILL.md`
- Unicode reference: ZWNJ at U+200C
