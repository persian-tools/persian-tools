import { removeCommas } from "../commas";
import { addOrdinalSuffix } from "../addOrdinalSuffix/addOrdinalSuffix";
import { isNumber, isString } from "../../helpers/type-guards";
// Errors
import { PersianToolsTypeError } from "../../helpers/errors";
// Constants
import { PERSIAN_NUMBERS_IN_WORD_MAPPINGS } from "./constants";
import { JOINERS, PREFIXES } from "../wordsToNumber/constants";
// Types
import type { NumberToWordsOptions } from "./types";

/**
 * Converts a numeric value to its Persian word representation
 *
 * @param numberValue - The number to convert (can be number or string with commas)
 * @param options - Configuration options for the conversion
 * @returns Persian word representation of the number or TypeError if invalid
 *
 * @example
 * numberToWords(123) // "صد و بیست و سه"
 * numberToWords("1,000") // "یک هزار"
 * numberToWords(3, { ordinal: true }) // "سوم"
 */
export function numberToWords(
	numberValue: number | string,
	options?: NumberToWordsOptions,
): string | PersianToolsTypeError {
	// Input validation and normalization
	const normalizedNumber = normalizeInput(numberValue);
	if (normalizedNumber instanceof PersianToolsTypeError) {
		return normalizedNumber;
	}

	// Extract options with defaults
	const isOrdinal = options?.ordinal ?? false;

	// Handle special case of zero
	if (normalizedNumber === 0) {
		return "صفر";
	}

	// Process the number and apply transformations
	const absoluteNumber = Math.abs(normalizedNumber);
	const persianWords = convertNumberToWords(absoluteNumber);

	// Apply a negative prefix if needed
	const finalWords = normalizedNumber < 0 ? addNegativePrefix(persianWords) : persianWords;

	// Apply ordinal suffix if requested
	return isOrdinal ? addOrdinalSuffix(finalWords) : finalWords;
}

/**
 * Validates and normalizes the input number
 *
 * @param input - Raw input value (number or string)
 * @returns Normalized number or TypeError if invalid
 */
function normalizeInput(input: number | string): number | PersianToolsTypeError {
	// Check for valid input types
	if (!isString(input) && !isNumber(input)) {
		return createValidationError("Input must be a number or string");
	}

	// Handle string inputs (remove commas first)
	if (isString(input)) {
		const cleanedInput = removeCommas(input);
		const parsedNumber = Number(cleanedInput);

		// Validate the parsed number
		if (!Number.isSafeInteger(parsedNumber)) {
			return createValidationError("String input must represent a safe integer");
		}

		return parsedNumber;
	}

	// Handle numeric inputs
	if (!Number.isSafeInteger(input)) {
		return createValidationError("Number input must be a safe integer");
	}

	return input;
}

function createValidationError(message: string): PersianToolsTypeError {
	return new PersianToolsTypeError("numberToWords", message);
}

/**
 * Converts a positive number to Persian words
 *
 * @param num - Positive number to convert
 * @returns Persian word representation
 */
function convertNumberToWords(num: number): string {
	// Handle numbers up to 999 with a simple transformation
	if (num <= 999) {
		return transformSimpleNumber(num);
	}

	// Handle larger numbers by breaking into groups
	return transformLargeNumber(num);
}

/**
 * Transforms numbers from 1-999 into Persian words
 *
 * @param num - Number between 1-999
 * @returns Persian word representation
 */
function transformSimpleNumber(num: number): string {
	// Handle zero (should not occur in normal flow, but defensive programming)
	if (num === 0) return "";

	// Handle single digits (1-9)
	if (num <= 9) {
		return getWordFromList(num);
	}

	// Handle teens (11-19) which have special forms in Persian
	if (num >= 11 && num <= 19) {
		return getWordFromList(num);
	}

	// Handle compound numbers (10, 20-99, 100-999)
	const remainder = num <= 99 ? num % 10 : num % 100;

	// If there's no remainder, return the exact word (e.g., 20, 100, 300)
	if (remainder === 0) {
		return getWordFromList(num);
	}

	// Build compound form: "base و remainder" (e.g., "بیست و سه")
	const baseNumber = num - remainder;
	const baseWord = getWordFromList(baseNumber);
	const remainderWord = transformSimpleNumber(remainder);

	return `${baseWord} و ${remainderWord}`;
}

/**
 * Transforms numbers >= 1000 into Persian words using place value decomposition
 *
 * @param num - Number >= 1000
 * @returns Persian word representation
 */
function transformLargeNumber(num: number): string {
	// Split number into groups of 3 digits using locale-safe formatting
	// Using "en-US" ensures consistent comma placement regardless of system locale
	const digitGroups = num.toLocaleString("en-US").split(",");

	// Convert each group to words with appropriate scale units
	const wordGroups = digitGroups
		.map((digitGroup, index) => {
			// Parse the current group of digits
			const groupValue = parseInt(digitGroup, 10);

			// Skip empty groups (groups with value 0)
			if (groupValue === 0) {
				return "";
			}

			// Convert the group value to words
			const groupWords = transformSimpleNumber(groupValue);

			// Calculate the scale (thousands, millions, etc.)
			const scaleExponent = (digitGroups.length - index - 1) * 3;
			const scaleUnit = getScaleUnit(scaleExponent);

			// Combine group words with scale unit
			return scaleUnit ? `${groupWords} ${scaleUnit}` : groupWords;
		})
		.filter((group) => group.length > 0); // Remove empty groups

	// Join all groups with Persian "and" conjunction
	return wordGroups.join(JOINERS[1]).trim();
}

/**
 * Retrieves a word from the Persian numbers word list
 *
 * @param num - Number to look up
 * @returns Persian word for the number, or empty string if not found
 */
function getWordFromList(num: number): string {
	// Use nullish coalescing to provide fallback for missing entries
	return PERSIAN_NUMBERS_IN_WORD_MAPPINGS.get(num) || "";
}

/**
 * Gets the scale unit name for a given number of zeros
 *
 * @param numberOfZeros - Number of trailing zeros (0, 3, 6, 9, etc.)
 * @returns Scale unit name ("هزار", "میلیون", etc.) or empty string for units
 *
 * @example
 * getScaleUnit(0) // "" (units)
 * getScaleUnit(3) // "هزار" (thousands)
 * getScaleUnit(6) // "میلیون" (millions)
 */
function getScaleUnit(numberOfZeros: number): string {
	// No scale unit needed for the units place
	if (numberOfZeros === 0) {
		return "";
	}

	// Generate the scale number (1000, 1000000, etc.)
	const scaleNumber = parseInt(`1${"0".repeat(numberOfZeros)}`, 10);

	// Look up the scale unit in the word list
	return getWordFromList(scaleNumber);
}

/**
 * Adds Persian negative prefix to a word
 *
 * @param words - Persian words to make negative
 * @returns Words with "منفی" prefix
 */
function addNegativePrefix(words: string): string {
	return `${PREFIXES[0]} ${words}`;
}
