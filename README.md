<div align="center">
	<p align="center">
		<img src="./images/logo.png" width="200" alt="PersianTools logo" />
	</p>
	<h1 align="center">🇮🇷 Persian Tools — The Complete TypeScript Toolkit for Persian (Farsi) Apps</h1>
	<p align="center">A comprehensive, <strong>library-agnostic</strong> TypeScript toolkit for Persian (Farsi) text, numbers, validation, and locale utilities — runs in Node.js, Bun, and the browser.</p>

[![CI/CD](https://github.com/persian-tools/persian-tools/workflows/Continuous%20Integration/badge.svg)](https://github.com/persian-tools/persian-tools/actions)
[![codecov](https://codecov.io/gh/persian-tools/persian-tools/branch/master/graph/badge.svg?token=5miXfqhibu)](https://codecov.io/gh/persian-tools/persian-tools)
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

Persian Tools provides **27+ utilities** for Persian language processing:

### 🔢 Numbers & Text
- [**Number Conversion**](#ex-number-conversion): Persian words ↔ numbers with fuzzy matching
- [**Digit Conversion**](#ex-digit-conversion): Persian ↔ Arabic ↔ English digits
- [**Comma Formatting**](#ex-number-conversion): Add/remove thousands of separators
- [**Ordinal Numbers**](#ex-number-conversion): Convert to/from ordinal forms

### 🏛️ Validation & Verification  
- [**National ID**](#ex-national-id): Validate & generate Iranian national codes (کد ملی)
- [**Legal ID**](#ex-validation): Validate Iranian legal entity IDs (شناسه حقوقی)  
- [**Phone Numbers**](#ex-phone-number): Validate & extract operator info
- [**Bank Cards**](#ex-bank-card): Validate & identify bank names
- [**Extract Card Numbers**](#ex-extract-cards): Advanced card extraction with fuzzy matching & performance optimization
- [**IBAN/Sheba**](#ex-iban): Validate Iranian bank account numbers

### 🌍 Geographic & Location
- [**Place Lookup**](#ex-national-id): Find city/province by national ID
- [**Capital Cities**](#ex-geographic-utilities): Get province capitals
- [**Coordinates**](#ex-geographic-utilities): Find province from GPS coordinates
- [**Vehicle Plates**](#ex-vehicle-plates): Parse Iranian license plates

### 💰 Financial & Utilities
- [**Bill Calculator**](#ex-banking): Parse Iranian utility bills
- [**Bank Detection**](#ex-bank-card): Identify banks from card numbers
- [**IBAN Tools**](#ex-iban): Complete Iranian banking support

### 📝 Text Processing
- [**Persian Validation**](#ex-persian-text): Detect pure Persian text
- [**Character Cleanup**](#ex-persian-text): Remove Arabic chars from Persian
- [**URL Fixing**](#ex-text-processing): Decode Persian URLs
- [**Half-Space**](#ex-text-processing): Fix Persian typography
- [**Time Utilities**](#ex-time-utilities): Persian time-ago & remaining time
- [**Slugify**](#ex-slugify): Generate URL-safe slugs from Persian text
- [**Text Analysis**](#ex-text-analysis): Comprehensive Persian text analysis

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

# bun (recommended)
bun add @persian-tools/persian-tools
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
<script src="https://cdn.jsdelivr.net/npm/@persian-tools/persian-tools/build/index.js"></script>
<script>
  console.log(PersianTools.numberToWords(1234));
</script>
```

---

## 📖 API Reference

<a id="ex-number-conversion"></a>
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

<a id="ex-validation"></a>
### 🏛️ Validation

<a id="ex-national-id"></a>
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

<a id="ex-national-id-generation"></a>
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

<a id="ex-phone-number"></a>
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

<a id="ex-banking"></a>
### 💰 Banking & Finance

<a id="ex-bank-card"></a>
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

<a id="ex-extract-cards"></a>
<details>
<summary><strong>Extract Card Numbers</strong> - Advanced card extraction with performance optimization</summary>

```typescript
import { extractCardNumber, extractCardNumberWithMetrics } from '@persian-tools/persian-tools';

// Basic extraction with validation
const text = "Payment cards: 6037701689095443 and 6219-8610-3452-9007";
const cards = extractCardNumber(text, {
  checkValidation: true,
  detectBankNumber: true
});

console.log(cards);
// [
//   {
//     index: 1,
//     base: "6037701689095443",
//     pure: "6037701689095443",
//     startIndex: 15,
//     endIndex: 31,
//     isValid: true,
//     bankName: "بانک کشاورزی"
//   },
//   {
//     index: 2,
//     base: "6219-8610-3452-9007", 
//     pure: "6219861034529007",
//     startIndex: 36,
//     endIndex: 55,
//     isValid: true,
//     bankName: "بانک سامان"
//   }
// ]

// TypeScript function overloads for type safety
const validatedCards = extractCardNumber(text, {
  checkValidation: true,
  detectBankNumber: false
}); // Returns ExtractCardNumberWithValidation[]

// Multi-format support (Persian, Arabic, separators)
const multiFormat = "Cards: ۶۰۳۷۷۰۱۶۸۹۰۹۵۴۴۳ and 6037_7016_8909_5443";
const results = extractCardNumber(multiFormat);
// Automatically normalizes all formats to: "6037701689095443"

// Fuzzy matching for masked cards
const maskedText = "My card: 6037-****-8909-5443";
const fuzzyResults = extractCardNumber(maskedText, {
  enableFuzzyMatching: true,
  checkValidation: false
});

// Large document optimization (1MB+ texts)
const hugeDocument = "Large document content...".repeat(10000);
const optimizedResults = extractCardNumber(hugeDocument, {
  optimizeForLargeText: true,
  maxResults: 10
});

// Performance monitoring with metrics
const { cardNumbers, metrics } = extractCardNumberWithMetrics(text, {
  includeContext: true,
  contextLength: 20
});

console.log(`Processed ${metrics.textLength} chars in ${metrics.processingTime}ms`);
console.log(`Found ${metrics.validCardNumbers} valid cards`);
console.log(cardNumbers[0].context?.before); // "Payment cards: "
```
</details>

<a id="ex-iban"></a>
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

<a id="ex-text-processing"></a>
### 📝 Text Processing

<a id="ex-persian-text"></a>
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

<a id="ex-digit-conversion"></a>
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

<a id="ex-geographic-utilities"></a>
### 🌍 Geographic & Utilities

<a id="ex-vehicle-plates"></a>
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

<a id="ex-time-utilities"></a>
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

<a id="ex-slugify"></a>
<details>
<summary><strong>Slugify</strong> - Generate URL-safe slugs from Persian text</summary>

```typescript
import { slugify, createSlug, slugifySimple } from '@persian-tools/persian-tools';

// Basic usage
slugify("سلام دنیا"); // "سلام-دنیا"
slugify("چگونه برنامه‌نویسی یاد بگیریم؟"); // "چگونه-برنامه-نویسی-یاد-بگیریم"

// Custom options
slugify("سلام دنیا", {
  separator: "_",     // Use underscore instead of dash
  maxLength: 20,      // Limit length
  lowercase: false    // Don't convert to lowercase
}); // "سلام_دنیا"

// Preserve numbers
slugify("سال ۱۴۰۰", { preserveNumbers: true }); // "سال-۱۴۰۰"

// Helper functions
createSlug("مقاله جدید"); // "مقاله-جدید"
slugifySimple("تست ساده"); // "تست-ساده"
```
</details>

<a id="ex-text-analysis"></a>
<details>
<summary><strong>Text Analysis</strong> - Comprehensive Persian text analysis</summary>

```typescript
import { analyzeText, getTextSummary, getTextComplexity, cleanText } from '@persian-tools/persian-tools';

// Full analysis
const analysis = analyzeText("این یک متن فارسی است.");
// {
//   statistics: {
//     totalWords: 5,
//     totalCharacters: 20,
//     persianCharacters: 15,
//     // ... more stats
//   },
//   language: {
//     primaryLanguage: "persian",
//     confidence: 95,
//     isPurePersian: true
//   },
//   readability: {
//     complexity: "ساده",
//     readingTime: 1,
//     averageWordsPerSentence: 5
//   },
//   suggestions: [...]
// }

// Quick helpers
getTextSummary("سلام دنیا"); 
// "متن شامل 2 کلمه در 1 جمله است. زبان اصلی: فارسی (100% اطمینان). زمان مطالعه تقریبی: 1 دقیقه."

getTextComplexity("این جمله ساده است"); // "ساده"

// Text cleaning
cleanText("سَلامٌ   123   دنیا"); // "سلام ۱۲۳ دنیا"
```
</details>

---

## 🏗️ Development

### Prerequisites
- **Bun** ≥ 1.3 (as runtime and package manager)

### Setup
```bash
git clone https://github.com/persian-tools/persian-tools.git
cd persian-tools
bun install
```

### Scripts
```bash
bun run build        # Build the library
bun run test         # Run tests
bun run test:watch   # Watch mode testing
bun run lint         # Lint code
bun run format       # Format code
bun run lint:fix     # Fix linting issues
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
			<a href="https://maani.app">
				<img src="./images/showcases/maani.png" width="100px;" alt="Maani"/><br />
				<sub><b>Maani</b></sub>
			</a>
		</td>
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

## In Memory of @mediv0 🕊️

This project is dedicated to the memory of [@mediv0](https://github.com/mediv0),  
a valued contributor whose passion and work helped shape Persian Tools.  
Your code lives on, and you will always be remembered in our community. ❤️

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps:
1. **Install** Bun (from https://bun.sh)
2. **Fork & Clone** the repository
3. **Create** a feature branch: `git checkout -b my-feature`
4. **Make** your changes with tests
5. **Run** `bun run test` and `bun run lint` and `bun run format` to ensure everything passes
6. **Commit** with conventional commits (e.g. `feat: add new utility function`)
7. **Submit** a pull request

---

## 👨‍💻 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://www.linkedin.com/in/alitorki/"><img src="https://avatars1.githubusercontent.com/u/9049092?v=4?s=100" width="100px;" alt="Ali Torki"/><br /><sub><b>Ali Torki</b></sub></a><br /><a href="#infra-ali-master" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/issues?q=author%3Aali-master" title="Bug reports">🐛</a> <a href="#content-ali-master" title="Content">🖋</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ali-master" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/mssoheil"><img src="https://avatars3.githubusercontent.com/u/16543635?v=4?s=100" width="100px;" alt="mssoheil"/><br /><sub><b>mssoheil</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mssoheil" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/moh3n9595"><img src="https://avatars1.githubusercontent.com/u/20948388?v=4?s=100" width="100px;" alt="Mohsen"/><br /><sub><b>Mohsen</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=moh3n9595" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="http://titles.ir"><img src="https://avatars1.githubusercontent.com/u/1300289?v=4?s=100" width="100px;" alt="Hesam pourghazian"/><br /><sub><b>Hesam pourghazian</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Hesamp" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/amirqasemi74"><img src="https://avatars3.githubusercontent.com/u/20992734?v=4?s=100" width="100px;" alt="Amir Hossien Qasemi Moqaddam"/><br /><sub><b>Amir Hossien Qasemi Moqaddam</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=amirqasemi74" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/SeyyedKhandon"><img src="https://avatars.githubusercontent.com/u/59599950?v=4?s=100" width="100px;" alt="SeyyedKhandon"/><br /><sub><b>SeyyedKhandon</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=SeyyedKhandon" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/masoudDaliriyan"><img src="https://avatars.githubusercontent.com/u/25932831?v=4?s=100" width="100px;" alt="msdDaliriyan"/><br /><sub><b>msdDaliriyan</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=masoudDaliriyan" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=masoudDaliriyan" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://mahdi-momeni.github.io/"><img src="https://avatars.githubusercontent.com/u/32864532?v=4?s=100" width="100px;" alt="Mahdi"/><br /><sub><b>Mahdi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mahdi-momeni" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://dev.to/psparsa"><img src="https://avatars.githubusercontent.com/u/57572461?v=4?s=100" width="100px;" alt="PS-PARSA"/><br /><sub><b>PS-PARSA</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=psparsa" title="Tests">⚠️</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=psparsa" title="Code">💻</a> <a href="#ideas-psparsa" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="http://amirduzandeh.ir/"><img src="https://avatars.githubusercontent.com/u/16349391?v=4?s=100" width="100px;" alt="Amirhossein Douzandeh Zenoozi"/><br /><sub><b>Amirhossein Douzandeh Zenoozi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=amirzenoozi" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=amirzenoozi" title="Tests">⚠️</a> <a href="#ideas-amirzenoozi" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/M0rteza-M"><img src="https://avatars.githubusercontent.com/u/79398146?v=4?s=100" width="100px;" alt="M0rteza-M"/><br /><sub><b>M0rteza-M</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=M0rteza-M" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=M0rteza-M" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.mahdi.wtf/"><img src="https://avatars.githubusercontent.com/u/36822136?v=4?s=100" width="100px;" alt="mediv0"/><br /><sub><b>mediv0</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mediv0" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=mediv0" title="Tests">⚠️</a> <a href="#ideas-mediv0" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.linkedin.com/in/poorshad/"><img src="https://avatars.githubusercontent.com/u/43247296?v=4?s=100" width="100px;" alt="Poorshad Shaddel"/><br /><sub><b>Poorshad Shaddel</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=pshaddel" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=pshaddel" title="Tests">⚠️</a> <a href="#ideas-pshaddel" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="http://t.me/theMasix"><img src="https://avatars.githubusercontent.com/u/22872117?v=4?s=100" width="100px;" alt="Seyed Masih Sajadi"/><br /><sub><b>Seyed Masih Sajadi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=theMasix" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=theMasix" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://www.samasarin.com"><img src="https://avatars.githubusercontent.com/u/30124243?v=4?s=100" width="100px;" alt="Mohammad Ghonchesefidi"/><br /><sub><b>Mohammad Ghonchesefidi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=ghonchesefidi" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=ghonchesefidi" title="Tests">⚠️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://www.linkedin.com/in/realsaeedhassani/"><img src="https://avatars.githubusercontent.com/u/20496196?v=4?s=100" width="100px;" alt="Saeed Hasani Borzadaran"/><br /><sub><b>Saeed Hasani Borzadaran</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=realsaeedhassani" title="Code">💻</a> <a href="https://github.com/persian-tools/persian-tools/commits?author=realsaeedhassani" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/mrunderline"><img src="https://avatars.githubusercontent.com/u/23085360?v=4?s=100" width="100px;" alt="Ali Madihi"/><br /><sub><b>Ali Madihi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=mrunderline" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Amir-Alipour"><img src="https://avatars.githubusercontent.com/u/73488911?v=4?s=100" width="100px;" alt="Amir"/><br /><sub><b>Amir</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Amir-Alipour" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="http://codewars.com/users/KavehKarami"><img src="https://avatars.githubusercontent.com/u/48356643?v=4?s=100" width="100px;" alt="Kaveh Karami"/><br /><sub><b>Kaveh Karami</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=KavehKarami" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://damoon.pro"><img src="https://avatars.githubusercontent.com/u/64106883?v=4?s=100" width="100px;" alt="Mehdi Shah abbasian"/><br /><sub><b>Mehdi Shah abbasian</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=shahabbasian" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Amirali-Yavari"><img src="https://avatars.githubusercontent.com/u/97870997?v=4?s=100" width="100px;" alt="amirali yavari"/><br /><sub><b>amirali yavari</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Amirali-Yavari" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/TahaNamdar"><img src="https://avatars.githubusercontent.com/u/42145229?v=4?s=100" width="100px;" alt="Taha Namdar"/><br /><sub><b>Taha Namdar</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=TahaNamdar" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/alirezasariri78"><img src="https://avatars.githubusercontent.com/u/131848129?v=4?s=100" width="100px;" alt="Alireza Sariri"/><br /><sub><b>Alireza Sariri</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=alirezasariri78" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/geek-sajjad"><img src="https://avatars.githubusercontent.com/u/30924359?v=4?s=100" width="100px;" alt="Sajad Sohrabi"/><br /><sub><b>Sajad Sohrabi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=geek-sajjad" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/pooooriya"><img src="https://avatars.githubusercontent.com/u/65160744?v=4?s=100" width="100px;" alt="Pouriya Babaali"/><br /><sub><b>Pouriya Babaali</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=pooooriya" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/norouzex"><img src="https://avatars.githubusercontent.com/u/62938584?v=4?s=100" width="100px;" alt="Mohammad norouzi"/><br /><sub><b>Mohammad norouzi</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=norouzex" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/thevilx"><img src="https://avatars.githubusercontent.com/u/80054917?v=4?s=100" width="100px;" alt="Mohamad Amin Mirzaei"/><br /><sub><b>Mohamad Amin Mirzaei</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=thevilx" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Moeinmn"><img src="https://avatars.githubusercontent.com/u/69215813?v=4?s=100" width="100px;" alt="Moein Moeinnia"/><br /><sub><b>Moein Moeinnia</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=Moeinmn" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/ahangarha"><img src="https://avatars.githubusercontent.com/u/11241315?v=4?s=100" width="100px;" alt="Mostafa Ahangarha"/><br /><sub><b>Mostafa Ahangarha</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=ahangarha" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://hamidne.ir"><img src="https://avatars.githubusercontent.com/u/53326634?v=4?s=100" width="100px;" alt="Hamid Nasr"/><br /><sub><b>Hamid Nasr</b></sub></a><br /><a href="https://github.com/persian-tools/persian-tools/commits?author=hamidne" title="Code">💻</a> <a href="#content-hamidne" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📄 License

**MIT License** - see [LICENSE](./LICENSE) for details.

---

<div align="center">
  <p>Made with ❤️ by the Persian developer community</p>
  <p>
    <a href="https://persian-tools.usestrict.dev" rel="noreferrer noopener" target="_blank">📚 Documentation</a> •
    <a href="https://github.com/persian-tools/persian-tools" rel="noreferrer noopener" target="_blank">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/intent/tweet?text=Check%20out%20Persian%20Tools%20-%20A%20modern%20TypeScript%20utility%20for%20Persian%20language%20features!&url=https://github.com/persian-tools/persian-tools" rel="noreferrer noopener" target="_blank">🐦 Share on Twitter</a> • 
    <a href="https://www.npmjs.com/package/@persian-tools/persian-tools" rel="noreferrer noopener" target="_blank">📦 View on NPM</a>
  </p>
</div>
