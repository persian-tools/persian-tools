<div align="center">
	<p align="center">
		<img src="./images/logo.png" width="200" alt="PersianTools logo" />
	</p>
	<h1 align="center">🇮🇷 Persian Tools</h1>
	<p align="center">A modern, <strong>library-agnostic</strong> TypeScript utility for Persian language features.</p>

[![CI/CD](https://github.com/persian-tools/persian-tools/workflows/Continuous%20Integration/badge.svg)](https://github.com/persian-tools/persian-tools/actions)
[![codecov](https://codecov.io/gh/persian-tools/persian-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/persian-tools/persian-tools)
[![npm version](https://img.shields.io/npm/v/@persian-tools/persian-tools.svg)](https://npm.im/@persian-tools/persian-tools)
[![npm downloads](https://img.shields.io/npm/dm/@persian-tools/persian-tools.svg)](https://npm.im/@persian-tools/persian-tools)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@persian-tools/persian-tools)](https://bundlephobia.com/package/@persian-tools/persian-tools)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/persian-tools/persian-tools/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/persian-tools/persian-tools/compare)
[![CodeFactor](https://www.codefactor.io/repository/github/persian-tools/persian-tools/badge)](https://www.codefactor.io/repository/github/persian-tools/persian-tools)
![GitHub contributors](https://img.shields.io/github/contributors/persian-tools/persian-tools.svg)

</div>

---

## ✨ Features

Persian Tools provides **25+ utilities** for Persian language processing:

### 🔢 Numbers & Text
- **Number Conversion**: Persian words ↔ numbers with fuzzy matching
- **Digit Conversion**: Persian ↔ Arabic ↔ English digits
- **Comma Formatting**: Add/remove thousands separators
- **Ordinal Numbers**: Convert to/from ordinal forms

### 🏛️ Validation & Verification  
- **National ID**: Validate & generate Iranian national codes (کد ملی)
- **Legal ID**: Validate Iranian legal entity IDs (شناسه حقوقی)  
- **Phone Numbers**: Validate & extract operator info
- **Bank Cards**: Validate & identify bank names
- **IBAN/Sheba**: Validate Iranian bank account numbers

### 🌍 Geographic & Location
- **Place Lookup**: Find city/province by national ID
- **Capital Cities**: Get province capitals
- **Coordinates**: Find province from GPS coordinates
- **Vehicle Plates**: Parse Iranian license plates

### 💰 Financial & Utilities
- **Bill Calculator**: Parse Iranian utility bills
- **Bank Detection**: Identify banks from card numbers
- **IBAN Tools**: Complete Iranian banking support

### 📝 Text Processing
- **Persian Validation**: Detect pure Persian text
- **Character Cleanup**: Remove Arabic chars from Persian
- **URL Fixing**: Decode Persian URLs
- **Half-Space**: Fix Persian typography
- **Time Utilities**: Persian time-ago & remaining time

---

## 🚀 Quick Start

### 📦 Installation

```bash
# npm
npm install @persian-tools/persian-tools

# yarn  
yarn add @persian-tools/persian-tools

# pnpm
pnpm add @persian-tools/persian-tools
```

### 💻 Usage

**ES Modules (Recommended)**
```typescript
import { numberToWords, digitsEnToFa, verifyIranianNationalId } from '@persian-tools/persian-tools';

numberToWords(1234); // "یک هزار و دویست و سی و چهار"
digitsEnToFa("123"); // "۱۲۳"
verifyIranianNationalId("0499370899"); // true
```

**CommonJS**
```javascript
const { numberToWords } = require('@persian-tools/persian-tools');
```

**Browser CDN**
```html
<script src="https://cdn.jsdelivr.net/npm/@persian-tools/persian-tools/build/persian-tools.umd.js"></script>
<script>
  console.log(PersianTools.numberToWords(1234));
</script>
```

---

## 📖 API Reference

### 🔢 Number Conversion

<details>
<summary><strong>numberToWords</strong> - Convert numbers to Persian words</summary>

```typescript
import { numberToWords } from '@persian-tools/persian-tools';

// Basic usage
numberToWords(1234); // "یک هزار و دویست و سی و چهار"
numberToWords("12,345"); // "دوازده هزار و سیصد و چهل و پنج"

// Ordinal numbers
numberToWords(3, { ordinal: true }); // "سوم"
numberToWords(21, { ordinal: true }); // "بیست و یکم"

// Supports up to MAX_SAFE_INTEGER (2^53 - 1)
numberToWords(9007199254740991); // Works perfectly!
```
</details>

<details>
<summary><strong>wordsToNumber</strong> - Convert Persian words to numbers</summary>

```typescript
import { wordsToNumber } from '@persian-tools/persian-tools';

// Basic conversion
wordsToNumber("سه هزار دویست و دوازده"); // 3212
wordsToNumber("منفی یک میلیون"); // -1000000

// Advanced options
wordsToNumber("دوازده هزار", { 
  digits: "fa",      // Return Persian digits: "۱۲۰۰۰"
  addCommas: true    // Add commas: "12,000"
});

// Fuzzy matching (fixes typos)
wordsToNumber("یگصد و بنجاه هزار", { fuzzy: true }); // 150000
```
</details>

### 🏛️ Validation

<details>
<summary><strong>National ID Validation</strong> - Validate Iranian national codes</summary>

```typescript
import { verifyIranianNationalId, getPlaceByIranNationalId, createIranianNationalId } from '@persian-tools/persian-tools';

// Validation
verifyIranianNationalId("0499370899"); // true
verifyIranianNationalId("1234567890"); // false

// Location lookup
getPlaceByIranNationalId("0084575948"); 
// { city: "تهران مرکزی", province: "تهران" }

// Generation
createIranianNationalId(); // "0499370899"
createIranianNationalId({ preventRepeatedDigits: true }); // "1234567890"
```
</details>

<details>
<summary><strong>National ID Generation</strong> - Generate valid Iranian national codes</summary>

```typescript
import { 
  createIranianNationalId, 
  createIranianNationalIdDetailed,
  validateNationalIdChecksum 
} from '@persian-tools/persian-tools';

// Basic generation
createIranianNationalId(); // "0499370899"

// Generate without repeated digits
createIranianNationalId({ preventRepeatedDigits: true }); // "1234567890"

// Detailed generation with metadata
const result = createIranianNationalIdDetailed({
  preventRepeatedDigits: true,
  maxRetries: 50
});

console.log(result.nationalId);         // "1234567890"  
console.log(result.checkDigit);         // 0
console.log(result.attempts);           // 1
console.log(result.hasRepeatedDigits);  // false
console.log(result.digits);             // [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

// Validate generated IDs
validateNationalIdChecksum(result.nationalId); // true

// Custom random generator (for testing)
createIranianNationalId({
  randomGenerator: () => 0.5 // Always returns 0.5
});
```
</details>

<details>
<summary><strong>Phone Number Validation</strong> - Iranian mobile numbers</summary>

```typescript
import { isPhoneNumberValid, phoneNumberDetail } from '@persian-tools/persian-tools';

// Validation
isPhoneNumberValid("09123456789"); // true
isPhoneNumberValid("+989123456789"); // true

// Operator detection
phoneNumberDetail("09123456789");
// {
//   province: ["البرز", "تهران", ...],
//   operator: "همراه اول",
//   type: ["permanent"]
// }
```
</details>

### 💰 Banking & Finance

<details>
<summary><strong>Bank Card Validation</strong> - Validate and identify Iranian bank cards</summary>

```typescript
import { verifyCardNumber, getBankNameFromCardNumber } from '@persian-tools/persian-tools';

// Card validation
verifyCardNumber("6037701689095443"); // true

// Bank identification  
getBankNameFromCardNumber("6219861034529007"); // "بانک سامان"
```
</details>

<details>
<summary><strong>IBAN/Sheba Validation</strong> - Iranian bank account validation</summary>

```typescript
import { isShebaValid, getShebaInfo } from '@persian-tools/persian-tools';

// IBAN validation
isShebaValid("IR820540102680020817909002"); // true

// Bank info extraction
getShebaInfo("IR820540102680020817909002");
// {
//   nickname: "parsian",
//   name: "Parsian Bank", 
//   persianName: "بانک پارسیان",
//   accountNumber: "020817909002"
// }
```
</details>

### 📝 Text Processing

<details>
<summary><strong>Persian Text Validation</strong> - Validate and clean Persian text</summary>

```typescript
import { isPersian, hasPersian, toPersianChars } from '@persian-tools/persian-tools';

// Persian detection
isPersian("سلام دنیا"); // true
isPersian("Hello World"); // false
hasPersian("This has فارسی text"); // true

// Character cleanup
toPersianChars("علي"); // "علی" (fixes Arabic chars)
```
</details>

<details>
<summary><strong>Digit Conversion</strong> - Convert between number systems</summary>

```typescript
import { digitsEnToFa, digitsFaToEn, digitsArToFa } from '@persian-tools/persian-tools';

// English to Persian
digitsEnToFa("123456"); // "۱۲۳۴۵۶"

// Persian to English  
digitsFaToEn("۱۲۳۴۵۶"); // "123456"

// Arabic to Persian
digitsArToFa("٧٨٩"); // "۷۸۹"
```
</details>

### 🌍 Geographic & Utilities

<details>
<summary><strong>Vehicle Plates</strong> - Parse Iranian license plates</summary>

```typescript
import { getNumberPlateInfo } from '@persian-tools/persian-tools';

// Car plates
getNumberPlateInfo("12D45147").info;
// {
//   template: "12 D 451 ایران 47",
//   province: "مرکزی", 
//   type: "Car",
//   category: "دیپلمات"
// }

// Motorcycle plates  
getNumberPlateInfo(12345678).info;
// {
//   template: "123-45678",
//   province: "مرکز تهران",
//   type: "Motorcycle"
// }
```
</details>

<details>
<summary><strong>Time Utilities</strong> - Persian time formatting</summary>

```typescript
import { timeAgo, remainingTime } from '@persian-tools/persian-tools';

// Time ago (Jalali calendar)
timeAgo("1400/03/17 17:55:00"); // "5 دقیقه قبل"

// Remaining time
remainingTime("2025-12-31T23:59:59Z").toString(); 
// "۱ سال و ۲ ماه و ۱۵ روز"
```
</details>

---

## 🏗️ Development

### Prerequisites
- **Node.js** ≥ 14
- **pnpm** ≥ 9 (recommended package manager)

### Setup
```bash
git clone https://github.com/persian-tools/persian-tools.git
cd persian-tools
pnpm install
```

### Scripts
```bash
pnpm build        # Build the library
pnpm test         # Run tests
pnpm test:watch   # Watch mode testing
pnpm lint         # Lint code
pnpm lint:fix     # Fix linting issues
```


### Find state and city information from postal code

**Usage**

> Retrieve the state and city corresponding to a given 10-digit Iranian postal code.

```javascript
import { getLocationFromPostalCode } from "@persian-tools/persian-tools";

// Retrieve location information for a specific postal code
const location = getLocationFromPostalCode("4513869999");

location.state; // "زنجان"
location.city;  // "ابهر"

// Using destructuring
const { state, city } = getLocationFromPostalCode("4513869999");

```


### Todo

- [ ] Write Jalaali and Gregorian functions to convert Date together.

## Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.

### Architecture
- **TypeScript**: Full type safety with strict mode
- **Build**: Unbuild (dual ESM/CJS output) 
- **Testing**: Vitest with comprehensive coverage
- **Quality**: ESLint + Prettier + Husky hooks


---

## 🌟 Who's Using Persian Tools?

<table>
	<tr>
		<td align="center">
			<a href="https://pooleno.ir">
				<img src="https://pooleno.ir/static/images/pooleno-logo.svg" width="100px;" alt="Pooleno"/><br />
				<sub><b>Pooleno Exchange</b></sub>
			</a>
		</td>
		<td align="center">
			<a href="https://pwa.bank-maskan.ir">
				<img src="./images/showcases/bank-maskan.png" width="100px;" alt="Bank Maskan"/><br />
				<sub><b>Bank Maskan PWA</b></sub>
			</a>
		</td>
		<td align="center">
			<a href="https://mydong.ir">
				<img src="./images/showcases/mydong.png" width="100px;" alt="MyDong"/><br />
				<sub><b>MyDong</b></sub>
			</a>
		</td>
		<td align="center">
			<a href="https://melkba.ir">
				<img src="./images/showcases/melkba.png" width="100px;" alt="Melkba"/><br />
				<sub><b>Melkba</b></sub>
			</a>
		</td>
	</tr>
</table>

*Using Persian Tools in your project? [Add it here!](https://github.com/persian-tools/persian-tools/edit/master/README.md)*

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps:
1. **Fork & Clone** the repository
2. **Create** a feature branch: `git checkout -b my-feature`
3. **Make** your changes with tests
4. **Run** `pnpm test` and `pnpm lint`
5. **Commit** with conventional commits
6. **Submit** a pull request

---

## 👨‍💻 Contributors

Thanks to these amazing people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
  <tr>
    <td align="center"><a href="https://github.com/Amirali-Yavari"><img src="https://avatars.githubusercontent.com/u/97870997?v=4?s=100" width="100px;" alt=""/><br /><sub><b>amirali yavari</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Amirali-Yavari" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/TahaNamdar"><img src="https://avatars.githubusercontent.com/u/42145229?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Taha Namdar</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=TahaNamdar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alirezasariri78"><img src="https://avatars.githubusercontent.com/u/131848129?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alireza Sariri</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=alirezasariri78" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/geek-sajjad"><img src="https://avatars.githubusercontent.com/u/30924359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sajad Sohrabi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=geek-sajjad" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pooooriya"><img src="https://avatars.githubusercontent.com/u/65160744?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pouriya Babaali</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=pooooriya" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/norouzex"><img src="https://avatars.githubusercontent.com/u/62938584?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohammad norouzi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=norouzex" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thevilx"><img src="https://avatars.githubusercontent.com/u/80054917?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohamad Amin Mirzaei</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=thevilx" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Moeinmn"><img src="https://avatars.githubusercontent.com/u/69215813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Moein Moeinnia</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Moeinmn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ahangarha"><img src="https://avatars.githubusercontent.com/u/11241315?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mostafa Ahangarha</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=ahangarha" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

*This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.*

---

## 📄 License

**MIT License** - see [LICENSE](./LICENSE) for details.

---

<div align="center">
  <p>Made with ❤️ by the Persian developer community</p>
  <p>
    <a href="https://github.com/persian-tools/persian-tools">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/intent/tweet?text=Check%20out%20Persian%20Tools%20-%20A%20modern%20TypeScript%20utility%20for%20Persian%20language%20features!&url=https://github.com/persian-tools/persian-tools">🐦 Share on Twitter</a>
  </p>
</div>