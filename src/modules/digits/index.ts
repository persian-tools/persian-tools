const enNums = "0123456789".split("");
const faNums = "۰۱۲۳۴۵۶۷۸۹".split("");
const arNums = "۰۱۲۳٤٥٦۷۸۹".split("");

type StrConverter = (arg: { str: string; originCharList: string[]; destCharList: string[] }) => string;
const strConverter: StrConverter = ({ str, originCharList, destCharList }) =>
	str
		.split("")
		.map((char) => {
			const charIndex = originCharList.indexOf(char);
			return charIndex > -1 ? destCharList[charIndex] : char;
		})
		.join("");

type DigitsEnToFa = (value: number | string) => string;
/**
 * digitsEnToFa
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Persian digits
 */
export const digitsEnToFa: DigitsEnToFa = (value) => {
	if (typeof value !== "string" && typeof value !== "number")
		throw TypeError("PersianTools: digitsEnToFa - The input must be string or number");

	return strConverter({ str: String(value), originCharList: enNums, destCharList: faNums });
};

type DigitsEnToAr = (value: number | string) => string;
/**
 * digitsEnToAr
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Arabic digits
 */
export const digitsEnToAr: DigitsEnToAr = (value) => {
	if (typeof value !== "string" && typeof value !== "number")
		throw TypeError("PersianTools: digitsEnToAr - The input must be number or string");

	return strConverter({ str: String(value), originCharList: enNums, destCharList: arNums });
};

type DigitsFaToEn = (value: string) => string;
/**
 * digitsFaToEn
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Persian digits
 */
export const digitsFaToEn: DigitsFaToEn = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToEn - The input must be string");

	return strConverter({ str: String(value), originCharList: faNums, destCharList: enNums });
};

type DigitsFaToAr = (value: string) => string;
/**
 * digitsFaToAr
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Persian digits
 */
export const digitsFaToAr: DigitsFaToAr = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToAr - The input must be string");

	return strConverter({ str: String(value), originCharList: faNums, destCharList: arNums });
};

type DigitsArToFa = (value: string) => string;
/**
 * digitsArToFa
 *
 * @category Digits
 * @description Takes a string that contains digits, and
 * replaces all Arabic digits with the corresponding Persian
 * digits
 */
export const digitsArToFa: DigitsArToFa = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsArToFa - The input must be string");

	return strConverter({ str: String(value), originCharList: arNums, destCharList: faNums });
};

type DigitsArToEn = (value: string) => string;
/**
 * digitsArToEn
 *
 * @category Digits
 * @description Takes a string that contains digits, and
 * replaces all Arabic digits with the corresponding English
 * digits
 */
export const digitsArToEn: DigitsArToEn = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsArToEn - The input must be string");

	return strConverter({ str: String(value), originCharList: arNums, destCharList: enNums });
};
