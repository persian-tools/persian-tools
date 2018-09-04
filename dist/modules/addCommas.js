// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.addCommas = factory());
}(this, (function () { 'use strict';

	/**
	 * @param {string}
	 * @return {boolean}
	 */
	var isPersian = function isPersian(str) {
		if (!str) return;

		var letters = [];
		for (var i = 0; i <= str.length; i++) {
			letters[i] = str.substring(i - 1, i);
			if (letters[i].charCodeAt() > 255) {
				return true;
			}
		}
		return false;
	};

	var faNums = "۰۱۲۳۴۵۶۷۸۹";

	/** digitsFaToEn
	 *
	 *  Description: Takes a string made of English digits only, and
	 *  returns a string that represents the same number but with
	 *  Persian digits
	 *
	 */
	function digitsFaToEn(str) {
		if (!str) return;

		str = str.toString();
		for (var i = 0; i < 10; i++) {
			var replaceFaToEn = new RegExp(faNums[i], "g");
			str = str.replace(replaceFaToEn, i);
		}

		return str;
	}

	/**
	 * Add Commas into number
	 * @method addCommas
	 * @param   {Number}  number [Number, like: 300000]
	 * @return  {String}  		 [Returned String, like: 30,000]
	 */
	var addCommas = function addCommas(number) {
	  if (!number) return;

	  number = "" + number;
	  number = isPersian(number) ? digitsFaToEn(number) : number;

	  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};

	return addCommas;

})));
