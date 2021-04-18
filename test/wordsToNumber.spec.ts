import { WordsToNumber } from "../src";

describe("WordsToNumber", () => {
	it("Should convert truly", () => {
		expect(WordsToNumber.convert<number>("منفی سه هزار")).toEqual(-3000);
		expect(WordsToNumber.convert<number>("سه هزار دویست و دوازده")).toEqual(3212);
		expect(WordsToNumber.convert<number>("دوازده هزار بیست دو")).toEqual(12022);
		expect(
			WordsToNumber.convert<string>("دوازده هزار بیست دو", { addCommas: true }),
		).toEqual("12,022");
		expect(
			WordsToNumber.convert<string>("دوازده هزار و بیست و دو", { addCommas: true }),
		).toEqual("12,022");
	});

	it("Should convert truly and convert to Arabic digits", () => {
		expect(
			WordsToNumber.convert<string>("منفی سه هزار", { digits: "ar" }),
		).toEqual("-۳۰۰۰");
		expect(
			WordsToNumber.convert<string>("سه هزار دویست و دوازده", { digits: "ar" }),
		).toEqual("۳۲۱۲");
		expect(
			WordsToNumber.convert<string>("دوازده هزار بیست دو", { digits: "ar" }),
		).toEqual("۱۲۰۲۲");
		expect(
			WordsToNumber.convert<string>("دوازده هزار بیست دو", { digits: "ar", addCommas: true }),
		).toEqual("۱۲,۰۲۲");
		expect(
			WordsToNumber.convert<string>("دوازده هزار و بیست و دو", { digits: "ar", addCommas: true }),
		).toEqual("۱۲,۰۲۲");
		expect(
			WordsToNumber.convert<string>("چهارصد پنجاه هزار", { digits: "ar", addCommas: true }),
		).toEqual("٤٥۰,۰۰۰");
		expect(
			WordsToNumber.convert<string>("چهارصد پنجاه هزار", { digits: "ar" }),
		).toEqual("٤٥۰۰۰۰");
	});

	it("Should convert with ordinal words", () => {
		expect(
			WordsToNumber.convert<string>("منفی ۳ هزار", { digits: "fa", addCommas: true }),
		).toEqual("-۳,۰۰۰");
		expect(
			WordsToNumber.convert<string>("منفی 3 هزار و 200", { digits: "fa", addCommas: true }),
		).toEqual("-۳,۲۰۰");
		expect(
			WordsToNumber.convert<string>("منفی سه هزارمین", { digits: "fa", addCommas: true }),
		).toEqual("-۳,۰۰۰");
		expect(
			WordsToNumber.convert<string>("منفی سه هزارمین", { digits: "fa" }),
		).toEqual("-۳۰۰۰");
		expect(WordsToNumber.convert<number>("منفی سه هزارمین")).toEqual(-3000);
		expect(WordsToNumber.convert<number>("منفی سه هزارم")).toEqual(-3000);
		expect(WordsToNumber.convert<string>("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(WordsToNumber.convert<number>("منفی سه هزارمین"))).toHaveLength(5);
		expect(WordsToNumber.convert<number>("منفی سی اُم")).toEqual(-30);
		expect(
			WordsToNumber.convert<number>("سی و سوم", { fuzzy: true }),
		).toEqual(33);
	});

	it("Should return undefined", () => {
		expect(
			WordsToNumber.convert<string>("", { digits: "fa", addCommas: true }),
		).toEqual("");
		// @ts-ignore
		expect(WordsToNumber.convert()).toEqual("");
	});

	it("Should works with fuzzy model", () => {
		expect(
			WordsToNumber.convert<number>("ضد و بنچاه و دو", { fuzzy: true }),
		).toEqual(152);
	});
});
