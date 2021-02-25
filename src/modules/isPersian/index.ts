/**
 * Check if string is persian
 *
 * @param {string} str
 * @param {object} trimPattern Pattern of characters which you want to trim from the string e.g. "-+. ()"
 * @return {boolean} Return true if the entered string does not include other-language characters.
 */
export const isPersian = (str: string, trimPattern = /[-+()\s.]/g): boolean =>
	/^[\u0600-\u06FF\s]+$/.test(str.replace(trimPattern, ""));

/**
 * Check if string includes persian alphabet.
 *
 * @param {string} str
 * @return {boolean} Return true if the entered string includes persian characters
 */
export const hasPersian = (str: string): boolean => /[\u0600-\u06FF]/.test(str);

export default isPersian;
