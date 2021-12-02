/**
 * Check Legal-id validation
 * @category Legal id
 * @method verifyIranianLegalId
 * @description verify Iranian Legal-id(shenase hoghoghi)
 * @param  {String?}          legalId [String of legal id - like this: 10380284790]
 * @return {Boolean}                    [valid or no]
 * @link http://www.aliarash.com/article/shenasameli/shenasa_meli.htm
 */
function verifyIranianLegalId(legalId?: string | number): boolean | null | undefined {
	if (!legalId) return;
	else {
		legalId=String(legalId)
		const L=legalId.length

		if(L < 11 || parseInt(legalId, 10) === 0) return false

		if(parseInt(legalId.substr(3, 6), 10) === 0) return false
		const c=parseInt(legalId.substr(10, 1), 10)
		const d=parseInt(legalId.substr(9, 1), 10)+2
		const z=[29, 27, 23, 19, 17]
		let sum=0
		for(let i=0; i < 10; i++)
			sum+=(d+parseInt(legalId.substr(i, 1), 10))*z[i%5]
		sum=sum%11
		if(sum === 10) sum=0
		return (c === sum)

	}
}

export default verifyIranianLegalId;
