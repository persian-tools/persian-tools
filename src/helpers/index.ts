/**
 * **replaceArray**:
 * - Takes a string and a Map of key-value pairs (previously an object).
 * - Builds a case-insensitive regex pattern from the Map's keys.
 * - Replaces each match with the corresponding value from the map.
 *
 * @param input   The original string to transform
 * @param findMap A Map whose keys will be replaced by its corresponding values
 * @returns A new string with replacements applied
 */
export function replaceArray(input: string, findMap: Map<string, string>): string {
	// **Create** a pattern by joining all map keys with "|", then use case-insensitive match.
	const pattern = new RegExp(Array.from(findMap.keys()).join("|"), "gi");

	// **Replace** each matched token with the mapped value (case-insensitive).
	return input.replace(pattern, (matched) => {
		// Convert the matched token to lowercase for map lookup (assuming map keys are lowercase).
		const lowerMatched = matched.toLowerCase();
		// If the map contains this key, return its value; else fallback to the original match.
		const replacement = findMap.get(lowerMatched);
		return replacement != null ? replacement : matched;
	});
}
/**
 * A demonstration for the basic alphabet used in Modern Standard Arabic:
 */
export const ArabicContextualForms = /[يﻱﻲﻚكﺔﺓة]/g;

/**
 * Replaces the line breaks with a space.
 *
 * @param text - Some text
 */
export const removeLineBreaks = (text: string): string => {
	return text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ");
};

/**
 * **Zero-pads** a numeric string to at least two digits.
 * e.g. "6" => "06"
 */
export function zeroPad(numStr: string): string {
	return numStr.length === 1 ? "0" + numStr : numStr;
}
