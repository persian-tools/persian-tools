import { enNums, faNums, arNums } from "./numsList";
import digitsConverter from "./digitsConverter";

/**
 * digitsArToFa
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with farsi digits
 */
const digitsArToFa: DigitsOrigToDest = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsArToFa - The input must be string");

	return digitsConverter({ str: String(value), originCharList: arNums, destCharList: faNums });
};

/**
 * digitsArToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with english digits
 */
const digitsArToEn: DigitsOrigToDest = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsArToEn - The input must be string");

	return digitsConverter({ str: String(value), originCharList: arNums, destCharList: enNums });
};

export { digitsArToFa, digitsArToEn };
