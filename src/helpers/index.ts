export const trim = (str: string): string => str.replace(/^\s+|\s+$/g, "");

interface ReplaceArrayDictionary {
	[key: string]: string;
}
export const replaceArray = (string: string, find: ReplaceArrayDictionary): string => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");

	return string.replace(pattern, (matched) => find[matched] as string);
};
