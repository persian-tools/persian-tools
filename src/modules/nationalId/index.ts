/**
 * Check allCharactersSame
 * @category all Characters Same
 * @method allCharactersSame
 * @param  {String?}          inputString [String of numbers - like this: 1111111111]
 * @return {Boolean}                    [valid or no]
 */

function allCharactersSame(inputString?: string): boolean {
	if (!inputString){
		return false;
	}

	const n = inputString?.toString()?.length;
	for (let i = 1; i < n; i++)
		if (inputString[i] !== inputString[0])
			return false;

	return true;
}


/**
 * Check National-id validation
 * @category National id
 * @method verifyIranianNationalId
 * @param  {String?}          nationalCode [String of national id - like this: 0018465986]
 * @return {Boolean}                    [valid or no]
 */

function verifyIranianNationalId(nationalCode?: string | number): boolean | undefined {
	if (!nationalCode){
		return false
	}

	let nationalCodeInString  = nationalCode.toString();

	if (!nationalCode || nationalCode?.toString().length !== 10 || allCharactersSame(nationalCodeInString )) {
		return false;
	}
	nationalCodeInString  = `0000${nationalCodeInString }`.substr(nationalCodeInString ?.length + 4 - 10);
	if (parseInt(nationalCodeInString .substr(3, 6), 10) === 0) return false;
	const c = parseInt(nationalCodeInString .substr(9, 1), 10);
	let s = 0;
	for (let i = 0; i < 9; i++) s += parseInt(nationalCodeInString .substr(i, 1), 10) * (10 - i);
	s %= 11;
	return (s < 2 && c === s) || (s >= 2 && c === 11 - s)
}

export default verifyIranianNationalId;
