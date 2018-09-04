// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.NumberToWords = factory());
}(this, (function () { 'use strict';

	var trim = function trim(str) {
		return str.replace(/^\s+|\s+$/g, "");
	};

	/**
	 * Remove all commas in String
	 * @param  {[number]} number
	 * @return {[string]}
	 */
	var removeCommas = function removeCommas(number) {
		if (!number) {
			return;
		}

		if (number.toString(16).indexOf(",") !== -1) {
			number = number.replace(/,\s?/g, "");
		}

		return typeof number === "number" ? number : parseInt(number, 10);
	};

	// <Refrence path="https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)" />

	var config = {
		scale: ["", "هزار", "میلیون", "میلیارد"]
	};

	var numberToWord = {};

	numberToWord[0] = "";
	numberToWord[1] = "یک";
	numberToWord[2] = "دو";
	numberToWord[3] = "سه";
	numberToWord[4] = "چهار";
	numberToWord[5] = "پنج";
	numberToWord[6] = "شش";
	numberToWord[7] = "هفت";
	numberToWord[8] = "هشت";
	numberToWord[9] = "نه";
	numberToWord[10] = "ده";
	numberToWord[11] = "یازده";
	numberToWord[12] = "دوازده";
	numberToWord[13] = "سیزده";
	numberToWord[14] = "چهارده";
	numberToWord[15] = "پانزده";
	numberToWord[16] = "شانزده";
	numberToWord[17] = "هفده";
	numberToWord[18] = "هجده";
	numberToWord[19] = "نوزده";
	numberToWord[20] = "بیست";
	numberToWord[30] = "سی";
	numberToWord[40] = "چهل";
	numberToWord[50] = "پنجاه";
	numberToWord[60] = "شصت";
	numberToWord[70] = "هفتاد";
	numberToWord[80] = "هشتاد";
	numberToWord[90] = "نود";
	numberToWord[100] = "صد";
	numberToWord[200] = "دویست";
	numberToWord[300] = "سیصد";
	numberToWord[400] = "چهار صد";
	numberToWord[500] = "پانصد";
	numberToWord[600] = "شش صد";
	numberToWord[700] = "هفت صد";
	numberToWord[800] = "هشت صد";
	numberToWord[900] = "نه صد";

	/**
	 * toWords, Convert Numbers to Persian Text
	 * @param  {String} number
	 * @return {Number|String}
	 */
	var toWords = function toWords(number) {
		var unit = 100;
		var result = "";

		while (unit > 0) {
			if (Math.floor(number / unit) * unit !== 0) {
				if (number in numberToWord) {
					result += numberToWord[number];
					break;
				} else {
					result += numberToWord[Math.floor(number / unit) * unit] + " و ";
					number %= unit;
				}
			}
			unit = Math.floor(unit / 10);
		}
		return result;
	};

	var NumberToWords = function NumberToWords(number) {
		if (!number) return;

		if (number === "") {
			return "";
		}
		if (number === 0) {
			return "۰";
		}

		var base = 1000;

		var result = [];

		number = removeCommas(number);

		var isNegative = number < 0;
		number = isNegative ? number * -1 : number;

		while (number > 0) {
			result.push(toWords(number % base));
			number = Math.floor(number / base);
		}
		if (result.length > 4) {
			return "";
		}

		for (var i = 0; i < result.length; i++) {
			if (result[i] !== "") {
				result[i] += " " + config.scale[i] + " و ";
			}
		}
		result.reverse();

		var words = result.join("");
		while (words.endsWith(" و ")) {
			words = words.slice(0, -3);
		}

		return trim(isNegative ? "\u0645\u0646\u0641\u06CC " + words : words);
	};

	return NumberToWords;

})));
