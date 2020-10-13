import { ALL_WORDS } from "./constants";

const Fuse = require("fuse.js");

interface FuzzyOptions {
	dataset?: string[];
	threshold?: number;
}

export const fuzzy = (words: string, { dataset, ...fuseOptions }: FuzzyOptions = {}): string | undefined => {
	if (!words || typeof words !== "string") return;

	const base = (dataset?.length as number) > 0 ? dataset : ALL_WORDS;
	const fuse = new Fuse(base, { includeScore: true, ...fuseOptions });

	const clearedWords: string[] = words.split(" ").map((word) => {
		if (word === "و") return word;
		if (word.length === 1) return "و";

		const search = fuse.search(word);

		let result = word;
		if (search.length && search[0]?.score < 0.4) {
			result = search[0].item;
		}

		return result;
	});

	return clearedWords.join(" ");
};
