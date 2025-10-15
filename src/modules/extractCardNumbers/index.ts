import { isString } from "../../helpers";
import { digitsArToEn, digitsFaToEn } from "../digits";
import { verifyCardNumber } from "../verifyCardNumber";
import { getBankNameFromCardNumber } from "../getBankNameFromCardNumber";
import {
	cleanCardNumber,
	extractContext,
	splitTextIntoChunks,
	quickCardNumberCheck,
	getOptimalChunkConfig,
	shouldUseFuzzyMatching,
	isValidCardNumberFormat,
	sortCardNumbersByPosition,
	removeDuplicateCardNumbers,
} from "./utils";
// Constants
import { cardNumberRegex, defaultFuzzyConfig, fuzzyCardNumberRegex, performanceThresholds } from "./constants";
// Types
import type {
	ExtractCardNumber,
	ExtractCardNumberBase,
	ExtractCardNumberComplete,
	ExtractCardNumberOptions,
	ExtractCardNumberOptionsWithBank,
	ExtractCardNumberOptionsWithoutBank,
	ExtractCardNumberOptionsWithContext,
	ExtractCardNumberOptionsWithoutValidation,
	ExtractCardNumberOptionsWithValidation,
	ExtractCardNumberWithBank,
	ExtractCardNumberWithContext,
	ExtractCardNumberWithValidation,
} from "./types";

/**
 * Extract card numbers with validation enabled and bank detection enabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithValidation & ExtractCardNumberOptionsWithBank,
): ExtractCardNumberComplete[];

/**
 * Extract card numbers with validation enabled and bank detection disabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithValidation & ExtractCardNumberOptionsWithoutBank,
): ExtractCardNumberWithValidation[];

/**
 * Extract card numbers with validation disabled and bank detection enabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithoutValidation & ExtractCardNumberOptionsWithBank,
): ExtractCardNumberWithBank[];

/**
 * Extract card numbers with validation disabled and bank detection disabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithoutValidation & ExtractCardNumberOptionsWithoutBank,
): ExtractCardNumberBase[];

/**
 * Extract card numbers with context inclusion enabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithContext &
		ExtractCardNumberOptionsWithoutValidation &
		ExtractCardNumberOptionsWithoutBank,
): ExtractCardNumberWithContext[];

/**
 * Extract card numbers with context and validation enabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithContext &
		ExtractCardNumberOptionsWithValidation &
		ExtractCardNumberOptionsWithoutBank,
): ExtractCardNumberWithValidation[];

/**
 * Extract card numbers with context and bank detection enabled
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptionsWithContext &
		ExtractCardNumberOptionsWithoutValidation &
		ExtractCardNumberOptionsWithBank,
): ExtractCardNumberWithBank[];

/**
 * Extract card numbers with default options (backward compatibility)
 */
export function extractCardNumber(str: string, options?: ExtractCardNumberOptions): ExtractCardNumber[];

/**
 * Iranian Bank card number extraction with performance optimizations
 * and comprehensive type safety through function overloads
 *
 * @category Bank account
 * @public
 * @since 1.5.0 Basic card number extraction functionality
 * @since 5.0.0 with TypeScript function overloads, performance optimizations for large texts, fuzzy matching, context extraction, and comprehensive validation
 * @param str - Input text to extract card numbers from
 * @param options - Extraction options with type-safe overloads
 * @return Typed array of extracted card numbers based on options
 *
 * @example
 * ```typescript
 * // Basic extraction with validation
 * const cards = extractCardNumber("Card: 6037701689095443", {
 *   checkValidation: true,
 *   detectBankNumber: true
 * });
 *
 * // Large text optimization
 * const largeTextCards = extractCardNumber(hugeDocument, {
 *   optimizeForLargeText: true,
 *   maxResults: 10
 * });
 *
 * // Fuzzy matching for masked cards
 * const maskedCards = extractCardNumber("Card: 6037-****-8909-5443", {
 *   enableFuzzyMatching: true
 * });
 * ```
 */
export function extractCardNumber(
	str: string,
	options: ExtractCardNumberOptions = {
		checkValidation: true,
		detectBankNumber: false,
		filterValidCardNumbers: true,
	},
): ExtractCardNumber[] {
	// Input validation and early returns
	if (!str || !isString(str)) {
		return [];
	}

	// Quick pre-check for performance
	if (!quickCardNumberCheck(str)) {
		return [];
	}

	// Determine a processing strategy based on text length
	const textLength = str.length;
	const shouldOptimize = options.optimizeForLargeText ?? textLength > performanceThresholds.MEDIUM_TEXT;

	let results: ExtractCardNumber[];

	if (shouldOptimize && textLength > performanceThresholds.LARGE_TEXT) {
		results = extractFromLargeText(str, options);
	} else {
		results = extractFromText(str, options);
	}

	// Apply global filters and optimizations
	if (results.length > 0) {
		// Remove duplicates
		results = removeDuplicateCardNumbers(results);

		// Sort by position
		results = sortCardNumbersByPosition(results);

		// Apply result limit
		if (options.maxResults && results.length > options.maxResults) {
			results = results.slice(0, options.maxResults);
		}
	}

	return results;
}

