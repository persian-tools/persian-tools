import config from "../../config";
const baseUrl = config.baseUrl;

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
	logo: string;
}
export type ShebaMapCodes = Record<string, ShebaResult>;
export const shebaMapCodes: ShebaMapCodes = {
	10: {
		code: "010",
		nickname: "central-bank",
		name: "Central Bank of Iran",
		persianName: "بانک مرکزی جمهوری اسلامی ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Bank_Markazi.svg`,
	},
	11: {
		code: "011",
		nickname: "sanat-o-madan",
		name: "Sanat O Madan Bank",
		persianName: "بانک صنعت و معدن",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Sanat_Madan.svg`,
	},
	12: {
		code: "012",
		nickname: "mellat",
		name: "Mellat Bank",
		persianName: "بانک ملت",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Mellat.svg`,
	},
	13: {
		code: "013",
		nickname: "refah",
		name: "Refah Bank",
		persianName: "بانک رفاه کارگران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Refah.svg`,
	},
	14: {
		code: "014",
		nickname: "maskan",
		name: "Maskan Bank",
		persianName: "بانک مسکن",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Maskan.svg`,
	},
	15: {
		code: "015",
		nickname: "sepah",
		name: "Sepah Bank",
		persianName: "بانک سپه",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Sepah.svg`,
	},
	16: {
		code: "016",
		nickname: "keshavarzi",
		name: "Keshavarzi",
		persianName: "بانک کشاورزی",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Keshavarzi.svg`,
	},
	17: {
		code: "017",
		nickname: "melli",
		name: "Melli",
		persianName: "بانک ملی ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Melli.svg`,
	},
	18: {
		code: "018",
		nickname: "tejarat",
		name: "Tejarat Bank",
		persianName: "بانک تجارت",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Tejarat.svg`,
	},
	19: {
		code: "019",
		nickname: "saderat",
		name: "Saderat Bank",
		persianName: "بانک صادرات ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Saderat.svg`,
	},
	20: {
		code: "020",
		nickname: "tosee-saderat",
		name: "Tose Saderat Bank",
		persianName: "بانک توسعه صادرات",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Tosee_Saderat.svg`,
	},
	21: {
		code: "021",
		nickname: "post",
		name: "Post Bank",
		persianName: "پست بانک ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Postbank.svg`,
	},
	22: {
		code: "022",
		nickname: "toose-taavon",
		name: "Tosee Taavon Bank",
		persianName: "بانک توسعه تعاون",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Tosee_Taavon.svg`,
	},
	51: {
		code: "051",
		nickname: "tosee",
		name: "Tosee Bank",
		persianName: "موسسه اعتباری توسعه",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Tosee.svg`,
	},
	52: {
		code: "052",
		nickname: "ghavamin",
		name: "Ghavamin Bank",
		persianName: "بانک قوامین",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Ghavamin.svg`,
	},
	53: {
		code: "053",
		nickname: "karafarin",
		name: "Karafarin Bank",
		persianName: "بانک کارآفرین",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Karafarin.svg`,
	},
	54: {
		code: "054",
		nickname: "parsian",
		name: "Parsian Bank",
		persianName: "بانک پارسیان",
		accountNumberAvailable: true,
		process(str: string): ShebaProcess {
			str = str.substring(14);
			const formatted = "0" + str.substr(0, 2) + "-0" + str.substr(2, 7) + "-" + str.substr(9, 3);

			return {
				normal: str,
				formatted: formatted,
			};
		},
		logo: `${baseUrl}/Parsian.svg`,
	},
	55: {
		code: "055",
		nickname: "eghtesad-novin",
		name: "Eghtesad Novin Bank",
		persianName: "بانک اقتصاد نوین",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Eghtesad_Novin.svg`,
	},
	56: {
		code: "056",
		nickname: "saman",
		name: "Saman Bank",
		persianName: "بانک سامان",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Saman.svg`,
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
			str = str.substr(0, str.length - 2);
			const formatted =
				str.substr(0, 3) + "-" + str.substr(3, 3) + "-" + str.substr(6, 8) + "-" + str.substr(14, 1);

			return {
				normal: str,
				formatted: formatted,
			};
		},
		logo: `${baseUrl}/Pasargad.svg`,
	},
	58: {
		code: "058",
		nickname: "sarmayeh",
		name: "Sarmayeh Bank",
		persianName: "بانک سرمایه",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Sarmayeh.svg`,
	},
	59: {
		code: "059",
		nickname: "sina",
		name: "Sina Bank",
		persianName: "بانک سینا",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Sina.svg`,
	},
	60: {
		code: "060",
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Mehr_Iran.svg`,
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
		logo: `${baseUrl}/Shahr.svg`,
	},
	62: {
		code: "062",
		nickname: "ayandeh",
		name: "Ayandeh Bank",
		persianName: "بانک آینده",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Ayandeh.svg`,
	},
	63: {
		code: "063",
		nickname: "ansar",
		name: "Ansar Bank",
		persianName: "بانک انصار",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Ansar.svg`,
	},
	64: {
		code: "064",
		nickname: "gardeshgari",
		name: "Gardeshgari Bank",
		persianName: "بانک گردشگری",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Gardeshgari.svg`,
	},
	65: {
		code: "065",
		nickname: "hekmat-iranian",
		name: "Hekmat Iranian Bank",
		persianName: "بانک حکمت ایرانیان",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Hekmat.svg`,
	},
	66: {
		code: "066",
		nickname: "dey",
		name: "Dey Bank",
		persianName: "بانک دی",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Dey.svg`,
	},
	69: {
		code: "069",
		nickname: "iran-zamin",
		name: "Iran Zamin Bank",
		persianName: "بانک ایران زمین",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Iran_Zamin.svg`,
	},
	70: {
		code: "070",
		nickname: "resalat",
		name: "Resalat Bank",
		persianName: "بانک قرض الحسنه رسالت",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Resalat.svg`,
	},
	73: {
		code: "073",
		nickname: "kosar",
		name: "Kosar Credit Institute",
		persianName: "موسسه اعتباری کوثر",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Kosar.svg`,
	},
	75: {
		code: "075",
		nickname: "melal",
		name: "Melal Credit Institute",
		persianName: "موسسه اعتباری ملل",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Melall.svg`,
	},
	78: {
		code: "078",
		nickname: "middle-east-bank",
		name: "Middle East Bank",
		persianName: "بانک خاورمیانه",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Khavar_Mianeh.svg`,
	},
	80: {
		code: "080",
		nickname: "noor-bank",
		name: "Noor Credit Institution",
		persianName: "موسسه اعتباری نور",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Noor.svg`,
	},
	79: {
		code: "079",
		nickname: "mehr-eqtesad",
		name: "Mehr Eqtesad Bank",
		persianName: "بانک مهر اقتصاد",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Mehr_Eghtesad.svg`,
	},
	90: {
		code: "090",
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Mehr_Iran.svg`,
	},
	95: {
		code: "095",
		nickname: "iran-venezuela",
		name: "Iran and Venezuela Bank",
		persianName: "بانک ایران و ونزوئلا",
		accountNumberAvailable: false,
		logo: `${baseUrl}/Iran_Venezuela.svg`,
	},
};
