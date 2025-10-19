import { describe, it, expect } from "vitest";
import { extractCardNumber } from "../src/modules/extractCardNumbers";
// Types
import type {
	ExtractCardNumberBase,
	ExtractCardNumberWithValidation,
	ExtractCardNumberWithBank,
	ExtractCardNumberComplete,
} from "../src/modules/extractCardNumbers/types";

describe("extractCardNumber", () => {
	// Test data with various formats
	const validIranianCard = "6037701689095443";
	const validIranianCardFormatted = "6037-7016-8909-5443";
	const validIranianCardSpaces = "6037 7016 8909 5443";
	const validIranianCardPersian = "۶۰۳۷۷۰۱۶۸۹۰۹۵۴۴۳";
	const validIranianCardArabic = "٦٠٣٧٧٠١٦٨٩٠٩٥٤٤٣";
	const invalidCard = "1234567890123456";
	const validIranianSamanCard = "6219861034529007"; // Saman Bank
	const validMultipleIranianCards = `شماره کارتم رو برات نوشتم:
6219-8610-3452-9007
اینم یه شماره کارت دیگه ای که دارم
5022291070873466
۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶
۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶`;

	describe("TypeScript Function Overloads Type Safety", () => {
		it("should return ExtractCardNumberComplete when both validation and bank detection are enabled", () => {
			const text = `Card number: ${validIranianCard}`;
			const result = extractCardNumber(text, {
				checkValidation: true,
				detectBankNumber: true,
			});

			expect(result).toBeDefined();
			expect(Array.isArray(result)).toBe(true);

			if (result.length > 0) {
				const card = result[0] as ExtractCardNumberComplete;
				expect(card).toHaveProperty("isValid");
				expect(card).toHaveProperty("bankName");
				expect(card).toHaveProperty("pure");
				expect(card).toHaveProperty("base");
				expect(card).toHaveProperty("index");
				expect(card).toHaveProperty("startIndex");
				expect(card).toHaveProperty("endIndex");
			}
		});

		it("should return ExtractCardNumberWithValidation when only validation is enabled", () => {
			const text = `Card number: ${validIranianCard}`;
			const result = extractCardNumber(text, {
				checkValidation: true,
				detectBankNumber: false,
			});

			expect(result).toBeDefined();
			if (result.length > 0) {
				const card = result[0] as ExtractCardNumberWithValidation;
				expect(card).toHaveProperty("isValid");
				expect(card).not.toHaveProperty("bankName");
			}
		});

		it("should return ExtractCardNumberWithBank when only bank detection is enabled", () => {
			const text = `Card number: ${validIranianCard}`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				detectBankNumber: true,
			});

			expect(result).toBeDefined();
			if (result.length > 0) {
				const card = result[0] as ExtractCardNumberWithBank;
				expect(card).toHaveProperty("bankName");
				expect(card).not.toHaveProperty("isValid");
			}
		});

		it("should return ExtractCardNumberBase when neither validation nor bank detection is enabled", () => {
			const text = `Card number: ${validIranianCard}`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				detectBankNumber: false,
			});

			expect(result).toBeDefined();
			if (result.length > 0) {
				const card = result[0] as ExtractCardNumberBase;
				expect(card).toHaveProperty("pure");
				expect(card).toHaveProperty("base");
				expect(card).toHaveProperty("index");
				expect(card).toHaveProperty("startIndex");
				expect(card).toHaveProperty("endIndex");
				expect(card).not.toHaveProperty("isValid");
				expect(card).not.toHaveProperty("bankName");
			}
		});
	});

	describe("Backward Compatibility", () => {
		it("should work with default options when no options provided", () => {
			const result = extractCardNumber(validMultipleIranianCards);

			expect(result).toBeDefined();
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBeGreaterThan(0);
		});

		it("should maintain the same result structure for basic extraction", () => {
			const result = extractCardNumber(validMultipleIranianCards);

			expect(result[0]).toHaveProperty("index");
			expect(result[0]).toHaveProperty("base");
			expect(result[0]).toHaveProperty("pure");
			expect(result[0].index).toBe(1);
			expect(result[0].pure).toBe(validIranianSamanCard);
		});
	});

	describe("Features", () => {
		it("should extract card numbers with position information", () => {
			const text = `Start ${validIranianCard} middle ${validIranianCardFormatted} end`;
			const result = extractCardNumber(text, { checkValidation: false });

			expect(result.length).toBe(2);
			expect(result[0].startIndex).toBe(6);
			expect(result[0].endIndex).toBe(6 + validIranianCard.length);
			expect(result[1].startIndex).toBeGreaterThan(result[0].endIndex);
		});

		it("should support maxResults option", () => {
			const text = `${validIranianCard} ${validIranianCardFormatted} ${validIranianCardSpaces}`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				maxResults: 2,
			});

			expect(result.length).toBe(2);
		});

		it("should handle fuzzy matching with masked digits", () => {
			const text = `Masked card: 6037-****-8909-5443`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				enableFuzzyMatching: true,
			});

			expect(result.length).toBeGreaterThan(0);
			expect(result[0].base).toContain("****");
		});

		it("should include context when requested", () => {
			const text = `My payment card number is ${validIranianCard} for shopping`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				includeContext: true,
				contextLength: 10,
			}) as any[];

			expect(result.length).toBeGreaterThan(0);
			expect(result[0]).toHaveProperty("context");
			expect(result[0].context).toHaveProperty("before");
			expect(result[0].context).toHaveProperty("after");
			expect(result[0].context.before).toContain("number is");
			expect(result[0].context.after).toContain("for");
		});

		it("should remove duplicate card numbers", () => {
			const text = `${validIranianCard} and again ${validIranianCard}`;
			const result = extractCardNumber(text, { checkValidation: false });

			expect(result.length).toBe(1);
		});

		it("should sort results by position", () => {
			const card1 = "6037701689095443";
			const card2 = "6219861034529007";
			const text = `Second: ${card2} First: ${card1}`;

			const result = extractCardNumber(text, { checkValidation: false });

			expect(result.length).toBe(2);
			expect(result[0].startIndex).toBeLessThan(result[1].startIndex);
		});
	});

	describe("Performance Optimizations", () => {
		it("should handle small text efficiently", () => {
			const smallText = `Card: ${validIranianCard}`;
			const startTime = performance.now();

			const result = extractCardNumber(smallText);

			const processingTime = performance.now() - startTime;
			expect(processingTime).toBeLessThan(10); // Should be very fast
			expect(result.length).toBeGreaterThan(0);
		});

		it("should handle medium text with standard processing", () => {
			const mediumText = `
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Card number: ${validIranianCard}
				Ut enim ad minim veniam, quis nostrud exercitation ullamco.
				Another card: ${validIranianCardFormatted}
			`.repeat(50);

			const result = extractCardNumber(mediumText);
			expect(result.length).toBeGreaterThan(0);
		});

		it("should optimize for large text automatically", () => {
			const largeText = `
				This is a very large text document with multiple card numbers.
				Card 1: ${validIranianCard}
				Card 2: ${validIranianCardFormatted}
			`.repeat(1000);

			const result = extractCardNumber(largeText, {
				checkValidation: false,
				optimizeForLargeText: true,
			});

			expect(result.length).toBeGreaterThan(0);
		});

		it("should respect performance thresholds", () => {
			const hugeText = "A".repeat(100000) + validIranianCard + "B".repeat(100000);

			const result = extractCardNumber(hugeText, {
				checkValidation: false,
				maxResults: 5,
			});

			expect(result.length).toBeLessThanOrEqual(5);
		});
	});

	describe("Multiple Format Support", () => {
		it("should extract Persian/Farsi digits", () => {
			const text = `Persian card: ${validIranianCardPersian}`;
			const result = extractCardNumber(text, { checkValidation: false });

			expect(result.length).toBe(1);
			expect(result[0].pure).toBe(validIranianCard);
			expect(result[0].base).toBe(validIranianCardPersian);
		});

		it("should extract Arabic digits", () => {
			const text = `Arabic card: ${validIranianCardArabic}`;
			const result = extractCardNumber(text, { checkValidation: false });

			expect(result.length).toBe(1);
			expect(result[0].pure).toBe(validIranianCard);
			expect(result[0].base).toBe(validIranianCardArabic);
		});

		it("should handle various separator formats", () => {
			const formats = [
				"6037-7016-8909-5443",
				"6037_7016_8909_5443",
				"6037.7016.8909.5443",
				"6037*7016*8909*5443",
				"6037 7016 8909 5443",
			];

			formats.forEach((format) => {
				const text = `Card: ${format}`;
				const result = extractCardNumber(text, { checkValidation: false });

				expect(result.length).toBe(1);
				expect(result[0].pure).toBe(validIranianCard);
			});
		});
	});

	describe("Edge Cases and Error Handling", () => {
		it("should handle empty string", () => {
			const result = extractCardNumber("");
			expect(result).toEqual([]);
		});

		it("should handle null/undefined input", () => {
			const result1 = extractCardNumber(null as any);
			const result2 = extractCardNumber(undefined as any);

			expect(result1).toEqual([]);
			expect(result2).toEqual([]);
		});

		it("should handle text with no card numbers", () => {
			const text = "This text has no card numbers at all";
			const result = extractCardNumber(text);

			expect(result).toEqual([]);
		});

		it("should handle malformed card numbers", () => {
			const text = "Malformed: 123456 and 12345678901234567890";
			const result = extractCardNumber(text, { checkValidation: false });

			// Should filter out obviously malformed numbers
			expect(result.every((card) => card.pure.length >= 16)).toBe(true);
		});

		it("should handle mixed valid and invalid cards", () => {
			const text = `Valid: ${validIranianCard} Invalid: ${invalidCard}`;
			const result = extractCardNumber(text, {
				checkValidation: true,
				filterValidCardNumbers: true,
			});

			expect(result.length).toBe(1);
			expect(result[0].pure).toBe(validIranianCard);
		});

		it("should handle very long text without crashing", () => {
			const veryLongText = "A".repeat(1000000) + validIranianCard;

			const result = extractCardNumber(veryLongText, {
				checkValidation: false,
				optimizeForLargeText: true,
				maxResults: 1,
			});

			expect(result.length).toBe(1);
		});
	});

	describe("Validation Integration", () => {
		it("should correctly validate Iranian bank cards", () => {
			const text = `Valid Iranian card: ${validIranianCard}`;
			const result = extractCardNumber(text, { checkValidation: true });

			expect(result.length).toBe(1);
			expect(result[0]).toHaveProperty("isValid", true);
		});

		it("should filter invalid cards when filterValidCardNumbers is true", () => {
			const text = `Valid: ${validIranianCard} Invalid: ${invalidCard}`;
			const result = extractCardNumber(text, {
				checkValidation: true,
				filterValidCardNumbers: true,
			});

			expect(result.length).toBe(1);
			expect(result[0].pure).toBe(validIranianCard);
		});

		it("should keep invalid cards when filterValidCardNumbers is false", () => {
			const text = `Valid: ${validIranianCard} Invalid: ${invalidCard}`;
			const result = extractCardNumber(text, {
				checkValidation: true,
				filterValidCardNumbers: false,
			});

			expect(result.length).toBe(2);
		});
	});

	describe("Bank Detection Integration", () => {
		it("should detect bank names for valid Iranian cards", () => {
			const text = `Saderat bank card: ${validIranianCard}`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				detectBankNumber: true,
			});

			expect(result.length).toBe(1);
			expect(result[0]).toHaveProperty("bankName");
		});

		it("should handle bank detection errors gracefully", () => {
			const text = `Unknown card: ${invalidCard}`;
			const result = extractCardNumber(text, {
				checkValidation: false,
				detectBankNumber: true,
			});

			if (result.length > 0) {
				expect(result[0]).toHaveProperty("bankName");
				// bankName should be null for unrecognized cards
			}
		});
	});
});

