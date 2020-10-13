import { trim } from "../../helpers";
import { removeCommas } from "../commas";
import addOrdinalSuffix from "../addOrdinalSuffix/addOrdinalSuffix";

// <Reference path="https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)" />

interface IOption {
	ordinal?: boolean;
}

interface INumberToWord {
	[key: string]: string;
}

const config = {
	scale: ["", "هزار", "میلیون", "میلیارد"],
};

const numberToWord: INumberToWord = {};

numberToWord[0] = "";
numberToWord[1] = "یک";
numberToWord[2] = "دو";
numberToWord[3] = "سه";
numberToWord[4] = "چهار";
numberToWord[5] = "پنج";
numberToWord[6] = "شش";
numberToWord[7] = "هفت";
numberToWord[8] = "هشت";
numberToWord[9] = "نه";
numberToWord[10] = "ده";
numberToWord[11] = "یازده";
numberToWord[12] = "دوازده";
numberToWord[13] = "سیزده";
numberToWord[14] = "چهارده";
numberToWord[15] = "پانزده";
numberToWord[16] = "شانزده";
numberToWord[17] = "هفده";
numberToWord[18] = "هجده";
numberToWord[19] = "نوزده";
numberToWord[20] = "بیست";
numberToWord[30] = "سی";
numberToWord[40] = "چهل";
numberToWord[50] = "پنجاه";
numberToWord[60] = "شصت";
numberToWord[70] = "هفتاد";
numberToWord[80] = "هشتاد";
numberToWord[90] = "نود";
numberToWord[100] = "صد";
numberToWord[200] = "دویست";
numberToWord[300] = "سیصد";
numberToWord[400] = "چهار صد";
numberToWord[500] = "پانصد";
numberToWord[600] = "شش صد";
numberToWord[700] = "هفت صد";
numberToWord[800] = "هشت صد";
numberToWord[900] = "نه صد";

class NumberToWords {
	/**
	 * toWords, Convert Numbers to Persian Text
	 * @param  {String} number
	 * @return {Number|String}
	 */
	protected toWords = (number: number): string => {
		let unit = 100;
		let result = "";

		while (unit > 0) {
			if (Math.floor(number / unit) * unit !== 0) {
				if (number in numberToWord) {
					result += numberToWord[number];
					break;
				} else {
					result += numberToWord[Math.floor(number / unit) * unit] + " و ";
					number %= unit;
				}
			}
			unit = Math.floor(unit / 10);
		}
		return result;
	};

	public convert(number: bigint | number | string, { ordinal = false }: IOption = {}): string | undefined {
		if (typeof number === "undefined") return;

		if (number === 0) {
			return "صفر";
		}

		const base = 1000;
		const result: string[] = [];

		// @ts-ignore
		number = removeCommas(number);

		const isNegative: boolean = number < 0;
		number = isNegative ? (number as number) * -1 : number;

		while (number > 0) {
			result.push(this.toWords((number as number) % base));
			number = Math.floor((number as number) / base);
		}

		if (result.length > 4) {
			return "";
		}

		for (let i = 0; i < result.length; i++) {
			if (result[i] !== "") {
				result[i] += " " + config.scale[i] + " و ";
			}
		}
		result.reverse();

		let words = result.join("");
		while (words.endsWith(" و ")) {
			words = words.slice(0, -3);
		}

		words = trim(isNegative ? `منفی ${words}` : words);

		if (ordinal) words = addOrdinalSuffix(words)!;

		return words;
	}
}

const NumberToWordsInstance = new NumberToWords();

export default NumberToWordsInstance;
