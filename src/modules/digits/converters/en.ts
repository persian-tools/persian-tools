import { isNumber, isString } from "../../../helpers";
import { faNums, arNums, enDigitsRegex } from "../digits.constants";
// Types
import type { DigitsConverter } from "../digits.types";

/**
 * digitsEnToFa
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with farsi digits
 */
const digitsEnToFa: DigitsConverter<string | number> = (value) => {
	if (!isString(value) && !isNumber(value))
		throw TypeError("PersianTools: digitsEnToFa - The input must be string or number");

	return String(value).replace(enDigitsRegex, (char) => `${faNums[Number(char)]}`);
};

/**
 * digitsEnToAr
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with arabic digits
 */
const digitsEnToAr: DigitsConverter<string | number> = (value) => {
	if (!isString(value) && !isNumber(value))
		throw TypeError("PersianTools: digitsEnToAr - The input must be number or string");

	return String(value).replace(enDigitsRegex, (char) => `${arNums[Number(char)]}`);
};

export { digitsEnToFa, digitsEnToAr };
