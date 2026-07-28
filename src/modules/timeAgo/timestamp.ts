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
 * Converts a Jalali (Persian) date to Gregorian.
 * Uses the standard jalaali algorithm (github.com/jalaali/jalaali-js) — no external dependency.
 *
 * @returns [gregorianYear, gregorianMonth (1-12), gregorianDay]
 * @example
 *  jalaliToGregorian(1402, 6, 15) => [2023, 9, 6]
 */
function jalaliToGregorian(jYear: number, jMonth: number, jDay: number): [number, number, number] {
	const div = (a: number, b: number): number => Math.floor(a / b);

	const jy = jYear + 1595;
	let days =
		-355668 +
		365 * jy +
		div(jy, 33) * 8 +
		div((jy % 33) + 3, 4) +
		jDay +
		(jMonth < 7 ? (jMonth - 1) * 31 : (jMonth - 7) * 30 + 186);

	let gy = 400 * div(days, 146097);
	days %= 146097;
	if (days > 36524) {
		gy += 100 * div(--days, 36524);
		days %= 36524;
		if (days >= 365) days++;
	}
	gy += 4 * div(days, 1461);
	days %= 1461;
	if (days > 365) {
		gy += div(days - 1, 365);
		days = (days - 1) % 365;
	}
	let gd = days + 1;

	const isLeap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
	const monthLengths = [0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let gm = 0;
	for (; gm < 13 && gd > monthLengths[gm]; gm++) {
		gd -= monthLengths[gm];
	}

	return [gy, gm, gd];
}
