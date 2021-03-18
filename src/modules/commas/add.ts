import { digitsFaToEn } from "../digits";
import { isPersian } from "../isPersian";

/**
 * Add Commas to numbers
 *
 * @method addCommas
 * @param  eg: 300000
 * @return A string of separated numbers by commas, eg: 30,000
 */
const addCommas = (number?: number | string): string | undefined => {
	if (typeof number === "undefined") return;

	const convertedToString = number.toString();

	const tokenizedToEnglish = isPersian(convertedToString)
		? (digitsFaToEn(convertedToString) as string)
		: convertedToString;

	return tokenizedToEnglish.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default addCommas;
