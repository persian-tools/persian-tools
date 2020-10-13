/**
 * Add Ordinal suffix to numbers
 * @method addOrdinalSuffix
 * @param number - Number, eg: "300000"
 * @return A string of ordinated number
 */
const addOrdinalSuffix = (number?: string): string | undefined => {
	if (typeof number === "undefined") return;

	if (number.slice(-1) == "ی") {
		number += " اُم";
	} else if (number.slice(-2) == "سه") {
		number = number.slice(0, -2) + "سوم";
	} else number += "م";

	return number;
};

export default addOrdinalSuffix;
