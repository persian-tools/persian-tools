// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.URLfix = factory());
}(this, (function () { 'use strict';

	/**
	 * Used for fix Persian characters in URL
	 *
	 * @method URLfix
	 * @param {String} value
	 * @return {String} Fixed String
	 */
	var URLfix = (function (value) {
		if (!value) {
			return;
		}

		// Replace every %20 with _ to protect them from decodeURI
		var old = "";
		while (old !== value) {
			old = value;
			value = value.replace(/(http\S+?)%20/g, "$1\u200C\u200C\u200C_\u200C\u200C\u200C");
		}

		// Decode URIs
		// NOTE: This would convert all %20's to _'s which could break some links
		// but we will undo that later on
		value = value.replace(/(http\S+)/g, function (s, p) {
			return decodeURI(p);
		});

		// Revive all instances of %20 to make sure no links is broken
		value = value.replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, "%20");

		return value;
	});

	return URLfix;

})));
