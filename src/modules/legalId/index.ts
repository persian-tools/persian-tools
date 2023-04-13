import { toStringOrEmpty } from "../../type.handler";
import { StringNumber } from "../../types";

/**
 * Check Legal-id validation
 * @category Legal id
 * @method verifyIranianLegalId
 * @description verify Iranian Legal-id(shenase hoghoghi)
 * @param  {String}          legalId [String of legal id - like this: 10380284790]
 * @return {Boolean}                    [valid or no]
 * @link http://www.aliarash.com/article/shenasameli/shenasa_meli.htm
 */
function verifyIranianLegalId(legalId: StringNumber): boolean | undefined {
	legalId = toStringOrEmpty(legalId);
	if (!legalId) {
		return;
	}

	const len = legalId.length;
	if (len < 11 || +legalId === 0 || +legalId.substr(3, 6) === 0) {
		return false;
	}

	const controlDigit = +legalId.substr(10, 1);
	const d = +legalId.substr(9, 1) + 2;

	// coefficient of figures
	const z = [29, 27, 23, 19, 17];

	let sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += (d + +legalId.substr(i, 1)) * z[i % 5];
	}
	sum = sum % 11;
	if (sum === 10) {
		sum = 0;
	}
	return controlDigit === sum;
}

export default verifyIranianLegalId;
