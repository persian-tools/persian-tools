/**
 * RemainedTime
 *
 * @description Takes a date(it could be string, number or date) and calculate years,
 * months, days, hours, minutes and seconds remained to that specific date.
 *
 * @param {string | number | Date} date - a string, number or date
 * @return {RemainedTime & ToString & IsFinished}
 */

import { digitsEnToFa } from "../digits";
import { getCurrentDateTime } from "./getCurrentDateTime";

type RemainedTime = {
	Years: number;
	Months: number;
	Days: number;
	Hours: number;
	Minutes: number;
	Seconds: number;
};

type ToString = { toString: () => string };

type IsFinished = { isFinished: boolean };

const secondsInYear = 60 * 60 * 24 * 365;
const secondsInMonth = 60 * 60 * 24 * 30;
const secondsInDay = 60 * 60 * 24;
const secondsInHour = 60 * 60 * 1;
const secondsInMinute = 60 * 1;

function RemainedTime(date: string | number | Date): RemainedTime & ToString & IsFinished {
	const dueDate = new Date(date);
	if (isNaN(dueDate.getDate())) {
		throw new TypeError("PersianTools: RemainedTime - The input must be a valid date");
	}
	const now = getCurrentDateTime();
	let remainedTime = Math.floor((Number(dueDate) - Number(now)) / 1000);

	if (Number(dueDate) - Number(now) <= 0) {
		return {
			Years: 0,
			Months: 0,
			Days: 0,
			Hours: 0,
			Minutes: 0,
			Seconds: 0,
			toString: () => {
				return "";
			},
			isFinished: true,
		};
	}

	const Years = Math.floor(remainedTime / secondsInYear);
	remainedTime %= secondsInYear;

	const Months = Math.floor(remainedTime / secondsInMonth);
	remainedTime %= secondsInMonth;

	const Days = Math.floor(remainedTime / secondsInDay);
	remainedTime %= secondsInDay;

	const Hours = Math.floor(remainedTime / secondsInHour);
	remainedTime %= secondsInHour;

	const Minutes = Math.floor(remainedTime / secondsInMinute);
	remainedTime %= secondsInMinute;

	const Seconds = remainedTime;

	return {
		Years,
		Months,
		Days,
		Hours,
		Minutes,
		Seconds,
		toString: () => {
			return toString({ Years, Months, Days, Hours, Minutes, Seconds });
		},
		isFinished: false,
	};
}

/**
 *
 * @param remainedTime contains years, months, days, hours, minutes and seconds remianed to a specific date
 * @returns string that shows remained time in persian.
 * when the year is zero we are not going to show the user `سال`
 * when the year is zero and the month is also zero we are not going to show both `سال` and `ماه`
 * when the year, month and hour are zero we are going to omit related phrases from the output.
 * when the year, month, hour and minute are zero we only show the seconds remianed in output.
 */
const toString = (remainedTime: RemainedTime): string => {
	const { faYears, faMonths, faDays, faHours, faMinutes, faSeconds } = convertToFaDigit(remainedTime);
	const { Years, Months, Days, Hours, Minutes } = remainedTime;

	const remainedTimeInSeconds =
		Years * secondsInYear +
		Months * secondsInMonth +
		Days * secondsInDay +
		Hours * secondsInHour +
		Minutes * secondsInMinute;

	const year = remainedTimeInSeconds < secondsInYear ? `` : `${faYears} سال و `;
	const mongth = remainedTimeInSeconds < secondsInMonth ? `` : `${faMonths} ماه و `;
	const day = remainedTimeInSeconds < secondsInDay ? `` : `${faDays} روز و `;
	const hour = remainedTimeInSeconds < secondsInHour ? `` : `${faHours} ساعت و `;
	const minute = remainedTimeInSeconds < secondsInMinute ? `` : `${faMinutes} دقیقه و `;
	const second = `${faSeconds} ثانیه`;

	return year + mongth + day + hour + minute + second;
};

/**
 *
 * @param remainedTime
 * @returns convert years, months, days, hours, minutes and seconds to farsi digits and return them in an object with keys:
 * `faYears`, `faMonths`, `faHours`, `faMinutes`, `faSeconds`
 */
const convertToFaDigit = (
	remainedTime: RemainedTime,
): {
	faYears: string;
	faMonths: string;
	faDays: string;
	faHours: string;
	faMinutes: string;
	faSeconds: string;
} => {
	return {
		faYears: digitsEnToFa(remainedTime.Years),
		faMonths: digitsEnToFa(remainedTime.Months),
		faDays: digitsEnToFa(remainedTime.Days),
		faHours: digitsEnToFa(remainedTime.Hours),
		faMinutes: digitsEnToFa(remainedTime.Minutes),
		faSeconds: digitsEnToFa(remainedTime.Seconds),
	};
};

export default RemainedTime;
