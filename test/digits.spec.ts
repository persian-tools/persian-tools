import { digitsEnToFa, digitsFaToEn, digitsFaToAr, digitsArToFa, digitsArToEn, digitsEnToAr } from "../src";

describe("Digits converter", () => {
	it("digitsArToFa", () => {
		expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("۰۱۲۳۴۵۶۷۸۹");
		expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
		try {
			//@ts-ignore
			digitsArToFa();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsArToFa - The input must be string");
		}
		expect(digitsArToFa("")).toEqual("");
		expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ۰۱۲۳۴۵۶۷۸۹");
	});

	it("digitsArToEn", () => {
		expect(digitsArToEn("٠١٢٣٤٥٦٧٨٩")).toEqual("0123456789");
		expect(digitsArToEn("89١٢٣4٥")).toEqual("8912345");
		expect(digitsArToEn("0123۴۵۶789")).toEqual("0123۴۵۶789");

		try {
			//@ts-ignore
			digitsArToEn();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsArToEn - The input must be string");
		}

		expect(digitsArToEn("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text 0123456789");
	});

	it("digitsEnToFa", () => {
		expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
		expect(digitsEnToFa(123)).toEqual("۱۲۳");
		expect(digitsEnToFa(1234567891)).toEqual("۱۲۳۴۵۶۷۸۹۱");
		expect(digitsEnToFa(0)).toEqual("۰");
		expect(digitsEnToFa("٤٥٦")).toEqual("٤٥٦");
		expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
		try {
			//@ts-ignore
			digitsEnToFa();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsEnToFa - The input must be string or number");
		}

		try {
			//@ts-ignore
			digitsEnToFa(undefined);
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsEnToFa - The input must be string or number");
		}
	});

	it("digitsEnToAr", () => {
		expect(digitsEnToAr(123456)).toEqual("١٢٣٤٥٦");
		expect(digitsEnToAr(1234567891)).toEqual("١٢٣٤٥٦٧٨٩١");
		expect(digitsEnToAr(0)).toEqual("٠");
		expect(digitsEnToAr("123٤٥٦")).toEqual("١٢٣٤٥٦");
		try {
			//@ts-ignore
			digitsEnToAr();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsEnToAr - The input must be number or string");
		}

		try {
			//@ts-ignore
			digitsEnToAr(undefined);
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsEnToAr - The input must be number or string");
		}
	});

	it("digitsFaToEn", () => {
		expect(digitsFaToEn("123۴۵۶")).toEqual("123456");
		expect(digitsFaToEn("۸۹123۴۵")).toEqual("8912345");
		expect(digitsFaToEn("۰۱۲۳۴۵۶۷۸۹")).toEqual("0123456789");
		try {
			//@ts-ignore
			digitsFaToEn();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsFaToEn - The input must be string");
		}
	});

	it("digitsFaToAr", () => {
		expect(digitsFaToAr("۰۱۲۳۴۵۶۷۸۹")).toEqual("٠١٢٣٤٥٦٧٨٩");
		expect(digitsFaToAr("۱۷۸۲۳۴۰۵۶۹")).toEqual("١٧٨٢٣٤٠٥٦٩");
		expect(digitsFaToAr("۷۸٤۲۳٤۴")).toEqual("٧٨٤٢٣٤٤");
		expect(digitsFaToAr("٤٤٤444۴۴۴")).toEqual("٤٤٤444٤٤٤");

		try {
			//@ts-ignore
			digitsFaToAr();
		} catch (e) {
			expect((e as Error).message).toEqual("PersianTools: digitsFaToAr - The input must be string");
		}
	});
});
