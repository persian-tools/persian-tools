/**
 * toPersianChars
 *
 * Description: Replace all instances of ي and ك with ی and ک,
 * respectively. It should not make any changes to an Arabic text
 * surrounded by appropriate templates.
 *
 * @method toPersianChars
 * @param {string} str
 * @return cleaned characters of arabic characters
 */
function toPersianChars(str: string): string | undefined {
	if (!str) return;

	return str
		.replace(/ي/g, "ی")
		.replace(/ك/g, "ک")
		.replace(/٫/g, "٫")
		.replace(/٬/g, "٬")
		.replace(/٭/g, "٭")
		.replace(/٪/g, "٪")
		.replace(/ـ/g, "ـ")
		.replace(/ً/g, "ً")
		.replace(/ٌ/g, "ٌ")
		.replace(/ٍ/g, "ٍ")
		.replace(/َ/g, "َ")
		.replace(/ُ/g, "ُ")
		.replace(/ِ/g, "ِ")
		.replace(/ّ/g, "ّ")
		.replace(/ْ/g, "ْ")
		.replace(/ٰ/g, "ٰ")
		.replace(/ٔ/g, "ٔ")
		.replace(/ٕ/g, "ٕ")
		.replace(/ٖ/g, "ٖ")
		.replace(/ٗ/g, "ٗ")
		.replace(/٘/g, "٘")
		.replace(/ٙ/g, "ٙ")
		.replace(/ٚ/g, "ٚ")
		.replace(/ٛ/g, "ٛ");
}

export default toPersianChars;
