import isPersian from '../src/modules/isPersian';
import toPersianChars from '../src/modules/toPersianChars';

import WordsToNumber from '../src/modules/WordsToNumber';
import NumberToWords from '../src/modules/NumberToWords';

import verifyCardNumber from '../src/modules/verifyCardNumber';
import getBankNameFromCardNumber from '../src/modules/getBankNameFromCardNumber';

import {digitsEnToFa} from '../src/modules/digits';
import {digitsFaToEn} from '../src/modules/digits';
import {digitsArToFa} from '../src/modules/digits';
import {digitsArToEn} from '../src/modules/digits';

import addCommas from '../src/modules/addCommas';
import removeCommas from '../src/modules/removeCommas';

import URLfix from '../src/modules/URLfix';
import SortText from '../src/modules/SortText';

import verifyIranianNationalId from '../src/modules/nationalId';
import getPlaceByIranNationalId from '../src/modules/getPlaceByIranNationalId';

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});


describe('Persian Tools', () => {
    it('WordsToNumber', () => {
        let wordFn = new WordsToNumber();

        expect(wordFn.convert('منفی سه هزارمین', { digits: 'fa', addCommas: true })).toEqual("-۳,۰۰۰");
        expect(wordFn.convert('منفی سه هزارمین', { digits: 'fa'})).toEqual("-۳۰۰۰");
        expect(wordFn.convert('منفی سه هزارمین')).toEqual(-3000);
        expect(wordFn.convert('منفی سه هزارم')).toEqual(-3000);
        expect(wordFn.convert('منفی سه هزار')).toEqual(-3000);
        expect(wordFn.convert('سه هزار دویست و دوازده')).toEqual(3212);
        expect(wordFn.convert('منفی سه هزارمین')).not.toEqual("-3000");
        expect(String(wordFn.convert('منفی سه هزارمین'))).toHaveLength(5);

        expect(wordFn.convert('دوازده هزار بیست دو')).toEqual(12022)
        expect(wordFn.convert('دوازده هزار بیست دو', {addCommas: true})).toEqual("12,022")
    });

    it('NumberToWords', () => {
        expect(NumberToWords(500443)).toEqual("پانصد هزار و چهار صد و چهل و سه");
        expect(NumberToWords("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
        expect(NumberToWords(500)).toHaveLength(5);
        expect(NumberToWords(30000000000)).toEqual("سی میلیارد");
    });

    it('isPersian', () => {
        expect(isPersian("این یک متن فارسی است؟")).not.toBeFalsy();
        expect(isPersian("Lorem Ipsum Test")).toBeFalsy();
    });

    it('toPersianChars', () => {
        expect(toPersianChars("علي")).toEqual("علی");
    });

    it('digitsArToFa', () => {
        expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("۰۱۲۳۴۵۶۷۸۹");
        expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
        expect(digitsArToFa(456128)).toEqual("456128");
        expect(digitsArToFa()).toBeUndefined();
        expect(digitsArToFa("")).toBeUndefined();
        expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ۰۱۲۳۴۵۶۷۸۹");
    });


    it('digitsArToEn', () => {
        expect(digitsArToEn("٠١٢٣٤٥٦٧٨٩")).toEqual("0123456789");
        expect(digitsArToEn("٨٩123٤٥")).toEqual("8912345");
        expect(digitsArToEn(456128)).toEqual("456128");

        expect(digitsArToEn()).toBeUndefined();
        expect(digitsArToEn("")).toBeUndefined();

        expect(digitsArToEn("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text 0123456789");
    });

    it('digitsEnToFa', () => {
        expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
        expect(digitsEnToFa("٤٥٦")).toEqual("٤٥٦");
        expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
        expect(digitsEnToFa()).toBeUndefined();
        expect(digitsEnToFa("")).toBeUndefined();
    });

    it('digitsFaToEn', () => {
        expect(digitsFaToEn("123۴۵۶")).toEqual("123456");
        expect(digitsFaToEn("۸۹123۴۵")).toEqual("8912345");
        expect(digitsFaToEn("۰۱۲۳۴۵۶۷۸۹")).toEqual("0123456789");
        expect(digitsFaToEn()).toBeUndefined();
        expect(digitsFaToEn("")).toBeUndefined();
    });

    it('URLfix', () => {
        expect(URLfix("https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js")).toEqual("https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js");
        expect(URLfix("https://en.wikipedia.org/wiki/Persian_alphabet")).toEqual("https://en.wikipedia.org/wiki/Persian_alphabet");
        expect(URLfix()).toBeUndefined();
        expect(URLfix("Sample Text")).toEqual("Sample Text");
    });

    it('SortText', () => {
        expect(SortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
    });

    it('Bank number validation', () => {
        expect(verifyCardNumber(6037701689095443)).not.toBeFalsy();
        expect(verifyCardNumber(6219861034529007)).not.toBeFalsy();
        expect(verifyCardNumber(6219861034529008)).toBeFalsy();
    });

    it("Get the name of the bank by bank account number", () => {
        expect(getBankNameFromCardNumber(6037701689095443)).toEqual("بانک کشاورزی");
        expect(getBankNameFromCardNumber(6219861034529007)).toEqual("بانک سامان");
        expect(getBankNameFromCardNumber("6219861034529007")).toEqual("بانک سامان");

        expect(getBankNameFromCardNumber()).toBeUndefined();
    });

    it("Validation of Iranian National Number(code-e Melli)", () => {
        expect(verifyIranianNationalId("0499370899")).not.toBeFalsy();
        expect(verifyIranianNationalId("0790419904")).not.toBeFalsy();
        expect(verifyIranianNationalId("0084575948")).not.toBeFalsy();
        expect(verifyIranianNationalId("0963695398")).not.toBeFalsy();
        expect(verifyIranianNationalId("0684159414")).not.toBeFalsy();
        expect(verifyIranianNationalId("0067749828")).not.toBeFalsy();

		expect(verifyIranianNationalId("0684159415")).toBeFalsy();

        expect(verifyIranianNationalId()).toBeUndefined();
    });

    it("Get the city and province name by national code", () => {
        expect(getPlaceByIranNationalId("0499370899").city).toEqual("شهرری");
        expect(getPlaceByIranNationalId("0790419904").city).toEqual("سبزوار");
        expect(getPlaceByIranNationalId("0084575948").city).toEqual("تهران مرکزی");
        expect(getPlaceByIranNationalId("0060495219").city).toEqual("تهران مرکزی");
        expect(getPlaceByIranNationalId("0671658506").city).toEqual("بجنورد");
        expect(getPlaceByIranNationalId("0671658506").city).toEqual("بجنورد");
        expect(getPlaceByIranNationalId("0643005846").city).toEqual("بیرجند");
        expect(getPlaceByIranNationalId("0906582709").city).toEqual("کاشمر");
        expect(getPlaceByIranNationalId("0451727304").city).toEqual("شمیران");
        expect(getPlaceByIranNationalId("0371359058").city).toEqual("قم");

        expect(getPlaceByIranNationalId("0084545943").city).toEqual("تهران مرکزی");

        expect(getPlaceByIranNationalId()).toBeUndefined();
    });


    it("Add and remove commas", () => {
        expect(addCommas(30000000)).toEqual("30,000,000");
        expect(addCommas(300)).toEqual("300");
        expect(addCommas(3000)).toBeType("string");
        expect(addCommas()).toBeUndefined();

		expect(removeCommas("30,000,000")).toEqual(30000000);
        expect(removeCommas(300)).toEqual(300);
        expect(removeCommas("300")).toEqual(300);
        expect(removeCommas("3000")).toBeType("number");
        expect(removeCommas()).toBeUndefined();
    });
})
