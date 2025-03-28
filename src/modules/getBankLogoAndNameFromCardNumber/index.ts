import { bankData } from "./bankCode.skip";

export interface getBankLogoAndNameFromCardNumberType {
	name: string;
	logo: string;
}

/**
 * @category Bank account
 * @description Get bank info based on the first 6 digits of a card number.
 * @param cardNumber - A card number with at least 6 digits.
 * @return {{getBankLogoAndNameFromCardNumberType | null}} The bank information or null if not found.
 */
export function getBankLogoAndNameFromCardNumber(
	cardNumber: number | string,
): getBankLogoAndNameFromCardNumberType | null {
	const cardNumberCode = cardNumber.toString().substring(0, 6);
	return bankData[cardNumberCode] || null;
}
