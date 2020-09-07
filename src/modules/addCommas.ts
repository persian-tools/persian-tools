import isPersian from "./isPersian";
import { digitsFaToEn } from "./digits";

/**
 * Add Commas to numbers
 * @method addCommas
 * @param   {number}  number Number, eg: 300000
 * @return  {string}  		 Return a string of commas separated, eg: 30,000
 */
const addCommas = (number?: number | string): string | undefined => {
	if (typeof number === "undefined") return;

	const convertedToString = number.toString();

	const tokenizedToEnglish = isPersian(convertedToString)
		? (digitsFaToEn(convertedToString) as string)
		: convertedToString;

	return tokenizedToEnglish.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default addCommas;
