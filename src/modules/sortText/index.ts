/** SortText * *
 * @description Takes a piece of text in Persian which contains * several lines (separated by the newline character), and sorts
 * * the lines alphabetically, with respect to their first character.
 * * @param {string} str
 * * @return { string[] | undefined}
 * */

function SortText(str: string | string[]): string[] | undefined {
	if (!str) return;
	const stringResult = typeof str === "string" ? str.split(" ") : str;
	stringResult.sort((a, b) => a.localeCompare(b, "fa", { ignorePunctuation: true }));
	return stringResult;
}

export default SortText;
