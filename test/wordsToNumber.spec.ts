import { WordsToNumber } from "../src";

describe("WordsToNumber", () => {
	it("Should works as well", () => {
		expect(WordsToNumber.convert("منفی سه هزار")).toEqual(-3000);
		expect(WordsToNumber.convert("سه هزار دویست و دوازده")).toEqual(3212);
		expect(WordsToNumber.convert("دوازده هزار بیست دو")).toEqual(12022);
		expect(WordsToNumber.convert("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");
		expect(WordsToNumber.convert("دوازده هزار و بیست و دو", { addCommas: true })).toEqual("12,022");
	});

	it("Ordinal words", () => {
		expect(WordsToNumber.convert("منفی ۳ هزار", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
		expect(WordsToNumber.convert("منفی 3 هزار و 200", { digits: "fa", addCommas: true })).toEqual("-۳,۲۰۰");
		expect(WordsToNumber.convert("منفی سه هزارمین", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
		expect(WordsToNumber.convert("منفی سه هزارمین", { digits: "fa" })).toEqual("-۳۰۰۰");
		expect(WordsToNumber.convert("منفی سه هزارمین")).toEqual(-3000);
		expect(WordsToNumber.convert("منفی سه هزارم")).toEqual(-3000);
		expect(WordsToNumber.convert("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(WordsToNumber.convert("منفی سه هزارمین"))).toHaveLength(5);
		expect(WordsToNumber.convert("منفی سی اُم")).toEqual(-30);
		expect(WordsToNumber.convert("سی و سوم", { fuzzy: true })).toEqual(33);
	});

	it("Should return undefined", () => {
		expect(WordsToNumber.convert("", { digits: "fa", addCommas: true })).toBeUndefined();
		// @ts-ignore
		expect(WordsToNumber.convert()).toBeUndefined();
	});

	it("Should works with fuzzy model", () => {
		expect(WordsToNumber.convert("ضد و بنچاه و دو", { fuzzy: true })).toEqual(152);
	});
});
