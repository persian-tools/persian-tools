<div align="center">
	<p align="center">
		<img src="./images/logo.png" width="200" />
	</p>
	<h1 align="center">Persian tools</h1>
	<p align="center">PersianTools.js is a standalone, library-agnostic JavaScript that enables some of the Persian features for use in the JavaScript.</p>

![CI/CD](https://github.com/persian-tools/persian-tools/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/persian-tools/persian-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/persian-tools/persian-tools)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/persian-tools/persian-tools/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/persian-tools/persian-tools/compare) 
[![CodeFactor](https://www.codefactor.io/repository/github/persian-tools/persian-tools/badge)](https://www.codefactor.io/repository/github/persian-tools/persian-tools)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg)](#contributors-)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)
</div>
<hr />

## Features

-   [Convert Persian words to the number](#convert-persian-words-to-the-number).
-   [Convert Numbers to Persian words](#convert-numbers-to-persian-words).
-   [Add and remove commas to numbers](#add-and-remove-commas).
-   [Convert Persian numbers to Arabic or English numbers and vice versa](#convert-persian-numbers-to-arabic-or-english-numbers-and-vice-versa).
-   [Validate Iranian national number(code-e Melli)](#validate-iranian-national-number-id-e-melli).
-   [Find city and province name by national code(code-e Melli)](#find-city-and-province-name-by-national-code-e-melli).
-   [Bill calculator](#bill-calculator).
-   [Check Iranian Sheba(IBAN) validation and recognize bank information by sheba code](#iranian-shebaiban).
-   [Validate Bank card number](#bank-number-validation-and-get-the-name-of-the-bank-by-bank-account-number).
-   [Find Bank's name by Card number]((#bank-number-validation-and-get-the-name-of-the-bank-by-bank-account-number)).
-   [Validate the correctness of the text of the Persian language and clear the Arabic letters in the Persian text](#validate-the-correctness-of-the-text-of-the-persian-language-and-clear-the-arabic-letters-in-the-persian-text).
-   [Fix Persian characters in URL](#fix-persian-characters-in-url).
-   [Fix Persian zero-width non-joiner(Replace spaces by half-space)](#fix-persian-zero-width-non-joinerreplace-spaces-by-half-space)

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
we use ES2017 syntax (such as `import`), this workflow assumes you are using a modern browser, or a bundler/transpiler
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

### Convert Persian words to the number
| Options                   | Description                                                   | Default
|---                	    |---                                                            |--- 
| `fuzzy`**(Beta)**       | Fix typo in the Persian words by using [`levenshtein`](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm  | `false`
| `digits`                  | Result will be converted to the English or Persian digits     | `en`
| `addCommas`               | Commas will be added to the Result                            | `false`
- Convert with no option
```javascript
import { WordsToNumber } from "persian-tools2";

WordsToNumber.convert("منفی سه هزارمین") // -3000
WordsToNumber.convert("منفی سه هزارم") // -3000
WordsToNumber.convert("منفی سه هزار") // -3000
WordsToNumber.convert("سه هزار دویست و دوازده") // 3212
WordsToNumber.convert("دوازده هزار بیست دو") // 12022
```
- Digits converter
```js
WordsToNumber.convert("منفی سه هزارمین", { digits: "fa" }) // "-۳۰۰۰"
WordsToNumber.convert("دوازده هزار بیست دو", { digits: "fa" }) // ۱۲۰۲۲
```
- Add commas
```js
WordsToNumber.convert("منفی سه هزارمین", { addCommas: true }) // "-3,000"
WordsToNumber.convert("دوازده هزار بیست دو", { addCommas: true }) // "12,022"
```  
- Fuzzy typo fixer(`v1.5.0`):
```javascript
import { WordsToNumber } from "persian-tools2";

WordsToNumber.convert("یگصد و بنجاه هزار", { fuzzy: true }) // "150000"  
WordsToNumber.convert("دویشت ر بیشت هزار", { fuzzy: true }) // "220000"  
WordsToNumber.convert("منقی ضد", { fuzzy: true }) // "-100"  
```

### Convert Numbers to Persian words
```javascript
import { NumberToWords } from "persian-tools2";

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

### Find city and province name by national-id(code-e Melli)
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
| `getResult`               | Result of bill calculated information	| BillResult
| `getAmount`  	          | Calculate Bill amount by payment id and bill id which entered by the Bill constructor | number
| `getBillType`        	  | Get Bill provider type name         	| BillTypes
| `getBarcode`              | Calculate and get Bill's barcode        | `string`         
| `verificationBill`        | Validate entered both Bill id and payment id, and return true if bill id and payment id relation was true | boolean         
| `verificationBillId`      | Validate entered Bill id                | `boolean`         
| `verificationBillPayment` | Validate entered Bill payment id        | `boolean`         
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

### Iranian Sheba(IBAN)

- Check validation
```javascript
import { Sheba } from "persian-tools2";

new Sheba("IR820540102680020817909002").validate(); // true
new Sheba("IR01234567890123456789").validate() // false
```

- Recognize bank information 
```javascript
import { Sheba } from "persian-tools2";

new Sheba("IR820540102680020817909002").recognize();
/*
 Result: {
    "nickname": "parsian",
    "name": "Parsian Bank",
    "persianName": "بانک پارسیان",
    "code": "054",
    "accountNumberAvailable": true,
    "accountNumber": "020817909002",
    "formattedAccountNumber": "002-00817909-002"
  }
*/
```

### Fix Persian zero-width non-joiner(Replace spaces by half-space) 

```javascript
import { halfSpace } from "persian-tools2";

halfSpace("نمی ‌خواهی درخت ها را ببینیم؟") // "نمی‌خواهی درخت‌ها را ببینیم؟"
```

### Todo
- [ ] Write Jalaali and Gregorian functions to convert Date together.

## Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ali-master/persian-tools/blob/master/LICENSE) file for details.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/alitorki/"><img src="https://avatars1.githubusercontent.com/u/9049092?v=4" width="100px;" alt=""/><br /><sub><b>Ali Torki</b></sub></a><br /><a href="#infra-ali-master" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mssoheil"><img src="https://avatars3.githubusercontent.com/u/16543635?v=4" width="100px;" alt=""/><br /><sub><b>mssoheil</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/moh3n9595"><img src="https://avatars1.githubusercontent.com/u/20948388?v=4" width="100px;" alt=""/><br /><sub><b>Mohsen</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Code">💻</a></td>
    <td align="center"><a href="http://titles.ir"><img src="https://avatars1.githubusercontent.com/u/1300289?v=4" width="100px;" alt=""/><br /><sub><b>Hesam pourghazian</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Hesamp" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/amirqasemi74"><img src="https://avatars3.githubusercontent.com/u/20992734?v=4" width="100px;" alt=""/><br /><sub><b>Amir Hossien Qasemi Moqaddam</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=amirqasemi74" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Wallaby.js

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

This repository contributors are welcome to use
[Wallaby.js OSS License](https://wallabyjs.com/oss/) to get
test results immediately as you type, and see the results in
your editor right next to your code.
