// Persian-tools.js Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.removeCommas = factory());
}(this, (function () { 'use strict';

	/**
	 * Remove all commas in String``
	 * @param  {[number]} number
	 * @return {[string]}
	 */
	var removeCommas = function removeCommas(number) {
	  if (number.toString(16).indexOf(",") !== -1) {
	    number = number.replace(/,\s?/g, "");
	  }

	  return number;
	};

	return removeCommas;

})));
