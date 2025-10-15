import { isPersian } from "../isPersian";
import { digitsEnToFa } from "../digits";
import { isString } from "../../helpers";
import { toPersianChars } from "../toPersianChars";
// Constants
import {
	PERSIAN_PUNCTUATION,
	ARABIC_PUNCTUATION,
	ENGLISH_PUNCTUATION,
	PERSIAN_VOWELS,
	PERSIAN_CONSONANTS,
	DIACRITICS,
	ARABIC_SPECIFIC_CHARS,
	STOPWORDS,
	FORMAL_INDICATORS,
	INFORMAL_INDICATORS,
	TECHNICAL_INDICATORS,
	SENTIMENT_POSITIVE,
	SENTIMENT_NEGATIVE,
	EMOTION_INDICATORS,
} from "./constants";

export interface TextStatistics {
	totalCharacters: number;
	totalWords: number;
	totalSentences: number;
	totalParagraphs: number;
	persianCharacters: number;
	arabicCharacters: number;
	englishCharacters: number;
	numbers: number;
	punctuation: number;
	spaces: number;
	diacritics: number;
	vowels: number;
	consonants: number;
	uniqueWords: number;
	averageWordLength: number;
	longestWord: string;
	shortestWord: string;
}

export interface TextRatios {
	persianRatio: number;
	arabicRatio: number;
	englishRatio: number;
	numberRatio: number;
	punctuationRatio: number;
	vowelRatio: number;
	consonantRatio: number;
	stopwordRatio: number;
	uniqueWordRatio: number;
}

export interface ReadabilityMetrics {
	averageWordsPerSentence: number;
	averageCharactersPerWord: number;
	averageSyllablesPerWord: number;
	complexity: "ساده" | "متوسط" | "پیچیده";
	readingTime: number;
	difficulty: "آسان" | "متوسط" | "سخت";
	fleschScore: number;
}

export interface LanguageDetection {
	primaryLanguage: "persian" | "arabic" | "english" | "mixed" | "unknown";
	confidence: number;
	isPurePersian: boolean;
	hasArabicChars: boolean;
	hasEnglishChars: boolean;
	dialectScore: number;
	formalityLevel: "رسمی" | "غیررسمی" | "متوسط";
}

export interface SentimentAnalysis {
	polarity: "مثبت" | "منفی" | "خنثی";
	score: number;
	emotions: {
		joy: number;
		sadness: number;
		anger: number;
		fear: number;
		surprise: number;
		disgust: number;
	};
	dominant_emotion: string;
}

export interface KeywordAnalysis {
	mostFrequentWords: Array<{ word: string; frequency: number }>;
	keywords: string[];
	technicalTerms: string[];
	entities: string[];
	topics: string[];
}

export interface StyleAnalysis {
	formalityScore: number;
	technicalScore: number;
	informalityScore: number;
	writingStyle: "علمی" | "ادبی" | "روزنامه‌نگاری" | "غیررسمی" | "تکنیکال";
	toneOfVoice: "رسمی" | "دوستانه" | "حرفه‌ای" | "عاطفی" | "خشک";
}

export interface TextAnalysisResult {
	originalText: string;
	cleanedText: string;
	statistics: TextStatistics;
	ratios: TextRatios;
	readability: ReadabilityMetrics;
	language: LanguageDetection;
	sentiment: SentimentAnalysis;
	keywords: KeywordAnalysis;
	style: StyleAnalysis;
	suggestions: string[];
	quality: {
		score: number;
		issues: string[];
		strengths: string[];
	};
}

export interface TextAnalyzerOptions {
	includeReadability?: boolean;
	includeSentiment?: boolean;
	includeKeywords?: boolean;
	includeStyle?: boolean;
	includeSuggestions?: boolean;
	wordsPerMinute?: number;
	keywordLimit?: number;
}

