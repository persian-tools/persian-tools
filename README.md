<h2 align="center">Persian tools</h2>

[![Build Status](https://travis-ci.org/ali-master/persian-tools.svg?branch=master)](https://travis-ci.org/ali-master/persian-tools)

PersianTools.js is a standalone, library-agnostic JavaScript that enables some of the Persian features for using in the JavaScript.

## Features

-   Convert Persian words to the number and vice versa.
-   Add and remove commas to numbers.
-   Convert Persian numbers to Arabic or English numbers and vice versa.
-   Validation of Iranian National Number(code-e Melli).
-   Get the city and province name by national code.
-   Bank number validation.
-   Get the name of the bank by bank account number.
-   Validation of the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.
-   Fix Persian characters in URL.

## Getting started

There are two main ways to get PersianTools.js in your JavaScript project:
via <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage" target="_blank">script tags</a> <strong>or</strong> by installing it from <a href="https://www.npmjs.com/" target="_blank">NPM</a>
and using a build tool like <a href="https://parceljs.org/" target="_blank">Parcel</a>,
<a href="https://webpack.js.org/" target="_blank">WebPack</a>, or <a href="https://rollupjs.org/guide/en" target="_blank">Rollup</a>.

### via Script Tag

Add the following code to an HTML file:

```html
<html>
	<head>
		<!-- Load PersianTools.js -->
		<script src="https://cdn.jsdelivr.net/npm/persian-tools2"></script>

		<!-- Place your code in the script tag below. You can also use an external .js file -->
		<script type="text/javascript">
			// Notice there is no 'import' statement. 'all persian-tools functions like digitsEnToFa, etc...' is available on the index-page
			// because of the script tag above.

			// Takes a string made of English digits only, and returns a string that represents the same number but with Persian digits
			var convertToFa = digitsEnToFa(1234567);

			// etc...
		</script>
	</head>

	<body></body>
</html>
```

Open up that html file in your browser and the code should run!

### via NPM

Add PersianTools.js to your project using <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> <em>or</em> <a href="https://docs.npmjs.com/cli/npm" target="_blank">npm</a>. <b>Note:</b> Because
we use ES2017 syntax (such as `import`), this workflow assumes you are using a modern browser or a bundler/transpiler
to convert your code to something older browsers understand.

```js
import * as persianTools from "persian-tools";
// or
import { digitsEnToFa } from "persian-tools";

// Takes a string made of English digits only, and returns a string that represents the same number but with Persian digits
var convertToFa = persianTools.digitsEnToFa(1234567);
```

## Usage

Let's take a look at what an example test case would look like using Persian-tools.

### Convert Persian words to the number and vice versa

```js
import { NumberToWords, WordsToNumber } from "persian-tools";

describe("Words and numbers", () => {
	it("WordsToNumber", () => {
		let wordFn = new WordsToNumber();

		expect(wordFn.convert("منفی سه هزارمین", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
		expect(wordFn.convert("منفی سه هزارمین", { digits: "fa" })).toEqual("-۳۰۰۰");
		expect(wordFn.convert("منفی سه هزارمین")).toEqual(-3000);
		expect(wordFn.convert("منفی سه هزارم")).toEqual(-3000);
		expect(wordFn.convert("منفی سه هزار")).toEqual(-3000);
		expect(wordFn.convert("سه هزار دویست و دوازده")).toEqual(3212);
		expect(wordFn.convert("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(wordFn.convert("منفی سه هزارمین"))).toHaveLength(5);

		expect(wordFn.convert("دوازده هزار بیست دو")).toEqual(12022);
		expect(wordFn.convert("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");
	});

	it("NumberToWords", () => {
		expect(NumberToWords(500443)).toEqual("پانصد هزار و چهار صد و چهل و سه");
		expect(NumberToWords("500,443")).toEqual("پانصد هزار و چهار صد و چهل و سه");
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
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn } from "persian-tools";

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
	it("Validation", () => {
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
	it("isPersian", () => {
		expect(isPersian("این یک متن فارسی است؟")).not.toBeFalsy();
		expect(isPersian("Lorem Ipsum Test")).toBeFalsy();

		expect(isPersian()).toBeUndefined();
	});

	it("toPersianChars", () => {
		expect(toPersianChars("علي")).toEqual("علی");

		expect(toPersianChars()).toBeUndefined();
	});
});
```

### Fix Persian characters in URL.

```js
import { isPersian, toPersianChars } from "persian-tools";

describe("Persian characters", () => {
	it("URLfix", () => {
		expect(
			URLfix(
				"https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js",
			),
		).toEqual("https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js");
		expect(URLfix("https://en.wikipedia.org/wiki/Persian_alphabet")).toEqual(
			"https://en.wikipedia.org/wiki/Persian_alphabet",
		);
		expect(URLfix("Sample Text")).toEqual("Sample Text");
		expect(URLfix()).toBeUndefined();
	});
});
```
