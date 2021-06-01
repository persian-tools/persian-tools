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
	expect(numberToWords()).toBeInstanceOf(TypeError);
	expect(numberToWords(9006199254740992)).toEqual(
		"نه کوآدریلیون و شش تریلیون و صد و نود و نه میلیارد و دویست و پنجاه و چهار میلیون و هفت صد و چهل هزار و نه صد و نود و دو",
	);
});
