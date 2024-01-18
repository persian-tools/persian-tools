/**
 * @description Verify Iranian Bank's card number which is valid or not
 *
 * @category Bank account
 * @public
 * @method verifyCardNumber
 * @param {number} digits - card number
 * @return {boolean}
 */
function verifyCardNumber(digits: number): boolean | undefined {
	if (!digits) return;
	const digitsResult = digits.toString().split("").map(Number);

	const length = digitsResult.length;

	if (length < 16) {
		return false;
	}

	let sum = 0;
	for (let i = 0; i < length; i++) {
		let digit = digitsResult[i];

		if ((i + 1) % 2 !== 0) {
			digit *= 2;

			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
	}

	return sum % 10 === 0;
}

export default verifyCardNumber;
