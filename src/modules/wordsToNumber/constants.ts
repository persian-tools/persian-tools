/**
 * **UNITS**: Basic numbers from 0..90
 */
export const UNITS = new Map<string, number>([
	["صفر", 0],
	["یک", 1],
	["دو", 2],
	["سه", 3],
	["چهار", 4],
	["پنج", 5],
	["شش", 6],
	["شیش", 6],
	["هفت", 7],
	["هشت", 8],
	["نه", 9],
	["ده", 10],
	["یازده", 11],
	["دوازده", 12],
	["سیزده", 13],
	["چهارده", 14],
	["پانزده", 15],
	["شانزده", 16],
	["هفده", 17],
	["هجده", 18],
	["نوزده", 19],
	["بیست", 20],
	["سی", 30],
	["چهل", 40],
	["پنجاه", 50],
	["شصت", 60],
	["هفتاد", 70],
	["هشتاد", 80],
	["نود", 90],
]);

/**
 * **TEN**: Multiples of 100 up to 900
 */
export const TEN = new Map<string, number>([
	["صد", 100],
	["یکصد", 100],
	["یک‌صد", 100],
	["دویست", 200],
	["سیصد", 300],
	["چهارصد", 400],
	["پانصد", 500],
	["ششصد", 600],
	["هفتصد", 700],
	["هشتصد", 800],
	["نهصد", 900],
]);

/**
 * **MAGNITUDE**: Larger scales (thousands, millions, etc.)
 */
export const MAGNITUDE = new Map<string, number>([
	["هزار", 1000],
	["میلیون", 1000000],
	["بیلیون", 1000000000],
	["میلیارد", 1000000000],
	["تریلیون", 1000000000000],
]);

/**
 * **TYPO_LIST**: Known text replacements for common typos/misspellings.
 * - Key: incorrect spelling
 * - Value: correct spelling
 */
export const TYPO_LIST = new Map<string, string>([
	["شیش صد", "ششصد"],
	["یه", "یک"],
	["شش صد", "ششصد"],
	["هفت صد", "هفتصد"],
	["هشت صد", "هشتصد"],
	["نه صد", "نهصد"],
	["چارصد", "چهارصد"],
	["شیش‌صد", "ششصد"],
	["شش‌ضد", "ششصد"],
	["هفت‌صد", "هفتصد"],
	["هف ‌صد", "هفتصد"],
	["هشت‌صد", "هشتصد"],
	["نه‌صد", "نهصد"],
	["یک‌صد", "یکصد"],
	["هزارمين", "هزارمین"],
]);

/**
 * **Create** a pattern by joining all map keys with "|", then use case-insensitive match.
 * @since 5.0.0
 */
export const TYPO_PATTERN = new RegExp(Array.from(TYPO_LIST.keys()).join("|"), "gi");

/**
 * **UNIT_KEYS**, **TEN_KEYS**, and **MAGNITUDE_KEYS**:
 * Array forms of each Map's keys.
 */
export const UNIT_KEYS = Array.from(UNITS.keys());
export const TEN_KEYS = Array.from(TEN.keys());
export const MAGNITUDE_KEYS = Array.from(MAGNITUDE.keys());

/**
 * **NUMBER_WORDS**: All recognized numeric words combined.
 */
export const NUMBER_WORDS = [...UNIT_KEYS, ...TEN_KEYS, ...MAGNITUDE_KEYS];

/**
 * **JOINERS**: Common "joiner" tokens used for linking words (e.g. "و").
 */
export const JOINERS = ["و", " و "];

/**
 * **PREFIXES**: Negative/positive markers.
 */
export const PREFIXES = ["منفی", "مثبت"];

/**
 * **ALL_WORDS**: Consolidated list of recognized words, including joiners and prefixes.
 */
export const ALL_WORDS = [...NUMBER_WORDS, ...JOINERS, ...PREFIXES];
