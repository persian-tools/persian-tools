// <Reference path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

import { addCommas } from "../commas";
import { replaceArray } from "../../helpers";
import { digitsEnToAr, digitsEnToFa, digitsFaToEn } from "../digits";
import removeOrdinalSuffix from "../removeOrdinalSuffix";
import { UNITS, TEN, MAGNITUDE, TYPO_LIST, JOINERS, PREFIXES } from "./constants";
import { fuzzy } from "./fuzzy";

/**
 *
 * @category Number conversion
 */
export interface WordsToNumberOptions {
	digits?: "en" | "fa" | "ar";
	addCommas?: boolean;
	/**
	 * @description Fuzzy persian typo fixer
	 * @since v1.5.0
	 * @type boolean
	 */
	fuzzy?: boolean;
}

class WordsToNumber {
	/**
	 * Convert to numbers
	 *
	 * @method WordsToNumber
	 * @param {string} words
	 * @param {WordsToNumberOptions} options
	 * @return Converted words to number. e.g: 350000
	 */
	convert<TResult extends string | number>(
		words: string,
		{ digits = "en", addCommas: shouldAddCommas = false, fuzzy: isEnabledFuzzy = false }: WordsToNumberOptions = {},
	): TResult {
		if (!words) return "" as TResult;

		// Remove ordinal suffixes
		words = words.replace(new RegExp("مین$", "ig"), "");
		words = removeOrdinalSuffix(words)!;
		// Fix Persian typo's if enabled if this option is enabled
		const classified = isEnabledFuzzy ? fuzzy(words) : words;
		const computeNumbers = this.compute(this.tokenize(classified!));
		const addCommasIfNeeded: string | number = shouldAddCommas
			? addCommas(computeNumbers)
			: (computeNumbers as number);

		if (digits === "fa") {
			return digitsEnToFa(addCommasIfNeeded) as TResult;
		} else if (digits === "ar") {
			return digitsEnToAr(addCommasIfNeeded) as TResult;
		} else {
			return addCommasIfNeeded as TResult;
		}

		return (digits === "fa" ? digitsEnToFa(addCommasIfNeeded) : addCommasIfNeeded) as TResult;
	}
	private tokenize(words: string): string[] {
		words = replaceArray(words, TYPO_LIST);

		const result: string[] = [];
		const slittedWords: string[] = words.split(" ");
		slittedWords.forEach((word) => {
			return word === JOINERS[0] ? "" : result.push(word);
		});

		return result;
	}

	private compute(tokens: string[]): number {
		let sum = 0;
		let isNegative = false;

		tokens.forEach((token) => {
			token = digitsFaToEn(token)!;

			if (token === PREFIXES[0]) {
				isNegative = true;
			} else if (UNITS[token] != null) {
				sum += UNITS[token];
			} else if (TEN[token] != null) {
				sum += TEN[token];
			} else if (!isNaN(Number(token))) {
				sum += parseInt(token, 10);
			} else {
				sum *= MAGNITUDE[token];
			}
		});
		return isNegative ? sum * -1 : sum;
	}
}

const WordsToNumberInstance = new WordsToNumber();

export default WordsToNumberInstance;