export function analyzeText(text: string, options: TextAnalyzerOptions = {}): TextAnalysisResult {
	if (!text || !isString(text)) {
		throw new Error("textAnalyzer: Input must be a non-empty string");
	}

	const {
		includeReadability = true,
		includeSentiment = true,
		includeKeywords = true,
		includeStyle = true,
		includeSuggestions = true,
		wordsPerMinute = 200,
		keywordLimit = 10,
	} = options;

	const originalText = text;
	const cleanedText = toPersianChars(text.trim());

	const statistics = calculateStatistics(cleanedText);
	const ratios = calculateRatios(statistics);
	const readability =
		includeReadability ? calculateReadability(cleanedText, statistics, wordsPerMinute) : getDefaultReadability();
	const language = detectLanguage(cleanedText, statistics);
	const sentiment = includeSentiment ? analyzeSentiment(cleanedText) : getDefaultSentiment();
	const keywords = includeKeywords ? analyzeKeywords(cleanedText, keywordLimit) : getDefaultKeywords();
	const style = includeStyle ? analyzeStyle(cleanedText, statistics) : getDefaultStyle();
	const suggestions =
		includeSuggestions ? generateSuggestions(cleanedText, language, statistics, sentiment, style) : [];
	const quality = assessQuality(statistics, readability, language);

	return {
		originalText,
		cleanedText,
		statistics,
		ratios,
		readability,
		language,
		sentiment,
		keywords,
		style,
		suggestions,
		quality,
	};
}

function calculateStatistics(text: string): TextStatistics {
	const characters = text.split("");

	let persianChars = 0;
	let arabicChars = 0;
	let englishChars = 0;
	let numbers = 0;
	let punctuation = 0;
	let spaces = 0;
	let diacritics = 0;
	let vowels = 0;
	let consonants = 0;

	for (const char of characters) {
		if (/\s/.test(char)) {
			spaces++;
		} else if (/[0-9۰-۹]/.test(char)) {
			numbers++;
		} else if (DIACRITICS.includes(char)) {
			diacritics++;
		} else if (PERSIAN_VOWELS.includes(char)) {
			vowels++;
			persianChars++;
		} else if (PERSIAN_CONSONANTS.includes(char)) {
			consonants++;
			persianChars++;
		} else if (/[\u0600-\u06FF]/.test(char)) {
			if (ARABIC_SPECIFIC_CHARS.includes(char)) {
				arabicChars++;
			} else {
				persianChars++;
			}
		} else if (/[a-zA-Z]/.test(char)) {
			englishChars++;
		} else if (isPunctuationChar(char)) {
			punctuation++;
		}
	}

	const words = text.split(/\s+/).filter((word) => word.length > 0);
	const sentences = text.split(/[.!?؟]/).filter((sentence) => sentence.trim().length > 0);
	const paragraphs = text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0);

	const uniqueWords = new Set(words.map((word) => word.toLowerCase())).size;
	const wordLengths = words.map((word) => word.length);
	const averageWordLength = wordLengths.length > 0 ? wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length : 0;
	const longestWord = words.reduce((longest, current) => (current.length > longest.length ? current : longest), "");
	const shortestWord = words.reduce(
		(shortest, current) => (current.length < shortest.length ? current : shortest),
		words[0] || "",
	);

	return {
		totalCharacters: text.length,
		totalWords: words.length,
		totalSentences: sentences.length,
		totalParagraphs: Math.max(paragraphs.length, 1),
		persianCharacters: persianChars,
		arabicCharacters: arabicChars,
		englishCharacters: englishChars,
		numbers,
		punctuation,
		spaces,
		diacritics,
		vowels,
		consonants,
		uniqueWords,
		averageWordLength,
		longestWord,
		shortestWord,
	};
}

function calculateRatios(stats: TextStatistics): TextRatios {
	const total = stats.totalCharacters || 1;
	const totalWords = stats.totalWords || 1;

	const stopwordCount = countStopwords(stats);

	return {
		persianRatio: stats.persianCharacters / total,
		arabicRatio: stats.arabicCharacters / total,
		englishRatio: stats.englishCharacters / total,
		numberRatio: stats.numbers / total,
		punctuationRatio: stats.punctuation / total,
		vowelRatio: stats.vowels / (stats.vowels + stats.consonants || 1),
		consonantRatio: stats.consonants / (stats.vowels + stats.consonants || 1),
		stopwordRatio: stopwordCount / totalWords,
		uniqueWordRatio: stats.uniqueWords / totalWords,
	};
}

