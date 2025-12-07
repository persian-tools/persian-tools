import { convertToTimeStamp } from "./timestamp";
import { checkFormatDateTime, getTimeNow, standardizeFaDateTime } from "./helpers";
import { isString } from "../../helpers";
// Constants
import * as constants from "./constants";

/**
 * **Converts Jalali date-time** ("yyyy/mm/dd hh:mm:ss") into a human-readable "time ago".
 *
 * @category timeAgo
 * @param datetime e.g. "1402/06/15 13:05:20" (Jalali)
 * @param timeZone e.g. "Asia/Tehran"
 * @returns e.g. "حدود 1 سال قبل" or "اکنون"
 */
export function timeAgo(datetime: string = "", since: Date = new Date(), timeZone = "Asia/Tehran"): string {
	// 1) Input must be string
	if (!isString(datetime)) {
		throw new TypeError("PersianTools: timeAgo - The input must be a string");
	}

	// 2) No input => interpret as "اکنون"
	if (!datetime) {
		return "اکنون";
	}

	// **PATCH**: Standardize the incoming datetime so it definitely has
	// zero-padded month/day/hour/minute/second
	const normalized = standardizeFaDateTime(datetime);

	// 3) Validate the final format
	if (!checkFormatDateTime(normalized)) {
		throw new TypeError("PersianTools: timeAgo - The input format must be yyyy/mm/dd hh:mm:ss");
	}

	// 4) Calculate "now" vs. this date
	const tsTimeNow = getTimeNow(timeZone, since);
	const tsDateTime = convertToTimeStamp(normalized);

	// 5) Determine the difference
	let elapsed = tsTimeNow - tsDateTime;

	// Near now handling
	// <1s => "اکنون"; <=10s => "چند ثانیه قبل/بعد"

	if (Math.abs(elapsed) < constants.aroundNowMs) {
		return "اکنون";
	}
	if (Math.abs(elapsed) <= constants.shortSecWindow) {
		return elapsed > 0 ? "چند ثانیه قبل" : "چند ثانیه بعد";
	}

	// "قبل" vs. "بعد"
	const prevOrNext: string = elapsed > 0 ? "قبل" : "بعد";
	elapsed = Math.abs(elapsed);

	if (elapsed < constants.minute) {
		return `${Math.round(elapsed / 1000)} ثانیه ${prevOrNext}`;
	} else if (elapsed < constants.hour) {
		return `${Math.round(elapsed / constants.minute)} دقیقه ${prevOrNext}`;
	} else if (elapsed < constants.day) {
		return `${Math.round(elapsed / constants.hour)} ساعت ${prevOrNext}`;
	} else if (elapsed < constants.week) {
		return `حدود ${Math.round(elapsed / constants.day)} روز ${prevOrNext}`;
	} else if (elapsed < constants.month) {
		return `حدود ${Math.round(elapsed / constants.week)} هفته ${prevOrNext}`;
	} else if (elapsed < constants.year) {
		return `حدود ${Math.round(elapsed / constants.month)} ماه ${prevOrNext}`;
	} else {
		return `حدود ${Math.round(elapsed / constants.year)} سال ${prevOrNext}`;
	}
}

export * from "./helpers";
