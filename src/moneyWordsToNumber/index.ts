import { isString } from "../helpers";
import { wordsToNumber } from "../modules/wordsToNumber";
import { autoArabicToPersian } from "../modules/isPersian";
import { autoConvertDigitsToEN } from "../modules/digits";
import { CURRENCY_UNITS, CURRENCY_MULTIPLIERS, COLLOQUIAL_MULTIPLIERS, CURRENCY_PATTERN } from "./constants";

/**
 * **Configuration options** for `moneyWordsToNumber`
 *
 * @property formal - Whether to use formal mode (true) or colloquial/regular mode (false)
 *   - **Formal**: "یک تومان" = 1 toman (literal interpretation)
 *   - **Colloquial**: "یک تومن" = 1,000 tomans (multiplier applied to numbers < 1000)
 *   - **Note**: Numbers >= 1000 are not multiplied in colloquial mode
 *   - **Default**: `false` (colloquial mode)
 *
 * @property from - The source currency unit in the input text
 *   - **Default**: Auto-detected from the input text
 *
 * @property to - The target currency unit for the output number
 *   - **Default**: Same as `from` (no conversion)
 *
 * @property fuzzy - Enable fuzzy typo correction for Persian text
 *   - **Default**: `false`
 *
 * @property autoConvertDigitsToEn - Automatically convert Persian/Arabic digits to English
 *   - **Default**: `true`
 *
 * @property autoConvertArabicCharsToPersian - Automatically convert Arabic chars to Persian
 *   - **Default**: `true`
 */
export interface MoneyWordsToNumberOptions {
	formal?: boolean;
	from?: "toman" | "rial";
	to?: "toman" | "rial";
	fuzzy?: boolean;
	autoConvertDigitsToEn?: boolean;
	autoConvertArabicCharsToPersian?: boolean;
}

/**
 * **Detects the currency unit** from Persian money text
 *
 * Searches for currency keywords (تومان, تومن, ریال, etc.) in the text
 * and returns the detected currency type.
 *
 * @param text - The Persian money text to analyze
 * @returns The detected currency unit, or undefined if no currency found
 *
 * @example
 * ```ts
 * detectCurrency("یک تومن"); // "toman"
 * detectCurrency("صد ریال"); // "rial"
 * detectCurrency("یک هزار"); // undefined
 * ```
 */
function detectCurrency(text: string): "toman" | "rial" | undefined {
	const matches = text.match(CURRENCY_PATTERN);
	if (!matches || matches.length === 0) {
		return undefined;
	}

	// Return the first matched currency unit
	const firstMatch = matches[0];
	return CURRENCY_UNITS.get(firstMatch);
}

/**
 * **Removes currency units** from the text, leaving only the number of words
 *
 * This function strips out currency keywords (تومان, ریال, etc.) so that
 * 'wordsToNumber' can parse the remaining text.
 *
 * @param text - The Persian money text
 * @returns Text with currency units removed
 *
 * @example
 * ```ts
 * removeCurrencyUnits("یک تومن"); // "یک"
 * removeCurrencyUnits("صد هزار ریال"); // "صد هزار"
 * ```
 */
function removeCurrencyUnits(text: string): string {
	return text.replace(CURRENCY_PATTERN, "").trim();
}

/**
 * **Converts Persian money words to a number**
 *
 * This function parses Persian text describing money amounts and converts it to a numeric value.
 * It supports both formal and colloquial Persian money expressions.
 *
 * **Colloquial Mode** (default):
 * In everyday Persian speech, people often use an implicit multiplier for simple numbers (< 1000).
 * - "یک تومن" typically means 1,000 tomans (not 1 toman)
 * - "صد تومن" means 100,000 tomans (not 100 tomans)
 * - "یک هزار تومان" means 1,000 tomans (no multiplier, already has magnitude word "هزار")
 * - "یک میلیون تومان" means 1,000,000 tomans (no multiplier, already has "میلیون")
 *
 * **Formal Mode**:
 * Uses literal interpretation without multipliers.
 * - "یک تومان" = 1 toman
 * - "صد تومان" = 100 tomans
 * - "یک هزار تومان" = 1,000 tomans
 *
 * **Currency Conversion**:
 * - Supports conversion between Toman and Rial (1 Toman = 10 Rials)
 * - Auto-detects currency from text if not specified
 * - Can output in different currency than input
 *
 * @param moneyWords - Persian text describing a money amount (e.g., "صد تومن", "یک میلیون ریال")
 * @param options - Configuration options for parsing and conversion
 * @returns The numeric value of the money amount
 *
 * @example
 * ```ts
 * // Colloquial mode (default) - simple numbers are multiplied by 1000
 * moneyWordsToNumber("یک تومن"); // 1000
 * moneyWordsToNumber("صد تومن"); // 100000
 *
 * // Numbers with magnitude words (هزار, میلیون) are not multiplied
 * moneyWordsToNumber("یک هزار تومان"); // 1000
 * moneyWordsToNumber("سه میلیون تومان"); // 3000000
 *
 * // Formal mode - literal interpretation
 * moneyWordsToNumber("یک تومان", { formal: true }); // 1
 * moneyWordsToNumber("صد تومان", { formal: true }); // 100
 * moneyWordsToNumber("یک هزار تومان", { formal: true }); // 1000
 *
 * // Currency conversion - Toman to Rial
 * moneyWordsToNumber("یک تومن", { to: "rial" }); // 10000 (1000 tomans * 10)
 * ```
 */
