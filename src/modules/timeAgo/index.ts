import { digitsFaToEn } from "../digits";

/**
 * Convert a date-time value to timestamp.
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss.
 * @returns {number} Calculates the timestamp of the input.
 */
export function convertToTimeStamp(datetime: string): number {
	const patternDateTime = /(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/;
	const dateTime = datetime.match(patternDateTime);
	if (dateTime) {
		const date: Date = new Date(
			Number(dateTime[1]),
			parseInt(dateTime[2], 10) - 1,
			Number(dateTime[3]),
			Number(dateTime[4]),
			Number(dateTime[5]),
			Number(dateTime[6]),
		);
		return date.getTime();
	} else throw new TypeError("PersianTools: convertToTimeStamp - The input format must be yyyy/mm/dd hh:mm:ss");
}

/**
 * Get current timestamp of current date-time.
 *
 * @returns {number} Calculates the timestamp of current date-time.
 */
export function getTimeNow(): number {
	const now = Date.now();
	const currentDateTime: string = new Date(now)
		.toLocaleString("fa-IR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
		.replace(/‏|،/g, "");

	return convertToTimeStamp(digitsFaToEn(currentDateTime));
}

/**
 * Check format of Input.
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss.
 * @returns {boolean} If format of datetime is ok, return true.
 */
export function checkFormatDateTime(datetime: string): boolean {
	return Boolean(datetime.match(/^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/));
}

/**
 * Converting Jalali date-time into a time ago.
 *
 * @category timeAgo
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss. If no value is entered for input, the current time is considered.
 * @returns {string} Return time ago value. Eg: حدود 1 سال قبل
 */
export default function timeAgo(datetime = ""): string {
	if (typeof datetime !== "string") throw new TypeError("PersianTools: timeAgo - The input must be string");

	if (!checkFormatDateTime(datetime) && datetime !== "")
		throw new TypeError("PersianTools: timeAgo - The input format must be yyyy/mm/dd hh:mm:ss");

	// Timestamp DateTime
	let tsDateTime: number;

	// If input be null then tsDateTime get current timestamp
	if (datetime === "") tsDateTime = getTimeNow();
	else tsDateTime = convertToTimeStamp(datetime);

	// TimeNow
	const tsTimeNow = getTimeNow();

	// TimeAgo
	const minute = 60 * 1000,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7,
		month = day * 30,
		year = day * 365;

	let elapsed = tsTimeNow - tsDateTime;

	if (elapsed === 0) return "اکنون";

	const prevOrNext: string = elapsed > 0 ? "قبل" : "بعد";

	elapsed = elapsed < 0 ? Math.abs(elapsed) : elapsed;

	if (elapsed < minute) {
		return Math.round(elapsed / 1000) + " ثانیه " + prevOrNext;
	} else if (elapsed < hour) {
		return Math.round(elapsed / minute) + " دقیقه " + prevOrNext;
	} else if (elapsed < day) {
		return Math.round(elapsed / hour) + " ساعت " + prevOrNext;
	} else if (elapsed < week) {
		return "حدود " + Math.round(elapsed / day) + " روز " + prevOrNext;
	} else if (elapsed < month) {
		return "حدود " + Math.round(elapsed / week) + " هفته " + prevOrNext;
	} else if (elapsed < year) {
		return "حدود " + Math.round(elapsed / month) + " ماه " + prevOrNext;
	} else {
		return "حدود " + Math.round(elapsed / year) + " سال " + prevOrNext;
	}
}
