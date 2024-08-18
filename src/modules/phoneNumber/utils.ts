/**
 * Operators model such as province, base city, model, type (permanent or credit or both)
 *
 * @interface
 * @category Phone number
 */
export interface OperatorModel {
	province: string[];
	base: string;
	model?: string;
	operator: string;
	type: ("permanent" | "credit")[];
}

export const operatorsMap = {
	shatelMobile: "شاتل موبایل",
	MCI: "همراه اول",
	Irancell: "ایرانسل",
	Taliya: "تالیا",
	RightTel: "رایتل",
};

export const MCI: Record<string, OperatorModel> = {
	"910": {
		base: "کشوری",
		province: [],
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"914": {
		province: ["آذربایجان شرقی", "اردبیل", "اصفهان"],
		base: "آذربایجان غربی",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"911": {
		province: ["گلستان", "گیلان"],
		base: "مازندران",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"912": {
		province: ["البرز", "زنجان", "سمنان", "قزوین", "قم", "برخی از شهرستان های استان مرکزی"],
		base: "تهران",
		type: ["permanent"],
		operator: operatorsMap.MCI,
	},
	"913": {
		province: ["یزد", "چهارمحال و بختیاری", "کرمان"],
		base: "اصفهان",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"915": {
		province: ["خراسان شمالی", "خراسان جنوبی", "سیستان و بلوچستان"],
		base: "خراسان رضوی",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"916": {
		province: ["لرستان", "فارس", "اصفهان"],
		base: "خوزستان",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"917": {
		province: ["بوشهر", "کهگیلویه و بویر احمد", "هرمزگان"],
		base: "فارس",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"918": {
		province: ["کردستان", "ایلام", "همدان"],
		base: "کرمانشاه",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"919": {
		province: ["البرز", "سمنان", "قم", "قزوین", "زنجان"],
		base: "تهران",
		type: ["credit"],
		operator: operatorsMap.MCI,
	},
	"990": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.MCI,
	},
	"991": {
		province: [],
		base: "کشوری",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"992": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.MCI,
	},
	"993": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.MCI,
	},
	"994": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.MCI,
	},
	"995": {
		province: [],
		base: "کشوری",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
	"996": {
		province: [],
		base: "کشوری",
		type: ["permanent", "credit"],
		operator: operatorsMap.MCI,
	},
};

export const Taliya: Record<string, OperatorModel> = {
	"932": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.Taliya,
	},
};

export const RightTel: Record<string, OperatorModel> = {
	"920": {
		province: [],
		base: "کشوری",
		type: ["permanent"],
		operator: operatorsMap.RightTel,
	},
	"921": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.RightTel,
	},
	"922": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.RightTel,
	},
	"923": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.RightTel,
	},
};

const IrancellModel = {
	province: [],
	base: "کشوری",
	type: ["permanent", "credit"],
	operator: operatorsMap.Irancell,
} as OperatorModel;

export const Irancell: Record<string, OperatorModel> = {
	"930": IrancellModel,
	"933": IrancellModel,
	"935": IrancellModel,
	"936": IrancellModel,
	"937": IrancellModel,
	"938": IrancellModel,
	"939": IrancellModel,
	"901": IrancellModel,
	"902": IrancellModel,
	"903": IrancellModel,
	"905": IrancellModel,
	"900": IrancellModel,
	"904": {
		province: [],
		base: "کشوری",
		model: "سیم‌کارت کودک",
		type: ["credit"],
		operator: operatorsMap.Irancell,
	},
	"941": {
		province: [],
		base: "کشوری",
		model: "TD-LTE",
		type: ["credit"],
		operator: operatorsMap.Irancell,
	},
};

export const ShatelMobile: Record<string, OperatorModel> = {
	"998": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.shatelMobile,
	},
};

export const prefixes: string[] = [
	...Object.keys(MCI),
	...Object.keys(Taliya),
	...Object.keys(RightTel),
	...Object.keys(Irancell),
	...Object.keys(ShatelMobile),
];

export const operators = {
	...MCI,
	...Taliya,
	...Irancell,
	...ShatelMobile,
	...RightTel,
};

/**
 * * Iranian Mobile Number regex
 *
 * Supports these matches:
 * 1. 00989123456789
 * 2. +989123456789
 * 3. 989123456789
 * 4. 09123456789
 * 4. 9123456789
 */
export const mobileRegex = /^(\+98|98|0098|0)?9(\d{2})\d{7}$/;

export function getPhonePrefix(mobile: string): string {
	const phoneCountryPrefix = `${mobile}`.match(mobileRegex);

	/*
		Remove country code from phone number then slice first 3 digits ( operator prefix )
	*/
	const prefix = phoneCountryPrefix && mobile.replace(phoneCountryPrefix![1], "").slice(0, 3);
	return prefix || "";
}
