import { digitsFaToEn } from "../digits";

export function convertToTimeStamp(datetime: string): number {
	const patternDateTime = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
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
		return date.getTime(); // 1623036870000
	} else throw new TypeError("PersianTools: timeAgo - The input format must be yyyy-mm-dd hh:mm:ss");
}

/**
 * Get current timestamp of Now datetime
 */
export function getTimeNow(): number {
	const date: string[] = new Date(Date.now())
		.toLocaleDateString("fa-IR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.split("/");

	const time: string[] = new Date(Date.now())
		.toLocaleTimeString("fa-IR", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
		.split(":");

	return convertToTimeStamp(
		digitsFaToEn(date[0] + "-" + date[1] + "-" + date[2] + " " + time[0] + ":" + time[1] + ":" + time[2]),
	);
}

/**
 * Input format must be yyyy-mm-dd hh:mm:ss
 * @param datetime
 */
export function checkFormatDateTime(datetime: string): boolean {
	return Boolean(datetime.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/));
}

/**
 * TimeAgo
 *
 * @category timeAgo
 * @description Converting a Jalali datetime into a time ago
 */
export default function timeAgo(datetime = ""): string {
	if (typeof datetime !== "string") throw new TypeError("PersianTools: timeAgo - The input must be string");

	if (!checkFormatDateTime(datetime) && datetime !== "")
		throw new TypeError("PersianTools: timeAgo - The input format must be yyyy-mm-dd hh:mm:ss");

	// Timestamp DateTime
	let tsDateTime: number;

	// If input be null then tsDateTime get current timestamp
	if (datetime === "") tsDateTime = getTimeNow();
	else tsDateTime = convertToTimeStamp(datetime);

	// TimeNow
	const tsTimeNow: number = getTimeNow();

	// TimeAgo
	const minute: number = 60 * 1000,
		hour: number = minute * 60,
		day: number = hour * 24,
		week: number = day * 7,
		month: number = day * 30,
		year: number = day * 365;

	let elapsed: number = tsTimeNow - tsDateTime;

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
