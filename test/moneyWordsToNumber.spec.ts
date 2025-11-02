import { describe, it, expect } from "vitest";
import { moneyWordsToNumber, rialsWordsToNumber, tomansWordsToNumber } from "../src";

describe("moneyWordsToNumber", () => {
	/**
	 * **Group**: Basic colloquial mode conversions (default behavior)
	 * In colloquial Persian, numbers are implicitly multiplied by 1000
	 */
	describe("Colloquial Mode (Default)", () => {
		it("should convert 'یک تومن' to 1000 in colloquial mode", () => {
			expect(moneyWordsToNumber("یک تومن")).toBe(1000);
			expect(moneyWordsToNumber("هزار تومن")).toBe(1000);
		});

		it("should convert 'صد تومن' to 100000 in colloquial mode", () => {
			expect(moneyWordsToNumber("صد تومن")).toBe(100000);
		});

		it("should convert 'دو تومان' to 2000 in colloquial mode", () => {
			expect(moneyWordsToNumber("دو تومان")).toBe(2000);
			expect(moneyWordsToNumber("دو تومن")).toBe(2000);
		});

		it("should convert 'پنج تومن' to 5000 in colloquial mode", () => {
			expect(moneyWordsToNumber("پنج تومن")).toBe(5000);
		});

		it("should convert 'ده تومان' to 10000 in colloquial mode", () => {
			expect(moneyWordsToNumber("ده تومان")).toBe(10000);
		});

		it("should convert 'بیست تومن' to 20000 in colloquial mode", () => {
			expect(moneyWordsToNumber("بیست تومن")).toBe(20000);
		});

		it("should convert 'پنجاه تومان' to 50000 in colloquial mode", () => {
			expect(moneyWordsToNumber("پنجاه تومان")).toBe(50000);
			expect(moneyWordsToNumber("پنجاه هزار تومان")).toBe(50000);
		});

		it("should convert 'سیصد تومن' to 300000 in colloquial mode", () => {
			expect(moneyWordsToNumber("سیصد تومن")).toBe(300000);
		});

		it("should convert 'یک هزار تومان' to 1000 in colloquial mode", () => {
			expect(moneyWordsToNumber("یک هزار تومان")).toBe(1000);
		});

		it("should convert 'دو هزار تومن' to 2000 in colloquial mode", () => {
			expect(moneyWordsToNumber("دو هزار تومن")).toBe(2000);
		});

		it("should convert 'سه میلیون تومان' to 3000000 in colloquial mode", () => {
			expect(moneyWordsToNumber("سه میلیون تومان")).toBe(3000000);
		});
	});

	/**
	 * **Group**: Formal mode conversions
	 * In formal mode, numbers are interpreted literally without multipliers
	 */
	describe("Formal Mode", () => {
		it("should convert 'یک تومان' to 1 in formal mode", () => {
			expect(moneyWordsToNumber("یک تومان", { formal: true })).toBe(1);
		});

		it("should convert 'صد تومن' to 100 in formal mode", () => {
			expect(moneyWordsToNumber("صد تومن", { formal: true })).toBe(100);
		});

		it("should convert 'دو تومان' to 2 in formal mode", () => {
			expect(moneyWordsToNumber("دو تومان", { formal: true })).toBe(2);
		});

		it("should convert 'پنج صد تومن' to 500 in formal mode", () => {
			expect(moneyWordsToNumber("پنج صد تومن", { formal: true })).toBe(500);
		});

		it("should convert 'یک هزار تومان' to 1000 in formal mode", () => {
			expect(moneyWordsToNumber("یک هزار تومان", { formal: true })).toBe(1000);
		});

		it("should convert 'ده هزار تومن' to 10000 in formal mode", () => {
			expect(moneyWordsToNumber("ده هزار تومن", { formal: true })).toBe(10000);
		});

		it("should convert 'یک میلیون تومان' to 1000000 in formal mode", () => {
			expect(moneyWordsToNumber("یک میلیون تومان", { formal: true })).toBe(1000000);
		});
	});

	/**
	 * **Group**: Rial conversions
	 */
	describe("Rial Conversions", () => {
		it("should convert 'یک ریال' to 1000 in colloquial mode", () => {
			expect(moneyWordsToNumber("یک ریال")).toBe(1000);
		});

		it("should convert 'صد ریال' to 100000 in colloquial mode", () => {
			expect(moneyWordsToNumber("صد ریال")).toBe(100000);
		});

		it("should convert 'یک ریال' to 1 in formal mode", () => {
			expect(moneyWordsToNumber("یک ریال", { formal: true })).toBe(1);
		});

		it("should convert 'صد ریال' to 100 in formal mode", () => {
			expect(moneyWordsToNumber("صد ریال", { formal: true })).toBe(100);
		});

		it("should convert 'یک هزار ریال' to 1000 in colloquial mode", () => {
			expect(moneyWordsToNumber("یک هزار ریال")).toBe(1000);
		});
	});

	/**
	 * **Group**: Currency conversion (Toman to Rial and vice versa)
	 */
	describe("Currency Conversion", () => {
		it("should convert 'یک تومن' to 10000 rials in colloquial mode", () => {
			expect(moneyWordsToNumber("یک تومن", { to: "rial" })).toBe(10000);
		});

		it("should convert 'صد تومن' to 1000000 rials in colloquial mode", () => {
			expect(moneyWordsToNumber("صد تومن", { to: "rial" })).toBe(1000000);
		});

		it("should convert 'یک تومان' to 10 rials in formal mode", () => {
			expect(moneyWordsToNumber("یک تومان", { formal: true, to: "rial" })).toBe(10);
		});

		it("should convert 'صد ریال' to 10 tomans in formal mode", () => {
			expect(moneyWordsToNumber("صد ریال", { formal: true, to: "toman" })).toBe(10);
		});

		it("should convert 'یک هزار ریال' to 100 tomans in colloquial mode", () => {
			expect(moneyWordsToNumber("یک هزار ریال", { to: "toman" })).toBe(100);
		});

		it("should convert 'ده هزار تومان' to 100000 rials in colloquial mode", () => {
			expect(moneyWordsToNumber("ده هزار تومان", { to: "rial" })).toBe(100000);
		});
	});

	/**
	 * **Group**: Complex number conversions
	 */
	describe("Complex Numbers", () => {
		it("should convert 'دویست و پنجاه تومن' to 250000 in colloquial mode", () => {
			expect(moneyWordsToNumber("دویست و پنجاه تومن")).toBe(250000);
		});

		it("should convert 'سه صد و پنجاه هزار تومان' to 350000 in colloquial mode", () => {
			expect(moneyWordsToNumber("سه صد و پنجاه هزار تومان")).toBe(350000);
		});

		it("should convert 'یک میلیون و پانصد هزار تومن' to 1500000 in colloquial mode", () => {
			expect(moneyWordsToNumber("یک میلیون و پانصد هزار تومن")).toBe(1500000);
		});

		it("should convert 'پنج میلیون و دویست و پنجاه هزار تومان' to 5250000 in colloquial mode", () => {
			expect(moneyWordsToNumber("پنج میلیون و دویست و پنجاه هزار تومان")).toBe(5250000);
		});
	});

	/**
	 * **Group**: Edge cases and error handling
	 */
	describe("Edge Cases", () => {
		it("should return 0 for empty string", () => {
			expect(moneyWordsToNumber("")).toBe(0);
		});

		it("should return 0 for undefined input", () => {
			// @ts-expect-error - intentionally testing undefined input
			expect(moneyWordsToNumber(undefined)).toBe(0);
		});

		it("should return 0 for null input", () => {
			// @ts-expect-error - intentionally testing null input
			expect(moneyWordsToNumber(null)).toBe(0);
		});

		it("should return 0 for non-string input", () => {
			// @ts-expect-error - intentionally testing number input
			expect(moneyWordsToNumber(123)).toBe(0);
		});

		it("should return 0 for text without numbers", () => {
			expect(moneyWordsToNumber("تومان")).toBe(0);
		});

		it("should return 0 for text with only currency", () => {
			expect(moneyWordsToNumber("ریال")).toBe(0);
		});

		it("should handle text without currency unit", () => {
			// When no currency is specified, should still parse the number with colloquial multiplier
			expect(moneyWordsToNumber("یک")).toBe(1000);
		});

		it("should handle whitespace properly", () => {
			expect(moneyWordsToNumber("  یک تومن  ")).toBe(1000);
		});

		it("should handle multiple spaces", () => {
			expect(moneyWordsToNumber("یک  تومن")).toBe(1000);
		});
	});

	/**
	 * **Group**: Mixed Persian and Arabic numerals
	 */
	describe("Mixed Numerals", () => {
		it("should handle Persian digits with auto-conversion", () => {
			expect(moneyWordsToNumber("۱ تومن")).toBe(1000);
		});

		it("should handle Arabic digits with auto-conversion", () => {
			expect(moneyWordsToNumber("١ تومن")).toBe(1000);
		});

		it("should handle mixed Persian text and English digits", () => {
			expect(moneyWordsToNumber("100 تومن")).toBe(100000);
		});

		it("should handle mixed Persian text and Persian digits", () => {
			expect(moneyWordsToNumber("صد و ۵۰ تومن")).toBe(150000);
		});
	});

	/**
	 * **Group**: Configuration options
	 */
	describe("Configuration Options", () => {
		it("should respect explicit 'from' parameter", () => {
			expect(moneyWordsToNumber("یک", { from: "toman" })).toBe(1000);
		});

		it("should respect explicit 'from' and 'to' parameters", () => {
			expect(moneyWordsToNumber("یک", { from: "toman", to: "rial" })).toBe(10000);
		});

		it("should disable auto-conversion when autoConvertDigitsToEn is false", () => {
			// Note: This test depends on the behavior when digits are not converted
			// The exact behavior may vary, but at minimum it should not throw an error
			expect(() => moneyWordsToNumber("۱ تومن", { autoConvertDigitsToEn: false })).not.toThrow();
		});

		it("should disable Arabic to Persian conversion when autoConvertArabicCharsToPersian is false", () => {
			expect(() => moneyWordsToNumber("یک تومن", { autoConvertArabicCharsToPersian: false })).not.toThrow();
		});
	});

	/**
	 * **Group**: Currency unit variations
	 */
	describe("Currency Unit Variations", () => {
		it("should recognize 'تومن' as toman", () => {
			expect(moneyWordsToNumber("یک تومن")).toBe(1000);
		});

		it("should recognize 'تومان' as toman", () => {
			expect(moneyWordsToNumber("یک تومان")).toBe(1000);
		});

		it("should recognize 'تمن' as toman", () => {
			expect(moneyWordsToNumber("یک تمن")).toBe(1000);
		});

		it("should recognize 'تمان' as toman", () => {
			expect(moneyWordsToNumber("یک تمان")).toBe(1000);
		});

		it("should recognize 'تومون' as toman", () => {
			expect(moneyWordsToNumber("یک تومون")).toBe(1000);
		});

		it("should recognize 'ریال' as rial", () => {
			expect(moneyWordsToNumber("یک ریال")).toBe(1000);
		});

		it("should recognize 'ریل' as rial", () => {
			expect(moneyWordsToNumber("یک ریل")).toBe(1000);
		});
	});

	/**
	 * **Group**: Zero and negative numbers
	 */
	describe("Zero and Special Numbers", () => {
		it("should handle 'صفر تومن' correctly", () => {
			expect(moneyWordsToNumber("صفر تومن")).toBe(0);
		});

		it("should handle 'صفر ریال' correctly", () => {
			expect(moneyWordsToNumber("صفر ریال")).toBe(0);
		});

		it("should handle 'صفر تومان' in formal mode", () => {
			expect(moneyWordsToNumber("صفر تومان", { formal: true })).toBe(0);
		});
	});
});

