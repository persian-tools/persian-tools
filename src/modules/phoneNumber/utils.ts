/**
 * Operators model such as province, base city, model, type(permanent or credit or both)
 *
 * @interface
 */
export interface OperatorModel {
	province: string[];
	base: string;
	model?: string;
	type: string[];
}

export const operatorsMap = {
	shatelMobile: "شاتل موبایل",
	MCI: "همراه اول",
	Irancell: "ایرانسل",
	Taliya: "تالیا",
	RightTel: "رایتل",
};

export const MCI = {
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
};

export const Taliya = {
	"932": {
		province: [],
		base: "کشوری",
		type: ["credit"],
		operator: operatorsMap.Taliya,
	},
};

export const RightTel = {
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
};

const IrancellModel = {
	province: [],
	base: "کشوری",
	type: ["permanent", "credit"],
	operator: operatorsMap.Irancell,
};

export const Irancell = {
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

export const ShatelMobile = {
	998: {
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
export const operators: Record<string, OperatorModel> = {
	...MCI,
	...Taliya,
	...Irancell,
	...ShatelMobile,
	...RightTel,
};

/**
 * Iranian Mobile Number regex
 * This regex support these models:
 * 1. 00989123456789
 * 2. +989123456789
 * 3. 989123456789
 * 4. 09123456789
 * 4. 9123456789
 *
 * @author Ali.Torki
 */
export const mobileRegex = /^(?:[+|0{2}]?98)?(?:0)?(\d{3})+(\d{3})+(\d{4})$/;

export function getPhonePrefix(mobile: string): string {
	const prefix = `${mobile}`.match(mobileRegex)?.[1] as string;

	return prefix ?? "";
}
