interface IUnit<T = number> {
	[key: string]: T;
}

export const UNITS: IUnit = {
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
	نود: 90,
};

export const TEN: IUnit = {
	صد: 100,
	یکصد: 100,
	دویست: 200,
	سیصد: 300,
	چهارصد: 400,
	پانصد: 500,
	ششصد: 600,
	هفتصد: 700,
	هشتصد: 800,
	نهصد: 900,
};

export const MAGNITUDE: IUnit = {
	هزار: 1000,
	میلیون: 1000000,
	بیلیون: 1000000000,
	میلیارد: 1000000000,
	تریلیون: 1000000000000,
};

export const TYPO_LIST: IUnit<string> = {
	"شیش صد": "ششصد",
	"شش صد": "ششصد",
	"هفت صد": "هفتصد",
	"هشت صد": "هشتصد",
	"نه صد": "نهصد",
};

export const UNIT_KEYS = Object.keys(UNITS);
export const TEN_KEYS = Object.keys(TEN);
export const MAGNITUDE_KEYS = Object.keys(MAGNITUDE);

export const NUMBER_WORDS = [...UNIT_KEYS, ...TEN_KEYS, ...MAGNITUDE_KEYS];

export const JOINERS = ["و", " و "];
export const PREFIXES = ["منفی", "مثبت"];
export const TOKEN_TYPE = {
	UNIT: 0,
	TEN: 1,
	MAGNITUDE: 2,
	DECIMAL: 3,
	HUNDRED: 4,
};

export const ALL_WORDS = [...NUMBER_WORDS, ...JOINERS, ...PREFIXES];
