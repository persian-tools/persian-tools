/**
 * Base interface for extracted card number result
 */
export interface ExtractCardNumberBase {
	/** 1-based index of the card number in the text */
	index: number;
	/** Original matched text as found in the input */
	base: string;
	/** Cleaned card number with digits normalized to English */
	pure: string;
	/** Start position of the match in the original text */
	startIndex: number;
	/** End position of the match in the original text */
	endIndex: number;
}

/**
 * Result when validation is enabled
 */
export interface ExtractCardNumberWithValidation extends ExtractCardNumberBase {
	/** Whether the card number passes Luhn validation */
	isValid: boolean;
}

/**
 * Result when bank detection is enabled
 */
export interface ExtractCardNumberWithBank extends ExtractCardNumberBase {
	/** Name of the Iranian bank if detected */
	bankName: string | null;
}

/**
 * Result when includeContext is enabled
 */
export interface ExtractCardNumberWithContext extends ExtractCardNumberBase {
	/** Context information around the card number match */
	context: CardNumberContext | null;
}

/**
 * Result when both validation and bank detection are enabled
 */
export interface ExtractCardNumberComplete extends ExtractCardNumberWithValidation, ExtractCardNumberWithBank {}

/**
 * Base options for card number extraction
 */
export interface ExtractCardNumberOptionsBase {
	/** Enable Luhn algorithm validation (default: true) */
	checkValidation?: boolean;
	/** Detect Iranian bank name from card number (default: false) */
	detectBankNumber?: boolean;
	/** Filter out invalid card numbers when validation is enabled (default: true) */
	filterValidCardNumbers?: boolean;
	/** Maximum number of card numbers to extract (default: unlimited) */
	maxResults?: number;
	/** Enable performance optimizations for large texts (default: auto-detect) */
	optimizeForLargeText?: boolean;
	/** Enable fuzzy matching for partially obscured numbers (default: false) */
	enableFuzzyMatching?: boolean;
	/** Include context around found card numbers (default: false) */
	includeContext?: boolean;
	/** Number of characters to include as context (default: 20) */
	contextLength?: number;
}

/**
 * Options when validation is explicitly enabled
 */
export interface ExtractCardNumberOptionsWithValidation extends ExtractCardNumberOptionsBase {
	checkValidation: true;
}

/**
 * Options when validation is explicitly disabled
 */
export interface ExtractCardNumberOptionsWithoutValidation extends ExtractCardNumberOptionsBase {
	checkValidation: false;
}

/**
 * Options when bank detection is explicitly enabled
 */
export interface ExtractCardNumberOptionsWithBank extends ExtractCardNumberOptionsBase {
	detectBankNumber: true;
}

/**
 * Options when bank detection is explicitly disabled
 */
export interface ExtractCardNumberOptionsWithoutBank extends ExtractCardNumberOptionsBase {
	detectBankNumber: false;
}

/**
 * Options when context inclusion is explicitly enabled
 */
export interface ExtractCardNumberOptionsWithContext extends ExtractCardNumberOptionsBase {
	includeContext: true;
}

/**
 * Options when context inclusion is explicitly disabled
 */
export interface ExtractCardNumberOptionsWithoutContext extends ExtractCardNumberOptionsBase {
	includeContext: false;
}

/**
 * Legacy options type for backward compatibility
 */
export type ExtractCardNumberOptions = ExtractCardNumberOptionsBase;

/**
 * Union type for all possible result types
 */
export type ExtractCardNumber =
	| ExtractCardNumberBase
	| ExtractCardNumberWithValidation
	| ExtractCardNumberWithBank
	| ExtractCardNumberWithContext
	| ExtractCardNumberComplete;

/**
 * Context information around a card number match
 */
export interface CardNumberContext {
	/** Text before the card number */
	before: string;
	/** Text after the card number */
	after: string;
	/** Full context string */
	full: string;
}

/**
 * Configuration for text processing chunks
 */
export interface TextChunkConfig {
	/** Size of each chunk in characters */
	chunkSize: number;
	/** Overlap between chunks to catch split card numbers */
	overlap: number;
	/** Maximum number of chunks to process */
	maxChunks: number;
}

/**
 * Fuzzy matching configuration
 */
export interface FuzzyMatchingConfig {
	/** Allow masked digits (*, X, etc.) */
	allowMaskedDigits: boolean;
	/** Maximum number of allowed masked digits */
	maxMaskedDigits: number;
	/** Pattern for masked digits */
	maskPattern: RegExp;
}