function calculateReadability(text: string, stats: TextStatistics, wordsPerMinute: number): ReadabilityMetrics {
	const averageWordsPerSentence = stats.totalWords / (stats.totalSentences || 1);
	const averageCharactersPerWord = (stats.totalCharacters - stats.spaces) / (stats.totalWords || 1);
	const averageSyllablesPerWord = estimateSyllables(text, stats.totalWords);
	const readingTime = Math.ceil(stats.totalWords / wordsPerMinute);

	let complexity: "ساده" | "متوسط" | "پیچیده" = "ساده";
	let difficulty: "آسان" | "متوسط" | "سخت" = "آسان";

	if (averageWordsPerSentence > 20 || averageCharactersPerWord > 8) {
		complexity = "پیچیده";
		difficulty = "سخت";
	} else if (averageWordsPerSentence > 15 || averageCharactersPerWord > 6) {
		complexity = "متوسط";
		difficulty = "متوسط";
	}

	const fleschScore = calculateFleschScore(averageWordsPerSentence, averageSyllablesPerWord);

	return {
		averageWordsPerSentence,
		averageCharactersPerWord,
		averageSyllablesPerWord,
		complexity,
		readingTime,
		difficulty,
		fleschScore,
	};
}

function detectLanguage(text: string, stats: TextStatistics): LanguageDetection {
	const total = stats.persianCharacters + stats.arabicCharacters + stats.englishCharacters;

	if (total === 0) {
		return {
			primaryLanguage: "unknown",
			confidence: 0,
			isPurePersian: false,
			hasArabicChars: false,
			hasEnglishChars: false,
			dialectScore: 0,
			formalityLevel: "متوسط",
		};
	}

	const persianRatio = stats.persianCharacters / total;
	const arabicRatio = stats.arabicCharacters / total;
	const englishRatio = stats.englishCharacters / total;

	let primaryLanguage: "persian" | "arabic" | "english" | "mixed" | "unknown";
	let confidence: number;

	if (persianRatio > 0.7) {
		primaryLanguage = "persian";
		confidence = persianRatio * 100;
	} else if (arabicRatio > 0.7) {
		primaryLanguage = "arabic";
		confidence = arabicRatio * 100;
	} else if (englishRatio > 0.7) {
		primaryLanguage = "english";
		confidence = englishRatio * 100;
	} else {
		primaryLanguage = "mixed";
		confidence = Math.max(persianRatio, arabicRatio, englishRatio) * 100;
	}

	const dialectScore = calculateDialectScore(text);
	const formalityLevel = calculateFormalityLevel(text);

	return {
		primaryLanguage,
		confidence,
		isPurePersian: isPersian(text),
		hasArabicChars: stats.arabicCharacters > 0,
		hasEnglishChars: stats.englishCharacters > 0,
		dialectScore,
		formalityLevel,
	};
}

function analyzeSentiment(text: string): SentimentAnalysis {
	const words = text.toLowerCase().split(/\s+/);

	let positiveScore = 0;
	let negativeScore = 0;

	const emotions = {
		joy: 0,
		sadness: 0,
		anger: 0,
		fear: 0,
		surprise: 0,
		disgust: 0,
	};

	for (const word of words) {
		if (SENTIMENT_POSITIVE.includes(word)) {
			positiveScore++;
		}
		if (SENTIMENT_NEGATIVE.includes(word)) {
			negativeScore++;
		}

		// Check emotions
		for (const [emotion, indicators] of Object.entries(EMOTION_INDICATORS)) {
			if (indicators.includes(word)) {
				emotions[emotion as keyof typeof emotions]++;
			}
		}
	}

	const totalSentiment = positiveScore + negativeScore;
	let polarity: "مثبت" | "منفی" | "خنثی" = "خنثی";
	let score = 0;

	if (totalSentiment > 0) {
		score = (positiveScore - negativeScore) / totalSentiment;
		if (score > 0.1) {
			polarity = "مثبت";
		} else if (score < -0.1) {
			polarity = "منفی";
		}
	}

	const dominant_emotion = Object.entries(emotions).reduce(
		(max, [emotion, value]) => (value > max.value ? { emotion, value } : max),
		{ emotion: "joy", value: 0 },
	).emotion;

	return {
		polarity,
		score,
		emotions,
		dominant_emotion,
	};
}

