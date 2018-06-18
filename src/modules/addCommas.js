import isPersian from "./isPersian";
import { digitsFaToEn } from "./digits";

/**
 * Add Commas into number
 * @method addCommas
 * @param   {Number}  number [Number, like: 300000]
 * @return  {String}  		 [Returned String, like: 30,000]
 */
const addCommas = number => {
	if (!number) return;

	number = "" + number;
	number = isPersian(number) ? digitsFaToEn(number) : number;

	return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default addCommas;
