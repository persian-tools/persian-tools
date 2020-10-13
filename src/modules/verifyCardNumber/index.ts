/**
 * Verify Iranian Bank's card number which is valid or not
 *
 * @public
 * @method verifyCardNumber
 * @param digits
 * @return boolean
 */
function verifyCardNumber(digits: number): boolean | undefined {
	if (!digits) return;

	const digitsResult = "" + digits;

	const length = digitsResult.length;
	if (
		length < 16 ||
		parseInt(digitsResult.substr(1, 10), 10) === 0 ||
		parseInt(digitsResult.substr(10, 6), 10) === 0
	) {
		return false;
	}

	let sum = 0;
	let even, subDigit;
	for (let i = 0; i < 16; i++) {
		even = i % 2 === 0 ? 2 : 1;
		subDigit = parseInt(digitsResult.substr(i, 1), 10) * even;
		sum += subDigit > 9 ? subDigit - 9 : subDigit;
	}
	return sum % 10 === 0;
}

export default verifyCardNumber;
