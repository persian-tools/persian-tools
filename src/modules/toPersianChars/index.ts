/**
 * **toPersianChars**
 *
 * **Description**:
 * - Replaces common Arabic characters (`ي`, `ى`, `ك`) with their Persian equivalents (`ی`, `ی`, `ک`).
 * - Preserves Arabic text inside double-curly-braces (`{{ ... }}`) by skipping those segments entirely.
 * - Also includes diacritic replacements (e.g., `ً`, `ٌ`, `ٍ`, etc.) to standardize the text.
 *
 * @method toPersianChars
 * @param str - The input string that may contain Arabic forms.
 * @returns A cleaned string with Persian characters replaced appropriately.
 *
 * **Example**:
 * ```ts
 *   toPersianChars("عبدالله بن عبدالعزیز");
 *   // => "عبدالله بن عبدالعزیز" (unchanged if there's nothing to replace)
 *
 *   toPersianChars("كشتى ىيكى {{ARABIC|كلمه}}");
 *   // => "کشتی یکی {{ARABIC|كلمه}}"  // 'كلمه' inside {{ }} is preserved
 * ```
 */
export function toPersianChars(str: string): string {
	// **Early return** if the input is empty or falsy
	if (!str) return "";

	// **Regex** to find any text wrapped in {{...}} so we can skip converting those segments.
	const templateRegex = /\{\{.*?\}\}/g;

	// **Placeholder storage** for each matched segment inside {{...}}
	const placeholders: string[] = [];

	// **1) Extract** all `{{...}}` segments, store them, and replace with placeholders.
	//    This ensures we don't transform any Arabic text in those segments.
	const withoutTemplates = str.replace(templateRegex, (match) => {
		placeholders.push(match); // store the original segment
		const index = placeholders.length - 1; // placeholder index
		return `__PLACEHOLDER__${index}__`; // unique placeholder to re-insert later
	});

	// **2) Perform** Persian character replacements on the remaining text
	//    outside the `{{...}}` blocks.
	//    - We unify both "ي" (U+062F) and "ى" (U+0649) to the Persian "ی" (U+06CC).
	//    - "ك" (U+062C) becomes "ک" (U+06A9).
	//    - Retain or re-map diacritics (already in your code).
	let transformed = withoutTemplates
		.replace(/ى/g, "ی")
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

	// **3) Re-insert** the preserved `{{...}}` blocks by replacing the placeholders
	placeholders.forEach((original, i) => {
		const placeholder = `__PLACEHOLDER__${i}__`;
		transformed = transformed.replace(placeholder, original);
	});

	// **4) Return** the fully transformed string
	return transformed;
}
