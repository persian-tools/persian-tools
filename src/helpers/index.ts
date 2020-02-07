const trim = (str: string): string => str.replace(/^\s+|\s+$/g, "");

interface IFind {
	[key: string]: string;
}
const replaceArray = (string: string, find: IFind): string => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");
	string = string.replace(pattern, matched => {
		return find[matched] as string;
	});
	return string;
};

export { trim, replaceArray };
