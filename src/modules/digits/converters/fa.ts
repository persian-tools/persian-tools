import { StringNumber } from "../../../types";
import { toString } from "../../../type.handler";
import { faNums, arNums, faDigitsRegex } from "../digits.constants";
// Types
import type { DigitsConverter } from "../digits.types";

const digitsFaToArFunc = (char: string) => arNums[faNums.indexOf(char)];
const digitsFaToEnFunc = (char: string) => `${faNums.indexOf(char)}`;

/**
 * digitsFaToEn
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with english digits
 */
const digitsFaToEn: DigitsConverter<StringNumber> = (value: StringNumber): string =>
	toString(value, "digitsFaToEn").replace(faDigitsRegex, digitsFaToEnFunc);

/**
 * digitsFaToAr
 *
 * @category Digits
 * @description Takes a string and
 * returns a string that represents the same value but
 * its farsi digits are replaced with arabic digits
 */
const digitsFaToAr: DigitsConverter<StringNumber> = (value: StringNumber): string =>
	toString(value, "digitsFaToAr").replace(faDigitsRegex, digitsFaToArFunc);

export { digitsFaToEn, digitsFaToAr };
