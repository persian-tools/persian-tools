// <Reference path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

import { fuzzy } from "./fuzzy";
import { addCommas } from "../commas";
import { replaceArray } from "../../helpers";
import { autoArabicToPersian } from "../isPersian";
import { removeOrdinalSuffix } from "../removeOrdinalSuffix";
import { autoConvertDigitsToEN, digitsEnToAr, digitsEnToFa } from "../digits";
// Constants
import { UNITS, TEN, MAGNITUDE, TYPO_LIST, JOINERS, PREFIXES } from "./constants";

/**
 * **Tokenize** the provided `words` string into Persian number parts.
 *
 * **Steps**:
 * - **Replace** known Persian typos using `replaceArray(words, TYPO_LIST)`.
 * - **Split** on whitespace.
 * - **Filter out** any tokens that match `JOINERS[0]`.
 *
 * @param words - The raw Persian words to tokenize.
 * @returns An array of string tokens representing numbers/words.
 */
function tokenize(words: string): string[] {
	// **Apply** typo replacements (e.g., `("سیصت", "سیصد")`).
	const replaced: string = replaceArray(words, TYPO_LIST);

	// **Split** on space, filter out empty or joiner tokens (e.g., "و").
	const splitWords: string[] = replaced.split(" ");
	const result: string[] = [];

	for (const word of splitWords) {
		// **Ignore** if this token is exactly the Persian joiner in JOINERS
		if (word === JOINERS[0]) {
			continue;
		}
		result.push(word);
	}
	return result;
}

/**
 * **Compute** the numeric value of an array of tokens.
 *
 * **New Approach** to handle multi-level magnitudes correctly:
 * - We keep a **`group`** accumulator for partial sums (e.g. "دویست" => 200).
 * - When we see a magnitude word (e.g. "هزار"), we do:
 *   1) `group = (group === 0 ? 1 : group) * MAGNITUDE[...]`
 *   2) Add that to `sum`
 *   3) Reset `group = 0`
 * - If the token is a base word (`UNITS`, `TEN`), or a numeric string, we **add** it to `group`.
 * - In the end, we add any leftover `group` to `sum`.
 * - If `sum` is zero, we ensure we don't return `-0`.
 *
 * This logic ensures phrases like **"یک میلیون و دویست هزار"** parse as **1,200,000**,
 * instead of 1,000,200,000.
 *
 * @param tokens - The array of Persian string tokens from `tokenize`.
 * @returns The total numeric value, applying negative sign if needed.
 */
function compute(tokens: string[]): number {
	let sum = 0;
	let group = 0;
	let isNegative = false;

	for (const originalToken of tokens) {
		// **1) Ordinal removal** so "دهم" -> "ده", "بیستم" -> "بیست", etc. (if applicable)
		let token = removeOrdinalSuffix(autoConvertDigitsToEN(originalToken) ?? "");

		// **2) Remove** any commas or other separators from the token
		token = token.replace(/[٬،,]/g, "");

		// **Check** if this token is the negative prefix "منفی".
		if (token === PREFIXES[0]) {
			isNegative = true;
			continue;
		}

		// **Check** if token is in the UNITS dictionary.
		if (UNITS.has(token)) {
			group += UNITS.get(token)!;
			continue;
		}

		// **Check** if token is in the TEN dictionary (e.g., "بیست", "سی", etc.).
		if (TEN.has(token)) {
			group += TEN.get(token)!;
			continue;
		}

		// **Check** if token is a direct numeric string.
		if (!Number.isNaN(Number(token))) {
			group += parseInt(token, 10);
			continue;
		}

		// **Otherwise**, assume it's a magnitude (e.g., "هزار" => 1000, "میلیون" => 1000000).
		const magnitudeValue: number | undefined = MAGNITUDE.get(token);
		if (magnitudeValue !== undefined) {
			// If group == 0, treat it as 1. E.g., "هزار" => 1*1000 => 1000
			group = (group === 0 ? 1 : group) * magnitudeValue;

			// Add the group's chunk to total sum, reset group
			sum += group;
			group = 0;
		}
	}

	// **Add** any leftover group to sum
	sum += group;

	// **Avoid** returning -0
	if (sum === 0) {
		isNegative = false;
	}

	return isNegative ? -sum : sum;
}

