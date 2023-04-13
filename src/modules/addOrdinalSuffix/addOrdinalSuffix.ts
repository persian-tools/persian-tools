import { toString } from "../../type.handler";
import { StringNumber } from "../../types";

/**
 * Add Ordinal suffix to numbers
 * @method addOrdinalSuffix
 * @param number - Number, eg: "300000"
 * @return A string of ordinated number
 */
const addOrdinalSuffix = (number?: StringNumber): string => {
	number = toString(number, "addOrdinalSuffix");
	if (number.endsWith("ی")) {
		return number + " اُم";
	}
	if (number.endsWith("سه")) {
		return number.slice(0, -2) + "سوم";
	}
	return number + "م";
};

export default addOrdinalSuffix;