function analyzeKeywords(text: string, limit: number): KeywordAnalysis {
	const words = text
		.toLowerCase()
		.split(/\s+/)
		.filter((word) => word.length > 2);
	const wordFreq: Record<string, number> = {};

	// Count word frequencies
	for (const word of words) {
		if (!STOPWORDS.includes(word)) {
			wordFreq[word] = (wordFreq[word] || 0) + 1;
		}
	}

	const mostFrequentWords = Object.entries(wordFreq)
		.sort(([, a], [, b]) => b - a)
		.slice(0, limit)
		.map(([word, frequency]) => ({ word, frequency }));

	const keywords = mostFrequentWords.map((item) => item.word);

	const technicalTerms = words.filter((word) => TECHNICAL_INDICATORS.includes(word));

	// Simple entity extraction (proper nouns - words starting with capital letters)
	const entities = text
		.split(/\s+/)
		.filter((word) => /^[آ-ی]/.test(word) && word[0] === word[0].toUpperCase())
		.filter((word, index, arr) => arr.indexOf(word) === index);

	const topics = extractTopics(mostFrequentWords);

	return {
		mostFrequentWords,
		keywords,
		technicalTerms,
		entities,
		topics,
	};
}

function analyzeStyle(text: string, stats: TextStatistics): StyleAnalysis {
	const words = text.toLowerCase().split(/\s+/);

	let formalScore = 0;
	let technicalScore = 0;
	let informalScore = 0;

	for (const word of words) {
		if (FORMAL_INDICATORS.includes(word)) {
			formalScore++;
		}
		if (TECHNICAL_INDICATORS.includes(word)) {
			technicalScore++;
		}
		if (INFORMAL_INDICATORS.includes(word)) {
			informalScore++;
		}
	}

	const totalWords = stats.totalWords || 1;
	const formalityScore = formalScore / totalWords;
	const technicalScoreNorm = technicalScore / totalWords;
	const informalityScore = informalScore / totalWords;

	let writingStyle: "علمی" | "ادبی" | "روزنامه‌نگاری" | "غیررسمی" | "تکنیکال" = "غیررسمی";
	let toneOfVoice: "رسمی" | "دوستانه" | "حرفه‌ای" | "عاطفی" | "خشک" = "دوستانه";

	if (technicalScoreNorm > 0.05) {
		writingStyle = "تکنیکال";
		toneOfVoice = "حرفه‌ای";
	} else if (formalityScore > 0.03) {
		writingStyle = "علمی";
		toneOfVoice = "رسمی";
	} else if (stats.averageWordLength > 6) {
		writingStyle = "ادبی";
		toneOfVoice = "عاطفی";
	} else if (informalityScore > 0.02) {
		writingStyle = "غیررسمی";
		toneOfVoice = "دوستانه";
	} else {
		writingStyle = "روزنامه‌نگاری";
		toneOfVoice = "خشک";
	}

	return {
		formalityScore,
		technicalScore: technicalScoreNorm,
		informalityScore,
		writingStyle,
		toneOfVoice,
	};
}

function generateSuggestions(
	text: string,
	language: LanguageDetection,
	stats: TextStatistics,
	sentiment: SentimentAnalysis,
	style: StyleAnalysis,
): string[] {
	const suggestions: string[] = [];

	if (language.hasArabicChars && !language.isPurePersian) {
		suggestions.push("برای بهبود خوانایی، حروف عربی را به فارسی تبدیل کنید");
	}

	if (stats.diacritics > 0) {
		suggestions.push("اعراب‌گذاری در متن فارسی معمولاً ضروری نیست");
	}

	if (hasEnglishNumbers(text)) {
		suggestions.push("اعداد انگلیسی را به فارسی تبدیل کنید");
	}

	if (stats.totalSentences > 0 && stats.totalWords / stats.totalSentences > 25) {
		suggestions.push("جملات بسیار طولانی هستند، آن‌ها را کوتاه‌تر کنید");
	}

	if (language.primaryLanguage === "mixed") {
		suggestions.push("متن حاوی زبان‌های مختلط است، یکسان‌سازی زبان را در نظر بگیرید");
	}

	if (stats.uniqueWords / stats.totalWords < 0.5) {
		suggestions.push("تنوع واژگان کم است، از کلمات متنوع‌تری استفاده کنید");
	}

	if (sentiment.polarity === "منفی" && sentiment.score < -0.5) {
		suggestions.push("لحن متن منفی است، در نظر داشته باشید که این ممکن است بر خواننده تأثیر بگذارد");
	}

	if (style.writingStyle === "غیررسمی" && style.formalityScore < 0.01) {
		suggestions.push("برای مخاطبان رسمی، استفاده از زبان رسمی‌تر توصیه می‌شود");
	}

	return suggestions;
}

