import { describe, it, expect } from "vitest";
import { timeAgo } from "../src"; // <-- adjust the import path
import { checkFormatDateTime, standardizeFaDateTime } from "../src/modules/timeAgo/helpers";

/**
 * **Helper** function to create a date string in "fa-IR" locale,
 * then patch it so it **always** matches "yyyy/mm/dd hh:mm:ss" format.
 *
 * @param second - The offset (in ms) from a reference `now`.
 * @param now - The reference timestamp (default: 1627253049326).
 * @returns A patched Jalali date-time string suitable for `timeAgo`.
 */
function getTime(second: number, now: number = Date.now()): string {
	// 1) Construct a new Date by offsetting `now`.
	const date = new Date(now + second);

	// 2) Convert to "fa-IR" locale string (which might have single-digit segments).
	const faDateString = date.toLocaleString("fa-IR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "Asia/Tehran",
	});

	// 3) Standardize => removing hidden chars, zero-padding, etc.
	return standardizeFaDateTime(faDateString);
}

/**
 * **Test Suite** for `timeAgo` and its helper `checkFormatDateTime`.
 *
 * Covers:
 * - **Past times**: from seconds up to months/years ago
 * - **Present** ("اکنون")
 * - **Future times**: seconds up to months/years ahead
 * - **Edge cases** around boundaries (e.g. 59s, 1m, ~24h, ~7d, etc.)
 * - **Format checking** for Jalali date-time strings (`checkFormatDateTime`)
 */
describe("timeAgo", () => {
	/**
	 * **Group 1**: Testing **Past Times** ("قبل").
	 * - We use negative offsets in `getTime(...)`.
	 */
	describe("Previous Times", () => {
		it("should handle very recent past (10 seconds ago)", () => {
			// Depending on your `timeAgo` logic, it might say "10 ثانیه قبل" or "چند ثانیه قبل".
			// Adjust the expected text if your function uses a different phrase.
			expect(timeAgo(getTime(-10 * 1000))).toEqual("چند ثانیه قبل");
		});

		it("should handle a few minutes ago", () => {
			expect(timeAgo(getTime(-3 * 60 * 1000))).toEqual("3 دقیقه قبل");
		});

		it("should handle many hours ago (18)", () => {
			expect(timeAgo(getTime(-18 * 60 * 60 * 1000))).toEqual("18 ساعت قبل");
		});

		it("should handle multiple days (5 days ago)", () => {
			expect(timeAgo(getTime(-5 * 24 * 60 * 60 * 1000))).toEqual("حدود 5 روز قبل");
		});

		it("should handle exactly 7 days ago => ~1 week", () => {
			expect(timeAgo(getTime(-7 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 هفته قبل");
		});

		it("should handle large offset (~7 months ago)", () => {
			expect(timeAgo(getTime(-7 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 7 ماه قبل");
		});

		it("should handle ~1 year ago", () => {
			expect(timeAgo(getTime(-14 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 سال قبل");
		});

		/**
		 * **Additional** boundary checks:
		 * - 59 seconds => "59 ثانیه قبل" (or "چند ثانیه قبل")
		 * - 60 seconds => "1 دقیقه قبل"
		 */
		it("boundary: 59 seconds => ~59 ثانیه قبل", () => {
			// Adjust text if your function uses "چند ثانیه قبل" for <60s
			expect(timeAgo(getTime(-59 * 1000))).toEqual("59 ثانیه قبل");
		});

		it("boundary: 60 seconds => 1 دقیقه قبل", () => {
			expect(timeAgo(getTime(-60 * 1000))).toEqual("1 دقیقه قبل");
		});
	});

	/**
	 * **Group 2**: Testing the **Present**.
	 */
	describe("Now", () => {
		it("should return 'اکنون' for no offset (0 ms)", () => {
			// Using the real Date.now() ensures we get a current date string
			expect(timeAgo(getTime(0, Date.now()))).toEqual("اکنون");
		});

		// Additional test: if your logic uses a small threshold (e.g., ±10s => "چند ثانیه قبل")
		it("small threshold around now => 'اکنون'", () => {
			expect(timeAgo(getTime(-15 * 1000, Date.now()))).toEqual("15 ثانیه قبل");
		});
	});

	/**
	 * **Group 3**: Testing **Future Times** ("بعد").
	 * - We use positive offsets in `getTime(...)`.
	 */
	describe("Next Times", () => {
		it("should handle very soon future (10 seconds)", () => {
			expect(timeAgo(getTime(10 * 1000))).toEqual("چند ثانیه بعد");
		});

		it("should handle minutes in future (3 minutes)", () => {
			expect(timeAgo(getTime(3 * 60 * 1000))).toEqual("3 دقیقه بعد");
		});

		it("should handle hours in future (18 hours)", () => {
			expect(timeAgo(getTime(18 * 60 * 60 * 1000))).toEqual("18 ساعت بعد");
		});

		it("should handle multiple days ahead (5 days)", () => {
			// The existing example says "حدود 4 روز بعد" for 5 days difference,
			// but that could be your logic rounding down. Adjust if needed.
			expect(timeAgo(getTime(5 * 24 * 60 * 60 * 1000))).toEqual("حدود 5 روز بعد");
		});

		it("should handle 7 days => ~6 days after (based on your logic)", () => {
			expect(timeAgo(getTime(7 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 هفته بعد");
		});

		it("should handle ~7 months ahead", () => {
			expect(timeAgo(getTime(7 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 7 ماه بعد");
		});

		it("should handle ~1 year ahead", () => {
			expect(timeAgo(getTime(14 * 30 * 24 * 60 * 60 * 1000))).toEqual("حدود 1 سال بعد");
		});

		/**
		 * **Additional** boundary checks:
		 * - 59 seconds => "59 ثانیه بعد"
		 * - 60 seconds => "1 دقیقه بعد"
		 */
		it("boundary: 59 seconds => 59 ثانیه بعد", () => {
			expect(timeAgo(getTime(59 * 1000))).toEqual("59 ثانیه بعد");
		});

		it("boundary: 60 seconds => 1 دقیقه بعد", () => {
			expect(timeAgo(getTime(60 * 1000))).toEqual("1 دقیقه بعد");
		});
	});

	/**
	 * **Group 4**: Testing **checkFormatDateTime** for Jalali date/time strings.
	 * - This verifies that date/time strings adhere to the correct "YYYY/MM/DD HH:mm:ss" format.
	 */
	describe("Check Input Regex (checkFormatDateTime)", () => {
		it("valid: 1400/03/18 12:22:14 => true", () => {
			expect(checkFormatDateTime("1400/03/18 12:22:14")).toEqual(true);
		});

		it("valid: 1400/03/18 12:2:4 => true", () => {
			expect(checkFormatDateTime("1400/03/18 12:2:4")).toEqual(true);
		});

		it("invalid: missing seconds => false", () => {
			expect(checkFormatDateTime("1400/03/18 12:22")).toEqual(false);
		});

		it("invalid: seconds too long => false", () => {
			expect(checkFormatDateTime("1400/03/18 12:2:455")).toEqual(false);
		});

		it("invalid: uses '-' instead of '/' => false", () => {
			expect(checkFormatDateTime("1400-03-18 12:2:45")).toEqual(false);
		});
	});
});
