import { convertToTimeStamp } from "./timestamp";
import { autoConvertDigitsToEN } from "../digits";
import { zeroPad } from "../../helpers";

/**
 * **standardizeFaDateTime**:
 * - Removes hidden characters (e.g., `،`, `\u200f`).
 * - Unifies Persian/Arabic digits to English.
 * - Splits on space to separate "yyyy/mm/dd" and "hh:mm:ss".
 * - **Zero-pads** each numeric part so we end up with "yyyy/mm/dd hh:mm:ss".
 *
 * @param datetime A Jalali date string from `toLocaleString("fa-IR")`
 * @returns A standardized string, e.g. "1402/06/03 02:07:09"
 */
export function standardizeFaDateTime(datetime: string): string {
	// 1) Remove special punctuation / RTL chars and hidden markers (e.g., `،`, `\u200f`) and Commas(Arabic, Persian and English).
	let cleaned = datetime
		.replace(/[‏،]/g, "")
		.replace(/\u200f/g, "")
		.replace(/\u200e/g, "")
		.replace(/\u200d/g, "")
		.replace(/,/g, "");

	// 2) Auto-convert Persian/Arabic digits to English digits
	cleaned = autoConvertDigitsToEN(cleaned);

	// 3) Split into date + time => e.g. "1402/6/3 2:7:9"
	const [datePart, timePart] = cleaned.split(" ");
	if (!datePart || !timePart) {
		return cleaned; // Let the regex fail if missing parts
	}

	// 4) Break down datePart => "yyyy/mm/dd"
	const [yyyy, mmRaw, ddRaw] = datePart.split("/");
	if (!yyyy || !mmRaw || !ddRaw) {
		return cleaned; // Let the regex fail
	}

	// 5) Break down timePart => "hh:mm:ss"
	const [hhRaw, mnRaw, ssRaw] = timePart.split(":");
	if (!hhRaw || !mnRaw || !ssRaw) {
		return cleaned; // Let the regex fail
	}

	// 6) Zero-pad each piece
	const mm = zeroPad(mmRaw);
	const dd = zeroPad(ddRaw);
	const hh = zeroPad(hhRaw);
	const mn = zeroPad(mnRaw);
	const ss = zeroPad(ssRaw);

	// 7) Reassemble => "1402/06/03 02:07:09"
	return `${yyyy}/${mm}/${dd} ${hh}:${mn}:${ss}`;
}

/**
 * **Validates** "yyyy/mm/dd hh:mm:ss" format with flexible digits (1..2 for month/day, etc.).
 * After the new patch, we first standardize to EXACT "yy/mm/dd hh:mm:ss" with two digits each.
 */
export function checkFormatDateTime(datetime: string): boolean {
	// Old: strictly \d{2} for month/day => fails "6/3"
	// Updated: \d{1,2} => allows "6" or "06"
	return /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(datetime);
}

/**
 * **Gets the current timestamp** of the Jalali "now" by:
 * - Generating a new Date
 * - Localizing it to fa-IR
 * - **Standardizing** it (removing hidden chars, zero-padding, etc.)
 * - Converting to a real JS timestamp
 */
export function getTimeNow(): number {
	const now = new Date();
	const faLocaleString = now.toLocaleString("fa-IR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	// **Standardize** the fa-IR string to guaranteed "yyyy/mm/dd hh:mm:ss"
	const cleanedNow = standardizeFaDateTime(faLocaleString);
	return convertToTimeStamp(cleanedNow);
}
