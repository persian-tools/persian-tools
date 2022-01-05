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
	if (codeLength < 8 || codeLength > 10) return false;
	code = ("00" + code).substring(codeLength + 2 - 10);
	if (+code.substring(3, 9) === 0) return false;

	const lastNumber = +code.substring(9);
	let sum = 0;

	for (let i = 0; i < 9; i++) {
		sum += +code.substring(i, i + 1) * (10 - i);
	}

	sum = sum % 11;

	return (sum < 2 && lastNumber === sum) || (sum >= 2 && lastNumber === 11 - sum);
}

export default verifyIranianNationalId;
