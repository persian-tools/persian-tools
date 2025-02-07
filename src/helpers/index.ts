interface ReplaceArrayDictionary {
	[key: string]: string;
}
export const replaceArray = (string: string, find: ReplaceArrayDictionary): string => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");

	return string.replace(pattern, (matched) => find[matched] as string);
};

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
