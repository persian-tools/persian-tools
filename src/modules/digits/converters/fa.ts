import { faNums, arNums } from "./digitsList";
import { faDigitsRegex } from "./digitsRegex";

/**
 * digitsFaToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with english digits
 */
const digitsFaToEn: DigitsConverter = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToEn - The input must be string");

	return String(value).replace(faDigitsRegex, (char) => `${faNums.indexOf(char)}`);
};

/**
 * digitsFaToAr
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with arabic digits
 */
const digitsFaToAr: DigitsConverter = (value) => {
	if (typeof value !== "string") throw TypeError("PersianTools: digitsFaToAr - The input must be string");

	return String(value).replace(faDigitsRegex, (char) => arNums[faNums.indexOf(char)]);
};

export { digitsFaToEn, digitsFaToAr };
