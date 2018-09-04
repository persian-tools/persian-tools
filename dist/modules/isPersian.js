// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.isPersian = factory());
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

	return isPersian;

})));
