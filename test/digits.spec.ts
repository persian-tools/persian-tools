import { digitsEnToFa } from "../src/modules/digits";
import { digitsFaToEn } from "../src/modules/digits";
import { digitsArToFa } from "../src/modules/digits";
import { digitsArToEn } from "../src/modules/digits";

describe("Digits", () => {
	it("digitsArToFa", () => {
		expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("۰۱۲۳۴۵۶۷۸۹");
		expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
		expect(digitsArToFa(456128)).toEqual("456128");
		expect(digitsArToFa()).toBeUndefined();
		expect(digitsArToFa("")).toBeUndefined();
		expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ۰۱۲۳۴۵۶۷۸۹");
	});

	it("digitsArToEn", () => {
		expect(digitsArToEn("٠١٢٣٤٥٦٧٨٩")).toEqual("0123456789");
		expect(digitsArToEn("٨٩123٤٥")).toEqual("8912345");
		// @ts-ignore
		expect(digitsArToEn(456128)).toEqual("456128");

		expect(digitsArToEn()).toBeUndefined();
		expect(digitsArToEn("")).toBeUndefined();

		expect(digitsArToEn("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text 0123456789");
	});

	it("digitsEnToFa", () => {
		expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
		expect(digitsEnToFa("٤٥٦")).toEqual("٤٥٦");
		expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
		expect(digitsEnToFa()).toBeUndefined();
		expect(digitsEnToFa("")).toBeUndefined();
	});

	it("digitsFaToEn", () => {
		expect(digitsFaToEn("123۴۵۶")).toEqual("123456");
		expect(digitsFaToEn("۸۹123۴۵")).toEqual("8912345");
		expect(digitsFaToEn("۰۱۲۳۴۵۶۷۸۹")).toEqual("0123456789");
		expect(digitsFaToEn()).toBeUndefined();
		expect(digitsFaToEn("")).toBeUndefined();
	});
});
