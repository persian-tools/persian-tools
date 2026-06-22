/**
 * **CURRENCY_UNITS**: Maps Persian currency words to their type
 * Includes various spellings and forms of Toman and Rial
 */
export const CURRENCY_UNITS = new Map<string, "toman" | "rial">([
	// Toman variants
	["تومن", "toman"],
	["تومان", "toman"],
	["تمن", "toman"],
	["تمان", "toman"],
	["توم", "toman"],
	["تومون", "toman"],
	["تمون", "toman"],

	// Rial variants
	["ریال", "rial"],
	["ریل", "rial"],
	["ریول", "rial"],
]);

/**
 * **CURRENCY_MULTIPLIERS**: Conversion factors between currencies
 * - 1 Toman = 10 Rials (official conversion)
 */
export const CURRENCY_MULTIPLIERS = {
	TOMAN_TO_RIAL: 10,
	RIAL_TO_TOMAN: 0.1,
} as const;

/**
 * **COLLOQUIAL_MULTIPLIERS**: Common multipliers used in everyday Persian money speech
 *
 * In colloquial Persian, people often implicitly multiply numbers when talking about money:
 * - Regular speech: "یک تومن" often means 1,000 tomans (not 1 toman)
 * - "صد تومن" means 100,000 tomans (not 100 tomans)
 *
 * The multiplier represents how many times to multiply the parsed number.
 * - For regular/colloquial: multiply by 1000
 * - For formal: multiply by 1 (no change)
 */
export const COLLOQUIAL_MULTIPLIERS = {
	REGULAR: 1000,
	FORMAL: 1,
} as const;

/**
 * **CURRENCY_KEYS**: Array of all currency unit keys for pattern matching
 */
export const CURRENCY_KEYS = Array.from(CURRENCY_UNITS.keys());

/**
 * **Escapes special regex characters** in a string
 */
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * **Creates a regex pattern** for matching currency units in text
 * Note: We don't use \b (word boundaries) as they don't work reliably with Persian Unicode characters
 */
export const CURRENCY_PATTERN = new RegExp(`(${CURRENCY_KEYS.map(escapeRegex).join("|")})`, "g");