/**
 * Extract card numbers from regular-sized text
 */
function extractFromText(str: string, options: ExtractCardNumberOptions): ExtractCardNumber[] {
	// Choose the appropriate regex based on options
	const regex = options.enableFuzzyMatching ? fuzzyCardNumberRegex : cardNumberRegex;

	// Reset regex state
	regex.lastIndex = 0;

	const results: ExtractCardNumber[] = [];
	let match: RegExpExecArray | null;
	let index = 0;

	// Use exec for better performance and position tracking
	while ((match = regex.exec(str)) !== null && (!options.maxResults || results.length < options.maxResults)) {
		const matchedCardNumber = match[0];
		const startIndex = match.index;
		const endIndex = match.index + matchedCardNumber.length;

		const processedResult = processCardNumberMatch(matchedCardNumber, ++index, startIndex, endIndex, str, options);

		if (processedResult) {
			// Apply validation filter early if enabled
			if (options.filterValidCardNumbers && options.checkValidation) {
				if ("isValid" in processedResult && processedResult.isValid) {
					results.push(processedResult);
				}
			} else {
				results.push(processedResult);
			}
		}

		// Prevent infinite loops with global regex
		if (regex.lastIndex === match.index) {
			regex.lastIndex++;
		}
	}

	return results;
}

/**
 * Extract card numbers from large text using a chunking strategy
 */
function extractFromLargeText(str: string, options: ExtractCardNumberOptions): ExtractCardNumber[] {
	const chunkConfig = getOptimalChunkConfig(str.length);
	const chunks = splitTextIntoChunks(str, chunkConfig);

	const results: ExtractCardNumber[] = [];
	let globalIndex = 0;
	let processedLength = 0;

	for (const chunk of chunks) {
		if (options.maxResults && results.length >= options.maxResults) {
			break;
		}

		const chunkResults = extractFromText(chunk, {
			...options,
			maxResults: options.maxResults ? options.maxResults - results.length : undefined,
		});

		// Adjust indices for global text position
		chunkResults.forEach((result) => {
			result.index = ++globalIndex;
			result.startIndex += processedLength;
			result.endIndex += processedLength;

			results.push(result);
		});

		processedLength += chunk.length - chunkConfig.overlap;
	}

	return results;
}

/**
 * Process a single card number match
 */
function processCardNumberMatch(
	matchedCardNumber: string,
	index: number,
	startIndex: number,
	endIndex: number,
	originalText: string,
	options: ExtractCardNumberOptions,
): ExtractCardNumber | null {
	// Clean and normalize the card number
	// Trim leading/trailing acceptable separators from raw match for accurate base and indices
	let base = matchedCardNumber;
	const leadingSep = base.match(/^[\s_.\*\-]+/);
	const trailingSep = base.match(/[\s_.\*\-]+$/);
	const leadingLen = leadingSep ? leadingSep[0].length : 0;
	const trailingLen = trailingSep ? trailingSep[0].length : 0;
	if (leadingLen || trailingLen) {
		startIndex += leadingLen;
		endIndex -= trailingLen;
		base = base.slice(leadingLen, base.length - trailingLen);
	}
	let cardNumber = cleanCardNumber(base);

	// Handle fuzzy matching
	if (options.enableFuzzyMatching && shouldUseFuzzyMatching(cardNumber, defaultFuzzyConfig)) {
		// For fuzzy matching, we might want to skip incomplete numbers
		const digitCount = (cardNumber.match(/\d/g) || []).length;
		if (digitCount < 12) {
			// Minimum viable card number digits
			return null;
		}
	}

	// Normalize digits to English (apply both conversions safely)
	cardNumber = digitsFaToEn(cardNumber) as string;
	cardNumber = digitsArToEn(cardNumber) as string;

	// Basic format validation
	if (!options.enableFuzzyMatching && !isValidCardNumberFormat(cardNumber)) {
		return null;
	}

	// Create a base result object
	const result: ExtractCardNumber = {
		index,
		base,
		pure: cardNumber,
		startIndex,
		endIndex,
	} as ExtractCardNumber;

	// Add validation if requested
	if (options.checkValidation) {
		(result as ExtractCardNumberWithValidation).isValid = verifyCardNumber(cardNumber) || false;
	}

	// Add bank detection if requested
	if (options.detectBankNumber) {
		try {
			(result as ExtractCardNumberWithBank).bankName = getBankNameFromCardNumber(cardNumber)!;
		} catch {
			(result as ExtractCardNumberWithBank).bankName = null;
		}
	}

	// Add context if requested
	if (options.includeContext) {
		const contextLength = options.contextLength || 20;
		(result as ExtractCardNumberWithContext).context = extractContext(
			originalText,
			startIndex,
			endIndex,
			contextLength,
		);
	}

	return result;
}

export * from "./types";
export * from "./utils";
export * from "./constants";
