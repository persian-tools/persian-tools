import { enNums, faNums, arNums } from "./numsList";
import digitsConverter from "./digitsConverter";

type DigitsFaToX = (value: string) => string;

/**
 * digitsFaToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with english digits
 */
const digitsFaToEn: DigitsFaToX = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToEn - The input must be string");

	return digitsConverter({ str: String(value), originCharList: faNums, destCharList: enNums });
};

/**
 * digitsFaToAr
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with arabic digits
 */
const digitsFaToAr: DigitsFaToX = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToAr - The input must be string");

	return digitsConverter({ str: String(value), originCharList: faNums, destCharList: arNums });
};

export { digitsFaToEn, digitsFaToAr };
