# persian-tools — Agent Skills

This directory contains **Agent Skills** — focused, file-based instructions that guide AI coding agents (Claude, Copilot, Gemini, Cursor, etc.) when they work on the `@persian-tools/persian-tools` codebase.

Each skill is a self-contained directory with a `SKILL.md` file. The `SKILL.md` front-matter follows the [Claude Code Skills specification](https://docs.claude.com/en/docs/claude-code/skills):

```yaml
---
name: <kebab-case-name>
description: <when an agent should load this skill>
---
```

Agents discover skills by matching the *user's request* against each skill's `description`. The `description` is therefore written to maximize retrieval — it lists the concrete triggers, file types, and synonyms an agent is likely to encounter.

## Available skills

| Skill | When to use |
|---|---|
| [`persian-module-author`](./persian-module-author/SKILL.md) | Adding a new utility under `src/modules/<name>/`. Encodes the directory layout, `index.ts` re-export rule, JSDoc tags, error-message format, and pre-PR checklist. |
| [`persian-text-expert`](./persian-text-expert/SKILL.md) | Any work touching Persian/Arabic text — characters, ZWNJ/half-space, digit conversion, RTL, normalization. The domain reference. |
| [`iranian-validation-expert`](./iranian-validation-expert/SKILL.md) | Validating or generating Iranian identifiers — National ID, Legal ID, card number (Luhn + BIN), Sheba/IBAN (ISO 7064 mod-97), bill ID, phone, plate. Lists the existing function for each and the algorithm behind it. |
| [`persian-test-author`](./persian-test-author/SKILL.md) | Writing Vitest specs that match the repo's house style — exact error-message assertion shape, parameterized cases, edge-case checklist. |
| [`bundle-size-guardian`](./bundle-size-guardian/SKILL.md) | Anything that may grow the published bundle — new dataset, new dependency, refactor. Explains the `.skip.ts` convention, the 860 kB JS / 100 kB types budget, and `sideEffects: false`. |
| [`persian-tools-release`](./persian-tools-release/SKILL.md) | Cutting a release — `standard-version`, Conventional Commits, beta dist-tag, pre-flight checks, rollback. |

## How the skills compose

The skills are designed to **link to each other** rather than duplicate domain knowledge:

```
persian-module-author
   ├── load before writing any new module
   ├── delegates Persian language details → persian-text-expert
   ├── delegates validator algorithms     → iranian-validation-expert
   ├── delegates test patterns            → persian-test-author
   └── delegates size constraints         → bundle-size-guardian

persian-tools-release
   └── delegates size diagnosis           → bundle-size-guardian
```

When you load `persian-module-author`, you do not get a 1,000-line monolith — you get a checklist that says "load `persian-test-author` when you reach step 8." This matches how the codebase itself composes helpers instead of duplicating logic.

## Adding or editing a skill

1. Create `skills/<kebab-name>/SKILL.md` with the front-matter shown above.
2. Make the `description` **specific to triggers** — list the literal phrases a user is likely to say, plus the file types or directories the skill applies to. A vague description means the skill won't be retrieved when it's needed.
3. Cite files with `path:line` references. Future agents grep these, not your prose.
4. Cross-reference other skills by name; don't restate their content.
5. Add a row to the table above.

### Lint your skill before committing

- Front-matter: valid YAML, `name` is kebab-case and matches the directory name, `description` < 1,024 characters.
- File paths in the body resolve in the current tree (`Read`-able from repo root).
- No duplicate authoritative claims — defer to the canonical skill instead.
- Examples compile against the current `src/` (no stale type names).

## References — repo-wide instructions these skills are built on top of

The skills here are **operational**. They reference (and assume familiarity with) the higher-level repo guidance:

- [`AGENTS.md`](../AGENTS.md) — general agent guidelines
- [`AI_AGENTS_README.md`](../AI_AGENTS_README.md) — multi-agent setup overview
- [`.github/instructions/typescript.instructions.md`](../.github/instructions/typescript.instructions.md)
- [`.github/instructions/testing.instructions.md`](../.github/instructions/testing.instructions.md)
- [`.github/instructions/persian-language.instructions.md`](../.github/instructions/persian-language.instructions.md)
- [`.github/instructions/api-design.instructions.md`](../.github/instructions/api-design.instructions.md)

Each `SKILL.md` here translates the relevant pieces of those documents into a single-purpose, retrievable instruction file with code-level specifics.

## External references

- Claude Code Skills: <https://docs.claude.com/en/docs/claude-code/skills>
- Conventional Commits: <https://www.conventionalcommits.org/>
- `standard-version`: <https://github.com/conventional-changelog/standard-version>
- `size-limit`: <https://github.com/ai/size-limit>
- ISO 7064 (Sheba/IBAN check): <https://www.iso.org/standard/31531.html>
- Unicode Arabic block (includes Persian extensions): <https://www.unicode.org/charts/PDF/U0600.pdf>
