import { isString } from "../../helpers";

/**
 * Remove all commas in string
 *
 * @param value
 * @return A number which includes any commas
 */
export function removeCommas(value: string): number {
	if (!isString(value)) {
		throw new TypeError("PersianTools: removeCommas - The input must be string");
	}

	let result = "" + value;
	if (result.indexOf(",") !== -1) {
		result = result.replace(/,\s?/g, "");
	}

	return Number(result);
}
