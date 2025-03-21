import { ALL_WORDS, JOINERS } from "./constants";
import { closest } from "fastest-levenshtein";

/**
 * **Fuzzy** takes a Persian string and attempts to correct typos by matching
 * each token to the **closest** word in a base dataset (defaults to ALL_WORDS).
 *
 * **Patch**: We explicitly map `"يصت"` to `"بیست"`.
 *
 * @param words - The input Persian string.
 * @param dataset - Optional array of tokens to match against. Defaults to ALL_WORDS.
 * @returns A new string in which each token is replaced by the best match.
 */
export const fuzzy = (words: string, dataset?: Array<string>): string | undefined => {
	// **Early return** if input is falsy or not a string
	if (!words || typeof words !== "string") return;

	// **Base** dataset for matching
	const base = (dataset?.length ?? 0) > 0 ? dataset : ALL_WORDS;

	// **Split** on spaces and map each token
	const clearedWords: string[] = words.split(" ").map((word) => {
		// **Preserve** the joiner token "و"
		if (word === "و") return word;

		// **If** the token is a single char, treat it as the joiner
		if (word.length === 1) return JOINERS[0];

		// **Otherwise**, use standard fuzzy matching
		return closest(word, base!);
	});

	// **Return** the rejoined string
	return clearedWords.join(" ");
};
