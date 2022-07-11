import { describe, it, expect } from "vitest";
import { wordsToNumber } from "../src";
import { UNITS, TEN, MAGNITUDE } from "../src/modules/wordsToNumber/constants";

describe("WordsToNumber", () => {
	it("Should convert truly", () => {
		expect(wordsToNumber<number>("منفی سه هزار")).toEqual(-3000);
		expect(wordsToNumber<number>("سه هزار دویست و دوازده")).toEqual(3212);
		expect(wordsToNumber<number>("دوازده هزار بیست دو")).toEqual(12022);
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");
		expect(wordsToNumber<string>("دوازده هزار و بیست و دو", { addCommas: true })).toEqual("12,022");
	});

	it("Should convert truly and convert to Arabic digits", () => {
		expect(wordsToNumber<string>("منفی سه هزار", { digits: "ar" })).toEqual("-٣٠٠٠");
		expect(wordsToNumber<string>("سه هزار دویست و دوازده", { digits: "ar" })).toEqual("٣٢١٢");
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { digits: "ar" })).toEqual("١٢٠٢٢");
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { digits: "ar", addCommas: true })).toEqual("١٢,٠٢٢");
		expect(wordsToNumber<string>("دوازده هزار و بیست و دو", { digits: "ar", addCommas: true })).toEqual("١٢,٠٢٢");
		expect(wordsToNumber<string>("چهارصد پنجاه هزار", { digits: "ar", addCommas: true })).toEqual("٤٥٠,٠٠٠");
		expect(wordsToNumber<string>("چهارصد پنجاه هزار", { digits: "ar" })).toEqual("٤٥٠٠٠٠");
	});

	it("Should convert with ordinal words", () => {
		expect(wordsToNumber<string>("منفی ۳ هزار", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
		expect(wordsToNumber<string>("منفی 3 هزار و 200", { digits: "fa", addCommas: true })).toEqual("-۳,۲۰۰");
		expect(wordsToNumber<string>("منفی سه هزارمین", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
		expect(wordsToNumber<string>("منفی سه هزارمین", { digits: "fa" })).toEqual("-۳۰۰۰");
		expect(wordsToNumber<number>("منفی سه هزارمین")).toEqual(-3000);
		expect(wordsToNumber<number>("منفی سه هزارم")).toEqual(-3000);
		expect(wordsToNumber<string>("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(wordsToNumber<number>("منفی سه هزارمین"))).toHaveLength(5);
		expect(wordsToNumber<number>("منفی سی اُم")).toEqual(-30);
		expect(wordsToNumber<number>("سی و سوم", { fuzzy: true })).toEqual(33);
	});

	it("Should return undefined", () => {
		expect(wordsToNumber<string>("", { digits: "fa", addCommas: true })).toEqual("");
		// @ts-ignore
		expect(wordsToNumber()).toEqual("");
	});

	it("Should works with fuzzy model", () => {
		expect(wordsToNumber<number>("ضد و بنچاه و دو", { fuzzy: true })).toEqual(152);
	});

	describe("UNITS", () => {
		Object.entries(UNITS).forEach((pair) => {
			const [key, value] = pair;
			it(`${value}`, () => {
				expect(wordsToNumber(key)).toEqual(value);
			});
		});
	});

	describe("TEN", () => {
		Object.entries(TEN).forEach((pair) => {
			const [key, value] = pair;
			it(`${value}`, () => {
				expect(wordsToNumber(key)).toEqual(value);
			});
		});
	});

	describe("MAGNITUDE", () => {
		Object.entries(MAGNITUDE).forEach((pair) => {
			const [key, value] = pair;
			it(`${value}`, () => {
				expect(wordsToNumber(key)).toEqual(value);
			});
		});
	});
});
