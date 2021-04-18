import { digitsEnToFa, digitsFaToEn, digitsArToFa, digitsArToEn } from "../src";

describe("Digits converter", () => {
	it("digitsArToFa", () => {
		expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("۰۱۲۳۴۵۶۷۸۹");
		expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
		try {
			//@ts-ignore
			digitsArToFa();
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsArToFa - The input must be string");
		}
		expect(digitsArToFa("")).toEqual("");
		expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ۰۱۲۳۴۵۶۷۸۹");
	});

	it("digitsArToEn", () => {
		expect(digitsArToEn("٠١٢٣٤٥٦٧٨٩")).toEqual("0123456789");
		expect(digitsArToEn("٨٩123٤٥")).toEqual("8912345");

		try {
			//@ts-ignore
			digitsArToEn();
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsArToEn - The input must be string");
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
			expect(e.message).toEqual("PersianTools: digitsEnToFa - The input must be string or number");
		}

		try {
			//@ts-ignore
			digitsEnToFa(undefined);
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsEnToFa - The input must be string or number");
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
			expect(e.message).toEqual("PersianTools: digitsFaToEn - The input must be string");
		}
	});
});
