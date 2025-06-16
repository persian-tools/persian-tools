import { it, expect } from "vitest";
import { numberToWords } from "../src";

it("numberToWords", () => {
	expect(numberToWords(4)).toEqual("چهار");
	expect(numberToWords(33)).toEqual("سی و سه");
	expect(numberToWords("8,356")).toEqual("هشت هزار و سیصد و پنجاه و شش");
	expect(numberToWords("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(numberToWords(500)).toHaveLength(5);
	expect(numberToWords(30000000000)).toEqual("سی میلیارد");
	expect(numberToWords(987654321)).toEqual(
		"نه صد و هشتاد و هفت میلیون و شش صد و پنجاه و چهار هزار و سیصد و بیست و یک",
	);
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
