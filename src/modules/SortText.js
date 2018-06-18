/** SortText
 *
 *  Description: Takes a piece of text in Persian which contains
 *  several lines (separated by the newline character), and sorts
 *  the lines alphabetically, with respect to their first character.
 *
 */
function SortText(str) {
	if (!str) return;

	const sortPreparation = instr => {
		// solve persian problem on sorting by replace characters in strings
		return instr
			.replace(/ی/g, "ي")
			.replace(/ک/g, "ك")
			.replace(/ھ/g, "ه")
			.replace(/پ/g, "بی")
			.replace(/چ/g, "جی")
			.replace(/ڕ/g, "ری")
			.replace(/ژ/g, "زی")
			.replace(/ڤ/g, "فی")
			.replace(/ڵ/g, "لی")
			.replace(/گ/g, "كی")
			.replace(/ۆ/g, "وی")
			.replace(/ە/g, "هی")
			.replace(/ێ/g, "يي");
	};

	let temp = str.split(" ");
	temp.sort((a, b) => {
		const keyA = sortPreparation(a);
		const keyB = sortPreparation(b);

		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;

		return 0;
	});

	return temp;
}

export default SortText;
