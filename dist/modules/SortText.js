// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SortText = factory());
}(this, (function () { 'use strict';

	/** SortText
	 *
	 *  Description: Takes a piece of text in Persian which contains
	 *  several lines (separated by the newline character), and sorts
	 *  the lines alphabetically, with respect to their first character.
	 *
	 */
	function SortText(str) {
		if (!str) return;

		var sortPreparation = function sortPreparation(instr) {
			// solve persian problem on sorting by replace characters in strings
			return instr.replace(/ی/g, "ي").replace(/ک/g, "ك").replace(/ھ/g, "ه").replace(/پ/g, "بی").replace(/چ/g, "جی").replace(/ڕ/g, "ری").replace(/ژ/g, "زی").replace(/ڤ/g, "فی").replace(/ڵ/g, "لی").replace(/گ/g, "كی").replace(/ۆ/g, "وی").replace(/ە/g, "هی").replace(/ێ/g, "يي");
		};

		var temp = str.split(" ");
		temp.sort(function (a, b) {
			var keyA = sortPreparation(a);
			var keyB = sortPreparation(b);

			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;

			return 0;
		});

		return temp;
	}

	return SortText;

})));
