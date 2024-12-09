import { digitsFaToEn } from "../digits";
import { isPersian } from "../isPersian";

/**
 * Add Commas to numbers in a string or a number
 *
 * @method addCommas
 * @param input
 * @return {string} string of separated numbers by commas, eg: 30,000
 */
const addCommas = (input: number | string): string => {
	if (typeof input !== "number" && typeof input !== "string") return "";

	const inputStr = input.toString().replace(/,/g, "");
	const serializedInputDigits = isPersian(inputStr) ? digitsFaToEn(inputStr) : inputStr;
	// Check if input is a valid number
	if (!serializedInputDigits.match(/^-?\d+(\.\d+)?$/)) {
		return "";
	}

	// Determine if the number is negative
	const isNegative = serializedInputDigits.startsWith("-");

	// Remove the negative sign for processing
	const positiveInput = isNegative ? serializedInputDigits.slice(1) : serializedInputDigits;

	// Split the input into integer and decimal parts
	const [integerPart, decimalPart] = positiveInput.split(".");

	// Add commas to the integer part
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Combine the formatted integer part with the decimal part, if exists
	const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

	// Add the negative sign back if the number is negative
	return isNegative ? `-${formattedNumber}` : formattedNumber;
};

export default addCommas;
