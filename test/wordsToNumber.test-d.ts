import { describe, expectTypeOf, test } from "vitest";
import { wordsToNumber } from "../src";

describe("wordsToNumber type overloads", () => {
	/**
	 * Test: Default behavior (no config) should return the number
	 */
	test("should return number when no config is provided", () => {
		const result = wordsToNumber("سه صد و پنجاه");

		expectTypeOf(result).toBeNumber();
		expectTypeOf(result).not.toBeString();
	});

	/**
	 * Test: Empty config should return a number
	 */
	test("should return number with empty config object", () => {
		const result = wordsToNumber("سه صد و پنجاه", {});

		expectTypeOf(result).toBeNumber();
		expectTypeOf(result).not.toBeString();
	});

	/**
	 * Test: addCommas: true should return string
	 */
	test("should return string when addCommas is true", () => {
		const result = wordsToNumber("سه صد و پنجاه", { addCommas: true });

		expectTypeOf(result).toBeString();
		expectTypeOf(result).not.toBeNumber();
	});

	/**
	 * Test: addCommas: false should return number
	 */
	test("should return number when addCommas is false", () => {
		const result = wordsToNumber("سه صد و پنجاه", { addCommas: false });

		expectTypeOf(result).toBeNumber();
		expectTypeOf(result).not.toBeString();
	});

	/**
	 * Test: digits: "fa" should return string
	 */
	test("should return string when digits is 'fa'", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "fa" });

		expectTypeOf(result).toBeString();
		expectTypeOf(result).not.toBeNumber();
	});

	/**
	 * Test: digits: "ar" should return string
	 */
	test("should return string when digits is 'ar'", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "ar" });

		expectTypeOf(result).toBeString();
		expectTypeOf(result).not.toBeNumber();
	});

	/**
	 * Test: digits: "en" should return a number
	 */
	test("should return number when digits is 'en'", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "en" });

		expectTypeOf(result).toBeNumber();
		expectTypeOf(result).not.toBeString();
	});

	/**
	 * Test: digits: "en" with addCommas: false should return number
	 */
	test("should return number when digits is 'en' and addCommas is false", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "en", addCommas: false });

		expectTypeOf(result).toBeNumber();
		expectTypeOf(result).not.toBeString();
	});

	/**
	 * Test: digits: "fa" with addCommas: true should return string
	 */
	test("should return string when digits is 'fa' and addCommas is true", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "fa", addCommas: true });

		expectTypeOf(result).toBeString();
		expectTypeOf(result).not.toBeNumber();
	});

	/**
	 * Test: digits: "ar" with addCommas: true should return string
	 */
	test("should return string when digits is 'ar' and addCommas is true", () => {
		const result = wordsToNumber("سه صد و پنجاه", { digits: "ar", addCommas: true });

		expectTypeOf(result).toBeString();
		expectTypeOf(result).not.toBeNumber();
	});

	/**
	 * Test: Function accepts string as the first parameter
	 */
	test("should accept string as first parameter", () => {
		expectTypeOf(wordsToNumber).parameter(0).toBeString();
	});

	/**
	 * Test: With a fuzzy option, should maintain the correct return type
	 */
	test("should return number with fuzzy option and no digit conversion", () => {
		const result = wordsToNumber("سه صد و پنجاه", { fuzzy: true });

		expectTypeOf(result).toBeNumber();
	});

	test("should return string with fuzzy option and addCommas", () => {
		const result = wordsToNumber("سه صد و پنجاه", { fuzzy: true, addCommas: true });

		expectTypeOf(result).toBeString();
	});

	/**
	 * Test: With autoConvertDigitsToEn option, should maintain the correct return type
	 */
	test("should return number with autoConvertDigitsToEn and no other options", () => {
		const result = wordsToNumber("سه صد و پنجاه", { autoConvertDigitsToEn: true });

		expectTypeOf(result).toBeNumber();
	});

	/**
	 * Test: With autoConvertArabicCharsToPersian option, should maintain the correct return type
	 */
	test("should return number with autoConvertArabicCharsToPersian and no other options", () => {
		const result = wordsToNumber("سه صد و پنجاه", { autoConvertArabicCharsToPersian: true });

		expectTypeOf(result).toBeNumber();
	});

	/**
	 * Test: Complex configuration combinations
	 */
	test("should return string with complex config (fuzzy + fa digits + addCommas)", () => {
		const result = wordsToNumber("سه صد و پنجاه", {
			fuzzy: true,
			digits: "fa",
			addCommas: true,
			autoConvertDigitsToEn: true,
		});

		expectTypeOf(result).toBeString();
	});

	test("should return number with all boolean options false", () => {
		const result = wordsToNumber("سه صد و پنجاه", {
			fuzzy: false,
			addCommas: false,
			autoConvertDigitsToEn: false,
			autoConvertArabicCharsToPersian: false,
		});

		expectTypeOf(result).toBeNumber();
	});

	/**
	 * Test: Return type should support proper operations
	 */
	test("number return type should support math operations", () => {
		const result = wordsToNumber("سه صد و پنجاه");

		// Should be able to do math operations
		expectTypeOf(result).toEqualTypeOf<number>();
		// This would fail at runtime, but type-wise should be valid
		expectTypeOf(result + 1).toBeNumber();
		expectTypeOf(result * 2).toBeNumber();
	});

	test("string return type should support string operations", () => {
		const result = wordsToNumber("سه صد و پنجاه", { addCommas: true });

		// Should be able to do string operations
		expectTypeOf(result).toEqualTypeOf<string>();
		expectTypeOf(result.length).toBeNumber();
		expectTypeOf(result.toUpperCase()).toBeString();
	});

	/**
	 * Test: Edge cases with literal types
	 */
	test("should work with const addCommas", () => {
		const config = { addCommas: true } as const;
		const result = wordsToNumber("سه صد و پنجاه", config);

		expectTypeOf(result).toBeString();
	});

	test("should work with const digits", () => {
		const config = { digits: "fa" } as const;
		const result = wordsToNumber("سه صد و پنجاه", config);

		expectTypeOf(result).toBeString();
	});

	test("string result should not support direct math", () => {
		const result = wordsToNumber("سه صد", { addCommas: true });
		// This should be a type error, but TypeScript allows it (returns number),
		// So we check that the result is definitely a string
		expectTypeOf(result).not.toBeNumber();
	});
});
