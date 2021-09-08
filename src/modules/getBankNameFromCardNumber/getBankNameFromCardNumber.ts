import banksCode from "./banksCode.skip";

const getErrorMsg = (description: string) => `PersianTools: getBankNameFromCardNumber - ${description}`;

type GetBankNameFromCardNumberResult = Error | TypeError | string | undefined;
type GetBankNameFromCardNumber = (cardNumber: number | string) => GetBankNameFromCardNumberResult;
/**
 * Find Bank's name by card number
 * @category Bank account
 * @method getBankNameFromCardNumber
 * @param digits - Card number
 * @return Error | TypeError | string | undefined
 */
const getBankNameFromCardNumber: GetBankNameFromCardNumber = (cardNumber) => {
	if (!cardNumber) {
		throw Error(getErrorMsg("The first parameter (card number) is required"));
	}

	if (typeof cardNumber !== "number" && typeof cardNumber !== "string") {
		throw TypeError(getErrorMsg("Card number should be number or string"));
	}

	if (String(cardNumber).length !== 16) {
		return undefined;
	}

	const code = String(cardNumber).substr(0, 6);
	const findBank = banksCode.find((bank) => bank.code === code);

	return findBank ? findBank.name : undefined;
};

export default getBankNameFromCardNumber;
