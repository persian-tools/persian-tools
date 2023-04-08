import { toString } from "../../type.handler";

/**
 * Remove all commas in string
 *
 * @param string which separated by commas
 * @return A number which includes any commas
 */
const removeCommas = (str: string): number => {
	const result = toString(str, "removeCommas");
	return result.indexOf(",") !== -1 ? +result.replace(/,\s?/g, "") : +result;
};

export default removeCommas;
