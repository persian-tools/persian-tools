export const trim = (str: string): string => str.replace(/^\s+|\s+$/g, "");

interface ReplaceArrayDictionary {
	[key: string]: string;
}
export const replaceArray = (string: string, find: ReplaceArrayDictionary): string => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");

	return string.replace(pattern, (matched) => find[matched] as string);
};

/**
 * A demonstration for the basic alphabet used in Modern Standard Arabic:
 *
 * @type regex
 */
export const ArabicContextualForms = /[ي|ﻱ|ﻲ|ﻚ|ك|ﻚ|ﺔ|ﺓ|ة]/g;

export const kindOf = (inp: unknown): string => Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();

export const toPositive = (n: number): number => Math.abs(n);
