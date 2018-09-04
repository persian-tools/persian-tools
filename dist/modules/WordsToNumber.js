// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.WordsToNumber = factory());
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

	var replaceArray = function replaceArray(string, find) {
		var pattern = new RegExp(Object.keys(find).join("|"), "gi");
		string = string.replace(pattern, function (matched) {
			return find[matched];
		});
		return string;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	// <Refrence path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
	// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

	var WordsToNumber = function () {
		function WordsToNumber(words) {
			classCallCheck(this, WordsToNumber);

			this.units = {
				صفر: 0,
				یک: 1,
				دو: 2,
				سه: 3,
				چهار: 4,
				پنج: 5,
				شش: 6,
				شیش: 6,
				هفت: 7,
				هشت: 8,
				نه: 9,
				ده: 10,
				یازده: 11,
				دوازده: 12,
				سیزده: 13,
				چهارده: 14,
				پانزده: 15,
				شانزده: 16,
				هفده: 17,
				هجده: 18,
				نوزده: 19,
				بیست: 20,
				سی: 30,
				چهل: 40,
				پنجاه: 50,
				شصت: 60,
				هفتاد: 70,
				هشتاد: 80,
				نود: 90
			};

			this.adjective = {
				صد: 100,
				یکصد: 100,
				دویست: 200,
				سیصد: 300,
				چهارصد: 400,
				پانصد: 500,
				ششصد: 600,
				هفتصد: 700,
				هشتصد: 800,
				نهصد: 900
			};

			this.magnitudes = {
				هزار: 1000,
				میلیون: 1000000,
				بیلیون: 1000000000,
				میلیارد: 1000000000,
				تریلیون: 1000000000000
			};

			this.otherAdjective = {
				"شیش صد": "ششصد",
				"شش صد": "ششصد",
				"هفت صد": "هفتصد",
				"هشت صد": "هشتصد",
				"نه صد": "نهصد"
			};
		}
		/**
	  * Convert to numbers
	  * @method convert
	  * @param  {String} words         [String of words - like: سی صد پنجاه هزار]
	  * @param  {String} [digits='en'] [convert number digits to en or fa]
	  * @return {Number}               [Result - like: 350000]
	  */


		createClass(WordsToNumber, [{
			key: "convert",
			value: function convert(words) {
				var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
				    _ref$digits = _ref.digits,
				    digits = _ref$digits === undefined ? "en" : _ref$digits,
				    _ref$addCommas = _ref.addCommas,
				    addCommas$$1 = _ref$addCommas === undefined ? false : _ref$addCommas;

				if (!words) return;

				var numbersConverted = this.compute(this.tokenize(words));

				numbersConverted = addCommas$$1 ? addCommas(numbersConverted) : numbersConverted;
				numbersConverted = digits === "fa" ? digitsEnToFa(numbersConverted) : numbersConverted;

				return numbersConverted;
			}
		}, {
			key: "tokenize",
			value: function tokenize(allWords) {
				var words = replaceArray(allWords, this.otherAdjective);
				words = words.replace(new RegExp("(مین|م)$", "ig"), "");

				var result = [];

				words.split(" ").forEach(function (word) {
					return word === "و" ? "" : !isNaN(+word) ? result.push(+word) : result.push(word);
				});

				return result;
			}
		}, {
			key: "compute",
			value: function compute(tokens) {
				var _this = this;

				var sum = 0;
				var isNegative = false;

				tokens.forEach(function (token) {
					token = digitsFaToEn(token);

					if (token === "منفی") {
						isNegative = true;
					} else if (_this.units[token] != null) {
						sum += _this.units[token];
					} else if (_this.adjective[token] != null) {
						sum += _this.adjective[token];
					} else if (!isNaN(token)) {
						sum += parseInt(token, 10);
					} else {
						sum *= _this.magnitudes[token];
					}
				});
				return isNegative ? sum * -1 : sum;
			}
		}]);
		return WordsToNumber;
	}();

	return WordsToNumber;

})));
