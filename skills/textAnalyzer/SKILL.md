---
name: textAnalyzer
description: Run a full multi-dimensional analysis on Persian text — character/word counts, language ratios, readability, sentiment, keyword extraction, formality, and quality scoring. Use when building Persian writing assistants, content moderation, SEO scoring, or post-editor analytics. Triggers on mentions of analyzeText, textAnalyzer, Persian text analysis, تحلیل متن, readability Farsi, sentiment Persian, getTextSummary.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# textAnalyzer — Persian text analysis

```ts
import {
  analyzeText,
  getTextSummary,
  getTextComplexity,
  getTextSentiment,
  getTextKeywords,
  cleanText,
  normalizeText,
} from "@persian-tools/persian-tools";
// CommonJS
const {
  analyzeText,
  getTextSummary,
  getTextComplexity,
  getTextSentiment,
  getTextKeywords,
  cleanText,
  normalizeText,
} = require("@persian-tools/persian-tools");
```

## Public exports

```ts
// Main API
analyzeText(text: string, options?: TextAnalyzerOptions): TextAnalysisResult

// Convenience helpers
getTextSummary(text: string): string
getTextComplexity(text: string): "ساده" | "متوسط" | "پیچیده"
getTextSentiment(text: string): "مثبت" | "منفی" | "خنثی"
getTextKeywords(text: string, limit?: number): string[]
cleanText(text: string): string
normalizeText(text: string): string

// Types
interface TextStatistics { ... }
interface TextRatios { ... }
interface ReadabilityMetrics { ... }
interface LanguageDetection { ... }
interface SentimentAnalysis { ... }
interface KeywordAnalysis { ... }
interface StyleAnalysis { ... }
interface TextAnalysisResult { ... }
interface TextAnalyzerOptions { ... }
```

> The main function is **`analyzeText`**, not `textAnalyzer`. Older docs use the latter — it does not exist.

## TextAnalysisResult shape

```ts
{
  originalText: string;
  cleanedText: string;
  statistics: TextStatistics;     // counts: characters, words, sentences, persian/arabic/english chars, ...
  ratios: TextRatios;             // persianRatio, arabicRatio, englishRatio, numberRatio, ...
  readability: ReadabilityMetrics;// complexity, readingTime, avgWordsPerSentence, ...
  language: LanguageDetection;    // primaryLanguage, confidence, isPurePersian
  sentiment: SentimentAnalysis;   // overall sentiment + indicators
  keywords: KeywordAnalysis;      // top keywords + frequency
  style: StyleAnalysis;           // formality / register
  suggestions: string[];          // editorial hints
  quality: ...;
}
```

The result is **not** a flat `{ characters, words, lines }` triple — older docs claim it is. Access fields via the nested objects above.

## Basic usage

```ts
import { analyzeText } from "@persian-tools/persian-tools";

const a = analyzeText("این یک متن فارسی است.");

a.statistics.totalWords;             // 5
a.statistics.totalCharacters;        // 20
a.statistics.persianCharacters;      // 15
a.language.primaryLanguage;          // "persian"
a.language.confidence;               // 95
a.language.isPurePersian;            // true
a.readability.complexity;            // "ساده"
a.readability.readingTime;           // 1 (minutes)
a.readability.averageWordsPerSentence; // 5
```

## Convenience helpers

For one-shot lookups without the full result:

```ts
import {
  getTextSummary,
  getTextComplexity,
  getTextSentiment,
  getTextKeywords,
} from "@persian-tools/persian-tools";

getTextSummary("سلام دنیا");
// "متن شامل 2 کلمه در 1 جمله است. زبان اصلی: فارسی (100% اطمینان). زمان مطالعه تقریبی: 1 دقیقه."

getTextComplexity("این جمله ساده است");   // "ساده"
getTextSentiment("امروز روز خوبی بود");    // "مثبت"
getTextKeywords(longArticle, 5);            // top-5 keywords
```

Each helper calls `analyzeText` internally and extracts one slice. If you need multiple metrics, call `analyzeText` once and read the fields — don't call multiple helpers on the same text (wasteful re-analysis).

## cleanText / normalizeText

- `cleanText(text)` — applies the analyzer's *display* clean pass (digit conversion, diacritic strip, spacing fixes). Returns a string.
- `normalizeText(text)` — applies the *match-key* normalization (used internally before counting). Use it if you want to compare two pieces of Persian text for semantic equality.

```ts
cleanText("سَلامٌ   123   دنیا");   // "سلام ۱۲۳ دنیا"
```

## Performance

This is the **heaviest** utility in the library — it runs ~10 sub-analyses on the input. For real-time per-keystroke analysis, debounce. For batch jobs, prefer the convenience helpers if you only need one signal.

## Common pitfalls

- **Function name is `analyzeText`, not `textAnalyzer`.** Old docs are wrong.
- **Return shape is deeply nested.** Don't expect flat `{ characters, words, lines }`.
- **`isPurePersian` requires no Arabic-specific letters and no other-language tokens.** Mixed-language posts will return `false`.
- **Sentiment is rule-based (indicator-word lookup), not ML.** Acceptable for triage, not for nuanced sentiment grading.

## References

- Tests: `test/textAnalyzer.spec.ts`
- Related: `isPersian`, `toPersianChars`, `slugify` skills