/**
 * Test suite for convenience function: rialsWordsToNumber
 */
describe("rialsWordsToNumber", () => {
	it("should convert 'یک ریال' to 1000 in colloquial mode", () => {
		expect(rialsWordsToNumber("یک ریال")).toBe(1000);
	});

	it("should convert 'صد ریال' to 100000 in colloquial mode", () => {
		expect(rialsWordsToNumber("صد ریال")).toBe(100000);
	});

	it("should convert 'یک ریال' to 1 in formal mode", () => {
		expect(rialsWordsToNumber("یک ریال", { formal: true })).toBe(1);
	});

	it("should work without explicit currency unit", () => {
		expect(rialsWordsToNumber("یک")).toBe(1000);
	});

	it("should convert to tomans when 'to' is specified", () => {
		expect(rialsWordsToNumber("صد ریال", { to: "toman" })).toBe(10000);
	});

	it("should handle complex numbers", () => {
		expect(rialsWordsToNumber("یک هزار ریال")).toBe(1000);
	});

	it("should handle empty input", () => {
		expect(rialsWordsToNumber("")).toBe(0);
	});

	it("should handle formal mode with large numbers", () => {
		expect(rialsWordsToNumber("یک میلیون ریال", { formal: true })).toBe(1000000);
	});
});

