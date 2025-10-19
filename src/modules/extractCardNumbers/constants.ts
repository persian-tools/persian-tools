// Types
import type { FuzzyMatchingConfig } from "./types";

/**
 * regex for card number extraction with support for various formats
 * Supports Persian/Farsi digits, Arabic digits, and various separators
 * @since 1.5.0 Basic card number extraction
 * @since 5.0.0 multi-format support with performance optimizations
 */
const DIG = "0-9\\u06F0-\\u06F9\\u0660-\\u0669";
const SEP = "\\s_.\\*\\-";
export const cardNumberRegex: RegExp = new RegExp(`([${DIG}](?:[${SEP}]*[${DIG}]){15})`, "gim");

/**
 * More precise regex for exactly 16-digit card numbers
 * @since 5.0.0 precision matching for exact card number lengths
 */
export const exactCardNumberRegex: RegExp = new RegExp(`\\b([${DIG}](?:[${SEP}]*[${DIG}]){15})\\b`, "g");

/**
 * Regex for fuzzy matching with masked digits
 * @since 5.0.0 Fuzzy matching support for partially obscured card numbers
 */
const DIG_OR_MASK = "0-9\\u06F0-\\u06F9\\u0660-\\u0669*X#";
export const fuzzyCardNumberRegex: RegExp = new RegExp(`([${DIG_OR_MASK}](?:[${SEP}]*[${DIG_OR_MASK}]){15})`, "gim");

/**
 * Acceptable keywords/separators between card number digits
 * @since 1.5.0 Basic separator support
 * @since 5.0.0 separator patterns including dots and asterisks
 */
export const acceptableKeywords: RegExp = /[\s\-_.*]/g;

/**
 * Pattern for masked digits in fuzzy matching
 * @since 5.0.0 Support for masked/hidden digits in card numbers (*, X, #)
 */
export const maskedDigitPattern: RegExp = /[*X#]/g;

/**
 * Default fuzzy matching configuration
 * @since 5.0.0 Configurable fuzzy matching with sensible defaults
 */
export const defaultFuzzyConfig: FuzzyMatchingConfig = {
	allowMaskedDigits: true,
	maxMaskedDigits: 4,
	maskPattern: maskedDigitPattern,
};

/**
 * Performance thresholds for optimization decisions
 * @since 5.0.0 Performance optimization thresholds for different text sizes
 */
export const performanceThresholds = {
	SMALL_TEXT: 1000,
	MEDIUM_TEXT: 10000,
	LARGE_TEXT: 100000,
	HUGE_TEXT: 1000000,
} as const;
