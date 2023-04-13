import { throwError } from "../../error-handler";

/**
 * SortText
 *
 * @description Takes a piece of text in Persian which contains
 * several lines (separated by the newline character), and sorts
 * the lines alphabetically, with respect to their first character.
 *
 * @deprecated This function will be removed in the next release and please don't use this function.
 *
 * @param {string | string[]} str - a String or a list of strings
 * @return {string[]}
 */
const sortText = <T extends string>(str: T | T[]): T[] => {
	if (typeof str !== "string" && !Array.isArray(str)) {
		throwError("SortText", "The input must be string or an array of strings");
	}
	const stringResult = (typeof str === "string" ? str.split(" ") : str) as T[];
	stringResult.sort((a, b) => a.localeCompare(b, "fa", { ignorePunctuation: true }));
	return stringResult;
};

export default sortText;
