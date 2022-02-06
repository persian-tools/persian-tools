import {
	abbreviateNumber as mainAbbreviateNumber,
	unabbreviateNumber as mainExpandNumber,
} from "js-abbreviation-number";

const defaultSymbols = ["", " کیلو", " مگا", " گیگا", " ترا", " پتا"];

/**
 * Abbreviate numbers
 *
 * @category Digits
 * @method abbreviateNumber
 * @return {string} A string of abbreviated number
 * @param {number} num
 */
export const abbreviateNumber = (
	num: number,
	{ digit = 1, padding = true, symbols = defaultSymbols }: AbbreviateOptions = {
		digit: 1,
		padding: true,
		symbols: defaultSymbols,
	},
): string => {
	if (typeof num !== "number") {
		throw new TypeError("PersianTools: abbreviateNumber - The input must be number");
	}

	return mainAbbreviateNumber(num, digit, { padding, symbols });
};

/**
 * Make numbers unabbreviated
 *
 * @category Digits
 * @method expandNumber
 * @return {number} A unabbreviated number
 * @param {string} num
 * @param {string[]} symbols array of SI units
 */
export const expandNumber = (num: string, symbols: AbbreviateOptions["symbols"] = defaultSymbols): number => {
	if (typeof num !== "string") {
		throw new TypeError("PersianTools: expandNumber - The input must be string");
	}

	return mainExpandNumber(num, symbols);
};

/**
 *
 * @category Digits
 */
export interface AbbreviateOptions {
	digit?: number;
	padding?: boolean;
	symbols?: string[];
}
