import { removeLineBreaks } from "../../helpers";
import { tryCompoundRule, tryPrefixRule, trySuffixRule } from "./utils";

/**
 * Add a half-space character (ZWNJ) between Persian words and prefixes/suffixes.
 * @param persianText The Persian text to process and add half-space to.
 * @returns The processed text with half-space characters.
 */
export function halfSpace(persianText: string): string {
	// Normalize multiple spaces
	const text = persianText.replace(/\s{2,}/g, " ");

	// Tokenize text into words and spaces
	const tokens = text.split(/(\s+)/);

	// We'll reconstruct the sentence by applying rules as we go.
	const result: string[] = [];

	let i = 0;
	while (i < tokens.length) {
		const token = tokens[i];

		// If it's just whitespace
		if (!token.trim()) {
			// Look at the previous and next non-whitespace tokens
			const prev = result.length > 0 ? result[result.length - 1] : undefined;
			const next = i + 1 < tokens.length ? tokens[i + 1] : undefined;

			if (prev && next && !/\s/.test(next)) {
				// Try applying rules in order of priority:
				// 1. Compound rule (includes comparative/superlative handling)
				// 2. Suffix rule
				// 3. Prefix rule

				const compoundResult = tryCompoundRule(prev, next);
				if (compoundResult) {
					result[result.length - 1] = compoundResult;
					i += 2; // Skip space and next token
					continue;
				}

				const suffixResult = trySuffixRule(prev, next);
				if (suffixResult) {
					result[result.length - 1] = suffixResult;
					i += 2; // Skip space and next token
					continue;
				}

				const prefixResult = tryPrefixRule(prev, next);
				if (prefixResult) {
					result[result.length - 1] = prefixResult;
					i += 2; // Skip space and next token
					continue;
				}
			}

			// If no rule applies, add a single space (if not already present)
			if (result.length > 0 && !/\s/.test(result[result.length - 1])) {
				result.push(" ");
			}
		} else {
			// It's a word/punctuation token
			result.push(token);
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
		// Join lines back with a newline
		.join("\n")
		// Remove any extra spaces after the newline
		.trim();

	return finalResult;
}
