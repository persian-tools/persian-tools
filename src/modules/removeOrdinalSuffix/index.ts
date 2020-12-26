/**
 * @description Remove Ordinal suffix in words
 * @function removeOrdinalSuffix
 * @param word String that includes ordinal suffix
 * @return A string of words that not includes Ordinal strings
 * @example
 * removeOrdinalSuffix("سه هزارم") // سه هزار
 * removeOrdinalSuffix("سه هزارمین") // سه هزار
 */
const removeOrdinalSuffix = (word: string): string | undefined => {
	if (typeof word === "undefined") return;

	word = word.replace(new RegExp("مین$", "ig"), "").replace(new RegExp("(ام| اُم)$", "ig"), "");
	if (word.endsWith("سوم")) {
		word = word.slice(0, -3) + "سه";
	} else if (word.endsWith("م")) {
		word = word.slice(0, -1);
	}

	return word;
};

export default removeOrdinalSuffix;
