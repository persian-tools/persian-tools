import { digitsFaToEn, timeAgo } from "../src";
import { checkFormatDateTime } from "../src/modules/timeAgo";

function getTime(second: number) {
	const currentDateTime: string = new Date(Date.now() + second)
		.toLocaleString("fa-IR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: "Asia/Tehran",
		})
		.replace(/‏|،/g, "");
	return digitsFaToEn(currentDateTime);
}
describe("timeAgo", () => {
	it("Previous", () => {
		expect(timeAgo(getTime(-10 * 1000))).toEqual("10 ثانیه قبل");
		expect(timeAgo(getTime(-3 * 60 * 1000))).toEqual("3 دقیقه قبل");
		expect(timeAgo(getTime(-18 * 60 * 60 * 1000))).toEqual("18 ساعت قبل");
		expect(timeAgo(getTime(-5 * 24 * 60 * 60 * 1000))).toEqual("حدود 5 روز قبل");
		expect(timeAgo(getTime(-7 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 هفته قبل");
		expect(timeAgo(getTime(-7 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 7 ماه قبل");
		expect(timeAgo(getTime(-14 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 سال قبل");
	});

	it("Now", () => {
		expect(timeAgo(getTime(0))).toEqual("اکنون");
	});

	it("Next", () => {
		expect(timeAgo(getTime(10 * 1000))).toEqual("10 ثانیه بعد");
		expect(timeAgo(getTime(3 * 60 * 1000))).toEqual("3 دقیقه بعد");
		expect(timeAgo(getTime(18 * 60 * 60 * 1000))).toEqual("18 ساعت بعد");
		expect(timeAgo(getTime(5 * 24 * 60 * 60 * 1000))).toEqual("حدود 4 روز بعد");
		expect(timeAgo(getTime(7 * 24 * 60 * 60 * 1000))).toEqual("حدود 6 روز بعد");
		expect(timeAgo(getTime(7 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 7 ماه بعد");
		expect(timeAgo(getTime(14 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 سال بعد");
	});

	it("Check Input Regex", () => {
		expect(checkFormatDateTime("1400/03/18 12:22:14")).toEqual(true);
		expect(checkFormatDateTime("1400/03/18 12:2:4")).toEqual(true);
		expect(checkFormatDateTime("1400/03/18 12:22")).toEqual(false);
		expect(checkFormatDateTime("1400/03/18 12:2:455")).toEqual(false);
		expect(checkFormatDateTime("1400-03-18 12:2:45")).toEqual(false);
	});
});
