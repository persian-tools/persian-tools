import { cardBank } from "./banksCode.skip";
import { cardBankLogo } from "./bankLogos.skip";

export interface IBank {
	code: string;
	name: string;
}

/** Information about the Iranian bank that issued a card. */
export interface CardBankInfo {
	/** Persian bank name. */
	name: string;
	/** Packaged SVG bank logo URL or data URI. */
	logo: string;
}

/**
 * Find Bank's name by card number
 * @category Bank account
 * @method getBankNameFromCardNumber
 * @param digits - Card number
 * @return string | null | undefined
 */
export function getBankNameFromCardNumber(digits?: number | string): string | null | undefined {
	if (!digits) return;

	const digitsLength = digits.toString().length;
	if (digitsLength < 6 || digitsLength > 16) return null;

	const code = digits.toString().substring(0, 6);
	if (code in cardBank) return cardBank[code];
	return null;
}

/**
 * Find an Iranian bank's Persian name and logo from a card number's 6-digit BIN prefix.
 *
 * This function performs a prefix lookup and does not validate the card checksum.
 *
 * @category Bank account
 * @param cardNumber - Card number or a 6-digit BIN using English digits
 * @returns Bank name and packaged SVG logo, or `null` when the BIN is unknown
 */
export function getBankLogoWithCardNumber(cardNumber: string): CardBankInfo | null {
	const code = cardNumber.substring(0, 6);
	const name = cardBank[code];
	const logo = cardBankLogo[code];

	if (!name || !logo) return null;

	return { name, logo };
}
