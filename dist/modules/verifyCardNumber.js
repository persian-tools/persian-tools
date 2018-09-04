// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.verifyCardNumber = factory());
}(this, (function () { 'use strict';

	function verifyCardNumber(digits) {
		if (!digits) return;

		digits = digits.toString();

		var length = digits.length;
		if (length < 16 || parseInt(digits.substr(1, 10), 10) === 0 || parseInt(digits.substr(10, 6), 10) === 0) {
			return false;
		}

		var sum = 0;
		var even = void 0,
		    subDigit = void 0;
		for (var i = 0; i < 16; i++) {
			even = i % 2 === 0 ? 2 : 1;
			subDigit = parseInt(digits.substr(i, 1), 10) * even;
			sum += subDigit > 9 ? subDigit - 9 : subDigit;
		}
		return sum % 10 === 0;
	}

	return verifyCardNumber;

})));
