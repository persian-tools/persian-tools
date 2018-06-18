export default (string, find) => {
	const pattern = new RegExp(Object.keys(find).join('|'), 'gi');
	string = string.replace(pattern, matched => {
		return find[matched];
	});
	return string;
};
