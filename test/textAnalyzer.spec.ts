import { describe, it, expect } from "vitest";
import { analyzeText, getTextSummary, getTextComplexity, cleanText } from "../src/modules/textAnalyzer";

describe.skip("textAnalyzer", () => {
	describe("Basic analysis", () => {
		it("should analyze simple Persian text", () => {
			const result = analyzeText("سلام دنیا");

			expect(result.originalText).toBe("سلام دنیا");
			expect(result.cleanedText).toBe("سلام دنیا");
			expect(result.statistics.totalWords).toBe(2);
			expect(result.statistics.totalCharacters).toBe(9); // including space
			expect(result.language.primaryLanguage).toBe("persian");
		});

		it("should throw error for invalid input", () => {
			expect(() => analyzeText("")).toThrow("textAnalyzer: Input must be a non-empty string");
			expect(() => analyzeText(null as any)).toThrow("textAnalyzer: Input must be a non-empty string");
		});

		it("should handle mixed content", () => {
			const result = analyzeText("سلام Hello دنیا");
			expect(result.language.primaryLanguage).toBe("mixed");
			expect(result.language.hasEnglishChars).toBe(true);
		});
	});

	describe("Statistics calculation", () => {
		it("should count characters correctly", () => {
			const result = analyzeText("سلام");
			expect(result.statistics.totalCharacters).toBe(4);
			expect(result.statistics.persianCharacters).toBe(4);
			expect(result.statistics.spaces).toBe(0);
		});

		it("should count words correctly", () => {
			const result = analyzeText("این یک متن فارسی است");
			expect(result.statistics.totalWords).toBe(5);
		});

		it("should count sentences correctly", () => {
			const result = analyzeText("سلام. چطوری؟ خوبم!");
			expect(result.statistics.totalSentences).toBe(3);
		});

		it("should count paragraphs correctly", () => {
			const result = analyzeText("پاراگراف اول\n\nپاراگراف دوم");
			expect(result.statistics.totalParagraphs).toBe(2);
		});

		it("should count numbers correctly", () => {
			const result = analyzeText("سال ۱۴۰۰ و 2023");
			expect(result.statistics.numbers).toBe(7); // ۱۴۰۰ + 2023
		});

		it("should count punctuation correctly", () => {
			const result = analyzeText("سلام، چطوری؟");
			expect(result.statistics.punctuation).toBe(2); // ، and ؟
		});

		it("should count diacritics correctly", () => {
			const result = analyzeText("سَلامٌ");
			expect(result.statistics.diacritics).toBe(2); // َ and ٌ
		});

		it("should distinguish vowels and consonants", () => {
			const result = analyzeText("سلام");
			expect(result.statistics.vowels).toBeGreaterThan(0);
			expect(result.statistics.consonants).toBeGreaterThan(0);
		});
	});

	describe("Language detection", () => {
		it("should detect pure Persian text", () => {
			const result = analyzeText("این یک متن فارسی است");
			expect(result.language.primaryLanguage).toBe("persian");
			expect(result.language.isPurePersian).toBe(true);
			expect(result.language.confidence).toBeGreaterThan(90);
		});

		it("should detect Arabic characters", () => {
			const result = analyzeText("ذکریا قاضی");
			expect(result.language.hasArabicChars).toBe(true);
		});

		it("should detect English characters", () => {
			const result = analyzeText("سلام Hello");
			expect(result.language.hasEnglishChars).toBe(true);
			expect(result.language.primaryLanguage).toBe("mixed");
		});

		it("should handle pure English text", () => {
			const result = analyzeText("Hello World");
			expect(result.language.primaryLanguage).toBe("english");
		});

		it("should handle numbers and symbols", () => {
			const result = analyzeText("123 !@# $$");
			expect(result.language.primaryLanguage).toBe("unknown");
			expect(result.language.confidence).toBe(0);
		});
	});

	describe("Readability analysis", () => {
		it("should calculate reading statistics", () => {
			const result = analyzeText("این یک متن ساده است. خوب است.");

			expect(result.readability.averageWordsPerSentence).toBeGreaterThan(0);
			expect(result.readability.averageCharactersPerWord).toBeGreaterThan(0);
			expect(result.readability.readingTime).toBeGreaterThan(0);
		});

		it("should determine text complexity", () => {
			const simpleText = "سلام. خوبی؟";
			const complexText =
				"این یک متن بسیار پیچیده و طولانی است که شامل جملات بسیار پیچیده و کلمات دشوار می‌باشد.";

			const simple = analyzeText(simpleText);
			const complex = analyzeText(complexText);

			expect(simple.readability.complexity).toBe("ساده");
			expect(complex.readability.complexity).toBe("پیچیده");
		});

		it("should calculate reading time", () => {
			const result = analyzeText("سلام دنیا", { wordsPerMinute: 100 });
			expect(result.readability.readingTime).toBe(1); // minimum 1 minute
		});
	});

	describe("Ratio calculations", () => {
		it("should calculate character ratios", () => {
			const result = analyzeText("سلام Hello");

			expect(result.ratios.persianRatio).toBeGreaterThan(0);
			expect(result.ratios.englishRatio).toBeGreaterThan(0);
			expect(result.ratios.persianRatio + result.ratios.englishRatio).toBeLessThanOrEqual(1);
		});

		it("should calculate vowel/consonant ratios", () => {
			const result = analyzeText("سلام");

			expect(result.ratios.vowelRatio).toBeGreaterThan(0);
			expect(result.ratios.consonantRatio).toBeGreaterThan(0);
			expect(result.ratios.vowelRatio + result.ratios.consonantRatio).toBeCloseTo(1, 1);
		});
	});

	describe("Suggestions", () => {
		it("should suggest Arabic to Persian conversion", () => {
			const result = analyzeText("علي احمد"); // Arabic ya
			expect(result.suggestions).toContain("برای بهبود خوانایی، حروف عربی را به فارسی تبدیل کنید");
		});

		it("should suggest removing diacritics", () => {
			const result = analyzeText("سَلامٌ");
			expect(result.suggestions).toContain("اعراب‌گذاری در متن فارسی معمولاً ضروری نیست");
		});

		it("should suggest English to Persian number conversion", () => {
			const result = analyzeText("سال 2023");
			expect(result.suggestions).toContain("اعداد انگلیسی را به فارسی تبدیل کنید");
		});

		it("should suggest shortening long sentences", () => {
			const longSentence = "این جمله بسیار طولانی است " + "و کلمات زیادی دارد ".repeat(10);
			const result = analyzeText(longSentence);
			expect(result.suggestions).toContain("جملات بسیار طولانی هستند، آن‌ها را کوتاه‌تر کنید");
		});

		it("should suggest language unification for mixed text", () => {
			const result = analyzeText("سلام Hello مرحبا");
			expect(result.suggestions).toContain("متن حاوی زبان‌های مختلط است، یکسان‌سازی زبان را در نظر بگیرید");
		});

		it("should not include suggestions when disabled", () => {
			const result = analyzeText("سَلامٌ", { includeSuggestions: false });
			expect(result.suggestions).toEqual([]);
		});
	});

	describe("Options", () => {
		it("should respect includeDetailedStats option", () => {
			const result = analyzeText("سلام", { includeDetailedStats: false });
			expect(result.statistics).toBeDefined();
		});

		it("should respect includeReadability option", () => {
			const result = analyzeText("سلام", { includeReadability: false });
			expect(result.readability.averageWordsPerSentence).toBe(0);
			expect(result.readability.complexity).toBe("ساده");
		});

		it("should respect custom wordsPerMinute", () => {
			const result = analyzeText("سلام دنیا", { wordsPerMinute: 50 });
			expect(result.readability.readingTime).toBeGreaterThan(0);
		});
	});

	describe("Helper functions", () => {
		it("should generate text summary", () => {
			const summary = getTextSummary("سلام دنیا. چطوری؟");
			expect(summary).toContain("3 کلمه");
			expect(summary).toContain("2 جمله");
			expect(summary).toContain("فارسی");
		});

		it("should determine text complexity", () => {
			expect(getTextComplexity("سلام")).toBe("ساده");
		});

		it("should clean text", () => {
			const dirty = "سَلامٌ   123   دنیا";
			const clean = cleanText(dirty);
			expect(clean).toBe("سلام ۱۲۳ دنیا");
		});
	});

	describe("Edge cases", () => {
		it("should handle text with only spaces", () => {
			const result = analyzeText("   ");
			expect(result.statistics.totalWords).toBe(0);
			expect(result.statistics.spaces).toBe(3);
		});

		it("should handle text with only punctuation", () => {
			const result = analyzeText("!@#$%");
			expect(result.language.primaryLanguage).toBe("unknown");
		});

		it("should handle very long text", () => {
			const longText = "سلام ".repeat(1000);
			const result = analyzeText(longText);
			expect(result.statistics.totalWords).toBe(1000);
		});

		it("should handle empty sentences", () => {
			const result = analyzeText("....");
			expect(result.statistics.totalSentences).toBe(0);
		});

		it("should handle mixed scripts", () => {
			const result = analyzeText("سلام مرحبا Hello 您好");
			expect(result.language.primaryLanguage).toBe("mixed");
		});
	});

	describe("Real-world examples", () => {
		it("should analyze news article", () => {
			const news = "امروز رئیس‌جمهور در نشستی مهم شرکت کرد. وی درباره مسائل اقتصادی صحبت نمود.";
			const result = analyzeText(news);

			expect(result.language.isPurePersian).toBe(true);
			expect(result.statistics.totalSentences).toBe(2);
			expect(result.readability.complexity).toBeOneOf(["متوسط", "پیچیده"]);
		});

		it("should analyze social media post", () => {
			const post = "سلام دوستان! امروز روز خوبی بود 😊";
			const result = analyzeText(post);

			expect(result.statistics.totalWords).toBeGreaterThan(4);
			expect(result.language.primaryLanguage).toBe("persian");
		});

		it("should analyze technical text", () => {
			const tech = "این سیستم با استفاده از JavaScript و TypeScript پیاده‌سازی شده است.";
			const result = analyzeText(tech);

			expect(result.language.hasEnglishChars).toBe(true);
			expect(result.language.primaryLanguage).toBe("mixed");
		});

		it("should analyze poetry", () => {
			const poetry = "سعدیا غم عشق تو دارم\nگر مرگ آید هم نگذارم";
			const result = analyzeText(poetry);

			expect(result.language.isPurePersian).toBe(true);
			expect(result.statistics.totalParagraphs).toBe(1);
		});
	});
});
