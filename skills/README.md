# persian-tools — Per-Module Agent Skills

This directory ships **one Agent Skill per public utility** in `@persian-tools/persian-tools`. AI coding agents (Claude Code, Cursor, Copilot, etc.) retrieve the relevant skill on demand when a user asks about Persian Tools, so they answer with real signatures, real edge cases, and real source citations instead of hallucinated APIs.

## Install into your editor

```bash
# Bun
bunx skills add @persian-tools/persian-tools

# npm
npx skills add @persian-tools/persian-tools

# pnpm
pnpm dlx skills add @persian-tools/persian-tools
```

> The `skills add` command above documents the intended workflow. While the public `skills` registry CLI is being finalised, copy this `skills/` folder into your project's `.claude/skills/` (or your agent's equivalent) directly — the on-disk format is final.

## What each SKILL.md contains

Every skill follows the [Claude Code Skills](https://docs.claude.com/en/docs/claude-code/skills) front-matter spec:

```yaml
---
name: <kebab-case-name>
description: <when to load — used by the retriever>
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---
```

The body always includes:

1. **Public exports** — exact signatures pulled from `src/modules/<name>/`.
2. **Behaviour rules** — input shapes, return-type unions, what triggers throws.
3. **Edge cases** — empty, mixed-digit, Arabic-keyboard, ZWNJ-laden inputs.
4. **Common pitfalls** — drift between popular community docs and current code; "this function doesn't exist" warnings; ordering with `autoConvertDigitsToEN` / `autoArabicToPersian`.
5. **Composition recipes** — typical pipelines combining 2–3 utilities.
6. **References** — `path:line` citations to source, tests, and related skills.

## The 28 skills, grouped by domain

### 🔢 Numbers & digits

| Skill | What it covers |
|---|---|
| [`digits`](./digits/SKILL.md) | Persian (۰-۹) ↔ Arabic-Indic (٠-٩) ↔ English digit conversion; `autoConvertDigitsToEN` |
| [`commas`](./commas/SKILL.md) | Thousands-separator add/remove (`addCommas`, `removeCommas`) |
| [`numberToWords`](./numberToWords/SKILL.md) | Number → Persian words (`numberToWords`), with ordinal mode |
| [`wordsToNumber`](./wordsToNumber/SKILL.md) | Persian words → number, fuzzy mode, digit-system output |
| [`moneyWordsToNumber`](./moneyWordsToNumber/SKILL.md) | Money phrase → number with toman/rial detection, formal vs colloquial |
| [`addOrdinalSuffix`](./addOrdinalSuffix/SKILL.md) | Append Persian ordinal suffix (`سه` → `سوم`) |
| [`removeOrdinalSuffix`](./removeOrdinalSuffix/SKILL.md) | Strip Persian ordinal suffix (`سوم` → `سه`) |

### 📝 Text processing

| Skill | What it covers |
|---|---|
| [`isPersian`](./isPersian/SKILL.md) | Persian-script detection (`isPersian`, `hasPersian`); `autoArabicToPersian` |
| [`isArabic`](./isArabic/SKILL.md) | Arabic-script detection (`isArabic`, `hasArabic`) and Persian-vs-Arabic distinction |
| [`toPersianChars`](./toPersianChars/SKILL.md) | Normalize Arabic-script chars (`ي`/`ك`) to Persian (`ی`/`ک`) with template preservation |
| [`halfSpace`](./halfSpace/SKILL.md) | Insert ZWNJ (نیم‌فاصله) between Persian prefixes/suffixes/compounds |
| [`URLfix`](./URLfix/SKILL.md) | Decode percent-encoded Persian URLs (`urlFix`, note camelCase) |
| [`slugify`](./slugify/SKILL.md) | URL-safe slugs from Persian text (`slugify`, `createSlug`, `slugifyWithNumbers`, `slugifySimple`) |
| [`textAnalyzer`](./textAnalyzer/SKILL.md) | Full Persian text analysis (`analyzeText` — NOT `textAnalyzer`) + helpers |

### 🏛️ Iranian identifier validation

| Skill | What it covers |
|---|---|
| [`nationalId`](./nationalId/SKILL.md) | National ID (کد ملی) verify + generate + city-prefix lookup |
| [`getPlaceByIranNationalId`](./getPlaceByIranNationalId/SKILL.md) | City/province lookup from the leading 3 digits of a National ID |
| [`legalId`](./legalId/SKILL.md) | Legal ID (شناسه ملی, 11-digit company ID) validation |
| [`phoneNumber`](./phoneNumber/SKILL.md) | Mobile number validate / normalize (`+98` ↔ `0`) / operator detail |

### 💳 Banking

| Skill | What it covers |
|---|---|
| [`verifyCardNumber`](./verifyCardNumber/SKILL.md) | Iranian card-number validation (Luhn + BIN whitelist) |
| [`getBankNameFromCardNumber`](./getBankNameFromCardNumber/SKILL.md) | Issuing bank from card BIN |
| [`extractCardNumbers`](./extractCardNumbers/SKILL.md) | Pull card numbers from free-text (the function is `extractCardNumber`, singular) |
| [`sheba`](./sheba/SKILL.md) | Sheba/IBAN validation + bank info, account details, and SVG logo lookup |
| [`bill`](./bill/SKILL.md) | Utility-bill `Bill` class — parse bill ID + payment ID + barcode |

### 🌍 Geography & vehicles

| Skill | What it covers |
|---|---|
| [`findCapitalByProvince`](./findCapitalByProvince/SKILL.md) | Province name → capital city |
| [`findProvinceFromCoordinate`](./findProvinceFromCoordinate/SKILL.md) | (longitude, latitude) → `{ fa, en }` province |
| [`numberplate`](./numberplate/SKILL.md) | Iranian license plate parser (cars + motorcycles). No `Numberplate` class — use `getNumberPlateInfo` |

### ⏱️ Time

| Skill | What it covers |
|---|---|
| [`timeAgo`](./timeAgo/SKILL.md) | Jalali date string → "X قبل/بعد" Persian phrase |
| [`remainingTime`](./remainingTime/SKILL.md) | Gregorian target → structured countdown + Persian `toString()` |

## How the skills compose

These skills are intentionally narrow — one per utility. They cross-reference each other rather than duplicate domain knowledge:

```
isPersian, isArabic, toPersianChars, halfSpace, digits
   ↓
Used by every higher-level skill (validators, parsers, formatters)
   ↓
nationalId, sheba, phoneNumber, moneyWordsToNumber, ...
```

A typical agent retrieval flow:

1. User says: *"validate this card number from a chat message"*
2. Retriever picks: `extractCardNumbers` (primary) + `verifyCardNumber` + `digits` (digit normalization)
3. Agent reads the three SKILL.md files and produces a correct pipeline.

## Maintainer-side skills

The skills here are **user-facing** (one per public utility). For *contributor-facing* skills that guide adding new modules, writing tests, keeping the bundle small, or cutting a release, see [`/.agents/`](../.agents/):

- [`persian-module-author`](../.agents/persian-module-author/SKILL.md) — new-module checklist
- [`persian-text-expert`](../.agents/persian-text-expert/SKILL.md) — Persian language domain reference
- [`iranian-validation-expert`](../.agents/iranian-validation-expert/SKILL.md) — checksum algorithm reference
- [`persian-test-author`](../.agents/persian-test-author/SKILL.md) — Vitest house style
- [`bundle-size-guardian`](../.agents/bundle-size-guardian/SKILL.md) — tree-shaking + `.skip.ts` convention
- [`persian-tools-release`](../.agents/persian-tools-release/SKILL.md) — release flow

## Adding or editing a skill

1. Each skill lives in `skills/<module-name>/SKILL.md` with valid YAML front-matter.
2. The `description` field is what the retriever matches on — include literal triggers (function names, Persian terms, common synonyms).
3. Cite `path:line` against the real source. If the source changes, the skill should change with it.
4. Cross-reference other skills by name (`see the X skill`) — never duplicate their content.
5. Update this README's table.

## External references

- Claude Code Skills spec: <https://docs.claude.com/en/docs/claude-code/skills>
- Source code: [`../src/modules/`](../src/modules/)
- Live docs (Mintlify): <https://persian-tools.usestrict.dev>
- npm package: <https://www.npmjs.com/package/@persian-tools/persian-tools>
