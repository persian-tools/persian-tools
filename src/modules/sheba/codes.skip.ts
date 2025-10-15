export interface ShebaProcess {
	normal: string;
	formatted: string;
}

export interface ShebaResult {
	name: string;
	code: string;
	nickname: string;
	persianName: string;
	accountNumber?: string;
	accountNumberAvailable: boolean;
	formattedAccountNumber?: string;
	process?: (str: string) => ShebaProcess;
}
export type ShebaMapCodes = Record<string, ShebaResult>;
export const shebaMapCodes: ShebaMapCodes = {
	10: {
		code: "010",
		nickname: "central-bank",
		name: "Central Bank of Iran",
		persianName: "بانک مرکزی جمهوری اسلامی ایران",
		accountNumberAvailable: false,
	},
	11: {
		code: "011",
		nickname: "sanat-o-madan",
		name: "Sanat O Madan Bank",
		persianName: "بانک صنعت و معدن",
		accountNumberAvailable: false,
	},
	12: {
		code: "012",
		nickname: "mellat",
		name: "Mellat Bank",
		persianName: "بانک ملت",
		accountNumberAvailable: false,
	},
	13: {
		code: "013",
		nickname: "refah",
		name: "Refah Bank",
		persianName: "بانک رفاه کارگران",
		accountNumberAvailable: false,
	},
	14: {
		code: "014",
		nickname: "maskan",
		name: "Maskan Bank",
		persianName: "بانک مسکن",
		accountNumberAvailable: false,
	},
	15: {
		code: "015",
		nickname: "sepah",
		name: "Sepah Bank",
		persianName: "بانک سپه",
		accountNumberAvailable: false,
	},
	16: {
		code: "016",
		nickname: "keshavarzi",
		name: "Keshavarzi",
		persianName: "بانک کشاورزی",
		accountNumberAvailable: false,
	},
	17: {
		code: "017",
		nickname: "melli",
		name: "Melli",
		persianName: "بانک ملی ایران",
		accountNumberAvailable: false,
	},
	18: {
		code: "018",
		nickname: "tejarat",
		name: "Tejarat Bank",
		persianName: "بانک تجارت",
		accountNumberAvailable: false,
	},
	19: {
		code: "019",
		nickname: "saderat",
		name: "Saderat Bank",
		persianName: "بانک صادرات ایران",
		accountNumberAvailable: false,
	},
	20: {
		code: "020",
		nickname: "tosee-saderat",
		name: "Tose Saderat Bank",
		persianName: "بانک توسعه صادرات",
		accountNumberAvailable: false,
	},
	21: {
		code: "021",
		nickname: "post",
		name: "Post Bank",
		persianName: "پست بانک ایران",
		accountNumberAvailable: false,
	},
	22: {
		code: "022",
		nickname: "toose-taavon",
		name: "Tosee Taavon Bank",
		persianName: "بانک توسعه تعاون",
		accountNumberAvailable: false,
	},
	51: {
		code: "051",
		nickname: "tosee",
		name: "Tosee Bank",
		persianName: "موسسه اعتباری توسعه",
		accountNumberAvailable: false,
	},
	52: {
		code: "052",
		nickname: "ghavamin",
		name: "Ghavamin Bank",
		persianName: "بانک قوامین",
		accountNumberAvailable: false,
	},
	53: {
		code: "053",
		nickname: "karafarin",
		name: "Karafarin Bank",
		persianName: "بانک کارآفرین",
		accountNumberAvailable: false,
	},
	54: {
		code: "054",
		nickname: "parsian",
		name: "Parsian Bank",
		persianName: "بانک پارسیان",
		accountNumberAvailable: true,
		process(str: string): ShebaProcess {
			str = str.substring(14);
			const formatted = "0" + str.slice(0, 2) + "-0" + str.slice(2, 9) + "-" + str.slice(9, 12);

			return {
				normal: str,
				formatted: formatted,
			};
		},
	},
	55: {
		code: "055",
		nickname: "eghtesad-novin",
		name: "Eghtesad Novin Bank",
		persianName: "بانک اقتصاد نوین",
		accountNumberAvailable: false,
	},
	56: {
		code: "056",
		nickname: "saman",
		name: "Saman Bank",
		persianName: "بانک سامان",
		accountNumberAvailable: false,
	},
	57: {
		code: "057",
		nickname: "pasargad",
		name: "Pasargad Bank",
		persianName: "بانک پاسارگاد",
		accountNumberAvailable: true,
		process(str: string): ShebaProcess {
			str = str.substring(7);
			while (str[0] === "0") {
				str = str.substring(1);
			}
			str = str.slice(0, str.length - 2);
			const formatted = str.slice(0, 3) + "-" + str.slice(3, 6) + "-" + str.slice(6, 14) + "-" + str.slice(14, 15);

			return {
				normal: str,
				formatted: formatted,
			};
		},
	},
	58: {
		code: "058",
		nickname: "sarmayeh",
		name: "Sarmayeh Bank",
		persianName: "بانک سرمایه",
		accountNumberAvailable: false,
	},
	59: {
		code: "059",
		nickname: "sina",
		name: "Sina Bank",
		persianName: "بانک سینا",
		accountNumberAvailable: false,
	},
	60: {
		code: "060",
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		accountNumberAvailable: false,
	},
	61: {
		code: "061",
		nickname: "shahr",
		name: "City Bank",
		persianName: "بانک شهر",
		accountNumberAvailable: true,
		process(str: string): ShebaProcess {
			str = str.substring(7);
			while (str[0] === "0") {
				str = str.substring(1);
			}

			return {
				normal: str,
				formatted: str,
			};
		},
	},
	62: {
		code: "062",
		nickname: "ayandeh",
		name: "Ayandeh Bank",
		persianName: "بانک آینده",
		accountNumberAvailable: false,
	},
	63: {
		code: "063",
		nickname: "ansar",
		name: "Ansar Bank",
		persianName: "بانک انصار",
		accountNumberAvailable: false,
	},
	64: {
		code: "064",
		nickname: "gardeshgari",
		name: "Gardeshgari Bank",
		persianName: "بانک گردشگری",
		accountNumberAvailable: false,
	},
	65: {
		code: "065",
		nickname: "hekmat-iranian",
		name: "Hekmat Iranian Bank",
		persianName: "بانک حکمت ایرانیان",
		accountNumberAvailable: false,
	},
	66: {
		code: "066",
		nickname: "dey",
		name: "Dey Bank",
		persianName: "بانک دی",
		accountNumberAvailable: false,
	},
	69: {
		code: "069",
		nickname: "iran-zamin",
		name: "Iran Zamin Bank",
		persianName: "بانک ایران زمین",
		accountNumberAvailable: false,
	},
	70: {
		code: "070",
		nickname: "resalat",
		name: "Resalat Bank",
		persianName: "بانک قرض الحسنه رسالت",
		accountNumberAvailable: false,
	},
	73: {
		code: "073",
		nickname: "kosar",
		name: "Kosar Credit Institute",
		persianName: "موسسه اعتباری کوثر",
		accountNumberAvailable: false,
	},
	75: {
		code: "075",
		nickname: "melal",
		name: "Melal Credit Institute",
		persianName: "موسسه اعتباری ملل",
		accountNumberAvailable: false,
	},
	78: {
		code: "078",
		nickname: "middle-east-bank",
		name: "Middle East Bank",
		persianName: "بانک خاورمیانه",
		accountNumberAvailable: false,
	},
	80: {
		code: "080",
		nickname: "noor-bank",
		name: "Noor Credit Institution",
		persianName: "موسسه اعتباری نور",
		accountNumberAvailable: false,
	},
	79: {
		code: "079",
		nickname: "mehr-eqtesad",
		name: "Mehr Eqtesad Bank",
		persianName: "بانک مهر اقتصاد",
		accountNumberAvailable: false,
	},
	90: {
		code: "090",
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		accountNumberAvailable: false,
	},
	95: {
		code: "095",
		nickname: "iran-venezuela",
		name: "Iran and Venezuela Bank",
		persianName: "بانک ایران و ونزوئلا",
		accountNumberAvailable: false,
	},
};
