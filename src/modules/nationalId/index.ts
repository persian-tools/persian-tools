/**
 * Check National-id validation
 * @category National id
 * @method verifyIranianNationalId
 * @param  {String?}          nationalId [String of national id - like this: 0018465986]
 * @return {Boolean}                    [valid or no]
 */

function verifyIranianNationalId(nationalId?: string | number): boolean | undefined {
	if (!nationalId) return;
	let code = nationalId.toString();
	const codeLength = code.length;
	const monoDigit = [
		"0000000000",
		"1111111111",
		"2222222222",
		"3333333333",
		"4444444444",
		"5555555555",
		"6666666666",
		"7777777777",
		"8888888888",
		"9999999999",
	];

	if (codeLength < 8 || codeLength > 10 || parseInt(code, 10) == 0) return false;
	code = ("0000" + code).substr(codeLength + 4 - 10);
	if (parseInt(code.substr(3, 6), 10) == 0) return false;
	if (monoDigit.indexOf(code) > -1) return false;

	const lastNumber = parseInt(code.substr(9, 1), 10);
	let sum = 0;

	for (let i = 0; i < 9; i++) {
		sum += parseInt(code.substr(i, 1), 10) * (10 - i);
	}

	sum = sum % 11;

	return (sum < 2 && lastNumber === sum) || (sum >= 2 && lastNumber === 11 - sum);
}

export default verifyIranianNationalId;
