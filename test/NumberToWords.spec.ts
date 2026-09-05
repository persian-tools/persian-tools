import { it, expect } from "vitest";
import { numberToWords } from "../src";

it("numberToWords", () => {
	expect(numberToWords(4)).toEqual("چهار");
	expect(numberToWords(33)).toEqual("سی و سه");
	expect(numberToWords("8,356")).toEqual("هشت هزار و سیصد و پنجاه و شش");
	expect(numberToWords("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(numberToWords(500)).toHaveLength(5);
	expect(numberToWords(30000000000)).toEqual("سی میلیارد");
	expect(numberToWords(987654321)).toEqual("نه صد و هشتاد و هفت میلیون و شش صد و پنجاه و چهار هزار و سیصد و بیست و یک");
	expect(numberToWords("500,443", { ordinal: true })).toEqual("پانصد هزار و چهار صد و چهل و سوم");
	expect(numberToWords(-30, { ordinal: true })).toEqual("منفی سی اُم");
	expect(numberToWords(-123, { ordinal: true })).toEqual("منفی صد و بیست و سوم");
	expect(numberToWords(33, { ordinal: true })).toEqual("سی و سوم");
	expect(numberToWords(45, { ordinal: true })).toEqual("چهل و پنجم");
	expect(numberToWords(0)).toEqual("صفر");
	// @ts-ignore
	expect(numberToWords()).toBeInstanceOf(TypeError);
	expect(numberToWords(9006199254740992)).toEqual(
		"نه کوآدریلیون و شش تریلیون و صد و نود و نه میلیارد و دویست و پنجاه و چهار میلیون و هفت صد و چهل هزار و نه صد و نود و دو",
	);

	// Test locale independence - verify fix for Issue #404
	// This specifically tests that numberToWords works when system locale is Persian
	expect(numberToWords(1000)).toEqual("یک هزار");
	expect(numberToWords(12345)).toEqual("دوازده هزار و سیصد و چهل و پنج");
});

it("numberToWords - float and decimal numbers (Issue #297)", () => {
	// Standard decimal values
	expect(numberToWords(5.3)).toEqual("پنج و سه دهم");
	expect(numberToWords("5.3")).toEqual("پنج و سه دهم");
	expect(numberToWords(12.75)).toEqual("دوازده و هفتاد و پنج صدم");
	expect(numberToWords("12.75")).toEqual("دوازده و هفتاد و پنج صدم");
	expect(numberToWords(3.14)).toEqual("سه و چهارده صدم");

	// Numbers between 0 and 1 with leading zero
	expect(numberToWords(0.5)).toEqual("پنج دهم");
	expect(numberToWords("0.5")).toEqual("پنج دهم");
	expect(numberToWords(0.05)).toEqual("پنج صدم");
	expect(numberToWords("0.05")).toEqual("پنج صدم");
	expect(numberToWords(0.005)).toEqual("پنج هزارم");
	expect(numberToWords("0.005")).toEqual("پنج هزارم");
	expect(numberToWords("0.0025")).toEqual("بیست و پنج ده هزارم");

	// includeZero option
	expect(numberToWords(0.5, { includeZero: true })).toEqual("صفر و پنج دهم");
	expect(numberToWords(0.05, { includeZero: true })).toEqual("صفر و پنج صدم");

	// Negative decimals
	expect(numberToWords(-5.3)).toEqual("منفی پنج و سه دهم");
	expect(numberToWords("-5.3")).toEqual("منفی پنج و سه دهم");
	expect(numberToWords(-0.5)).toEqual("منفی پنج دهم");
	expect(numberToWords(-0.5, { includeZero: true })).toEqual("منفی صفر و پنج دهم");

	// Persian digits and Persian decimal separator (٫)
	expect(numberToWords("۵٫۳")).toEqual("پنج و سه دهم");
	expect(numberToWords("۱۲٫۷۵")).toEqual("دوازده و هفتاد و پنج صدم");
	expect(numberToWords("۰٫۵")).toEqual("پنج دهم");

	// Comma-separated integer with decimals
	expect(numberToWords("1,000.25")).toEqual("یک هزار و بیست و پنج صدم");
	expect(numberToWords("1.001")).toEqual("یک و یک هزارم");

	// Decimal strings with all-zero fractional parts
	expect(numberToWords("5.0")).toEqual("پنج");
	expect(numberToWords("0.0")).toEqual("صفر");

	// Ordinal decimals
	expect(numberToWords(5.3, { ordinal: true })).toEqual("پنج و سه دهمین");
	expect(numberToWords(0.05, { ordinal: true })).toEqual("پنج صدمین");
});
