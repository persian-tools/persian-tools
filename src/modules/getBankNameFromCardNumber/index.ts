import banksCode from "./banksCode.skip";

export interface IBank {
	code: string;
	name: string;
}

/**
 * Find Bank's name by card number
 *
 * @method getBankNameFromCardNumber
 * @param digits - Card number
 * @return string | null | undefined
 */
function getBankNameFromCardNumber(digits?: number | string): string | null | undefined {
	if (!digits) return;

	if (digits && digits.toString().length === 16) {
		const code = digits.toString().substr(0, 6);
		const findBank = (banksCode as IBank[]).find((bank) => bank.code === code);

		if (findBank) {
			return findBank.name;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export default getBankNameFromCardNumber;
