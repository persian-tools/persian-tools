import { isString } from "../../helpers";

/**
 * Add Ordinal suffix to numbers
 * @method addOrdinalSuffix
 * @param number - Number, eg: "300000"
 * @return A string of ordinated number
 */
export const addOrdinalSuffix = (number?: string): string => {
	if (!isString(number)) {
		throw new TypeError("PersianTools: addOrdinalSuffix - The input must be string");
	}

	if (number.endsWith("ی")) {
		return number + " اُم";
	}

	if (number.endsWith("سه")) {
		return number.slice(0, -2) + "سوم";
	}

	return number + "م";
};
