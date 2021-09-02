import { enNums, faNums, arNums } from "./numsList";
import digitsConverter from "./digitsConverter";

/**
 * digitsEnToFa
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with farsi digits
 */
const digitsEnToFa: DigitsOrigToDest<string | number> = (value) => {
	if (typeof value !== "string" && typeof value !== "number")
		throw TypeError("PersianTools: digitsEnToFa - The input must be string or number");

	return digitsConverter({ str: String(value), originCharList: enNums, destCharList: faNums });
};

/**
 * digitsEnToAr
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with arabic digits
 */
const digitsEnToAr: DigitsOrigToDest<string | number> = (value) => {
	if (typeof value !== "string" && typeof value !== "number")
		throw TypeError("PersianTools: digitsEnToAr - The input must be number or string");

	return digitsConverter({ str: String(value), originCharList: enNums, destCharList: arNums });
};

export { digitsEnToFa, digitsEnToAr };
