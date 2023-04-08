import { throwError } from "../../error-handler";
import { digitsFaToEn } from "../digits";

/**
 * Convert a date-time value to timestamp.
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss.
 * @returns {number} Calculates the timestamp of the input.
 */
export const convertToTimeStamp = (datetime: string): number => {
	const patternDateTime = /(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/;
	const dateTime = datetime.match(patternDateTime);

	if (!dateTime) {
		return throwError("convertToTimeStamp", "The input format must be yyyy/mm/dd hh:mm:ss");
	}

	return +new Date(
		+dateTime[1],
		parseInt(dateTime[2], 10) - 1,
		+dateTime[3],
		+dateTime[4],
		+dateTime[5],
		+dateTime[6],
	);
};

/**
 * Get current timestamp of current date-time.
 *
 * @returns {number} Calculates the timestamp of current date-time.
 */
export const getTimeNow = (): number => {
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
};

/**
 * Check format of Input.
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss.
 * @returns {boolean} If format of datetime is ok, return true.
 */
export const checkFormatDateTime = (datetime: string): boolean =>
	Boolean(datetime.match(/^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/));

/**
 * Converting Jalali date-time into a time ago.
 *
 * @category timeAgo
 *
 * @param {string} datetime Format must be yyyy/mm/dd hh:mm:ss. If no value is entered for input, the current time is considered.
 * @returns {string} Return time ago value. Eg: حدود 1 سال قبل
 */
export default function timeAgo(datetime = ""): string {
	if (typeof datetime !== "string") {
		return throwError("timeAgo", "The input must be string");
	}
	if (!datetime && !checkFormatDateTime(datetime)) {
		return throwError("timeAgo", "The input format must be yyyy/mm/dd hh:mm:ss");
	}

	// If input be null then tsDateTime get current timestamp
	if (!datetime) {
		return "اکنون";
	}

	// TimeNow
	const tsTimeNow = getTimeNow();
	// Timestamp DateTime
	const tsDateTime: number = convertToTimeStamp(datetime);
	let elapsed = tsTimeNow - tsDateTime;

	// TimeAgo
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const year = day * 365;

	// for preventing future seconds
	const ignoreMiliSeconds = -10000; // 10s

	if (elapsed == 0 || (elapsed <= 0 && elapsed >= ignoreMiliSeconds)) {
		return "اکنون";
	}

	const prevOrNext: string = elapsed > 0 ? "قبل" : "بعد";
	elapsed = Math.abs(elapsed);

	if (elapsed < minute) {
		return Math.round(elapsed / 1000) + " ثانیه " + prevOrNext;
	}
	if (elapsed < hour) {
		return Math.round(elapsed / minute) + " دقیقه " + prevOrNext;
	}
	if (elapsed < day) {
		return Math.round(elapsed / hour) + " ساعت " + prevOrNext;
	}
	if (elapsed < week) {
		return "حدود " + Math.round(elapsed / day) + " روز " + prevOrNext;
	}
	if (elapsed < month) {
		return "حدود " + Math.round(elapsed / week) + " هفته " + prevOrNext;
	}
	if (elapsed < year) {
		return "حدود " + Math.round(elapsed / month) + " ماه " + prevOrNext;
	}
	{
		return "حدود " + Math.round(elapsed / year) + " سال " + prevOrNext;
	}
}