export function moneyWordsToNumber(moneyWords: string, options: MoneyWordsToNumberOptions = {}): number {
	// **Default options**
	const {
		formal = false,
		from,
		to,
		fuzzy = false,
		autoConvertDigitsToEn = true,
		autoConvertArabicCharsToPersian = true,
	} = options;

	// **Early return** for empty input
	if (!isString(moneyWords)) {
		return 0;
	}

	// **Normalize** the input text
	let normalizedText = moneyWords.trim();

	// **Replace multiple spaces** with a single space
	normalizedText = normalizedText.replace(/\s+/g, " ");

	// **Normalize common number patterns** that are written with spaces
	// "پنج صد" → "پانصد", "سه صد" → "سیصد", etc.
	normalizedText = normalizedText
		.replace(/پنج\s+صد/g, "پانصد")
		.replace(/سه\s+صد/g, "سیصد")
		.replace(/چهار\s+صد/g, "چهارصد")
		.replace(/شش\s+صد/g, "ششصد")
		.replace(/شیش\s+صد/g, "ششصد")
		.replace(/هفت\s+صد/g, "هفتصد")
		.replace(/هشت\s+صد/g, "هشتصد")
		.replace(/نه\s+صد/g, "نهصد");

	// **Auto-convert** Arabic characters to Persian if enabled
	if (autoConvertArabicCharsToPersian) {
		normalizedText = autoArabicToPersian(normalizedText);
	}

	// **Auto-convert** digits to English if enabled
	if (autoConvertDigitsToEn) {
		normalizedText = autoConvertDigitsToEN(normalizedText);
	}

	// **Detect** currency unit from the text (if not explicitly provided)
	const detectedCurrency = from ?? detectCurrency(normalizedText);

	// **Remove** currency units from text to get pure number words
	const numberWords = removeCurrencyUnits(normalizedText);

	// **If no number of words remains**, return 0
	if (!numberWords) {
		return 0;
	}

	// **Parse** the number of words using the base wordsToNumber function
	let numericValue = wordsToNumber(numberWords, {
		fuzzy,
		autoConvertDigitsToEn,
		autoConvertArabicCharsToPersian,
	});

	// **Apply colloquial multiplier** if in regular/colloquial mode
	// In colloquial Persian, "یک تومن" means 1,000 tomans (not 1 toman)
	// However, if the number already contains magnitude words (هزار, میلیون, etc.),
	// indicated by being >= 1000, then don't apply the multiplier
	// Examples:
	//   - "یک تومن" (1) → 1 * 1000 = 1,000
	//   - "صد تومن" (100) → 100 * 1000 = 100,000
	//   - "یک هزار تومان" (1000) → 1,000 (no multiplier, already has "هزار")
	if (!formal && numericValue < 1000) {
		numericValue *= COLLOQUIAL_MULTIPLIERS.REGULAR;
	}

	// **Convert between currencies** if needed
	if (detectedCurrency && to && detectedCurrency !== to) {
		if (detectedCurrency === "toman" && to === "rial") {
			// Convert Toman to Rial: multiply by 10
			numericValue *= CURRENCY_MULTIPLIERS.TOMAN_TO_RIAL;
		} else if (detectedCurrency === "rial" && to === "toman") {
			// Convert Rial to Toman: divide by 10
			numericValue *= CURRENCY_MULTIPLIERS.RIAL_TO_TOMAN;
		}
	}

	return numericValue;
}

/**
 * **Converts Persian Rials words to a number**
 *
 * Convenience function for parsing Rial amounts. Assumes input is in Rials
 * and uses colloquial mode by default.
 *
 * @param rialsWords - Persian text describing a Rial amount (e.g., "صد ریال")
 * @param options - Optional configuration (excludes `from` as it's set to "rial")
 * @returns The numeric value in Rials
 *
 * @example
 * ```ts
 * rialsWordsToNumber("یک ریال"); // 1000 (colloquial)
 * rialsWordsToNumber("صد ریال"); // 100000 (colloquial)
 * rialsWordsToNumber("یک ریال", { formal: true }); // 1 (formal)
 * ```
 */
export function rialsWordsToNumber(rialsWords: string, options: Omit<MoneyWordsToNumberOptions, "from"> = {}): number {
	return moneyWordsToNumber(rialsWords, {
		...options,
		from: "rial",
	});
}

/**
 * **Converts Persian Tomans words to a number**
 *
 * Convenience function for parsing Toman amounts. Assumes input is in Tomans
 * and uses colloquial mode by default.
 *
 * @param tomansWords - Persian text describing a Toman amount (e.g., "صد تومن")
 * @param options - Optional configuration (excludes `from` as it's set to "toman")
 * @returns The numeric value in Tomans
 *
 * @example
 * ```ts
 * tomansWordsToNumber("یک تومن"); // 1000 (colloquial)
 * tomansWordsToNumber("صد تومن"); // 100000 (colloquial)
 * tomansWordsToNumber("یک تومان", { formal: true }); // 1 (formal)
 *
 * // Convert to Rials
 * tomansWordsToNumber("یک تومن", { to: "rial" }); // 10000 (1000 tomans * 10)
 * ```
 */
export function tomansWordsToNumber(
	tomansWords: string,
	options: Omit<MoneyWordsToNumberOptions, "from"> = {},
): number {
	return moneyWordsToNumber(tomansWords, {
		...options,
		from: "toman",
	});
}
