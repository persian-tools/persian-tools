import { removeLineBreaks } from "../../helpers";

/**
 * Add half-space character (ZWNJ) between Persian words and prefixes/suffixes.
 * @param persianText The Persian text to process and add half-space to.
 * @returns The processed text with half-space characters.
 */
export function halfSpace(persianText: string): string {
	// Zero-width non-joiner character
	const ZWNJ = "\u200C";

	// Basic Persian character range
	const persianCharRange = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

	// Dictionaries
	const prefixes = ["می", "نمی", "بی"];
	const suffixes = ["ها", "تر", "ترین"];

	// Known compound words or pairs that often need half-space:
	// For example, some common phrases or words that are often written together.
	const knownCompounds: Array<[string, string]> = [
		["هم", "چنین"], // "هم چنین" → "هم‌چنین"
		["هم", "اکنون"], // "هم اکنون" → "هم‌اکنون"
		["هم", "زمان"], // "هم زمان" → "هم‌زمان"
		["هیچ", "کس"], // "هیچ کس" → "هیچ‌کس"
		["هیچ", "گاه"], // "هیچ گاه" → "هیچ‌گاه"
		["هیچ", "گونه"], // "هیچ گونه" → "هیچ‌گونه"
		["هیچ", "جا"], // "هیچ ��ا" → "هیچ‌جا"
		["هیچ", "کدام"], // "هیچ کدام" → "هیچ‌کدام"
		["هیچ", "کدامی"], // "هیچ کدام��" → "هیچ‌کدامی"
		["هیچ", "کدامیک"], // "هیچ کدامیک" → "هیچ‌کدامیک"
		["هیچ", "کسی"], // "هیچ کسی" → "هیچ‌کسی"
		["هیچ", "گونه‌ای"], // "هیچ گونه‌ای" → "هیچ‌گونه‌ای"
		["هیچ", "جوری"], // "هیچ جوری" → "هیچ‌جوری"
		["هیچ", "گونه‌ای"], // "هیچ گونه‌ای" → "هیچ‌گونه‌ای"
		["هیچ", "جوری"], // "هیچ جوری" → "هیچ‌جوری"
		["هیچ", "وقت"], // "هیچ وقت" → "هیچ‌وقت"
		["هیچ", "گاهی"], // "هیچ گاهی" → "هیچ‌گاهی"
		["هیچ", "گونه‌ای"], // "هیچ گونه‌ای" → "هیچ
		// Common words with suffixes
		["خانه", "ها"], // خانه ها → خانه‌ها
		["آن", "ها"], // آن ها → آن‌ها
		["این", "ها"], // این ها → این‌ها
		["بزرگ", "تر"], // بزرگ تر → بزرگ‌تر
		["بزرگ", "ترین"], // بزرگ ترین → بزرگ‌ترین
		["کوچک", "تر"], // کوچک تر → کوچک‌تر
		["به", "هر"], // به هر → به‌هر
		["به", "ترتیب"], // به ترتیب → به‌ترتیب
		["به", "علاوه"], // به علاوه → به‌علاوه
		["به", "طور"], // به طور → به‌طور
		["به", "وسیله"], // به وسیله → به‌وسیله
		["به", "همراه"], // به همراه → به‌همراه
		["به", "وجود"], // به وجود → به‌وجود
		["هم", "چنین"], // هم چنین → هم‌چنین
		["هم", "اکنون"], // هم اکنون → هم‌اکنون
		["هم", "راه"], // هم راه → هم‌راه
		["هم", "زمان"], // هم زمان → هم‌زمان
		["هم", "چنان"], // هم چنان → هم‌چنان
		["این", "جا"], // این‌جا
		["آن", "جا"], // آن‌جا
		["این", "که"], // این‌که
		["آن", "که"], // آن‌که
		["چند", "سال"], // چند‌سال
		["چند", "ماه"], // چند‌ماه
		["چند", "روز"], // چند‌روز
		["چند", "نفر"], // چند‌نفر
		["چند", "هزار"], // چند‌هزار
		["چند", "میلیون"], // چند‌میلیون
		["هر", "کس"], // هر‌کس
		["هر", "چه"], // هر‌چه
		["هر", "جا"], // هر‌جا
		["هر", "که"], // هر‌که
		["چه", "قدر"], // چه‌قدر
		["چه", "چیز"], // چه‌چیز
		["چه", "کار"], // چه‌کار

		// Additional commonly half-spaced phrases
		["پیش", "تر"], // پیش‌تر
		["کم", "کم"], // کم‌کم
		["بی", "خود"], // بی‌خود
		["بی", "جهت"], // بی‌جهت
		["بی", "دلیل"], // بی‌دلیل
		["بی", "معنی"], // بی‌معنی
		["بی", "شمار"], // بی‌شمار
		["چه", "طور"], // چه‌طور
		["هم", "دیگر"], // هم‌دیگر
		["همان", "طور"], // همان‌طور
		["همان", "گونه"], // همان‌گونه
		["همین", "طور"], // همین‌طور
		["همین", "گونه"], // همین‌گونه
		["به", "هرحال"], // به‌هرحال
		["به", "هرروی"], // به‌هرروی
		["به", "اضافه"], // به‌اضافه
		["به", "نسبت"], // به‌نسبت
		["به", "ندرت"], // به‌ندرت
		["به", "ویژه"], // به‌ویژه
		["به", "شدت"], // به‌شدت
		["به", "سختی"], // به‌سختی
		["به", "واقع"], // به‌واقع
		["به", "احتمال"], // به‌احتمال
		["به", "جز"], // به‌جز
		["به", "غیر"], // به‌غیر

		["آن", "گاه"], // آن‌گاه
		["آن", "قدر"], // آن‌قدر
		["این", "گونه"], // این‌گونه
		["این", "طور"], // این‌طور
		["این", "قدر"], // این‌قدر
		["این", "همه"], // این‌همه
		["آن", "همه"], // آن‌همه
		["آن", "طور"], // آن‌طور
		["آن", "گونه"], // آن‌گونه
		["چرا", "که"], // چرا‌که

		["علاوه", "بر"], // علاوه‌بر
		["تعداد", "زیادی"], // تعداد‌زیادی
		["قبل", "از"], // قبل‌از
		["بعد", "از"], // بعد‌از
		["پیش", "از"], // پیش‌از
		["پس", "از"], // پس‌از
		["پیش", "رو"], // پیش‌رو

		// Comparative forms
		["کم", "تر"], // کم‌تر
		["کم", "ترین"], // کم‌ترین
		["زود", "تر"], // زود‌تر
		["زود", "ترین"], // زود‌ترین
		["دیر", "تر"], // دیر‌تر
		["دیر", "ترین"], // دیر‌ترین
		["خوب", "تر"], // خوب‌تر
		["خوب", "ترین"], // خوب‌ترین
		["بد", "تر"], // بد‌تر
		["بد", "ترین"], // بد‌ترین
		["سریع", "تر"], // سریع‌تر
		["سریع", "ترین"], // سریع‌ترین
		["آسان", "تر"], // آسان‌تر
		["آسان", "ترین"], // آسان‌ترین
		["سخت", "تر"], // سخت‌تر
		["سخت", "ترین"], // سخت‌ترین
		["زیاد", "تر"], // زیاد‌تر
		["زیاد", "ترین"], // زیاد‌ترین
		["بیش", "تر"], // بیش‌تر
		["بیش", "ترین"], // بیش‌ترین
		["بیشتر", "از"], // بیشتر‌از
		["کمتر", "از"], // کمتر‌از
		["بیش", "از"], // بیش‌از
		["کم", "از"], // کم‌از
		["بیشتر", "باشد"], // بیشتر‌باشد
		["کمتر", "باشد"], // کمتر‌باشد
		["بیش", "باشد"], // بیش‌باشد
		["کم", "باشد"], // کم‌باشد

		// Time-related phrases
		["دیر", "هنگام"], // دیر‌هنگام
		["اکنون", "که"], // اکنون‌که
		["زمانی", "که"], // زمانی‌که
		["وقتی", "که"], // وقتی‌که
		["هنگامی", "که"], // هنگامی‌که
		["هنگام", "آن"], // هنگام‌آن
		["هنگام", "این"], // هنگام‌این
		["زمان", "آن"], // زمان‌آن
		["زمان", "این"], // زمان‌این
		["وقت", "آن"], // وقت‌آن
		["وقت", "این"], // وقت‌این
		["زمان", "هایی"], // زمان‌هایی
		["وقت", "هایی"], // وقت‌هایی
		["هنگام", "هایی"], // هنگام‌هایی
		["زمان", "های"], // زمان‌های
		["وقت", "های"], // وقت‌های
		["هنگام", "های"], // هنگام‌های
	];

	// Normalize multiple spaces
	const text = persianText.replace(/\s{2,}/g, " ");

	// Tokenize text into words and punctuation
	// This tokenizer splits on spaces but retains punctuation by splitting on non-Persian chars too.
	// For more robust handling, consider a more sophisticated tokenizer.
	const tokens = text.split(/(\s+)/);

	// We'll reconstruct the sentence by applying rules as we go.
	const result: string[] = [];

	// Helper functions
	function isPersianWord(token: string): boolean {
		return persianCharRange.test(token);
	}

	function tryPrefixRule(prevToken: string | undefined, currentToken: string): string | undefined {
		// If previous token is a known prefix and next is a Persian word, join them.
		if (prevToken && prefixes.includes(prevToken) && isPersianWord(currentToken)) {
			return prevToken + ZWNJ + currentToken;
		}
		return undefined;
	}

	function trySuffixRule(prevToken: string, currentToken: string): string | undefined {
		// If current token is a suffix and previous is a Persian word
		if (isPersianWord(prevToken) && suffixes.includes(currentToken)) {
			return prevToken + ZWNJ + currentToken;
		}
		return undefined;
	}

	function tryCompoundRule(prevToken: string, currentToken: string): string | undefined {
		// Check if (prevToken, currentToken) are known compounds
		for (const [w1, w2] of knownCompounds) {
			if (prevToken === w1 && currentToken === w2) {
				return prevToken + ZWNJ + currentToken;
			}
		}
		return undefined;
	}

	let i = 0;
	while (i < tokens.length) {
		const token = tokens[i];

		// If it's just whitespace, decide how to handle it
		if (token.trim() === "") {
			// Peek ahead and behind to see if we can join
			const prev = result.length > 0 ? result[result.length - 1] : undefined;
			const next = i + 1 < tokens.length ? tokens[i + 1] : undefined;

			// Attempt prefix rule
			if (prev && next && !/\s/.test(next)) {
				const combined = tryPrefixRule(prev, next);
				if (combined) {
					// Replace last token with combined, skip next token
					result[result.length - 1] = combined;
					i += 2; // Skip the next token, since it's merged
					continue;
				}
			}

			// Attempt suffix rule
			if (prev && next && !/\s/.test(next)) {
				const combined = trySuffixRule(prev, next);
				if (combined) {
					result[result.length - 1] = combined;
					i += 2;
					continue;
				}
			}

			// Attempt compound rule
			if (prev && next && !/\s/.test(next)) {
				const combined = tryCompoundRule(prev, next);
				if (combined) {
					result[result.length - 1] = combined;
					i += 2;
					continue;
				}
			}

			// If no rule applies, add a single space
			if (!/\s/.test(result[result.length - 1] || "")) {
				result.push(" ");
			}
		} else {
			// It's a word or punctuation, just add it for now
			// Compound and other rules might be triggered after seeing a space
			if (
				result.length === 0 ||
				result[result.length - 1].trim() === "" ||
				!isPersianWord(result[result.length - 1])
			) {
				// No merging here, just push
				result.push(token);
			} else {
				// If previous was a Persian word and this is punctuation, just add space and token
				// (Can refine punctuation rules if needed)
				result.push(token);
			}
		}

		i++;
	}

	// Clean up extra spaces at start/end
	let finalResult = result.join("").trim();

	// Remove double spaces if any remain
	finalResult = finalResult.replace(/\s{2,}/g, " ");

	// Remove spaces before punctuation (Persian comma, ASCII comma, periods, question marks, etc.)
	// This ensures no space remains before these punctuation marks.
	finalResult = finalResult.replace(/[ \t\n\r\f]+([,،.!؟])/g, "$1");

	// Remove spaces after \n (newline) characters if any remain (for example, after a newline and before a word)
	finalResult = finalResult
		.split("\n")
		// Remove trailing spaces from each line
		.map((line) => removeLineBreaks(line)) // Remove trailing spaces from each line
		// Join lines back with newline
		.join("\n")
		// Remove any extra spaces after newline
		.trim();

	return finalResult;
}

export default halfSpace;
