import { digitsArToEn } from "./ar";
import { digitsFaToEn } from "./fa";

/**
 * **Converts** Persian and Arabic digits to English digits.
 * @param value - The string to convert. May contain Persian or Arabic digits.
 * @returns The string with all digits converted to English.
 */
export function autoConvertDigitsToEN(value: string) {
	if (!value) {
		return value;
	}

	value = digitsArToEn(value);
	value = digitsFaToEn(value);

	return value;
}
