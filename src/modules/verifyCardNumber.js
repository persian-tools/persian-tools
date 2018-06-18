function verifyCardNumber(digits) {
	if (!digits) return;

	digits = digits.toString();

	const length = digits.length;
	if (
		length < 16 ||
		parseInt(digits.substr(1, 10), 10) === 0 ||
		parseInt(digits.substr(10, 6), 10) === 0
	) {
		return false;
	}

	let sum = 0;
	let even, subDigit;
	for (let i = 0; i < 16; i++) {
		even = i % 2 === 0 ? 2 : 1;
		subDigit = parseInt(digits.substr(i, 1), 10) * even;
		sum += subDigit > 9 ? subDigit - 9 : subDigit;
	}
	return sum % 10 === 0;
}

export default verifyCardNumber;
