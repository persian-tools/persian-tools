/**
 * Check if string included of just persian characters
 *
 * @public
 * @method isPersian
 * @param characters string
 * @return Return true if the entered string includes persian characters
 */
const isPersian = (characters: string): boolean | undefined => {
	if (!characters) return;

	const letters: string[] = [];
	for (let i = 0; i <= characters.length; i++) {
		letters[i] = characters.substring(i - 1, i);
		if (letters[i].charCodeAt(0) > 255) {
			return true;
		}
	}

	return false;
};

export default isPersian;
