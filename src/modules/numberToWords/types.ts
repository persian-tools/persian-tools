/**
 * Options interface for configuring number to words conversion
 */
export interface NumberToWordsOptions {
	/** Convert the result to ordinal form (e.g., "سوم" instead of "سه") */
	ordinal?: boolean;
	/**
	 * Whether to include "صفر و" when converting decimal numbers between -1 and 1 (exclusive of 0).
	 * @default false
	 * @example
	 * numberToWords(0.5) // "پنج دهم"
	 * numberToWords(0.5, { includeZero: true }) // "صفر و پنج دهم"
	 */
	includeZero?: boolean;
}