/**
 * **Converts Persian words** (e.g., "سیصد و پنجاه هزار") **into a number**.
 * - Optionally **fixes** fuzzy typos.
 * - **Removes** ordinal suffixes (like "یکم") before parsing.
 * - **Applies** comma formatting and digit conversion (fa/ar/en).
 *
 * @param words - Persian string describing a number (e.g., "منفی سیصد و دوازده هزار").
 * @param config - Options controlling digit style, commas, and fuzzy replacement.
 * @returns The converted result as either a string or number, depending on options/digits.
 *
 * @example
 * ```ts
 *   // "سه صد و پنجاه" => 350
 *   wordsToNumber("سه صد و پنجاه"); // 350
 *
 *   // Negative example
 *   wordsToNumber("منفی سه صد و پنجاه"); // -350
 *
 *   // With commas and Arabic digits
 *   wordsToNumber("یک میلیون و پانصد هزار", { digits: "ar", addCommas: true });
 *   // => "١,٥٠٠,٠٠٠"
 * ```
 */
export function wordsToNumber<TResult extends string | number>(
	words: string,
	config: WordsToNumberOptions = {},
): TResult {
	// **Early return** if no input is provided
	if (!words) {
		return "" as TResult;
	}

	// **Optionally** convert Arabic and Persian digits to English
	if (config.autoConvertDigitsToEn) {
		words = autoConvertDigitsToEN(words);
	}

	// **Optionally** convert Arabic characters to Persian
	if (config.autoConvertArabicCharsToPersian) {
		words = autoArabicToPersian(words);
	}

	// **Remove ordinal suffixes** (e.g., "یکم" => "یک") before processing
	const withoutOrdinal = removeOrdinalSuffix(words) ?? "";

	// **Optionally apply** fuzzy replacements if `fuzzy` is enabled
	const finalText: string = config.fuzzy ? (fuzzy(withoutOrdinal) ?? "") : withoutOrdinal;

	// **Compute** the numeric value from the tokenized final text
	const numericValue: number = compute(tokenize(finalText));

	// **Add commas** if requested
	const withCommas = config.addCommas ? addCommas(numericValue) : numericValue;

	// **Convert digits** if requested: "fa" => Persian, "ar" => Arabic, "en" => English (default)
	let finalOutput: string | number;
	if (config.digits === "fa") {
		// Convert entire string/number to Persian digits
		finalOutput = digitsEnToFa(withCommas);
	} else if (config.digits === "ar") {
		// Convert entire string/number to Arabic digits
		finalOutput = digitsEnToAr(withCommas);
	} else {
		// No digit conversion, so keep it as numeric or string with commas
		finalOutput = withCommas;
	}

	// **Return** the final output cast to `TResult`, ensuring compliance with the function signature
	return finalOutput as TResult;
}

/**
 * **Configuration** for `wordsToNumber`.
 *
 * @property digits
 *   - **Converts** the numeric result to a particular digit style:
 *     - `"en"` for English digits (e.g., "1234")
 *     - `"fa"` for Persian digits (e.g., "۱۲۳۴")
 *     - `"ar"` for Arabic digits (e.g., "١٢٣٤")
 *
 * @property addCommas
 *   - **Inserts** thousands separators into the numeric output (e.g., 350000 -> "350,000").
 *
 * @property fuzzy
 *   - **Enables** fuzzy Persian typo fixer before parsing. If `true`, the input text
 *     will pass through `fuzzy(...)`.
 *  - **Default**: `false`
 * @property autoConvertDigitsToEn
 * 	- **Automatically** converts Arabic and Persian digits to English digits before parsing.
 * 	- **Default**: `false`
 * @property autoConvertArabicCharsToPersian
 * 	- **Automatically** converts Arabic characters to Persian characters before parsing.
 * 	- **Default**: `false`
 */
export interface WordsToNumberOptions {
	digits?: "en" | "fa" | "ar";
	addCommas?: boolean;
	fuzzy?: boolean;
	autoConvertDigitsToEn?: boolean;
	autoConvertArabicCharsToPersian?: boolean;
}
