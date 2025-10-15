import { isString } from "../../helpers";
import { digitsEnToFa } from "../digits";
import { toPersianChars } from "../toPersianChars";

const SLUG_REPLACEMENTS: Record<string, string> = {
	آ: "ا",
	ء: "",
	ئ: "ی",
	أ: "ا",
	إ: "ا",
	ة: "ه",
	ك: "ک",
	ي: "ی",
	ى: "ی",
	ؤ: "و",
	"ً": "",
	"ٌ": "",
	"ٍ": "",
	"َ": "",
	"ُ": "",
	"ِ": "",
	"ّ": "",
	"ْ": "",
	"٠": "0",
	"١": "1",
	"٢": "2",
	"٣": "3",
	"٤": "4",
	"٥": "5",
	"٦": "6",
	"٧": "7",
	"٨": "8",
	"٩": "9",
};

const PUNCTUATION_REPLACEMENTS: Record<string, string> = {
	"؟": "",
	"؛": "",
	"،": "",
	"«": "",
	"»": "",
	"٪": "",
	"۰": "0",
	"۱": "1",
	"۲": "2",
	"۳": "3",
	"۴": "4",
	"۵": "5",
	"۶": "6",
	"۷": "7",
	"۸": "8",
	"۹": "9",
};

export interface SlugifyOptions {
	separator?: string;
	lowercase?: boolean;
	removeRepeatedSeparators?: boolean;
	maxLength?: number;
	preserveNumbers?: boolean;
	customReplacements?: Record<string, string>;
}

export function slugify(text: string, options: SlugifyOptions = {}): string {
	if (!text || !isString(text)) {
		throw new Error("slugify: Input must be a non-empty string");
	}

	const {
		separator = "-",
		lowercase = true,
		removeRepeatedSeparators = true,
		maxLength,
		preserveNumbers = true,
		customReplacements = {},
	} = options;

	let result = text.trim();

	result = toPersianChars(result);

	for (const [from, to] of Object.entries(SLUG_REPLACEMENTS)) {
		result = result.replace(new RegExp(from, "g"), to);
	}

	for (const [from, to] of Object.entries(PUNCTUATION_REPLACEMENTS)) {
		result = result.replace(new RegExp(from, "g"), to);
	}

	if (preserveNumbers) {
		result = digitsEnToFa(result);
	}

	for (const [from, to] of Object.entries(customReplacements)) {
		result = result.replace(new RegExp(from, "g"), to);
	}

	result = result.replace(
		// eslint-disable-next-line no-misleading-character-class
		/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u200C\u200D\u200E\u200F\u2000-\u206F\u0020\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF0-9a-zA-Z]/g,
		" ",
	);

	result = result.replace(/\s+/g, separator);

	if (removeRepeatedSeparators && separator) {
		const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		result = result.replace(new RegExp(`${escapedSeparator}+`, "g"), separator);
	}

	result = result.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");

	if (lowercase) {
		result = result.toLowerCase();
	}

	if (maxLength && result.length > maxLength) {
		result = result.substring(0, maxLength);
		const lastSeparatorIndex = result.lastIndexOf(separator);
		if (lastSeparatorIndex > maxLength * 0.8) {
			result = result.substring(0, lastSeparatorIndex);
		}
	}

	return result;
}

export function createSlug(text: string, separator = "-"): string {
	return slugify(text, { separator });
}

export function slugifyWithNumbers(text: string, separator = "-"): string {
	return slugify(text, { separator, preserveNumbers: true });
}

export function slugifySimple(text: string): string {
	return slugify(text, {
		separator: "-",
		lowercase: true,
		removeRepeatedSeparators: true,
	});
}
