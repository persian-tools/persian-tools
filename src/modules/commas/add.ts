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

	const tokenizedNumber = tokenizedToEnglish.split(".");
	const integer = tokenizedNumber[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	const decimal = tokenizedNumber[1] ? `.${tokenizedNumber[1]}` : "";

	return integer + decimal;
};

export default addCommas;
