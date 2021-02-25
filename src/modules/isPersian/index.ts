/**
 * Check if string is persian
 *
 * @public
 * @method isPersian
 * @param str string
 * @param trimPattern regExp
 * @return Return true for perisan strings
 */
export const isPersian = (str: string, trimPattern = /[-+()\s.]/g): boolean =>
	/^[\u0600-\u06FF\s]+$/.test(str.replace(trimPattern, ""));

/**
 * Check if string includes persian alphabet.
 *
 * @public
 * @method hasPersian
 * @param str string
 * @return Return true if the entered string includes persian characters
 */
export const hasPersian = (str: string): boolean => /[\u0600-\u06FF]/.test(str);

export default isPersian;
