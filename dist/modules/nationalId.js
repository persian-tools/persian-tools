// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.nationalId = factory());
}(this, (function () { 'use strict';

	/**
	 * Check National-id validation
	 * @method verifyIranianNationalId
	 * @param  {String?}          nationalId [String of national id - like this: 1111111111]
	 * @return {Boolean}                    [valid or no]
	 */
	function verifyIranianNationalId(nationalId) {
		if (!nationalId) return;

		if (nationalId) {
			var code = nationalId.toString() || null;

			if (!code.match(/^\d{10}$/)) return false;
			code = ("0000" + code).substr(code.length + 4 - 10);

			if (parseInt(code.substr(3, 6), 10) === 0) return false;

			var lastNumber = parseInt(code.substr(9, 1), 10);
			var sum = 0;

			for (var i = 0; i < 9; i++) {
				sum += parseInt(code.substr(i, 1), 10) * (10 - i);
			}

			sum = sum % 11;

			return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
		}
	}

	return verifyIranianNationalId;

})));
