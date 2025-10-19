import { isTruthy } from "../../helpers";
// Constants
import { iranianBankPrefixes } from "./constants";

/**
 * Verify Iranian Bank's card number using Luhn algorithm and Iranian bank validation
 * Internally uses {@link iranianBankPrefixes} for validation
 * References:
 * - [https://banky.blogsky.com](https%3A%2F%2Fbanky.blogsky.com%2F%25D9%25BE%25DB%258C%25D8%25B4-%25D8%25B4%25D9%2585%25D8%25A7%25D8%25B1%25D9%2587-%25DA%25A9%25D8%25A7%25D8%25B1%25D8%25AA-%25D9%2587%25D8%25A7%25DB%258C-%25D8%25A8%25D8%25A7%25D9%2586%25DA%25A9%25DB%258C)
 * - [https://wikiplast.ir](https://wikiplast.ir/news/17957/%D9%BE%DB%8C%D8%B4-%D8%B4%D9%85%D8%A7%D8%B1%D9%87-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B4%D8%AA%D8%A7%D8%A8%DB%8C-%D8%A8%D8%A7%D9%86%DA%A9%E2%80%8E%D9%87%D8%A7%DB%8C-%DA%A9%D8%B4%D9%88%D8%B1)
 *
 * @category Bank account
 * @public
 * @method verifyCardNumber
 * @param {number | string} digits - card number (16 digits)
 * @return {boolean | undefined} true if valid, false if invalid, undefined if input is falsy
 */
export function verifyCardNumber(digits: number | string): boolean | undefined {
	// Handle falsy inputs
	if (!isTruthy(digits)) return undefined;

	// Convert to string and remove whitespace
	const digitsResult: string = String(digits).replace(/\s/g, "").trim();

	// Validate input format - must be exactly 16 digits
	if (!/^\d{16}$/.test(digitsResult)) {
		return false;
	}

	// Check for obviously invalid patterns (sequences of zeros in middle sections)
	if (parseInt(digitsResult.slice(1, 11), 10) === 0 || parseInt(digitsResult.slice(10, 16), 10) === 0) {
		return false;
	}

	// Check if it starts with a known Iranian bank prefix
	// If it doesn't have a valid Iranian prefix, reject it
	const bankPrefix: string = digitsResult.slice(0, 6);
	if (!iranianBankPrefixes.has(bankPrefix)) {
		return false;
	}

	// Luhn algorithm implementation for final validation
	let sum: number = 0;
	let shouldDouble: boolean = false;

	// Process digits from right to left
	for (let i = digitsResult.length - 1; i >= 0; i--) {
		let digit: number = parseInt(digitsResult[i], 10);

		if (shouldDouble) {
			digit *= 2;
			// If doubling results in a two-digit number, subtract 9 (equivalent to adding digits)
			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	// Card number is valid if a sum is divisible by 10
	return sum % 10 === 0;
}
