const faNums = "۰۱۲۳۴۵۶۷۸۹";
const arNums = "٠١٢٣٤٥٦٧٨٩";

/** digitsEnToFa
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsEnToFa(value?: number | string): string {
	if (typeof value !== "number" && typeof value !== "string") {
		throw new TypeError("the input must be string or number");
	}

	let string = typeof value === "number" ? String(value) : value;

	for (let i = 0; i < 10; i++) {
		const replaceEntoFa = new RegExp("" + i, "g");
		string = string.replace(replaceEntoFa, faNums[i]);
	}

	return string;
}

/** digitsFaToEn
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsFaToEn(str: string): string {
	if (typeof str !== "string") {
		throw new Error("the input must be string");
	}

	for (let i = 0; i < 10; i++) {
		const replaceFaToEn = new RegExp(faNums[i], "g");
		// @ts-ignore
		str = str.replace(replaceFaToEn, i);
	}

	return str;
}

/** digitsArToFa
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding Persian
 *  digits
 *
 */
export function digitsArToFa(str?: string | number): string | undefined {
	if (!str) return;

	let result = "" + str;
	for (let i = 0; i < 10; i++) {
		const replaceArabicToPersian = new RegExp(arNums[i], "g");
		result = result.replace(replaceArabicToPersian, faNums[i]);
	}

	return result;
}

/** digitsArToEn
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding English
 *  digits
 *
 */
export function digitsArToEn(str?: string): string | undefined {
	if (!str) return;

	let result = str;
	for (let i = 0; i < 10; i++) {
		const replaceArabicToEnglish = new RegExp(arNums[i], "g");
		// @ts-ignore
		result = String(result).replace(replaceArabicToEnglish, i);
	}

	return result;
}
