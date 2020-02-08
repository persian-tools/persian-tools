/**
 * @param {string}
 * @return {boolean}
 */
const isPersian = (str: string): boolean | undefined => {
	if (!str) return;

	const letters: string[] = [];
	for (let i = 0; i <= str.length; i++) {
		letters[i] = str.substring(i - 1, i);
		if (letters[i].charCodeAt(0) > 255) {
			return true;
		}
	}
	return false;
};
export default isPersian;
