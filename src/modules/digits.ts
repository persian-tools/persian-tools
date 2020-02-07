const faNums = "۰۱۲۳۴۵۶۷۸۹";
const arNums = "٠١٢٣٤٥٦٧٨٩";

/** digitsEnToFa
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsEnToFa(str: number): string | undefined {
	if (!str) return;

	let result = "" + str;
	for (let i = 0; i < 10; i++) {
		const replaceEntoFa = new RegExp("" + i, "g");
		result = result.replace(replaceEntoFa, faNums[i]);
	}

	return result;
}

/** digitsFaToEn
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsFaToEn(str: string): number | undefined {
	if (!str) return;

	for (let i = 0; i < 10; i++) {
		const replaceFaToEn = new RegExp(faNums[i], "g");
		str = str.replace(replaceFaToEn, "" + i);
	}

	return Number(str);
}

/** digitsArToFa
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding Persian
 *  digits
 *
 */
export function digitsArToFa(str: string): string | undefined {
	if (!str) return;

	for (let i = 0; i < 10; i++) {
		const replaceArabicToPersian = new RegExp(arNums[i], "g");
		str = str.replace(replaceArabicToPersian, faNums[i]);
	}

	return str;
}

/** digitsArToEn
 *
 *  Description: Takes a string that contains digits, and
 *  replaces all Arabic digits with the corresponding English
 *  digits
 *
 */
export function digitsArToEn(str: string): number | undefined {
	if (!str) return;

	for (let i = 0; i < 10; i++) {
		const replaceArabicToEnglish = new RegExp(arNums[i], "g");
		str = str.replace(replaceArabicToEnglish, "" + i);
	}

	return Number(str);
}
