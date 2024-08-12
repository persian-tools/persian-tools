<div align="center">
	<p align="center">
		<img src="./images/logo.png" width="200" />
	</p>
	<h1 align="center">Persian tools</h1>
	<p align="center">PersianTools is a standalone, library-agnostic JavaScript that enables some of the Persian features for use in the JavaScript.</p>

[![Rate on Openbase](https://badges.openbase.com/js/rating/@persian-tools/persian-tools.svg)](https://openbase.com/js/@persian-tools/persian-tools?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)
![CI/CD](https://github.com/persian-tools/persian-tools/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/persian-tools/persian-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/persian-tools/persian-tools)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/persian-tools/persian-tools/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/persian-tools/persian-tools/compare)
[![CodeFactor](https://www.codefactor.io/repository/github/persian-tools/persian-tools/badge)](https://www.codefactor.io/repository/github/persian-tools/persian-tools)
[![GitHub contributors](https://img.shields.io/github/contributors/persian-tools/persian-tools.svg)](https://GitHub.com/persian-tools/persian-tools/contributors/)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

</div>
<hr />

## Features

-   [Convert Persian words to the number](#convert-persian-words-to-the-number).
-   [Convert Numbers to Persian words](#convert-numbers-to-persian-words).
-   [Add and remove commas to numbers](#add-and-remove-commas).
-   [Convert Persian numbers to Arabic or English numbers and vice versa](#convert-persian-numbers-to-arabic-or-english-numbers-and-vice-versa).
-   [Validate Iranian national number(code-e Melli)](#validate-iranian-national-numbercode-e-melli).
-   [Validate Iranian legal id(shenase hoghoghi)](#validate-iranian-legal-idshenase-hoghoghi).
-   [Find city and province name by national code(code-e Melli)](#find-city-and-province-name-by-national-idcode-e-melli).
-   [Bill calculator](#bill-calculator).
-   [Check Iranian Sheba(IBAN) validation and recognize bank information by sheba code](#iranian-shebaiban).
-   [Validate Bank card number](#bank-number-validation-and-get-the-name-of-the-bank-by-bank-account-number).
-   [Find Bank's name by Card number](#bank-number-validation-and-get-the-name-of-the-bank-by-bank-account-number).
-   [Validate the correctness of the text of the Persian language and clear the Arabic letters in the Persian text](#validate-the-correctness-of-the-text-of-the-persian-language-and-clear-the-arabic-letters-in-the-persian-text).
-   [Fix Persian characters in URL](#fix-persian-characters-in-url).
-   [Fix Persian zero-width non-joiner(Replace spaces by half-space)](#fix-persian-zero-width-non-joinerreplace-spaces-by-half-space)
-   [Convert Jalaali date-time into a time ago](#convert-jalaali-date-time-into-a-time-ago)
-   [Get the Remaining Time of the Date](#get-the-remaining-time-of-the-date)
-   [Validate and find information of phone number](#validate-and-find-information-of-phone-number).
-   [Find capital city by province name ](#find-capital-city-by-province-name)
-   [Find province from coordinate ](#find-province-from-coordinate)
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
		<script src="https://cdn.jsdelivr.net/npm/@persian-tools/persian-tools/build/persian-tools.umd.js"></script>

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

### Install

Install the PersianTools to your project using <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> <em>or</em> <a href="https://docs.npmjs.com/cli/npm" target="_blank">npm</a>. <b>Note:</b> Because
we use ES2017 syntax (such as `import`), this workflow assumes you are using a modern browser, or a bundler/transpiler
to convert your code to something older browsers understand.

```bash
$ npm install --save @persian-tools/persian-tools
```

or

```bash
$ yarn add @persian-tools/persian-tools
```

### Simple usage

```javascript
import * as persianTools from "@persian-tools/persian-tools";
// or
import { digitsEnToFa } from "@persian-tools/persian-tools";

// Takes a string made of English digits only, and returns a string that represents the same number but with Persian digits
const convertedToFa = persianTools.digitsEnToFa(1234567);
// or
const convertedToFa = digitsEnToFa(1234567);
```

## Usage

Let's take a look at what an example test case would look like using Persian-tools.

### Convert Persian words to the number

| Options           | Description                                                                                                          | Default |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `fuzzy`**(Beta)** | Fix typo in the Persian words by using [`levenshtein`](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm | `false` |
| `digits`          | Result will be converted to the English or Persian digits                                                            | `en`    |
| `addCommas`       | Commas will be added to the Result                                                                                   | `false` |

-   Convert with no option

```javascript
import { wordsToNumber } from "@persian-tools/persian-tools";

wordsToNumber("منفی سه هزارمین"); // -3000
wordsToNumber("منفی سه هزارم"); // -3000
wordsToNumber("منفی سه هزار"); // -3000
wordsToNumber("سه هزار دویست و دوازده"); // 3212
wordsToNumber("دوازده هزار بیست دو"); // 12022
```

-   Digits converter

```js
wordsToNumber("منفی سه هزارمین", { digits: "fa" }); // "-۳۰۰۰"
wordsToNumber("دوازده هزار بیست دو", { digits: "fa" }); // ۱۲۰۲۲
```

-   Add commas

```js
wordsToNumber("منفی سه هزارمین", { addCommas: true }); // "-3,000"
wordsToNumber("دوازده هزار بیست دو", { addCommas: true }); // "12,022"
```

-   Fuzzy typo fixer(`v1.5.0`):

```javascript
import { WordsToNumber } from "@persian-tools/persian-tools";

wordsToNumber("یگصد و بنجاه هزار", { fuzzy: true }); // "150000"
wordsToNumber("دویشت ر بیشت هزار", { fuzzy: true }); // "220000"
wordsToNumber("منقی ضد", { fuzzy: true }); // "-100"
```

### Convert Numbers to Persian words

```javascript
import { numberToWords } from "@persian-tools/persian-tools";

numberToWords(500443); // "پانصد هزار و چهار صد و چهل و سه"
numberToWords("500,443"); // "پانصد هزار و چهار صد و چهل و سه"
numberToWords("500,443", { ordinal: true }); // "پانصد هزار و چهار صد و چهل و سوم"
numberToWords(30000000000); // "سی میلیارد"
```

**NOTE:** This function supports the largest safe integer (9007199254740991 / 2^53 - 1)

### Add and remove commas

```javascript
import { addCommas, removeCommas } from "@persian-tools/persian-tools";

addCommas(30000000); // "30,000,000"

removeCommas("30,000,000"); // 30000000
```

### Convert Persian numbers to Arabic or English numbers and vice versa

```javascript
import {
	digitsArToFa,
	digitsArToEn,
	digitsEnToFa,
	digitsFaToEn,
	digitsEnToAr,
	digitsFaToAr,
} from "@persian-tools/persian-tools";

digitsArToFa("۸۹123۴۵"); // "۸۹123۴۵"

digitsArToEn("٨٩123٤٥"); // "8912345"

digitsEnToFa("123۴۵۶"); // "۱۲۳۴۵۶"

digitsEnToAr("123٤٥٦"); // "۱۲۳٤٥٦"

digitsFaToAr("۱۷۸۲۳۴۰۵۶۹"); // ١٧٨٢٣٤٠٥٦٩
```

### Validate Iranian national number(code-e Melli)

```javascript
import { verifyIranianNationalId, getPlaceByIranNationalId } from "@persian-tools/persian-tools";

verifyIranianNationalId("0499370899"); // true
verifyIranianNationalId("0684159415"); // false
```

### Validate Iranian legal id(shenase hoghoghi)

```javascript
import { verifyIranianLegalId } from "@persian-tools/persian-tools";

verifyIranianLegalId(10380285692); // false
verifyIranianLegalId(10380284790); // true
```

### Find city and province name by national-id(code-e Melli)

```javascript
getPlaceByIranNationalId("0084575948").city; // "تهران مرکزی"
```

### Bank number validation and get the name of the bank by bank account number

```javascript
import { verifyCardNumber, getBankNameFromCardNumber } from "@persian-tools/persian-tools";

verifyCardNumber(6037701689095443); // true

getBankNameFromCardNumber("6219861034529007"); // "بانک سامان"
```

### Validate the correctness of the text of the Persian language and clear the Arabic letters in the Persian text.

```javascript
import { isPersian, hasPersian, toPersianChars } from "@persian-tools/persian-tools";

isPersian("این یک متن فارسی است؟"); // true
isPersian("Lorem Ipsum Test"); // false
isPersian("هل هذا نص فارسي؟"); // false

hasPersian("This text includes فارسی"); // true

toPersianChars("علي"); // علی
```

**Note**: You can pass `2` more options to `isPersian` to customize it as your needs:

-   `isComplex`: If you pass `true`, Then it accepts some of regular arabic characters which are commons in persian texts.(default is `false`)
-   `trimPattern`: By default the function skips some of characters e.g. `"'-+()؟.` and `whitespaces`. You can pass your own customized `regex` as you need.

### Fix Persian characters in URL.

```javascript
import { URLfix } from "@persian-tools/persian-tools";

URLfix(
	"https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js",
); // "https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js"
URLfix("https://en.wikipedia.org/wiki/Persian_alphabet"); // "https://en.wikipedia.org/wiki/Persian_alphabet",
URLfix("Sample Text"); // "Sample Text"
```

### Bill calculator

| Method                    | Description                                                                                               | Return type |
| ------------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| `getResult`               | Result of bill calculated information                                                                     | BillResult  |
| `getAmount`               | Calculate Bill amount by payment id and bill id which entered by the Bill constructor                     | number      |
| `getBillType`             | Get Bill provider type name                                                                               | BillTypes   |
| `getBarcode`              | Calculate and get Bill's barcode                                                                          | `string`    |
| `verificationBill`        | Validate entered both Bill id and payment id, and return true if bill id and payment id relation was true | boolean     |
| `verificationBillId`      | Validate entered Bill id                                                                                  | `boolean`   |
| `verificationBillPayment` | Validate entered Bill payment id                                                                          | `boolean`   |

```js
import { Bill } from "@persian-tools/persian-tools";

// Calculate bill amount by bill id and payment id
// Convert to Iranian Rials
// Return bill amount by Toman(Iranian currency type) by default
new Bill({ billId: 1117753200140, paymentId: 12070160, currency: "rial" }).getResult().amount; // 120000

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

-   Check validation

```javascript
import { isShebaValid } from "@persian-tools/persian-tools";

isShebaValid("IR820540102680020817909002"); // true
isShebaValid("IR01234567890123456789"); // false
```

-   Recognize bank information

```javascript
import { getShebaInfo } from "@persian-tools/persian-tools";

getShebaInfo("IR820540102680020817909002");
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
import { halfSpace } from "@persian-tools/persian-tools";

halfSpace("نمی ‌خواهی درخت ها را ببینیم؟"); // "نمی‌خواهی درخت‌ها را ببینیم؟"
```

### Get information(province, category, type) about vehicles plate

| Properties | Description                     | Return type    |
| ---------- | ------------------------------- | -------------- |
| `info`     | provide info about plate        | PlateResultApi |
| `isValid`  | checks if plate is valid or not | boolean        |

**Usage**

```js
import { Plate } from "@persian-tools/persian-tools";

Plate("12D45147"); // passing string argument

// or passing in object style
Plate({
	number: "1245147",
	char: "الف",
});
```

-   Getting info about plate

```js
import { Plate } from "@persian-tools/persian-tools";

Plate("12D45147").info;
/*
  {
  	template: 12 D 451 ایران  47
    province: مرکزی ,
    type: Car,
	category: دیپلمات,   
    details: {
	firstTwoDigits: 12,
	plateCharacter: D,
	nextThreeDigits: 451,
	provinceCode: 47
    }
  }
*/

// handle motorcyles plate
Plate(12345678).info;
/*
  {
    template: 123-45678,
	province: مرکز تهران,
    type: Motorcyle,
    category: null,
    details: {
    	digits: 45678
	provinceCode:123
    }
  }
*/
```

Plates that have farsi digits in them(like: الف، ب، ص) will be returned in this template

```
  ${first_two_digits}${plate_character}${next_three_digits}ایران${province_code}
```

-   Checking if plate is valid

```js
import { Plate } from "@persian-tools/persian-tools";

Plate("12D45147").isValid;
/*
  true
*/

Plate(12345678).isValid;
/*
  true
*/

Plate(1234567).isValid;
/*
  will return false - plate character is not provided
*/

Plate(1204567).isValid;
/*
  will return false - plate can't have 0 in its digits (except last digit)
*/
```

### Convert Jalaali date-time into a time ago

**Usage**

> Suppose the current time is equal to `1400/03/17 18:00:00`

```js
import { timeAgo } from "@persian-tools/persian-tools";

// Previous
timeAgo("1400/03/17 17:55:00"); // 5 دقیقه قبل
timeAgo("1400/02/17 18:00:00"); // حدود 1 ماه  قبل

// Next
timeAgo("1400/04/07 18:00:00"); // حدود 3 هفته  بعد
timeAgo("1401/03/17 18:00:00"); // حدود 1 سال  بعد
```

### Get the Remaining Time of the Date

**Usage**

> Takes a date(it could be string, number or date) and calculate years,
> months, days, hours, minutes and seconds remained to that specific date.

```js
import { remainingTime } from "@persian-tools/persian-tools";

remainingTime("2023-05-14T13:35:59Z").toString(); // ۱ سال و ۱ ماه و ۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه

const { years, months, days, hours, minutes, seconds, isFinished } = remainingTime("2023-05-14T13:35:59Z");
years; // 1
minutes; // 5
isFinished; // false

remainingTime("2018-04-12T10:30:51Z").isFinished; // true
```

### Validate and find information of phone number

**Usage**

-   Finding information such as province, type and model of phone number

```js
import { phoneNumberDetail } from "@persian-tools/persian-tools";

phoneNumberDetail("9123456789");
/*
  {
    province: ["البرز", "زنجان", "سمنان", "قزوین", "قم", "برخی از شهرستان های استان مرکزی"],
    base: "تهران",
    operator: "همراه اول",
    type: ["permanent"],
  }
*/

phoneNumberDetail("09022002580");
/*
  {
    province: [],
    base: "کشوری",
    operator: "ایرانسل",
    type: ["permanent", "credit"],
  }
*/

phoneNumberDetail("09981000000");
/*
  {
    province: [],
    base: "کشوری",
    operator: "شاتل موبایل",
    type: ["credit"],
  }
*/
```

-   Validating phone number

```js
import { phoneNumberValidator } from "@persian-tools/persian-tools";

phoneNumberValidator("09122002580"); // true
phoneNumberValidator("09192002580"); // true

phoneNumberValidator("+989022002580"); // true
phoneNumberValidator("09022002580"); // true
phoneNumberValidator("989022002580"); // true
phoneNumberValidator("00989022002580"); // true
phoneNumberValidator("9022002580"); // true

phoneNumberValidator("09802002580"); // false
```

-   Normalizing phone number

```js
import { phoneNumberNormalizer } from "@persian-tools/persian-tools";

phoneNumberNormalizer("+989022002580", "0"); // 09022002580
phoneNumberNormalizer("989022002580", "0"); // 09022002580
phoneNumberNormalizer("09022002580", "0"); // 09022002580
phoneNumberNormalizer("09022002580", "+98"); // +989022002580
```

### Find capital city by province name

**Usage**

> This function returns the Capital City name by its state name. if it can't find anything, it will throws an error.

```js
import { findCapitalByProvince } from "@persian-tools/persian-tools";

findCapitalByProvince("خراسان رضوی"); // مشهد
findCapitalByProvince("آذربایجان شرقی"); // تبریز

// this throw an error string 'no province found'
findCapitalByProvince("دبی");
```
### Find province from coordinate 

**Usage**

> Find the province from a given coordinate point. If it cannot find anything, it will throw an error.

```javascript
import { findProvinceFromCoordinate } from "@persian-tools/persian-tools";

// Find province for a given coordinate point
const point = { latitude: 35.6892, longitude: 51.3890 };

const province = findProvinceFromCoordinate(point);

province.fa; // "تهران"
province.en; // "Tehran"

// shorthand syntax using destructuring
const {fa , en} = findProvinceFromCoordinate(point);

```


### Todo

-   [ ] Write Jalaali and Gregorian functions to convert Date together.

## Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ali-master/persian-tools/blob/master/LICENSE) file for details.

## Who's using Persian tools?

<table>
	<tr>
		<td align="center">
			<a href="https://pwa.bank-maskan.ir">
				<img src="./images/showcases/bank-maskan.png" width="100px;" alt=""/><br /><sub><b>Bank Maskan</b></sub>
			</a>
		</td>
		<td align="center">
			<a href="https://mydong.ir">
				<img src="./images/showcases/mydong.png" width="100px;" alt=""/><br /><sub><b>MyDong</b></sub>
			</a>
		</td>
    <td align="center">
			<a href="https://melkba.ir">
				<img src="./images/showcases/melkba.png" width="100px;" alt=""/><br /><sub><b>Melkba</b></sub>
			</a>
		</td>
	</tr>
</table>

If you're curious to see what can be accomplished with Persian tools, check out these apps!

If you have a software you'd like to see added, please
[open a pull request](https://help.github.com/articles/creating-a-pull-request/)!
All that's required is a name, link, and a PNG icon.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/alitorki/"><img src="https://avatars1.githubusercontent.com/u/9049092?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ali Torki</b></sub></a><br /><a href="#infra-ali-master" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mssoheil"><img src="https://avatars3.githubusercontent.com/u/16543635?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mssoheil</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/moh3n9595"><img src="https://avatars1.githubusercontent.com/u/20948388?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohsen</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Code">💻</a></td>
    <td align="center"><a href="http://titles.ir"><img src="https://avatars1.githubusercontent.com/u/1300289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hesam pourghazian</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Hesamp" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/amirqasemi74"><img src="https://avatars3.githubusercontent.com/u/20992734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Amir Hossien Qasemi Moqaddam</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=amirqasemi74" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SeyyedKhandon"><img src="https://avatars.githubusercontent.com/u/59599950?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SeyyedKhandon</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=SeyyedKhandon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/masoudDaliriyan"><img src="https://avatars.githubusercontent.com/u/25932831?v=4?s=100" width="100px;" alt=""/><br /><sub><b>msdDaliriyan</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=masoudDaliriyan" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=masoudDaliriyan" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://mahdi-momeni.github.io/"><img src="https://avatars.githubusercontent.com/u/32864532?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mahdi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dev.to/psparsa"><img src="https://avatars.githubusercontent.com/u/57572461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>PS-PARSA</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=psparsa" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=psparsa" title="Code">💻</a> <a href="#ideas-psparsa" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://amirduzandeh.ir/"><img src="https://avatars.githubusercontent.com/u/16349391?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Amirhossein Douzandeh Zenoozi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=amirzenoozi" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=amirzenoozi" title="Tests">⚠️</a> <a href="#ideas-amirzenoozi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/M0rteza-M"><img src="https://avatars.githubusercontent.com/u/79398146?v=4?s=100" width="100px;" alt=""/><br /><sub><b>M0rteza-M</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=M0rteza-M" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=M0rteza-M" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.mahdi.wtf/"><img src="https://avatars.githubusercontent.com/u/36822136?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mediv0</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mediv0" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mediv0" title="Tests">⚠️</a> <a href="#ideas-mediv0" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/poorshad/"><img src="https://avatars.githubusercontent.com/u/43247296?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Poorshad Shaddel</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=pshaddel" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=pshaddel" title="Tests">⚠️</a> <a href="#ideas-pshaddel" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://t.me/theMasix"><img src="https://avatars.githubusercontent.com/u/22872117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Seyed Masih Sajadi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=theMasix" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=theMasix" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.samasarin.com"><img src="https://avatars.githubusercontent.com/u/30124243?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohammad Ghonchesefidi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=ghonchesefidi" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ghonchesefidi" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/realsaeedhassani/"><img src="https://avatars.githubusercontent.com/u/20496196?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saeed Hasani Borzadaran</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=realsaeedhassani" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=realsaeedhassani" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mrunderline"><img src="https://avatars.githubusercontent.com/u/23085360?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ali Madihi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mrunderline" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Amir-Alipour"><img src="https://avatars.githubusercontent.com/u/73488911?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Amir</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Amir-Alipour" title="Documentation">📖</a></td>
    <td align="center"><a href="http://codewars.com/users/KavehKarami"><img src="https://avatars.githubusercontent.com/u/48356643?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kaveh Karami</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=KavehKarami" title="Code">💻</a></td>
    <td align="center"><a href="https://damoon.pro"><img src="https://avatars.githubusercontent.com/u/64106883?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mehdi Shah abbasian</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=shahabbasian" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# Supporters :open_hands:

[![Stargazers repo roster for @persian-tools/persian-tools](https://reporoster.com/stars/persian-tools/persian-tools)](https://github.com/persian-tools/persian-tools/stargazers)
