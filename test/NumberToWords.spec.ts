import { numberToWords } from "../src";

it("numberToWords", () => {
	expect(numberToWords(500443)).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(numberToWords("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(numberToWords(500)).toHaveLength(5);
	expect(numberToWords(30000000000)).toEqual("سی میلیارد");

	expect(numberToWords("500,443", { ordinal: true })).toEqual("پانصد هزار و چهار صد و چهل و سوم");
	expect(numberToWords(-30, { ordinal: true })).toEqual("منفی سی اُم");
	expect(numberToWords(33, { ordinal: true })).toEqual("سی و سوم");
	expect(numberToWords(45, { ordinal: true })).toEqual("چهل و پنجم");
	expect(numberToWords(0)).toEqual("صفر");
	// @ts-ignore
	expect(numberToWords()).toEqual("");
	expect(numberToWords(502375902532527)).toEqual("");
});
