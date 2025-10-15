import { ArabicContextualForms } from "../../helpers";

/**
 * Check if string is Arabic
 *
 * @param {string} str
 * @param {object} trimPattern Pattern of characters which you want to trim from the string e.g. "-+. ()"
 * @return {boolean} Return true if the entered string does not include other-language characters.
 */
export const isArabic = (str: string, trimPattern: RegExp = /["'-+()\s.]/g): boolean => {
	const text = str.replace(trimPattern, "");

	return /^[\u0600-\u06FF\s]+$/.test(text) && ArabicContextualForms.test(text);
};

/**
 * Check if string includes Arabic alphabet.
 *
 * @param {string} str
 * @return {boolean} Return true if the entered string includes persian characters
 */
export const hasArabic = (str: string): boolean => /[\u0600-\u06FF]/.test(str) && ArabicContextualForms.test(str);