function assessQuality(
	stats: TextStatistics,
	readability: ReadabilityMetrics,
	language: LanguageDetection,
): { score: number; issues: string[]; strengths: string[] } {
	let score = 100;
	const issues: string[] = [];
	const strengths: string[] = [];

	// Language consistency
	if (language.isPurePersian) {
		strengths.push("متن از نظر زبانی یکدست است");
	} else {
		score -= 10;
		issues.push("عدم یکدستی زبان");
	}

	// Readability
	if (readability.complexity === "ساده") {
		strengths.push("متن خوانایی مناسبی دارد");
	} else if (readability.complexity === "پیچیده") {
		score -= 15;
		issues.push("پیچیدگی بالای متن");
	}

	// Word diversity
	if (stats.uniqueWords / stats.totalWords > 0.7) {
		strengths.push("تنوع واژگان مناسب");
	} else if (stats.uniqueWords / stats.totalWords < 0.4) {
		score -= 10;
		issues.push("تنوع واژگان کم");
	}

	// Sentence structure
	const avgWordsPerSentence = readability.averageWordsPerSentence;
	if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
		strengths.push("طول جملات مناسب");
	} else {
		score -= 5;
		issues.push(avgWordsPerSentence > 20 ? "جملات خیلی طولانی" : "جملات خیلی کوتاه");
	}

	// Diacritics
	if (stats.diacritics > stats.totalCharacters * 0.1) {
		score -= 5;
		issues.push("استفاده زیاد از اعراب");
	}

	return {
		score: Math.max(0, score),
		issues,
		strengths,
	};
}

// Helper functions
function isPunctuationChar(char: string): boolean {
	return [...PERSIAN_PUNCTUATION, ...ARABIC_PUNCTUATION, ...ENGLISH_PUNCTUATION].includes(char);
}

function hasEnglishNumbers(text: string): boolean {
	return /[0-9]/.test(text);
}

function countStopwords(stats: TextStatistics): number {
	// This is a simplified implementation
	// In a real implementation, you'd parse the actual text
	return Math.floor(stats.totalWords * 0.3); // Estimate
}

function estimateSyllables(text: string, totalWords: number): number {
	// Simplified syllable estimation for Persian
	// In Persian, syllables are roughly proportional to vowels
	const vowelCount = PERSIAN_VOWELS.reduce((count, vowel) => {
		return count + (text.match(new RegExp(vowel, "g")) || []).length;
	}, 0);

	return totalWords > 0 ? vowelCount / totalWords : 0;
}

function calculateFleschScore(avgWordsPerSentence: number, avgSyllablesPerWord: number): number {
	// Adapted Flesch Reading Ease for Persian
	return 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
}

function calculateDialectScore(text: string): number {
	// Simplified dialect detection
	const dialectWords = ["واسه", "اینا", "اونا", "اینو", "اونو"];
	const words = text.toLowerCase().split(/\s+/);
	const dialectCount = words.filter((word) => dialectWords.includes(word)).length;
	return dialectCount / words.length;
}

function calculateFormalityLevel(text: string): "رسمی" | "غیررسمی" | "متوسط" {
	const words = text.toLowerCase().split(/\s+/);
	let formalCount = 0;
	let informalCount = 0;

	for (const word of words) {
		if (FORMAL_INDICATORS.includes(word)) formalCount++;
		if (INFORMAL_INDICATORS.includes(word)) informalCount++;
	}

	if (formalCount > informalCount) return "رسمی";
	if (informalCount > formalCount) return "غیررسمی";
	return "متوسط";
}

