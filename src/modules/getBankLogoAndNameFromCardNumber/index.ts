import { bankData } from "./bankCode.skip";

export interface getBankInfoWithCardNumberType {
	name: string;
	logo: string;
}

/**
 * @category Bank account
 * @description Get bank info based on the first 6 digits of a card number.
 * @param cardNumber - A card number with at least 6 digits.
 * @return {{getBankInfoWithCardNumberType | null}} The bank information or null if not found.
 */
export function getBankInfoWithCardNumber(cardNumber: number | string): getBankInfoWithCardNumberType | null {
	const cardNumberCode = cardNumber.toString().substring(0, 6);
	return bankData[cardNumberCode] || null;
}
