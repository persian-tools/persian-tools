type ReplaceArrayDictionary = {
	[key: string]: string;
};

export type ReplaceArray = (str: string, find: ReplaceArrayDictionary) => string;

export const replaceArray: ReplaceArray = (string, find) => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");

	return string.replace(pattern, (matched) => find[matched] as string);
};
