import { addOrdinalSuffix } from "../addOrdinalSuffix/addOrdinalSuffix";
import { isNumber, isString } from "../../helpers/type-guards";

import { digitsFaToEn } from "../digits/converters/fa";
import { digitsArToEn } from "../digits/converters/ar";
// Errors
import { PersianToolsTypeError } from "../../helpers/errors";
// Constants
import { PERSIAN_NUMBERS_IN_WORD_MAPPINGS, PERSIAN_DECIMAL_SCALE_MAPPINGS } from "./constants";
import { JOINERS, PREFIXES } from "../wordsToNumber/constants";
// Types
import type { NumberToWordsOptions } from "./types";

interface NormalizedDecimal {
	isDecimal: true;
	isNegative: boolean;
	integerPart: number;
	fractionalValue: number;
	scaleExponent: number;
}

interface NormalizedInteger {
	isDecimal: false;
	isNegative: boolean;
	integerPart: number;
}

type NormalizedResult = NormalizedDecimal | NormalizedInteger | PersianToolsTypeError;

/**
 * Converts a numeric value to its Persian word representation
 *
 * @param numberValue - The number to convert (can be integer, float, or string with commas/decimals)
 * @param options - Configuration options for the conversion
 * @returns Persian word representation of the number or TypeError if invalid
 *
 * @example
 * numberToWords(123) // "صد و بیست و سه"
 * numberToWords("1,000") // "یک هزار"
 * numberToWords(3, { ordinal: true }) // "سوم"
 * numberToWords(5.3) // "پنج و سه دهم"
 * numberToWords("12.75") // "دوازده و هفتاد و پنج صدم"
 * numberToWords(0.5) // "پنج دهم"
 */
export function numberToWords(
	numberValue: number | string,
	options?: NumberToWordsOptions,
): string | PersianToolsTypeError {
	// Input validation and normalization
	const normalized = normalizeInput(numberValue);
	if (normalized instanceof PersianToolsTypeError) {
		return normalized;
	}

	// Extract options with defaults
	const isOrdinal = options?.ordinal ?? false;

	// Handle special case of integer zero
	if (!normalized.isDecimal && normalized.integerPart === 0) {
		return "صفر";
	}

	let persianWords: string;

	if (normalized.isDecimal) {
		persianWords = convertDecimalToWords(normalized, options);
	} else {
		persianWords = convertNumberToWords(normalized.integerPart);
	}

	// Apply a negative prefix if needed
	const finalWords = normalized.isNegative ? addNegativePrefix(persianWords) : persianWords;

	// Apply ordinal suffix if requested
	if (!isOrdinal) {
		return finalWords;
	}

	if (normalized.isDecimal && finalWords.endsWith("م")) {
		return `${finalWords}ین`;
	}

	return addOrdinalSuffix(finalWords);
}

/**
 * Validates and normalizes the input number or string (supporting decimals)
 *
 * @param input - Raw input value (number or string)
 * @returns Normalized representation or TypeError if invalid
 */
function normalizeInput(input: number | string): NormalizedResult {
	// Check for valid input types
	if (!isString(input) && !isNumber(input)) {
		return createValidationError("Input must be a number or string");
	}

	// Handle numeric inputs
	if (isNumber(input)) {
		if (Number.isNaN(input) || !Number.isFinite(input)) {
			return createValidationError("Number input must be a valid finite number");
		}

		if (Number.isSafeInteger(input)) {
			return {
				isDecimal: false,
				isNegative: input < 0,
				integerPart: Math.abs(input),
			};
		}

		return parseDecimalString(String(input));
	}

	// Handle string inputs (remove commas first)
	let cleanedInput = input.replace(/,\s?/g, "").trim();
	if (!cleanedInput) {
		return createValidationError("String input cannot be empty");
	}

	// Normalize Persian and Arabic digits to English digits
	cleanedInput = digitsFaToEn(cleanedInput);
	cleanedInput = digitsArToEn(cleanedInput);

	// Normalize Arabic decimal separator \u066B (٫) to dot (.)
	cleanedInput = cleanedInput.replace(/\u066B/g, ".");

	// If a single slash is used as decimal separator between digits (e.g. "5/3")
	if (/^-?\d+\/\d+$/.test(cleanedInput)) {
		cleanedInput = cleanedInput.replace("/", ".");
	}

	// Handle decimal string
	if (cleanedInput.includes(".")) {
		return parseDecimalString(cleanedInput);
	}

	const parsedNumber = Number(cleanedInput);

	// Validate integer string
	if (!Number.isSafeInteger(parsedNumber)) {
		return createValidationError("String input must represent a safe integer");
	}

	return {
		isDecimal: false,
		isNegative: parsedNumber < 0,
		integerPart: Math.abs(parsedNumber),
	};
}

/**
 * Parses a decimal string (e.g. "5.3", "-0.05") into a NormalizedResult
 */
function parseDecimalString(str: string): NormalizedResult {
	let isNegative = false;
	let s = str.trim();

	if (s.startsWith("-")) {
		isNegative = true;
		s = s.slice(1).trim();
	} else if (s.startsWith("+")) {
		s = s.slice(1).trim();
	}

	const parts = s.split(".");
	if (parts.length !== 2) {
		return createValidationError("String input must represent a valid number");
	}

	const [intPartStr, fracPartStr] = parts;
	if (!/^\d*$/.test(intPartStr) || !/^\d+$/.test(fracPartStr)) {
		return createValidationError("String input must represent a valid number");
	}

	const intVal = intPartStr === "" ? 0 : Number(intPartStr);
	if (!Number.isSafeInteger(intVal)) {
		return createValidationError("Integer part must be a safe integer");
	}

	// If fractional part is all zeros (e.g. "5.0", "5.00")
	const fracVal = parseInt(fracPartStr, 10);
	if (fracVal === 0) {
		return {
			isDecimal: false,
			isNegative,
			integerPart: intVal,
		};
	}

	const scaleExponent = fracPartStr.length;
	if (scaleExponent > 15) {
		return createValidationError("Decimal precision cannot exceed 15 places");
	}

	return {
		isDecimal: true,
		isNegative,
		integerPart: intVal,
		fractionalValue: fracVal,
		scaleExponent,
	};
}

/**
 * Converts a decimal representation to Persian words
 */
function convertDecimalToWords(decimal: NormalizedDecimal, options?: NumberToWordsOptions): string {
	const scaleUnit = PERSIAN_DECIMAL_SCALE_MAPPINGS.get(decimal.scaleExponent) || "";
	const fractionWords = convertNumberToWords(decimal.fractionalValue);
	const fractionWithScale = scaleUnit ? `${fractionWords} ${scaleUnit}` : fractionWords;

	// When integer part is 0 (e.g. 0.5 -> "پنج دهم" or "صفر و پنج دهم")
	if (decimal.integerPart === 0) {
		if (options?.includeZero) {
			return `صفر و ${fractionWithScale}`;
		}
		return fractionWithScale;
	}

	const integerWords = convertNumberToWords(decimal.integerPart);
	return `${integerWords} و ${fractionWithScale}`;
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
