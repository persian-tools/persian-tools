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
			toString: () => "",
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
		toString: () => toString({ years, months, days, hours, minutes, seconds }),
		isFinished: false,
	};
}

/**
 *
 * @param remainingTime contains years, months, days, hours, minutes and seconds remianed to a specific date
 * @returns string that shows remained time in persian.
 * when the year is zero we are not going to show the user `سال`
 * when the year is zero and the month is also zero we are not going to show both `سال` and `ماه`
 * when the year, month and hour are zero we are going to omit related phrases from the output.
 * when the year, month, hour and minute are zero we only show the seconds remianed in output.
 */
const toString = (remainingTime: RemainingTime): string => {
	const { faYears, faMonths, faDays, faHours, faMinutes, faSeconds } = convertToFaDigit(remainingTime);
	const { years, months, days, hours, minutes } = remainingTime;

	const remainingTimeInSeconds =
		years * secondsInYear +
		months * secondsInMonth +
		days * secondsInDay +
		hours * secondsInHour +
		minutes * secondsInMinute;

	const year = remainingTimeInSeconds < secondsInYear ? `` : `${faYears} سال و `;
	const mongth = remainingTimeInSeconds < secondsInMonth ? `` : `${faMonths} ماه و `;
	const day = remainingTimeInSeconds < secondsInDay ? `` : `${faDays} روز و `;
	const hour = remainingTimeInSeconds < secondsInHour ? `` : `${faHours} ساعت و `;
	const minute = remainingTimeInSeconds < secondsInMinute ? `` : `${faMinutes} دقیقه و `;
	const second = `${faSeconds} ثانیه`;

	return year + mongth + day + hour + minute + second;
};

/**
 *
 * @param remainingTime
 * @returns convert years, months, days, hours, minutes and seconds to farsi digits and return them in an object with keys:
 * `faYears`, `faMonths`, `faHours`, `faMinutes`, `faSeconds`
 */
const convertToFaDigit = (
	remainingTime: RemainingTime,
): {
	faYears: string;
	faMonths: string;
	faDays: string;
	faHours: string;
	faMinutes: string;
	faSeconds: string;
} => {
	return {
		faYears: digitsEnToFa(remainingTime.years),
		faMonths: digitsEnToFa(remainingTime.months),
		faDays: digitsEnToFa(remainingTime.days),
		faHours: digitsEnToFa(remainingTime.hours),
		faMinutes: digitsEnToFa(remainingTime.minutes),
		faSeconds: digitsEnToFa(remainingTime.seconds),
	};
};

export default remainingTime;
