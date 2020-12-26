import { ALL_WORDS, JOINERS } from "./constants";
import { closest } from "fastest-levenshtein";

export const fuzzy = (words: string, dataset?: Array<string>): string | undefined => {
	if (!words || typeof words !== "string") return;

	const base = (dataset?.length as number) > 0 ? dataset : ALL_WORDS;
	const clearedWords: string[] = words.split(" ").map((word) => {
		if (word === "و") return word;
		if (word.length === 1) return JOINERS[0];

		return closest(word, base!);
	});

	return clearedWords.join(" ");
};
