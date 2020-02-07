import isPersian from "./isPersian";
import { digitsFaToEn } from "./digits";

/**
 * Add Commas into number
 * @method addCommas
 * @param   {number}  number Number, like: 300000
 * @return  {string}  		 Returned String, like: 30,000
 */
const addCommas = (No?: number): string | undefined => {
	if (!No) return;

	const newNo = isPersian("" + No) ? digitsFaToEn("" + No) : No;

	return (newNo || "").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default addCommas;
