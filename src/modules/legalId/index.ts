/**
 * Check Legal-id validation
 * @category Legal id
 * @method verifyIranianLegalId
 * @description verify Iranian Legal-id(shenase hoghoghi)
 * @param  {String}          legalId [String of legal id - like this: 10380284790]
 * @return {Boolean}                    [valid or no]
 * @link http://www.aliarash.com/article/shenasameli/shenasa_meli.htm
 */
export function verifyIranianLegalId(legalId: string | number): boolean | undefined {
	if (!legalId) return;
	legalId = String(legalId);
	const len = legalId.length;

	if (len < 11 || parseInt(legalId) === 0) return false;

	if (parseInt(legalId.slice(3, 9)) === 0) return false;
	const controlDigit = parseInt(legalId.slice(10, 11));
	const d = parseInt(legalId.slice(9, 10)) + 2;
	// coefficient of figures
	const z = [29, 27, 23, 19, 17];

	let sum = 0;
	for (let i = 0; i < 10; i++) sum += (d + parseInt(legalId.slice(i, i + 1))) * z[i % 5];
	sum = sum % 11;
	if (sum === 10) sum = 0;
	return controlDigit === sum;
}