function extractTopics(mostFrequentWords: Array<{ word: string; frequency: number }>): string[] {
	// Simple topic extraction based on frequent words
	return mostFrequentWords
		.filter((item) => item.frequency > 2)
		.slice(0, 5)
		.map((item) => item.word);
}

// Default return objects
function getDefaultReadability(): ReadabilityMetrics {
	return {
		averageWordsPerSentence: 0,
		averageCharactersPerWord: 0,
		averageSyllablesPerWord: 0,
		complexity: "ساده",
		readingTime: 0,
		difficulty: "آسان",
		fleschScore: 0,
	};
}

function getDefaultSentiment(): SentimentAnalysis {
	return {
		polarity: "خنثی",
		score: 0,
		emotions: {
			joy: 0,
			sadness: 0,
			anger: 0,
			fear: 0,
			surprise: 0,
			disgust: 0,
		},
		dominant_emotion: "joy",
	};
}

function getDefaultKeywords(): KeywordAnalysis {
	return {
		mostFrequentWords: [],
		keywords: [],
		technicalTerms: [],
		entities: [],
		topics: [],
	};
}

function getDefaultStyle(): StyleAnalysis {
	return {
		formalityScore: 0,
		technicalScore: 0,
		informalityScore: 0,
		writingStyle: "غیررسمی",
		toneOfVoice: "دوستانه",
	};
}

// Quick helper functions
export function getTextSummary(text: string): string {
	const analysis = analyzeText(text, { includeSuggestions: false });

	return (
		`متن شامل ${analysis.statistics.totalWords} کلمه در ${analysis.statistics.totalSentences} جمله است. ` +
		`زبان اصلی: ${getLanguageName(analysis.language.primaryLanguage)} ` +
		`(${Math.round(analysis.language.confidence)}% اطمینان). ` +
		`پیچیدگی: ${analysis.readability.complexity}. ` +
		`احساسات: ${analysis.sentiment.polarity}. ` +
		`زمان مطالعه تقریبی: ${analysis.readability.readingTime} دقیقه.`
	);
}

export function getTextComplexity(text: string): "ساده" | "متوسط" | "پیچیده" {
	const analysis = analyzeText(text, { includeSuggestions: false });
	return analysis.readability.complexity;
}

export function getTextSentiment(text: string): "مثبت" | "منفی" | "خنثی" {
	const analysis = analyzeText(text, { includeSuggestions: false });
	return analysis.sentiment.polarity;
}

export function getTextKeywords(text: string, limit = 5): string[] {
	const analysis = analyzeText(text, { includeSuggestions: false, keywordLimit: limit });
	return analysis.keywords.keywords;
}

export function cleanText(text: string): string {
	let cleaned = toPersianChars(text);

	// Remove diacritics
	cleaned = cleaned.replace(/[ًٌٍَُِّْ]/g, "");

	// Convert English numbers to Persian
	cleaned = digitsEnToFa(cleaned);

	// Normalize spaces
	cleaned = cleaned.replace(/\s+/g, " ");

	// Remove extra punctuation
	cleaned = cleaned.replace(/([.!?؟])\1+/g, "$1");

	return cleaned.trim();
}

export function normalizeText(text: string): string {
	let normalized = cleanText(text);

	// Normalize Arabic characters to Persian
	normalized = toPersianChars(normalized);

	// Remove zero-width characters
	// eslint-disable-next-line no-misleading-character-class
	normalized = normalized.replace(/[\u200B\u200C\u200D\uFEFF]/g, "");

	// Fix common typos
	normalized = normalized.replace(/ي/g, "ی").replace(/ك/g, "ک");

	return normalized;
}

function getLanguageName(language: string): string {
	const names: Record<string, string> = {
		persian: "فارسی",
		arabic: "عربی",
		english: "انگلیسی",
		mixed: "مختلط",
		unknown: "نامشخص",
	};

	return names[language] || "نامشخص";
}
