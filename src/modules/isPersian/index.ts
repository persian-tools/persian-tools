import { faText, faComplexText } from "./farsiChars";

// Trim characters which are common in Farsi text.
export const TRIM_REGEX = /["'-+()؟\s.]/g;

/**
 * Check if string is in persian.
 *
 * @param {string} str
 * @param {boolean} isComplex in complex mode, we accept some specific characters which are common in Farsi text.
 * @param {object} trimPattern Pattern of characters which you want to trim from the string e.g. "-+. ()"
 * @return {boolean} Return true if the entered string does not include other-language characters.
 */
export const isPersian = (str: string, isComplex: boolean = false, trimPattern: RegExp = TRIM_REGEX): boolean => {
	const text = str.replace(trimPattern, "");
	const faRegex = isComplex ? faComplexText : faText;

	return new RegExp(`^[${faRegex}]+$`).test(text);
};
export const isFarsi = isPersian;

/**
 * Check if string includes persian alphabet.
 *
 * @param {string} str
 * @param {boolean} isComplex in complex mode, we accept some specific characters which are common in Farsi text.
 * @return {boolean} Return true if the entered string includes persian characters
 */
export const hasPersian = (str: string, isComplex: boolean = false): boolean => {
	const faRegex = isComplex ? faComplexText : faText;

	return new RegExp(`[${faRegex}]`).test(str);
};

export const hasFarsi = hasPersian;

export * from "./farsiChars";
export default isPersian;
