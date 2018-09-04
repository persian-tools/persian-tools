// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.removeCommas = factory());
}(this, (function () { 'use strict';

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

	return removeCommas;

})));
