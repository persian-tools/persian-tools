const faNums = "۰۱۲۳۴۵۶۷۸۹";
const arNums = "٠١٢٣٤٥٦٧٨٩";

/** digitsEnToFa
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsEnToFa(str) {
	if (!str) return;

	str = str.toString();
	for (let i = 0; i < 10; i++) {
		let replaceEntoFa = new RegExp("" + i, "g");
		str = str.toString().replace(replaceEntoFa, faNums[i]);
	}

	return str;
}

/** digitsFaToEn
 *
 *  Description: Takes a string made of English digits only, and
 *  returns a string that represents the same number but with
 *  Persian digits
 *
 */
export function digitsFaToEn(str) {
	if (!str) return;

	str = str.toString();
	for (let i = 0; i < 10; i++) {
		let replaceFaToEn = new RegExp(faNums[i], "g");
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
export function digitsArToFa(str) {
	if (!str) return;

	str = str.toString();
	for (let i = 0; i < 10; i++) {
		let replaceArabicToPersian = new RegExp(arNums[i], "g");
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
export function digitsArToEn(str) {
	if (!str) return;

	str = str.toString();
	for (let i = 0; i < 10; i++) {
		let replaceArabicToEnglish = new RegExp(arNums[i], "g");
		str = str.replace(replaceArabicToEnglish, i);
	}

	return str;
}
