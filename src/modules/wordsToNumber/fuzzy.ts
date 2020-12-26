import { ALL_WORDS } from "./constants";
import { closest } from "fastest-levenshtein";

export const fuzzy = (words: string, dataset?: Array<string>): string | undefined => {
	if (!words || typeof words !== "string") return;

	const base = (dataset?.length as number) > 0 ? dataset : ALL_WORDS;
	const clearedWords: string[] = words.split(" ").map((word) => {
		if (word === "و") return word;
		if (word.length === 1) return "و";

		return closest(word, base!) || word;
	});

	return clearedWords.join(" ");
};
