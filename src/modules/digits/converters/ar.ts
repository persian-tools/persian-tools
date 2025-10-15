import { isString } from "../../../helpers";
// Constants
import { faNums, arNums, arDigitsRegex } from "../digits.constants";
// Types
import type { DigitsConverter } from "../digits.types";

/**
 * digitsArToFa
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with farsi digits
 */
const digitsArToFa: DigitsConverter = (value) => {
	if (!isString(value)) throw TypeError("PersianTools: digitsArToFa - The input must be string");

	return String(value).replace(arDigitsRegex, (char) => faNums[arNums.indexOf(char)]);
};

/**
 * digitsArToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with english digits
 */
const digitsArToEn: DigitsConverter = (value) => {
	if (!isString(value)) throw TypeError("PersianTools: digitsArToEn - The input must be string");

	return String(value).replace(arDigitsRegex, (char) => `${arNums.indexOf(char)}`);
};

export { digitsArToFa, digitsArToEn };
