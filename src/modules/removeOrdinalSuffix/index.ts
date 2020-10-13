/**
 * Remove Ordinal suffix to numbers
 *
 * @method removeOrdinalSuffix
 * @param eg: "سه هزارم"
 * @return A string of ordinated number
 */
const removeOrdinalSuffix = (number?: string): string | undefined => {
	if (typeof number === "undefined") return;

	number = number.replace(new RegExp("(ام| اُم)$", "ig"), "");
	if (number.slice(-3) == "سوم") {
		number = number.slice(0, -3) + "سه";
	} else if (number.slice(-1) == "م") {
		number = number.slice(0, -1);
	}

	return number;
};

export default removeOrdinalSuffix;
