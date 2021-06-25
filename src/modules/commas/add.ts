import { digitsFaToEn } from "../digits";
import { isPersian } from "../isPersian";

/**
 * Add Commas to numbers
 *
 * @method addCommas
 * @param {number} number, eg: 300000
 * @return {string} string of separated numbers by commas, eg: 30,000
 */
const addCommas = (number: number | string): string => {
	if (typeof number !== "number" && typeof number !== "string") return "";

	const convertedToString = number.toString();
	const tokenizedToEnglish = isPersian(convertedToString)
		? digitsFaToEn(convertedToString)
		: convertedToString;

	const tokenizedNumber = tokenizedToEnglish.split(".");
	const integer = tokenizedNumber[0].replace(
		/(\d)(?=(\d{3})+(?!\d))/g,
		"$1,",
	);
	const decimal = tokenizedNumber[1] ? `.${tokenizedNumber[1]}` : "";

	return integer + decimal;
};

export default addCommas;
