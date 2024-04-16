import {cardBank} from "./banksCode.skip";

export interface IBank {
	code: string;
	name: string;
}

/**
 * Find Bank's name by card number
 * @category Bank account
 * @method getBankNameFromCardNumber
 * @param digits - Card number
 * @return string | null | undefined
 */
function getBankNameFromCardNumber(digits?: number | string): string | null | undefined {
	if (!digits) return;

	const digitsLength = digits.toString().length;
	if (digitsLength < 6 || digitsLength > 16) return null;

	const code = digits.toString().substring(0, 6);
	if (code in cardBank) return cardBank[code];
	return null;
}

export default getBankNameFromCardNumber;
