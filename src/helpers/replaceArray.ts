interface ReplaceArrayDictionary {
	[key: string]: string;
}

type ReplaceArray = (str: string, find: ReplaceArrayDictionary) => string;

const replaceArray: ReplaceArray = (string, find) => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");

	return string.replace(pattern, (matched) => find[matched] as string);
};

export { replaceArray, ReplaceArray };
