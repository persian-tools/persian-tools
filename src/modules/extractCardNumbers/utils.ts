// Constants
import { acceptableKeywords } from "./constants";
// Types
import type { TextChunkConfig, FuzzyMatchingConfig } from "./types";

/**
 * Clean card number by removing acceptable separators
 * @since 1.5.0 Basic separator removal functionality
 * @since 5.0.0 separator support and performance optimization
 */
export function cleanCardNumber(cardNumber: string): string {
	return cardNumber.replace(acceptableKeywords, "");
}

/**
 * Get optimal chunk configuration based on text size
 * @since 5.0.0 Performance optimization for large text processing
 */
export function getOptimalChunkConfig(textLength: number): TextChunkConfig {
	if (textLength < 1000) {
		return { chunkSize: textLength, overlap: 0, maxChunks: 1 };
	} else if (textLength < 10000) {
		const chunkSize = 2000;
		const overlap = 50;
		const neededChunks = Math.ceil(textLength / (chunkSize - overlap)) + 1;
		return { chunkSize, overlap, maxChunks: neededChunks };
	} else if (textLength < 100000) {
		const chunkSize = 5000;
		const overlap = 100;
		const neededChunks = Math.ceil(textLength / (chunkSize - overlap)) + 1;
		return { chunkSize, overlap, maxChunks: neededChunks };
	} else {
		const chunkSize = 10000;
		const overlap = 200;
		const neededChunks = Math.ceil(textLength / (chunkSize - overlap)) + 1;
		return { chunkSize, overlap, maxChunks: neededChunks };
	}
}

/**
 * Split large text into manageable chunks with overlap
 * @since 5.0.0 Large text processing optimization with intelligent chunking
 */
export function splitTextIntoChunks(text: string, config: TextChunkConfig): string[] {
	const chunks: string[] = [];
	const { chunkSize, overlap, maxChunks } = config;

	for (let i = 0; i < text.length && chunks.length < maxChunks; i += chunkSize - overlap) {
		const end = Math.min(i + chunkSize, text.length);
		chunks.push(text.slice(i, end));

		if (end >= text.length) break;
	}

	return chunks;
}

/**
 * Extract context around a match
 * @since 5.0.0 Context extraction feature for enhanced card number analysis
 */
export function extractContext(
	text: string,
	startIndex: number,
	endIndex: number,
	contextLength: number = 20,
): {
	before: string;
	after: string;
	full: string;
} {
	const beforeStart = Math.max(0, startIndex - contextLength);
	const afterEnd = Math.min(text.length, endIndex + contextLength);

	const before = text.slice(beforeStart, startIndex);
	const after = text.slice(endIndex, afterEnd);
	const full = text.slice(beforeStart, afterEnd);

	return { before, after, full };
}

/**
 * Validate card number format (basic length and digit check)
 * @since 1.5.0 Basic format validation
 * @since 5.0.0 validation with improved accuracy
 */
export function isValidCardNumberFormat(cardNumber: string): boolean {
	const cleaned = cleanCardNumber(cardNumber);
	return /^\d{16}$/.test(cleaned);
}

/**
 * Check if fuzzy matching should be applied
 * @since 5.0.0 Fuzzy matching configuration and logic
 */
export function shouldUseFuzzyMatching(text: string, config: FuzzyMatchingConfig): boolean {
	if (!config.allowMaskedDigits) return false;

	const maskedCount = (text.match(config.maskPattern) || []).length;
	return maskedCount > 0 && maskedCount <= config.maxMaskedDigits;
}

/**
 * Detect if a text is likely to contain card numbers (quick pre-check)
 * @since 5.0.0 Performance optimization with quick pre-filtering
 */
export function quickCardNumberCheck(text: string): boolean {
	// Quick check for potential card number patterns
	return /[\u06F0-\u06F9\u0660-\u06690-9]{4}/.test(text);
}

/**
 * Remove duplicate card numbers from results
 * @since 5.0.0 Automatic duplicate removal for cleaner results
 */
export function removeDuplicateCardNumbers<T extends { pure: string; base: string }>(cards: T[]): T[] {
	const seen = new Set<string>();
	return cards.filter((card) => {
		const key = `${card.pure}|${card.base}`;
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
}

/**
 * Sort card numbers by their position in text
 * @since 5.0.0 Automatic sorting by position for consistent result ordering
 */
export function sortCardNumbersByPosition<T extends { startIndex: number }>(cards: T[]): T[] {
	return cards.sort((a, b) => a.startIndex - b.startIndex);
}
