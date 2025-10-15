/**
 * Replaces the line breaks with a space.
 *
 * @param text - Some text
 */
export const removeLineBreaks = (text: string): string => {
	return text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ");
};
