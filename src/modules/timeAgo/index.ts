import { convertToTimeStamp } from "./timestamp";
import { checkFormatDateTime, getTimeNow, standardizeFaDateTime } from "./helpers";

/**
 * **Converts Jalali date-time** ("yyyy/mm/dd hh:mm:ss") into a human-readable "time ago".
 *
 * @category timeAgo
 * @param datetime e.g. "1402/06/15 13:05:20" (Jalali)
 * @returns e.g. "حدود 1 سال قبل" or "اکنون"
 */
export default function timeAgo(datetime: string = ""): string {
	// 1) Input must be string
	if (typeof datetime !== "string") {
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
	const tsTimeNow = getTimeNow();
	const tsDateTime = convertToTimeStamp(normalized);

	// 5) Determine difference
	let elapsed = tsTimeNow - tsDateTime;

	// ±10 seconds => "چند ثانیه قبل"
	const ignoreSec = 10_000;
	if (Math.abs(elapsed) <= ignoreSec) {
		return elapsed > 0 ? "چند ثانیه قبل" : elapsed === 0 ? "اکنون" : "چند ثانیه بعد";
	}

	// "قبل" vs. "بعد"
	const prevOrNext: string = elapsed > 0 ? "قبل" : "بعد";
	elapsed = Math.abs(elapsed);

	const minute = 60_000;
	const hour = 3_600_000;
	const day = 86_400_000;
	const week = day * 7;
	const month = day * 30;
	const year = day * 365;

	if (elapsed < minute) {
		return `${Math.round(elapsed / 1000)} ثانیه ${prevOrNext}`;
	} else if (elapsed < hour) {
		return `${Math.round(elapsed / minute)} دقیقه ${prevOrNext}`;
	} else if (elapsed < day) {
		return `${Math.round(elapsed / hour)} ساعت ${prevOrNext}`;
	} else if (elapsed < week) {
		return `حدود ${Math.round(elapsed / day)} روز ${prevOrNext}`;
	} else if (elapsed < month) {
		return `حدود ${Math.round(elapsed / week)} هفته ${prevOrNext}`;
	} else if (elapsed < year) {
		return `حدود ${Math.round(elapsed / month)} ماه ${prevOrNext}`;
	} else {
		return `حدود ${Math.round(elapsed / year)} سال ${prevOrNext}`;
	}
}