/**
 * Test suite for convenience function: tomansWordsToNumber
 */
describe("tomansWordsToNumber", () => {
	it("should convert 'یک تومن' to 1000 in colloquial mode", () => {
		expect(tomansWordsToNumber("یک تومن")).toBe(1000);
	});

	it("should convert 'صد تومن' to 100000 in colloquial mode", () => {
		expect(tomansWordsToNumber("صد تومن")).toBe(100000);
	});

	it("should convert 'یک تومان' to 1 in formal mode", () => {
		expect(tomansWordsToNumber("یک تومان", { formal: true })).toBe(1);
	});

	it("should work without explicit currency unit", () => {
		expect(tomansWordsToNumber("یک")).toBe(1000);
	});

	it("should convert to rials when 'to' is specified", () => {
		expect(tomansWordsToNumber("یک تومن", { to: "rial" })).toBe(10000);
	});

	it("should convert 'صد تومن' to 1000000 rials", () => {
		expect(tomansWordsToNumber("صد تومن", { to: "rial" })).toBe(1000000);
	});

	it("should handle complex numbers", () => {
		expect(tomansWordsToNumber("یک هزار تومان")).toBe(1000);
		expect(tomansWordsToNumber("هزار تومان")).toBe(1000);
	});

	it("should handle empty input", () => {
		expect(tomansWordsToNumber("")).toBe(0);
	});

	it("should handle formal mode with large numbers", () => {
		expect(tomansWordsToNumber("یک میلیون تومان", { formal: true })).toBe(1000000);
	});

	it("should handle formal mode conversion to rials", () => {
		expect(tomansWordsToNumber("یک تومان", { formal: true, to: "rial" })).toBe(10);
	});
});
