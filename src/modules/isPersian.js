/**
 * @param {string}
 * @return {boolean}
 */
const isPersian = str => {
	if (!str) return;

	const letters = [];
	for (let i = 0; i <= str.length; i++) {
		letters[i] = str.substring(i - 1, i);
		if (letters[i].charCodeAt() > 255) {
			return true;
		}
	}
	return false;
};
export default isPersian;
