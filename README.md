[![Build Status](https://travis-ci.org/ali-master/persian-tools.svg?branch=master)](https://travis-ci.org/ali-master/persian-tools)

<h2 align="center">Persian tools</h2>

Persian-tools.JS is a standalone, library-agnostic JavaScript that enables some of the Persian features for using.

## Features

-   🔥 Convert Persian words to the number and vice versa.
-   🔥 Add and remove commas to numbers.
-   🔥 Convert Persian numbers to Arabic or English numbers and vice versa.
-   🔥 Validation of Iranian National Number(code-e Melli).
-   🔥 Get the city and province name by national code.
-   🔥 Bank number validation.
-   🔥 Get the name of the bank by bank account number.
-   🔥 Validation of the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.
-   🔥 Fix Persian characters in URL.

## Usage

Let's take a look at what an example test case would look like using Persian-tools.

### Convert Persian words to number and versa

```js
import { NumberToWords, WordsToNumber } from "persian-tools";

describe("Words and numbers", () => {
	it("WordsToNumber", () => {
		let wordFn = new WordsToNumber();

		expect(
			wordFn.convert("منفی سه هزارمین", { digits: "fa", addCommas: true })
		).toEqual("-۳,۰۰۰");
		expect(wordFn.convert("منفی سه هزارمین", { digits: "fa" })).toEqual(
			"-۳۰۰۰"
		);
		expect(wordFn.convert("منفی سه هزارمین")).toEqual(-3000);
		expect(wordFn.convert("منفی سه هزارم")).toEqual(-3000);
		expect(wordFn.convert("منفی سه هزار")).toEqual(-3000);
		expect(wordFn.convert("سه هزار دویست و دوازده")).toEqual(3212);
		expect(wordFn.convert("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(wordFn.convert("منفی سه هزارمین"))).toHaveLength(5);

		expect(wordFn.convert("دوازده هزار بیست دو")).toEqual(12022);
		expect(
			wordFn.convert("دوازده هزار بیست دو", { addCommas: true })
		).toEqual("12,022");
	});

	it("NumberToWords", () => {
		expect(NumberToWords(500443)).toEqual(
			"پانصد هزار و چهار صد و چهل و سه"
		);
		expect(NumberToWords("500,443")).toEqual(
			"پانصد هزار و چهار صد و چهل و سه"
		);
		expect(NumberToWords(500)).toHaveLength(5);
		expect(NumberToWords(30000000000)).toEqual("سی میلیارد");
	});
});
```

### Add and remove commas

```js
import { addCommas, removeCommas } from "persian-tools";

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
```

### Convert Persian numbers to Arabic or English numbers and vice versa

```js
import {
	digitsArToFa,
	digitsArToEn,
	digitsEnToFa,
	digitsFaToEn
} from "persian-tools";

describe("Convert numbers", () => {
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
```

### Validation of Iranian National Number(code-e Melli) and get the city and province name by that.

```js
import { verifyIranianNationalId, getPlaceByIranNationalId } from "persian-tools";

describe("National id", () => {
	it("Validate", () => {
		expect(verifyIranianNationalId("0499370899")).not.toBeFalsy();
		expect(verifyIranianNationalId("0790419904")).not.toBeFalsy();
		expect(verifyIranianNationalId("0084575948")).not.toBeFalsy();
		expect(verifyIranianNationalId("0963695398")).not.toBeFalsy();
		expect(verifyIranianNationalId("0684159414")).not.toBeFalsy();
		expect(verifyIranianNationalId("0067749828")).not.toBeFalsy();

		expect(verifyIranianNationalId("0684159415")).toBeFalsy();

		expect(verifyIranianNationalId()).toBeUndefined();
	});

	it("City and province name", () => {
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
});
```


### Bank number validation and get the name of the bank by bank account number

```js
import { verifyIranianNationalId, getPlaceByIranNationalId } from "persian-tools";

describe("National id", () => {
	it('Validation', () => {
        expect(verifyCardNumber(6037701689095443)).not.toBeFalsy();
        expect(verifyCardNumber(6219861034529007)).not.toBeFalsy();
        expect(verifyCardNumber(6219861034529008)).toBeFalsy();
    });

    it("Name of the bank", () => {
        expect(getBankNameFromCardNumber(6037701689095443)).toEqual("بانک کشاورزی");
        expect(getBankNameFromCardNumber(6219861034529007)).toEqual("بانک سامان");
        expect(getBankNameFromCardNumber("6219861034529007")).toEqual("بانک سامان");

        expect(getBankNameFromCardNumber()).toBeUndefined();
    });
});
```

### Validation of the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.

```js
import { isPersian, toPersianChars } from "persian-tools";

describe("National id", () => {
	it('isPersian', () => {
        expect(isPersian("این یک متن فارسی است؟")).not.toBeFalsy();
        expect(isPersian("Lorem Ipsum Test")).toBeFalsy();

        expect(isPersian()).toBeUndefined();
    });

    it('toPersianChars', () => {
        expect(toPersianChars("علي")).toEqual("علی");

        expect(toPersianChars()).toBeUndefined();
    });
});
```

### Fix Persian characters in URL.

```js
import { isPersian, toPersianChars } from "persian-tools";

describe("Persian characters", () => {
	it('URLfix', () => {
        expect(URLfix("https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js")).toEqual("https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js");
        expect(URLfix("https://en.wikipedia.org/wiki/Persian_alphabet")).toEqual("https://en.wikipedia.org/wiki/Persian_alphabet");
        expect(URLfix("Sample Text")).toEqual("Sample Text");
		expect(URLfix()).toBeUndefined();
    });
});
```
