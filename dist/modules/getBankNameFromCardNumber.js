// Persian-tools.js v0.0.4 Copyright 2018 Ali.Torki
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getBankNameFromCardNumber = factory());
}(this, (function () { 'use strict';

	var banksCode = [{
		"code": "603799",
		"name": "بانک ملی ایران"
	}, {
		"code": "589210",
		"name": "بانک سپه"
	}, {
		"code": "627648",
		"name": "بانک توسعه صادرات"
	}, {
		"code": "627961",
		"name": "بانک صنعت و معدن"
	}, {
		"code": "603770",
		"name": "بانک کشاورزی"
	}, {
		"code": "628023",
		"name": "بانک مسکن"
	}, {
		"code": "627760",
		"name": "پست بانک ایران"
	}, {
		"code": "502908",
		"name": "بانک توسعه تعاون"
	}, {
		"code": "627412",
		"name": "بانک اقتصاد نوین"
	}, {
		"code": "622106",
		"name": "بانک پارسیان"
	}, {
		"code": "502229",
		"name": "بانک پاسارگاد"
	}, {
		"code": "627488",
		"name": "بانک کارآفرین"
	}, {
		"code": "621986",
		"name": "بانک سامان"
	}, {
		"code": "639346",
		"name": "بانک سینا"
	}, {
		"code": "639607",
		"name": "بانک سرمایه"
	}, {
		"code": "636214",
		"name": "بانک تات"
	}, {
		"code": "502806",
		"name": "بانک شهر"
	}, {
		"code": "502938",
		"name": "بانک دی"
	}, {
		"code": "603769",
		"name": "بانک صادرات"
	}, {
		"code": "610433",
		"name": "بانک ملت"
	}, {
		"code": "627353",
		"name": "بانک تجارت"
	}, {
		"code": "589463",
		"name": "بانک رفاه"
	}, {
		"code": "627381",
		"name": "بانک انصار"
	}, {
		"code": "639370",
		"name": "بانک مهر اقتصاد"
	}];

	function getBankNameFromCardNumber(digits) {
		if (!digits) return;

		if (digits && digits.toString().length === 16) {
			var code = digits.toString().substr(0, 6);
			var findBank = banksCode.find(function (bank) {
				return bank.code === code;
			});

			if (findBank) {
				return findBank.name;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	return getBankNameFromCardNumber;

})));
