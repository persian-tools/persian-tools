// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.digits = global.digits || {})));
}(this, (function (exports) { 'use strict';

	var faNums = "۰۱۲۳۴۵۶۷۸۹";
	var arNums = "٠١٢٣٤٥٦٧٨٩";

	/** digitsEnToFa
	 *
	 *  Description: Takes a string made of English digits only, and
	 *  returns a string that represents the same number but with
	 *  Persian digits
	 *
	 */
	function digitsEnToFa(str) {
		if (!str) return;

		str = str.toString();
		for (var i = 0; i < 10; i++) {
			var replaceEntoFa = new RegExp("" + i, "g");
			str = str.toString().replace(replaceEntoFa, faNums[i]);
		}

		return str;
	}

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

	/** digitsArToFa
	 *
	 *  Description: Takes a string that contains digits, and
	 *  replaces all Arabic digits with the corresponding Persian
	 *  digits
	 *
	 */
	function digitsArToFa(str) {
		if (!str) return;

		str = str.toString();
		for (var i = 0; i < 10; i++) {
			var replaceArabicToPersian = new RegExp(arNums[i], "g");
			str = str.replace(replaceArabicToPersian, faNums[i]);
		}

		return str;
	}

	/** digitsArToEn
	 *
	 *  Description: Takes a string that contains digits, and
	 *  replaces all Arabic digits with the corresponding English
	 *  digits
	 *
	 */
	function digitsArToEn(str) {
		if (!str) return;

		str = str.toString();
		for (var i = 0; i < 10; i++) {
			var replaceArabicToEnglish = new RegExp(arNums[i], "g");
			str = str.replace(replaceArabicToEnglish, i);
		}

		return str;
	}

	exports.digitsEnToFa = digitsEnToFa;
	exports.digitsFaToEn = digitsFaToEn;
	exports.digitsArToFa = digitsArToFa;
	exports.digitsArToEn = digitsArToEn;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
