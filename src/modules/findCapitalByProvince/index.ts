import { IRAN_STATES } from "./states";
import { toPersianChars } from "../toPersianChars";
// Errors
import { PersianToolsError } from "../../helpers";

/**
 * Returns the capital name of a province you enter
 *
 * @param {string} state
 * @returns {string} capital name
 */
export const findCapitalByProvince = (state: string): string => {
	const normalizeState = toPersianChars(state) as string;

	if (IRAN_STATES.has(normalizeState)) return IRAN_STATES.get(normalizeState)!;

	throw new PersianToolsError("findCapitalByProvince", "no province found");
};