describe("Performance Benchmarks", () => {
	const validCard = "6037701689095443";

	it("should process small text (< 1KB) very quickly", () => {
		const smallText = `Small text with card: ${validCard}`;
		const startTime = performance.now();

		const result = extractCardNumber(smallText);

		const processingTime = performance.now() - startTime;
		expect(processingTime).toBeLessThan(5);
		expect(result.length).toBeGreaterThan(0);
	});

	it("should process medium text (1KB - 10KB) efficiently", () => {
		const mediumText = `Medium text content with card ${validCard} `.repeat(100);
		const startTime = performance.now();

		const result = extractCardNumber(mediumText);

		const processingTime = performance.now() - startTime;
		expect(processingTime).toBeLessThan(50);
		expect(result.length).toBeGreaterThan(0);
	});

	it("should handle large text (10KB - 100KB) with optimization", () => {
		const largeText = `Large text content with embedded card ${validCard} `.repeat(1000);
		const startTime = performance.now();

		extractCardNumber(largeText, {
			optimizeForLargeText: true,
			maxResults: 10,
		});

		const processingTime = performance.now() - startTime;
		expect(processingTime).toBeLessThan(200);
	});

	it("should maintain reasonable performance for huge text (> 100KB)", () => {
		const hugeText = `Huge document content ${validCard} `.repeat(5000);
		const startTime = performance.now();

		const result = extractCardNumber(hugeText, {
			optimizeForLargeText: true,
			maxResults: 5,
		});

		const processingTime = performance.now() - startTime;
		expect(processingTime).toBeLessThan(500);
		expect(result.length).toBeLessThanOrEqual(5);
	});
});
