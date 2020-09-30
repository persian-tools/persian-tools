<div align="center">
	<p align="center">
		<img src="./images/logo.png" width="200" />
	</p>
	<h1 align="center">Persian tools</h1>
	<p align="center">PersianTools.js is a standalone, library-agnostic JavaScript that enables some of the Persian features for use in the JavaScript.</p>

![CI/CD](https://github.com/ali-master/persian-tools/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/ali-master/persian-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/ali-master/persian-tools)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ali-master/persian-tools/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/ali-master/persian-tools/compare) 
[![CodeFactor](https://www.codefactor.io/repository/github/ali-master/persian-tools/badge)](https://www.codefactor.io/repository/github/ali-master/persian-tools)

</div>
<hr />

## Features

-   Convert Persian words to number and vice versa.
-   Add and remove commas to numbers.
-   Convert Persian numbers to Arabic or English numbers and vice versa.
-   Validate Iranian national number(code-e Melli).
-   Find city and province name by national code(code-e Melli).
-   Bill calculator
-   Validate Bank card number.
-   Find Bank's name by Card number.
-   Validate the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.
-   Fix Persian characters in URL.
-   Fix Persian zero-width non-joiner(Replace spaces by half-space)

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
    <script src="https://cdn.jsdelivr.net/npm/persian-tools2@1.3.0/dist/index.bowser.js"></script>

    <!-- Place your code in the script tag below. You can also use an external .js file -->
    <script type="text/javascript">
        // Notice there is no 'import' statement. 'all persian-tools functions like digitsEnToFa, etc...' is available on the index-page
        // because of the script tag above.

        // Takes a string made of English digits only, and returns a string that represents the same number but with Persian digits
        var convertToFa = PersianTools.digitsEnToFa(1234567);

        // etc...
    </script>
</head>

<body></body>
</html>
```

Open up that html file in your browser, and the code should run!

### via NPM

Add PersianTools.js to your project using <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> <em>or</em> <a href="https://docs.npmjs.com/cli/npm" target="_blank">npm</a>. <b>Note:</b> Because
we use ES2017 syntax (such as `import`), this workflow assumes you are using a modern browser or a bundler/transpiler
to convert your code to something older browsers understand.

```javascript
import * as persianTools from "persian-tools2";
// or
import { digitsEnToFa } from "persian-tools2";

// Takes a string made of English digits only, and returns a string that represents the same number but with Persian digits
const convertToFa = persianTools.digitsEnToFa(1234567);
// or
const convertToFa = digitsEnToFa(1234567);
```

## Usage

Let's take a look at what an example test case would look like using Persian-tools.

### Convert Persian words to the number and vice versa

```javascript
import { NumberToWords, WordsToNumber } from "persian-tools2";

WordsToNumber.convert("منفی سه هزارمین", { digits: "fa", addCommas: true }) // "-۳,۰۰۰"
WordsToNumber.convert("منفی سه هزارمین", { digits: "fa" }) // "-۳۰۰۰"
WordsToNumber.convert("منفی سه هزارمین") // -3000
WordsToNumber.convert("منفی سه هزارم") // -3000
WordsToNumber.convert("منفی سه هزار") // -3000
WordsToNumber.convert("سه هزار دویست و دوازده") // 3212
WordsToNumber.convert("دوازده هزار بیست دو") // 12022
WordsToNumber.convert("دوازده هزار بیست دو", { addCommas: true }) // "12,022"

NumberToWords.convert(500443) // "پانصد هزار و چهار صد و چهل و سه"
NumberToWords.convert("500,443") // "پانصد هزار و چهار صد و چهل و سه"
NumberToWords.convert("500,443", { ordinal: true }) // "پانصد هزار و چهار صد و چهل و سوم"
NumberToWords.convert(30000000000) // "سی میلیارد"
```

### Add and remove commas

```javascript
import { addCommas, removeCommas } from "persian-tools2";

addCommas(30000000) // "30,000,000"
addCommas(300) // "300"

removeCommas("30,000,000") // 30000000
removeCommas(300) // 300
removeCommas("300") // 300
```

### Convert Persian numbers to Arabic or English numbers and vice versa

```javascript
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn } from "persian-tools2";

digitsArToFa("٠١٢٣٤٥٦٧٨٩"); // "۰۱۲۳۴۵۶۷۸۹"
digitsArToFa("۸۹123۴۵"); // "۸۹123۴۵"
digitsArToFa(456128); // "456128"
digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩"); // "Text ۰۱۲۳۴۵۶۷۸۹"

digitsArToEn("٠١٢٣٤٥٦٧٨٩"); // "0123456789"
digitsArToEn("٨٩123٤٥"); // "8912345"
digitsArToEn(456128); // "456128"

digitsArToEn("Text ٠١٢٣٤٥٦٧٨٩"); // "Text 0123456789"

digitsEnToFa("123۴۵۶"); // "۱۲۳۴۵۶"
digitsEnToFa("٤٥٦"); // "٤٥٦"
digitsEnToFa("123۴۵۶"); // "۱۲۳۴۵۶"

digitsFaToEn("123۴۵۶"); // "123456"
digitsFaToEn("۸۹123۴۵"); // "8912345"
digitsFaToEn("۰۱۲۳۴۵۶۷۸۹"); // "0123456789"
```

### Validate Iranian national number(code-e Melli)

```javascript
import { verifyIranianNationalId, getPlaceByIranNationalId } from "persian-tools2";

verifyIranianNationalId("0499370899"); // true
verifyIranianNationalId("0790419904"); // true
verifyIranianNationalId("0084575948"); // true
verifyIranianNationalId("0963695398"); // true
verifyIranianNationalId("0684159414"); // true
verifyIranianNationalId("0067749828"); // true
verifyIranianNationalId("0684159415"); // false
```

### Find city and province name by national code(code-e Melli)
```javascript
getPlaceByIranNationalId("0499370899").city; // "شهرری"
getPlaceByIranNationalId("0790419904").city; // "سبزوار"
getPlaceByIranNationalId("0084575948").city; // "تهران مرکزی"
getPlaceByIranNationalId("0060495219").city; // "تهران مرکزی"
getPlaceByIranNationalId("0084545943").city; // "تهران مرکزی"
getPlaceByIranNationalId("0671658506").city; // "بجنورد"
getPlaceByIranNationalId("0671658506").city; // "بجنورد"
getPlaceByIranNationalId("0643005846").city; // "بیرجند"
getPlaceByIranNationalId("0906582709").city; // "کاشمر"
getPlaceByIranNationalId("0451727304").city; // "شمیران"
getPlaceByIranNationalId("0371359058").city; // "قم"
```

### Bank number validation and get the name of the bank by bank account number

```javascript
import { verifyCardNumber, getBankNameFromCardNumber } from "persian-tools2";

verifyCardNumber(6037701689095443); // true
verifyCardNumber(6219861034529007); // true
verifyCardNumber(6219861034529008); // false
getBankNameFromCardNumber(6037701689095443); // "بانک کشاورزی"
getBankNameFromCardNumber(6219861034529007); // "بانک سامان"
getBankNameFromCardNumber("6219861034529007"); // "بانک سامان"
```

### Validate the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.

```javascript
import { isPersian, toPersianChars } from "persian-tools2";

isPersian("این یک متن فارسی است؟") // true
isPersian("Lorem Ipsum Test") // false
toPersianChars("علي")) // علی
```

### Fix Persian characters in URL.

```javascript
import { isPersian, toPersianChars } from "persian-tools2";

URLfix(
	"https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js",
); // "https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js"
URLfix("https://en.wikipedia.org/wiki/Persian_alphabet"); // "https://en.wikipedia.org/wiki/Persian_alphabet",
URLfix("Sample Text"); // "Sample Text"
```
### Bill calculator
| Method                  | Description                             | Return type
|---                	  |---	                                    |---
| getResult               | Result of bill calculated information	| BillResult
| getAmount  	          | Calculate Bill amount by payment id and bill id which entered by the Bill constructor | number
| getBillType        	  | Get Bill provider type name         	| BillTypes
| getBarcode              | Calculate and get Bill's barcode        | string         
| verificationBill        | Validate entered both Bill id and payment id, and return true if bill id and payment id relation was true | boolean         
| verificationBillId      | Validate entered Bill id                | boolean         
| verificationBillPayment | Validate entered Bill payment id        | boolean         
```js
import { Bill } from "persian-tools2";

// Calculate bill amount by bill id and payment id
// Convert to Iranian Rials
new Bill({ billId: 1117753200140, paymentId: 12070160, currency: "rial" }).getResult().amount; // 120000
// Return bill amount by Toman(Iranian currency type) by default
new Bill({ billId: 1117753200140, paymentId: 12070160 }).getResult().amount; // 12000

// Find Bill's type by bill id and payment id
new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().type; // تلفن ثابت
new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().type; // برق
new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().type; // آب
new Bill({ billId: 9100074409151, paymentId: 12908190 }).getResult().type; // تلفن همراه
new Bill({ billId: 7748317800105, paymentId: 1770160 }).getResult().type; // unknown

// Check Bill id validation
new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValidBillId; // true
new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().isValidBillId; // false

// Check Bill's payment id validation
new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValidBillPayment; // true
new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().isValidBillPayment; // false

// Check Bill id and payment id relations which is valid or not
new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValid; // true
new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().isValid; // false

// Get barcode from billId and paymentId
new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().barcode; // 77483178001420001770160
new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().barcode; // 917463950412400012908197

// Get bill bill id and payment id by bill's barcode
new Bill({ barcode: "22343223446130001070189" }).findByBarcode(); // { billId: 2234322344613 , paymentId: 1070189 }
```

### Fix Persian zero-width non-joiner(Replace spaces by half-space) 

```javascript
import { halfSpace } from "persian-tools2";

halfSpace("نمی ‌خواهی درخت ها را ببینیم؟") // "نمی‌خواهی درخت‌ها را ببینیم؟"
```

### Todo
- [ ] Write typescript document
- [ ] Complete Bill methods documents one by one
- [ ] Check Iranian iban number validation
- [ ] Find Bank's name by Iban number

## Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ali-master/persian-tools/blob/master/LICENSE) file for details.
