import { postalCodeRanges } from "./postalCodeRanges.skip";

/**
 * Validates Iranian postal code.
 *
 * The function checks if the given postal code is:
 * 1. Exactly 10 digits long.
 * 2. Contains only numeric digits.
 * 3. Not composed of repeating digits (e.g., "0000000000").
 * 4. Within one of the predefined valid postal code ranges.
 * @method isValidPostalCode
 * @param postalCode - The postal code to validate (string or number).
 * @returns True if the postal code is valid; otherwise, false.
 */
export function isValidPostalCode(postalCode: string | number): boolean {
	const code = typeof postalCode === "number" ? postalCode.toString() : postalCode;

	// Check if the code is exactly 10 digits and numeric
	if (!/^\d{10}$/.test(code)) return false;

	// Check if all digits are the same (e.g., "1111111111")
	if (/^(\d)\1{9}$/.test(code)) return false;

	// Extract the first 5 digits (prefix) for the range check
	const prefix = parseInt(code.substring(0, 5), 10);

	// Check if the code falls within any of the allowed postal code ranges
	return postalCodeRanges.some((range) => prefix >= range.start && prefix <= range.end);
}
