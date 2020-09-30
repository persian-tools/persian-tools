import NumberToWords from "../src/modules/NumberToWords";

it("NumberToWords", () => {
	expect(NumberToWords.convert(500443)).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(NumberToWords.convert("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(NumberToWords.convert(500)).toHaveLength(5);
	expect(NumberToWords.convert(30000000000)).toEqual("سی میلیارد");

	expect(NumberToWords.convert("500,443", { ordinal: true })).toEqual("پانصد هزار و چهار صد و چهل و سوم");
	expect(NumberToWords.convert(-30, { ordinal: true })).toEqual("منفی سی اُم");
	expect(NumberToWords.convert(33, { ordinal: true })).toEqual("سی و سوم");
	expect(NumberToWords.convert(45, { ordinal: true })).toEqual("چهل و پنجم");
	expect(NumberToWords.convert(0)).toEqual("صفر");
	// @ts-ignore
	expect(NumberToWords.convert()).toBeUndefined();
	expect(NumberToWords.convert(502375902532527)).toEqual("");
});
