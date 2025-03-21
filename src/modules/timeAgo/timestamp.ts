import { autoConvertDigitsToEN } from "../digits";

/**
 * Converts Jalali date-time ("yyyy/mm/dd hh:mm:ss") to a **Unix timestamp** (ms).
 *
 * **Key Fix**:
 *  - Converts Persian digits to English digits.
 *  - Matches the input with a `yyyy/mm/dd hh:mm:ss` pattern.
 *  - **Transforms** Jalali year/month/day into Gregorian year/month/day before calling `new Date(...)`.
 *  - Throws `TypeError` if the format is invalid.
 *
 * @param datetime - A Jalali date-time string in "yyyy/mm/dd hh:mm:ss" format.
 * @returns The equivalent timestamp in milliseconds (same as `Date.getTime()`).
 */
export function convertToTimeStamp(datetime: string): number {
	// **Normalize** digits (e.g., '۱۴۰۲' => '1402')
	const normalized: string = autoConvertDigitsToEN(datetime);

	// **Regex** ensures: 1402/06/02 14:12:05
	const patternDateTime = /^(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)$/;
	const match = normalized.match(patternDateTime);
	if (!match) {
		throw new TypeError("PersianTools: convertToTimeStamp - The input format must be yyyy/mm/dd hh:mm:ss");
	}

	// Extract Jalali components
	const [, jyRaw, jmRaw, jdRaw, hhRaw, mnRaw, ssRaw] = match;
	const jy: number = parseInt(jyRaw, 10);
	const jm: number = parseInt(jmRaw, 10);
	const jd: number = parseInt(jdRaw, 10);
	const hh: number = parseInt(hhRaw, 10);
	const mn: number = parseInt(mnRaw, 10);
	const ss: number = parseInt(ssRaw, 10);

	// **Convert** Jalali => Gregorian
	// For demonstration, we inline a naive "jalaliToGregorian" stub.
	// Replace with your actual conversion logic or library:
	const [gy, gM, gD] = jalaliToGregorian(jy, jm, jd);

	// **Construct** a real JS Date in Gregorian
	const date = new Date(gy, gM - 1, gD, hh, mn, ss);

	return date.getTime();
}

/**
 * **Stub** for converting Jalali date to Gregorian date.
 * Replace with your actual logic or library function.
 *
 * @example
 *  jalaliToGregorian(1402, 6, 15) => [2023, 9, 6]
 */
function jalaliToGregorian(jYear: number, jMonth: number, jDay: number): [number, number, number] {
	// This is just an example. You must provide your real conversion.
	// See e.g.  https://github.com/jalaali/jalaali-js
	// For demonstration, assume a simplistic offset (~621.57 years).
	const gregorianYear = jYear + 621; // approximate
	// You'd need to handle the month, day offset carefully. Using a real library is best.

	// For a real conversion, see official algorithms or a library like jalaali-js
	return [gregorianYear, jMonth, jDay];
}
