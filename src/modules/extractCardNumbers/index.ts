import { hasPersian } from "../isPersian";
import { digitsFaToEn } from "../digits";
import verifyCardNumber from "../verifyCardNumber";
import { acceptableKeywords, cardNumberRegex } from "./utils";
import getBankNameFromCardNumber from "../getBankNameFromCardNumber";

export interface ExtractCardNumber {
	base: string;
	pure: string;
	index: number;
	isValid?: boolean;
	bankName?: string | null;
}

export interface ExtractCardNumberOptions {
	/**
	 * Check if every card-numbers is valid or not
	 *
	 * @type boolean
	 */
	checkValidation?: boolean;
	/**
	 * Detect Bank's name by extracted card-number
	 *
	 * @type boolean
	 */
	detectBankNumber?: boolean;
	/**
	 * Return list of valid card-numbers
	 *
	 * @type boolean
	 */
	filterValidCardNumbers?: boolean;
}

/**
 * Extract Iranian Bank's numbers into a string
 *
 * @public
 * @return ExtractCardNumber[]
 * @param str
 * @param options
 */
function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptions = {
		checkValidation: true,
		detectBankNumber: false,
		filterValidCardNumbers: true,
	},
): ExtractCardNumber[] {
	/**
	 * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
	 *
	 * @type boolean
	 */
	if (str && cardNumberRegex.test(str)) {
		/**
		 * returns an array containing the results of card-numbers, or null if no matches are found.
		 *
		 * @type string[]
		 * @constant
		 */
		const matches = str.match(cardNumberRegex);

		let serialize = matches?.map<ExtractCardNumber>((matchedCardNumber, index) => {
			let cardNumber = acceptableKeywords.test(matchedCardNumber)
				? matchedCardNumber.replace(acceptableKeywords, "")
				: matchedCardNumber;
			/**
			 * If Card-Number includes Persian digits, we should convert all Persian digits to English.
			 *
			 * @type string
			 */
			cardNumber = (hasPersian(cardNumber) as boolean) ? (digitsFaToEn(cardNumber) as string) : cardNumber;

			const result: ExtractCardNumber = {
				index: index + 1,
				base: matchedCardNumber,
				pure: cardNumber,
			};

			if (options.checkValidation) {
				result.isValid = verifyCardNumber(Number(cardNumber));
			}

			if (options.detectBankNumber) {
				const bankName = getBankNameFromCardNumber(cardNumber);

				if (bankName || bankName === null) {
					result.bankName = bankName as string | null;
				}
			}

			return result;
		});

		if (options.filterValidCardNumbers && options.checkValidation) {
			serialize = serialize?.filter((item) => item.isValid);
		}

		return serialize!;
	}

	return [];
}

export * from "./utils";
export default extractCardNumber;
