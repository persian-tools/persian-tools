import { StringNumber } from "../../../types";
import { faNums, arNums, enDigitsRegex } from "../digits.constants";
import { toString } from "../../../type.handler";
// Types
import type { DigitsConverter } from "../digits.types";

const digitsEnToFaFunc = (char: string) => `${faNums[+char]}`;
const digitsEnToArFunc = (char: string) => `${arNums[+char]}`;

/**
 * digitsEnToFa
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with farsi digits
 */
const digitsEnToFa: DigitsConverter<StringNumber> = (value: StringNumber): string =>
	toString(value, "digitsEnToFa").replace(enDigitsRegex, digitsEnToFaFunc);

/**
 * digitsEnToAr
 *
 * @category Digits
 * @description Takes a string or number and
 * returns a string that represents the same value but
 * its english digits are replaced with arabic digits
 */
const digitsEnToAr: DigitsConverter<StringNumber> = (value: StringNumber): string =>
	toString(value, "digitsEnToAr").replace(enDigitsRegex, digitsEnToArFunc);

export { digitsEnToFa, digitsEnToAr };
