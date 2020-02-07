import NumberToWords from "../src/modules/NumberToWords";

it("NumberToWords", () => {
	expect(NumberToWords.convert(500443)).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(NumberToWords.convert("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
	expect(NumberToWords.convert(500)).toHaveLength(5);
	expect(NumberToWords.convert(30000000000)).toEqual("سی میلیارد");
});
