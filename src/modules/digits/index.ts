import { isNumber, isString } from "../../helpers";

const faNums = "۰۱۲۳۴۵۶۷۸۹";
const arNums = "٠١٢٣٤٥٦٧٨٩";

/** digitsEnToFa
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsEnToFa(digits?: number | string): string | never {
	if (!(isNumber(digits) || isString(digits))) {
		throw new TypeError("the input must be string or number");
	}

	let digitsString = isNumber(digits) ? String(digits) : digits;

	for (let i = 0; i < 10; i++) {
		const replaceEntoFa = new RegExp("" + i, "g");
		// @ts-ignore
		digitsString = digitsString.replace(replaceEntoFa, faNums[i]);
	}

	// @ts-ignore
	return digitsString;
}

/** digitsFaToEn
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsFaToEn(digits: string): string | never {
	if (!isString(digits)) {
		throw new TypeError("the input must be string");
	}

	for (let i = 0; i < 10; i++) {
		const replaceFaToEn = new RegExp(faNums[i], "g");
		// @ts-ignore
		digits = digits.replace(replaceFaToEn, i);
	}

	return digits;
}

/** digitsArToFa
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding Persian
 *  digits
 *
 */
export function digitsArToFa(digits?: string | number): string | never {
	if (!isString(digits)) {
		throw new TypeError("the input must be string");
	}

	for (let i = 0; i < 10; i++) {
		const replaceArabicToPersian = new RegExp(arNums[i], "g");
		//@ts-ignore
		digits = digits.replace(replaceArabicToPersian, faNums[i]);
	}

	//@ts-ignore
	return digits;
}

/** digitsArToEn
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding English
 *  digits
 *
 */
export function digitsArToEn(digits?: string): string | never {
	if (!isString(digits)) {
		throw new TypeError("the input must be string");
	}

	for (let i = 0; i < 10; i++) {
		const replaceArabicToEnglish = new RegExp(arNums[i], "g");
		// @ts-ignore
		digits = digits.replace(replaceArabicToEnglish, i);
	}

	//@ts-ignore
	return digits;
}
