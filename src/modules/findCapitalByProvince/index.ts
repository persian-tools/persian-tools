import { states } from "./states";
import { toPersianChars } from "../toPersianChars";

/**
 * Returns the capital name of province you enter
 * @param {string} state
 * @returns {string} capital name
 */

export const findCapitalByProvince = (state: string) => {
	const normalizeState = toPersianChars(state) as string;
	if (normalizeState in states) return states[normalizeState];

	throw new Error("no province found");
};
