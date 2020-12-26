// <Reference path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

import { addCommas } from "../commas";
import { replaceArray } from "../../helpers";
import { digitsEnToFa, digitsFaToEn } from "../digits";
import removeOrdinalSuffix from "../removeOrdinalSuffix";
import { UNITS, TEN, MAGNITUDE, TYPO_LIST } from "./constants";
import { fuzzy } from "./fuzzy";

interface WordsToNumberOptions {
	digits?: "en" | "fa";
	addCommas?: boolean;
	fuzzy?: boolean;
}

class WordsToNumber {
	/**
	 * Convert to numbers
	 * @method convert
	 * @param  words
	 * @param  options
	 * @return Converted words to number. e.g: 350000
	 */
	public convert(
		words: string,
		{ digits = "en", addCommas: shouldAddCommas = false, fuzzy: isEnabledFuzzy = false }: WordsToNumberOptions = {},
	): number | string | undefined {
		if (!words) return;

		const classified = isEnabledFuzzy ? fuzzy(words) : words;
		// @ts-ignore
		const computeNumbers = this.compute(this.tokenize(classified));
		const addCommasIfNeeded: string | number = shouldAddCommas
			? (addCommas(computeNumbers) as string)
			: (computeNumbers as number);

		return digits === "fa" ? (digitsEnToFa(addCommasIfNeeded as number) as string) : addCommasIfNeeded;
	}
	private tokenize(words: string): number[] {
		let replacedWords = replaceArray(words, TYPO_LIST);
		replacedWords = replacedWords.replace(new RegExp("مین$", "ig"), "");
		replacedWords = removeOrdinalSuffix(replacedWords)!;

		const result: number[] = [];
		const slittedWords: string[] = replacedWords.split(" ");
		slittedWords.forEach((word) =>
			// @ts-ignore
			word === "و" ? "" : !isNaN(+word) ? result.push(+word) : result.push(word),
		);

		return result;
	}

	private compute(tokens: string[]): number {
		let sum = 0;
		let isNegative = false;

		tokens.forEach((token) => {
			// @ts-ignore
			token = digitsFaToEn(token);

			if (token === "منفی") {
				isNegative = true;
			} else if (UNITS[token] != null) {
				sum += UNITS[token];
			} else if (TEN[token] != null) {
				sum += TEN[token];
				// @ts-ignore
			} else if (!isNaN(token)) {
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
