---
name: slugify
description: Generate URL-safe slugs from Persian text, with options for separator, lowercase, max length, custom replacements, and Persian digit handling. Use when building URL paths from article titles, file names from user-typed strings, or anchor IDs. Triggers on mentions of slugify, createSlug, URL-safe Persian, slug from Farsi, prettify URL.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# slugify — URL-safe slugs from Persian text

```ts
import {
  slugify,
  createSlug,
  slugifyWithNumbers,
  slugifySimple,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  slugify,
  createSlug,
  slugifyWithNumbers,
  slugifySimple,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
slugify(text: string, options?: SlugifyOptions): string
createSlug(text: string, separator?: string): string
slugifyWithNumbers(text: string, separator?: string): string
slugifySimple(text: string): string

interface SlugifyOptions {
  separator?: string;                  // default "-"
  lowercase?: boolean;                  // default true (lowercases Latin only — Persian has no case)
  removeRepeatedSeparators?: boolean;   // collapse "--" → "-", default true
  maxLength?: number;                   // truncate after slug build
  preserveNumbers?: boolean;            // default true — Persian digits kept; English digits stay as-is
  customReplacements?: Record<string, string>;
}
```

## Basic usage

```ts
import { slugify } from "@persian-tools/persian-tools";

slugify("سلام دنیا");                          // "سلام-دنیا"
slugify("چگونه برنامه‌نویسی یاد بگیریم؟");      // "چگونه-برنامه-نویسی-یاد-بگیریم"
slugify("Hello سلام 2024");                    // "hello-سلام-2024"
```

## With options

```ts
slugify("سلام دنیا", { separator: "_" });                  // "سلام_دنیا"
slugify("سلام دنیا", { maxLength: 8 });                    // "سلام-دن"
slugify("سلام دنیا", { lowercase: false });                // doesn't lowercase Latin
slugify("سال ۱۴۰۰", { preserveNumbers: true });            // "سال-۱۴۰۰" (Persian digits preserved)
```

## Convenience exports

- `createSlug(text, separator?)` — `slugify` with the same `separator` default-overridable.
- `slugifyWithNumbers(text, separator?)` — slugify keeping digits intact.
- `slugifySimple(text)` — barebones slugification (no options).

These are thin wrappers; you can always call `slugify(text, ...)` directly.

## What it does internally

1. Validates input is a non-empty string. Otherwise throws (likely `Error`, not `TypeError` — see `src/modules/slugify/index.ts:65`).
2. Normalises Arabic characters → Persian via `toPersianChars`.
3. Applies `SLUG_REPLACEMENTS` (e.g. `آ → ا`, `ة → ه`, drops Arabic diacritics).
4. Applies `PUNCTUATION_REPLACEMENTS` (strips `؟ ، « »` etc.; converts Arabic-Indic digits to English).
5. Applies any `customReplacements`.
6. Replaces whitespace runs with `separator`, optionally collapses repeated separators, optionally truncates to `maxLength`.

## Common pitfalls

- **Throws on empty string.** Pre-check `text.trim().length > 0`.
- **`lowercase: true`** affects only Latin characters; Persian doesn't have case.
- **`preserveNumbers: true` keeps Persian digits**, which may NOT be URL-safe in some contexts (browsers handle them fine, but some servers reject non-ASCII paths). For pure-ASCII URLs, set `preserveNumbers: false` and pre-convert digits with `digitsFaToEn`.
- **`maxLength` truncates *after* slug building** — the final slug may end on a separator if you're unlucky. Trim trailing separators yourself if it matters.
- **Custom replacements run after defaults** — they can override punctuation handling. Useful for vocabulary-specific tweaks (e.g. brand-name expansions).

## References

- Tests: `test/slugify.spec.ts`
- Related: `URLfix` skill (decode percent-encoded URLs before slugifying)
