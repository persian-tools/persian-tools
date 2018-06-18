const trim = str => str.replace(/^\s+|\s+$/g, "");
const replaceArray = (string, find) => {
	const pattern = new RegExp(Object.keys(find).join("|"), "gi");
	string = string.replace(pattern, matched => {
		return find[matched];
	});
	return string;
};

export { trim, replaceArray };
