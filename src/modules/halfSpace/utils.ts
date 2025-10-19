import { isPersian } from "../isPersian";
// Constants
import { knownCompounds, prefixes, suffixTokenRegex, ZWNJ } from "./costants";

export function tryPrefixRule(prevToken: string | undefined, currentToken: string): string | undefined {
	// If the previous token is a known prefix and the next is a Persian word, join them.
	if (prevToken && prefixes.includes(prevToken) && isPersian(currentToken, true)) {
		return prevToken + ZWNJ + currentToken;
	}
	return undefined;
}

export function trySuffixRule(prevToken: string, currentToken: string): string | undefined {
	// Only consider when the previous token is a Persian word
	if (!isPersian(prevToken, true)) return undefined;

	// Match suffix token possibly followed by punctuation
	const m = currentToken.match(suffixTokenRegex);
	if (!m) return undefined;
	const [, suffix, trailing] = m;

	// Rule:
	// - For plural marker "ها": insert ZWNJ between base and suffix.
	// - For comparative/superlative "تر"/"ترین": remove space and DO NOT insert ZWNJ.
	if (suffix === "ها") {
		return prevToken + ZWNJ + "ها" + (trailing || "");
	}
	if (suffix === "ترین") {
		return prevToken + "ترین" + (trailing || "");
	}
	if (suffix === "تر") {
		return prevToken + "تر" + (trailing || "");
	}
	return undefined;
}

export function tryCompoundRule(prevToken: string, currentToken: string): string | undefined {
	// Ensure comparative/superlative do NOT get ZWNJ via compounds
	// Check for "ترین" first (longer match), then "تر"
	const comp = currentToken.match(/^(ترین|تر)([,\u060C\.!\?\u061F\u061B;:\)\]\}»"'…%]*)$/);
	if (comp && isPersian(prevToken, true)) {
		const [, suffix, trailing] = comp;
		return prevToken + suffix + (trailing || "");
	}

	// Check if (prevToken, currentToken) are known compounds → add ZWNJ
	// Using array iteration since we changed from Map to array of tuples
	for (const [w1, w2] of knownCompounds) {
		if (prevToken === w1 && currentToken === w2) {
			return prevToken + ZWNJ + currentToken;
		}
	}

	return undefined;
}
