/**
 * Configuration options for Iranian National ID generation
 */
export interface NationalIdGenerationOptions {
	/** Whether to ensure the generated ID doesn't have all identical digits */
	preventRepeatedDigits?: boolean;
	/** Maximum number of regeneration attempts for repeated digits prevention */
	maxRetries?: number;
	/** Custom random number generator function (for testing purposes) */
	randomGenerator?: () => number;
}

/**
 * Result object containing the generated National ID and metadata
 */
export interface NationalIdGenerationResult {
	/** The generated 10-digit National ID */
	nationalId: string;
	/** Array of individual digits for analysis */
	digits: number[];
	/** The calculated check digit */
	checkDigit: number;
	/** Number of generation attempts made */
	attempts: number;
	/** Whether the ID has repeated digits */
	hasRepeatedDigits: boolean;
}

/**
 * Generates a random valid Iranian National ID (کد ملی)
 *
 * Iranian National IDs are 10-digit numbers where:
 * - First 9 digits can be any combination
 * - 10th digit is a check digit calculated using a weighted sum algorithm
 * - The validation formula: sum(digit[i] * weight[i]) % 11
 * - If remainder < 2, check digit = remainder; otherwise check digit = 11 - remainder
 *
 * @param options - Configuration options for generation
 * @returns A valid 10-digit Iranian National ID string
 *
 * @example
 * // Generate a basic National ID
 * createIranianNationalId(); // "0499370899"
 *
 * // Generate with repeated digits prevention
 * createIranianNationalId({ preventRepeatedDigits: true }); // "1234567890"
 *
 * // Get detailed generation result
 * const result = createIranianNationalIdDetailed();
 * console.log(result.nationalId); // "0499370899"
 * console.log(result.checkDigit); // 9
 */
export function createIranianNationalId(options: NationalIdGenerationOptions = {}): string {
	const result = createIranianNationalIdDetailed(options);
	return result.nationalId;
}

/**
 * Generates a random valid Iranian National ID with detailed metadata
 *
 * @param options - Configuration options for generation
 * @returns Detailed result object with National ID and generation metadata
 *
 * @example
 * const result = createIranianNationalIdDetailed({
 *   preventRepeatedDigits: true,
 *   maxRetries: 10
 * });
 *
 * console.log(result.nationalId);      // "1234567890"
 * console.log(result.checkDigit);      // 0
 * console.log(result.attempts);        // 1
 * console.log(result.hasRepeatedDigits); // false
 */
export function createIranianNationalIdDetailed(options: NationalIdGenerationOptions = {}): NationalIdGenerationResult {
	const { preventRepeatedDigits = false, maxRetries = 100, randomGenerator = Math.random } = options;

	let attempts = 0;

	while (attempts < maxRetries) {
		attempts++;

		// Generate the first 9 digits with their weighted sum
		const generationResult = generateNationalIdDigits(randomGenerator);

		// Calculate and append the check digit
		const checkDigit = calculateCheckDigit(generationResult.weightedSum);
		const allDigits = [...generationResult.digits, checkDigit];

		// Check for repeated digits if prevention is enabled
		const hasRepeatedDigits = checkForRepeatedDigits(allDigits);

		if (!preventRepeatedDigits || !hasRepeatedDigits) {
			return {
				nationalId: allDigits.join(""),
				digits: allDigits,
				checkDigit,
				attempts,
				hasRepeatedDigits,
			};
		}
	}

	// Fallback: return the last generated ID even if it has repeated digits
	const fallbackResult = generateNationalIdDigits(randomGenerator);
	const fallbackCheckDigit = calculateCheckDigit(fallbackResult.weightedSum);
	const fallbackDigits = [...fallbackResult.digits, fallbackCheckDigit];

	return {
		nationalId: fallbackDigits.join(""),
		digits: fallbackDigits,
		checkDigit: fallbackCheckDigit,
		attempts,
		hasRepeatedDigits: checkForRepeatedDigits(fallbackDigits),
	};
}

/**
 * Legacy function for backward compatibility
 * Generates a National ID with repeated digits prevention
 *
 * @deprecated Use createIranianNationalId({ preventRepeatedDigits: true }) instead
 * @returns A valid Iranian National ID string without repeated digits
 */
export function createIranianRoundNationalId(): string {
	return createIranianNationalId({ preventRepeatedDigits: true });
}

/**
 * Generates the first 9 digits of a National ID with their weighted sum
 *
 * @param randomGenerator - Random number generator function
 * @returns Object containing the digits and their weighted sum
 */
function generateNationalIdDigits(randomGenerator: () => number): {
	digits: number[];
	weightedSum: number;
} {
	const digits: number[] = [];
	let weightedSum = 0;

	// Generate 9 digits with weights from 10 down to 2
	for (let weight = 10; weight >= 2; weight--) {
		// Generate random digit (0-9)
		const digit = Math.floor(randomGenerator() * 10);
		digits.push(digit);

		// Add to weighted sum for check digit calculation
		weightedSum += digit * weight;
	}

	return { digits, weightedSum };
}

/**
 * Calculates the check digit for Iranian National ID validation
 *
 * The algorithm:
 * 1. Calculate remainder of weighted sum divided by 11
 * 2. If remainder < 2, check digit = remainder
 * 3. Otherwise, check digit = 11 - remainder
 *
 * @param weightedSum - Sum of first 9 digits multiplied by their weights
 * @returns The calculated check digit (0-9)
 */
function calculateCheckDigit(weightedSum: number): number {
	const remainder = weightedSum % 11;
	return remainder < 2 ? remainder : 11 - remainder;
}

/**
 * Checks if all digits in the array are identical
 *
 * @param digits - Array of digits to check
 * @returns True if all digits are the same, false otherwise
 */
function checkForRepeatedDigits(digits: number[]): boolean {
	// Check if all digits are identical to the first digit
	return digits.every((digit) => digit === digits[0]);
}

/**
 * Validates if a string represents a valid Iranian National ID format
 *
 * @param nationalId - The National ID string to validate format
 * @returns True if the format is valid (10 digits), false otherwise
 */
export function isValidNationalIdFormat(nationalId: string): boolean {
	// Check if it's exactly 10 digits
	return /^\d{10}$/.test(nationalId);
}

/**
 * Validates the check digit of an Iranian National ID
 *
 * @param nationalId - The 10-digit National ID to validate
 * @returns True if the check digit is correct, false otherwise
 */
export function validateNationalIdChecksum(nationalId: string): boolean {
	if (!isValidNationalIdFormat(nationalId)) {
		return false;
	}

	const digits = nationalId.split("").map(Number);
	const checkDigit = digits[9];

	// Calculate weighted sum of first 9 digits
	let weightedSum = 0;
	for (let i = 0; i < 9; i++) {
		weightedSum += digits[i] * (10 - i);
	}

	// Verify check digit
	const expectedCheckDigit = calculateCheckDigit(weightedSum);
	return checkDigit === expectedCheckDigit;
}
