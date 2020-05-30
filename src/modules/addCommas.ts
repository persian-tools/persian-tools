import isPersian from "./isPersian";
import { digitsFaToEn } from "./digits";

/**
 * Add Commas to numbers
 * @method addCommas
 * @param   {number}  number Number, eg: 300000
 * @return  {string}  		 Return a string of commas separated, eg: 30,000
 */
const addCommas = (number?: number): string | undefined => {
	const convertedToString = number?.toString() || "";

	if (!convertedToString) return;

	const tokenizedToEnglish = isPersian(convertedToString) ? digitsFaToEn(convertedToString) : convertedToString;

	return tokenizedToEnglish?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default addCommas;
