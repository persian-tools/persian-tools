/**
 * RemainingTime
 *
 * @description Takes a date(it could be string, number or date) and calculate years,
 * months, days, hours, minutes and seconds remained to that specific date.
 *
 * @param {string | number | Date} date - a string, number or date
 * @return {RemainingTime & ToString & IsFinished}
 */

import { digitsEnToFa } from "../digits";
import { getCurrentDateTime } from "./getCurrentDateTime";

type RemainingTime = {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type ToString = { toString: () => string };

type IsFinished = { isFinished: boolean };

const secondsInYear = 60 * 60 * 24 * 365;
const secondsInMonth = 60 * 60 * 24 * 30;
const secondsInDay = 60 * 60 * 24;
const secondsInHour = 60 * 60 * 1;
const secondsInMinute = 60 * 1;

function remainingTime(date: string | number | Date): RemainingTime & ToString & IsFinished {
	const dueDate = new Date(date);
	if (isNaN(dueDate.getDate())) {
		throw new TypeError("PersianTools: remainingTime - The input must be a valid date");
	}
	const now = getCurrentDateTime();
	let remainingTime = Math.floor((Number(dueDate) - Number(now)) / 1000);

	if (Number(dueDate) - Number(now) <= 0) {
		return {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			toString: () => {
				return "";
			},
			isFinished: true,
		};
	}

	const years = Math.floor(remainingTime / secondsInYear);
	remainingTime %= secondsInYear;

	const months = Math.floor(remainingTime / secondsInMonth);
	remainingTime %= secondsInMonth;

	const days = Math.floor(remainingTime / secondsInDay);
	remainingTime %= secondsInDay;

	const hours = Math.floor(remainingTime / secondsInHour);
	remainingTime %= secondsInHour;

	const minutes = Math.floor(remainingTime / secondsInMinute);
	remainingTime %= secondsInMinute;

	const seconds = remainingTime;

	return {
		years,
		months,
		days,
		hours,
		minutes,
		seconds,
		toString: () => {
			return toString({ years, months, days, hours, minutes, seconds });
		},
		isFinished: false,
	};
}

/**
 * @param remainingTime contains years, months, days, hours, minutes and seconds remianed to a specific date
 * @returns Converts the remaining time to a Persian string representation.
 * Persian string representation of the remaining time, showing non-zero fields with their respective units.
 */
const toString = (remainingTime: RemainingTime): string => {
	const { years, months, days, hours, minutes, seconds } = remainingTime;
	const result: string[] = [];

	if (years > 0) result.push(`${years} سال`);
	if (months > 0) result.push(`${months} ماه`);
	if (days > 0) result.push(`${days} روز`);
	if (hours > 0) result.push(`${hours} ساعت`);
	if (minutes > 0) result.push(`${minutes} دقیقه`);
	if (seconds > 0) result.push(`${seconds} ثانیه`);

	return digitsEnToFa(result.join(" و "));
};

export default remainingTime;
