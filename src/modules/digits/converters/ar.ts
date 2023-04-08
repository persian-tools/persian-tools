import { toString } from "../../../type.handler";
import { StringNumber } from "../../../types";
import { faNums, arNums, arDigitsRegex } from "../digits.constants";
// Types
import type { DigitsConverter } from "../digits.types";

const digitsArToFaFunc = (char: string) => faNums[arNums.indexOf(char)];
const digitsArToEnFunc = (char: string) => `${arNums.indexOf(char)}`;

/**
 * digitsArToFa
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with farsi digits
 */
const digitsArToFa: DigitsConverter<StringNumber> = (value: StringNumber): string =>
	toString(value, "digitsArToFa").replace(arDigitsRegex, digitsArToFaFunc);

/**
 * digitsArToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its arabic digits are replaced with english digits
 */
const digitsArToEn: DigitsConverter = (value) =>
	toString(value, "digitsArToEn").replace(arDigitsRegex, digitsArToEnFunc);

export { digitsArToFa, digitsArToEn };
