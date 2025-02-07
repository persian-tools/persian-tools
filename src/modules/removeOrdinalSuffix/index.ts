/**
 * **Removes common Persian ordinal suffixes** from the end of a word or phrase.
 *
 * **Examples**:
 * - removeOrdinalSuffix("سه هزارم")       => "سه هزار"
 * - removeOrdinalSuffix("سه هزارمین")     => "سه هزار"
 * - removeOrdinalSuffix("چهاردهمین")      => "چهارده"
 * - removeOrdinalSuffix("سیزدهم")         => "سیزده"
 * - removeOrdinalSuffix("بیستم")         => "بیست"
 *
 * @function removeOrdinalSuffix
 * @param word A string that may include ordinal suffixes.
 * @return The input string without ordinal-related endings.
 */
export const removeOrdinalSuffix = (word: string): string => {
	// **Early return** if input is falsy.
	if (!word) return word;

	// **Remove** generic suffixes (e.g., "فلانمین", "فلانام", "فلان اُم")
	word = word.replace(/مین$/i, "").replace(/(ام| اُم)$/i, "");

	/**
	 * **Array of special endings** that map to unique replacements.
	 * - We check these in order. If `word.endsWith(suffix)`, we replace with `replacement`.
	 * - This handles irregular forms like "سوم" => "سه", "یازدهم" => "یازده", etc.
	 */
	const specialCases: Array<{ suffix: string; replacement: string }> = [
		// 1) یکم
		{ suffix: "یکمین", replacement: "یک" },
		{ suffix: "یکم", replacement: "یک" },

		// 2) دوم
		{ suffix: "دومین", replacement: "دو" },
		{ suffix: "دوم", replacement: "دو" },

		// 3) سوم
		{ suffix: "سومین", replacement: "سه" },
		{ suffix: "سوم", replacement: "سه" },

		// 4) چهارم
		{ suffix: "چهارمین", replacement: "چهار" },
		{ suffix: "چهارم", replacement: "چهار" },

		// 5) پنجم
		{ suffix: "پنجمین", replacement: "پنج" },
		{ suffix: "پنجم", replacement: "پنج" },

		// 6) ششم
		{ suffix: "ششمین", replacement: "شش" },
		{ suffix: "ششم", replacement: "شش" },

		// 7) هفتم
		{ suffix: "هفتمین", replacement: "هفت" },
		{ suffix: "هفتم", replacement: "هفت" },

		// 8) هشتم
		{ suffix: "هشتمین", replacement: "هشت" },
		{ suffix: "هشتم", replacement: "هشت" },

		// 9) نهم
		{ suffix: "نهمین", replacement: "نه" },
		{ suffix: "نهم", replacement: "نه" },

		// 10) دهم
		{ suffix: "دهمین", replacement: "ده" },
		{ suffix: "دهم", replacement: "ده" },

		// 11) یازدهم
		{ suffix: "یازدهمین", replacement: "یازده" },
		{ suffix: "یازدهم", replacement: "یازده" },

		// 12) دوازدهم
		{ suffix: "دوازدهمین", replacement: "دوازده" },
		{ suffix: "دوازدهم", replacement: "دوازده" },

		// 13) سیزدهم
		{ suffix: "سیزدهمین", replacement: "سیزده" },
		{ suffix: "سیزدهم", replacement: "سیزده" },

		// 14) چهاردهم
		{ suffix: "چهاردهمین", replacement: "چهارده" },
		{ suffix: "چهاردهم", replacement: "چهارده" },

		// 15) پانزدهم
		{ suffix: "پانزدهمین", replacement: "پانزده" },
		{ suffix: "پانزدهم", replacement: "پانزده" },

		// 16) شانزدهم
		{ suffix: "شانزدهمین", replacement: "شانزده" },
		{ suffix: "شانزدهم", replacement: "شانزده" },

		// 17) هفدهم
		{ suffix: "هفدهمین", replacement: "هفده" },
		{ suffix: "هفدهم", replacement: "هفده" },

		// 18) هجدهم
		{ suffix: "هجدهمین", replacement: "هجده" },
		{ suffix: "هجدهم", replacement: "هجده" },

		// 19) نوزدهم
		{ suffix: "نوزدهمین", replacement: "نوزده" },
		{ suffix: "نوزدهم", replacement: "نوزده" },

		// 20) بیستم
		{ suffix: "بیستمین", replacement: "بیست" },
		{ suffix: "بیستم", replacement: "بیست" },

		// 30) سی‌ام  (sometimes written "سیُم")
		{ suffix: "سیُمین", replacement: "سی" },
		{ suffix: "سیُم", replacement: "سی" },
		{ suffix: "سی‌امین", replacement: "سی" },
		{ suffix: "سی‌ام", replacement: "سی" },

		// 100) صدم
		{ suffix: "صدمین", replacement: "صد" },
		{ suffix: "صدم", replacement: "صد" },
	];

	// **Check** for each special case in order:
	for (const { suffix, replacement } of specialCases) {
		if (word.endsWith(suffix)) {
			// **Replace** the suffix with the base form.
			word = word.slice(0, -suffix.length) + replacement;
			return word; // **Return** immediately if replaced.
		}
	}

	// **Fallback**: if the result ends with "م" (e.g. "هزارم"), remove it.
	if (word.endsWith("م")) {
		word = word.slice(0, -1);
	}

	return word;
};

export default removeOrdinalSuffix;
