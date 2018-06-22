import addCommasFn from "./addCommas";
import { replaceArray } from "../helpers";
import { digitsFaToEn, digitsEnToFa } from "./digits";

// <Refrence path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

class WordsToNumber {
	constructor(words) {
		this.units = {
			صفر: 0,
			یک: 1,
			دو: 2,
			سه: 3,
			چهار: 4,
			پنج: 5,
			شش: 6,
			شیش: 6,
			هفت: 7,
			هشت: 8,
			نه: 9,
			ده: 10,
			یازده: 11,
			دوازده: 12,
			سیزده: 13,
			چهارده: 14,
			پانزده: 15,
			شانزده: 16,
			هفده: 17,
			هجده: 18,
			نوزده: 19,
			بیست: 20,
			سی: 30,
			چهل: 40,
			پنجاه: 50,
			شصت: 60,
			هفتاد: 70,
			هشتاد: 80,
			نود: 90
		};

		this.adjective = {
			صد: 100,
			یکصد: 100,
			دویست: 200,
			سیصد: 300,
			چهارصد: 400,
			پانصد: 500,
			ششصد: 600,
			هفتصد: 700,
			هشتصد: 800,
			نهصد: 900
		};

		this.magnitudes = {
			هزار: 1000,
			میلیون: 1000000,
			بیلیون: 1000000000,
			میلیارد: 1000000000,
			تریلیون: 1000000000000
		};

		this.otherAdjective = {
			"شیش صد": "ششصد",
			"شش صد": "ششصد",
			"هفت صد": "هفتصد",
			"هشت صد": "هشتصد",
			"نه صد": "نهصد"
		};
	}
	/**
	 * Convert to numbers
	 * @method convert
	 * @param  {String} words         [String of words - like: سی صد پنجاه هزار]
	 * @param  {String} [digits='en'] [convert number digits to en or fa]
	 * @return {Number}               [Result - like: 350000]
	 */
	convert(words, { digits = "en", addCommas = false } = {}) {
		if (!words) return;

		let numbersConverted = this.compute(this.tokenize(words));

		numbersConverted = addCommas ? addCommasFn(numbersConverted) : numbersConverted;
		numbersConverted = digits === "fa" ? digitsEnToFa(numbersConverted) : numbersConverted;

		return numbersConverted;
	}
	tokenize(allWords) {
		let words = replaceArray(allWords, this.otherAdjective);
		words = words.replace(new RegExp("(مین|م)$", "ig"), "");

		let result = [];

		words.split(" ").forEach(word => (word === "و" ? "" : !isNaN(+word) ? result.push(+word) : result.push(word)));

		return result;
	}
	compute(tokens) {
		let sum = 0;
		let isNegative = false;

		tokens.forEach(token => {
			token = digitsFaToEn(token);

			if (token === "منفی") {
				isNegative = true;
			} else if (this.units[token] != null) {
				sum += this.units[token];
			} else if (this.adjective[token] != null) {
				sum += this.adjective[token];
			} else if (!isNaN(token)) {
				sum += parseInt(token, 10);
			} else {
				sum *= this.magnitudes[token];
			}
		});
		return isNegative ? sum * -1 : sum;
	}
}

export default WordsToNumber;
