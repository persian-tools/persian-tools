import { trim } from "../helpers";
import removeCommas from "./removeCommas";

// <Refrence path="https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)" />

const config = {
	scale: ["", "هزار", "میلیون", "میلیارد"]
};

const numberToWord = {};

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

/**
 * toWords, Convert Numbers to Persian Text
 * @param  {String} number
 * @return {Number|String}
 */
const toWords = number => {
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

const NumberToWords = number => {
	if (!number) return;

	if (number === "") {
		return "";
	}
	if (number === 0) {
		return "۰";
	}

	const base = 1000;

	let result = [];

	number = removeCommas(number);

	const isNegative = number < 0;
	number = isNegative ? number * -1 : number;

	while (number > 0) {
		result.push(toWords(number % base));
		number = Math.floor(number / base);
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

	return trim(isNegative ? `منفی ${words}` : words);
};

export default NumberToWords;
