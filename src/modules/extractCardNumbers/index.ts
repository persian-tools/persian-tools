import { digitsFaToEn, getBankNameFromCardNumber, isPersian, verifyCardNumber } from "../../";

interface ExtractCardNumber {
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
	 * This Regex can find all kind of Iranian Banks card numbers into a text such as these models:
	 * @example
	 * 1. 6219-8610-3452-9007
	 * 2. 5022291070873466
	 * 3. ۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶
	 * 4. ۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶
	 * 5. ۵۰۲۲.۲۹۱۰.۷۰۸۷.۳۴۶۶
	 * 6. ۵۰۲۲_۲۹۱۰_۷۰۸۷_۳۴۶۶
	 * 7. ۵۰۲۲*۲۹۱۰*۷۰۸۷*۳۴۶۶
	 *
	 * @constant
	 */
	const cardNumberRegex = /([\u06F0-\u06F90-9-_.*]{16,20})/gm;
	/**
	 * Acceptable keywords between numbers are:
	 * 1. Start -> *
	 * 2. Underscore -> _
	 * 3. Dash -> -
	 * 4. Dot -> .
	 *
	 * @example:
	 * 5022*2910_7087-3466
	 * @constant
	 */
	const acceptableKeywords = /[-_.*]/g;
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
			cardNumber = (isPersian(cardNumber) as boolean) ? (digitsFaToEn(cardNumber) as string) : cardNumber;

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

		return serialize as ExtractCardNumber[];
	}

	return [];
}

export default extractCardNumber;
