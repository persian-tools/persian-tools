import { digitsEnToFa, digitsFaToEn, digitsArToFa, digitsArToEn, digitsEnToAr } from "../src";

describe("Digits converter", () => {
	it("digitsArToFa", () => {
		expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("٠١٢٣۴۵۶٧٨٩");
		expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
		try {
			//@ts-ignore
			digitsArToFa();
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsArToFa - The input must be string");
		}
		expect(digitsArToFa("")).toEqual("");
		expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ٠١٢٣۴۵۶٧٨٩");
	});

	it("digitsArToEn", () => {
		expect(digitsArToEn("۰۱۲۳٤٥٦۷۸۹")).toEqual("0123456789");
		expect(digitsArToEn("89۱۲۳4٥")).toEqual("8912345");

		try {
			//@ts-ignore
			digitsArToEn();
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsArToEn - The input must be string");
		}

		expect(digitsArToEn("Text ۰۱۲۳٤٥٦۷۸۹")).toEqual("Text 0123456789");
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

	it("digitsEnToAr", () => {
		expect(digitsEnToAr(123456)).toEqual("۱۲۳٤٥٦");
		expect(digitsEnToAr(1234567891)).toEqual("۱۲۳٤٥٦۷۸۹۱");
		expect(digitsEnToAr(0)).toEqual("۰");
		expect(digitsEnToAr("123٤٥٦")).toEqual("۱۲۳٤٥٦");
		try {
			//@ts-ignore
			digitsEnToAr();
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsEnToAr - The input must be number or string");
		}

		try {
			//@ts-ignore
			digitsEnToAr(undefined);
		} catch (e) {
			expect(e.message).toEqual("PersianTools: digitsEnToAr - The input must be number or string");
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
