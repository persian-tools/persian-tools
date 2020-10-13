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

export const codesSkip: Array<ShebaResult> = [
	{
		nickname: "central-bank",
		name: "Central Bank of Iran",
		persianName: "بانک مرکزی جمهوری اسلامی ایران",
		code: "010",
		accountNumberAvailable: false,
	},
	{
		nickname: "sanat-o-madan",
		name: "Sanat O Madan Bank",
		persianName: "بانک صنعت و معدن",
		code: "011",
		accountNumberAvailable: false,
	},
	{
		nickname: "mellat",
		name: "Mellat Bank",
		persianName: "بانک ملت",
		code: "012",
		accountNumberAvailable: false,
	},
	{
		nickname: "refah",
		name: "Refah Bank",
		persianName: "بانک رفاه کارگران",
		code: "013",
		accountNumberAvailable: false,
	},
	{
		nickname: "maskan",
		name: "Maskan Bank",
		persianName: "بانک مسکن",
		code: "014",
		accountNumberAvailable: false,
	},
	{
		nickname: "sepah",
		name: "Sepah Bank",
		persianName: "بانک سپه",
		code: "015",
		accountNumberAvailable: false,
	},
	{
		nickname: "keshavarzi",
		name: "Keshavarzi",
		persianName: "بانک کشاورزی",
		code: "016",
		accountNumberAvailable: false,
	},
	{
		nickname: "melli",
		name: "Melli",
		persianName: "بانک ملی ایران",
		code: "017",
		accountNumberAvailable: false,
	},
	{
		nickname: "tejarat",
		name: "Tejarat Bank",
		persianName: "بانک تجارت",
		code: "018",
		accountNumberAvailable: false,
	},
	{
		nickname: "saderat",
		name: "Saderat Bank",
		persianName: "بانک صادرات ایران",
		code: "019",
		accountNumberAvailable: false,
	},
	{
		nickname: "tosee-saderat",
		name: "Tose Saderat Bank",
		persianName: "بانک توسعه صادرات",
		code: "020",
		accountNumberAvailable: false,
	},
	{
		nickname: "post",
		name: "Post Bank",
		persianName: "پست بانک ایران",
		code: "021",
		accountNumberAvailable: false,
	},
	{
		nickname: "toose-taavon",
		name: "Tosee Taavon Bank",
		persianName: "بانک توسعه تعاون",
		code: "022",
		accountNumberAvailable: false,
	},
	{
		nickname: "tosee",
		name: "Tosee Bank",
		persianName: "موسسه اعتباری توسعه",
		code: "051",
		accountNumberAvailable: false,
	},
	{
		nickname: "ghavamin",
		name: "Ghavamin Bank",
		persianName: "بانک قوامین",
		code: "052",
		accountNumberAvailable: false,
	},
	{
		nickname: "karafarin",
		name: "Karafarin Bank",
		persianName: "بانک کارآفرین",
		code: "053",
		accountNumberAvailable: false,
	},
	{
		nickname: "parsian",
		name: "Parsian Bank",
		persianName: "بانک پارسیان",
		code: "054",
		accountNumberAvailable: true,
		process(str: string): ShebaProcess {
			str = str.substring(14);
			const formatted = "0" + str.substr(0, 2) + "-0" + str.substr(2, 7) + "-" + str.substr(9, 3);

			return {
				normal: str,
				formatted: formatted,
			};
		},
	},
	{
		nickname: "eghtesad-novin",
		name: "Eghtesad Novin Bank",
		persianName: "بانک اقتصاد نوین",
		code: "055",
		accountNumberAvailable: false,
	},
	{
		nickname: "saman",
		name: "Saman Bank",
		persianName: "بانک سامان",
		code: "056",
		accountNumberAvailable: false,
	},
	{
		nickname: "pasargad",
		name: "Pasargad Bank",
		persianName: "بانک پاسارگاد",
		code: "057",
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
	},
	{
		nickname: "sarmayeh",
		name: "Sarmayeh Bank",
		persianName: "بانک سرمایه",
		code: "058",
		accountNumberAvailable: false,
	},
	{
		nickname: "sina",
		name: "Sina Bank",
		persianName: "بانک سینا",
		code: "059",
		accountNumberAvailable: false,
	},
	{
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		code: "060",
		accountNumberAvailable: false,
	},
	{
		nickname: "shahr",
		name: "City Bank",
		persianName: "بانک شهر",
		code: "061",
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
	{
		nickname: "ayandeh",
		name: "Ayandeh Bank",
		persianName: "بانک آینده",
		code: "062",
		accountNumberAvailable: false,
	},
	{
		nickname: "ansar",
		name: "Ansar Bank",
		persianName: "بانک انصار",
		code: "063",
		accountNumberAvailable: false,
	},
	{
		nickname: "gardeshgari",
		name: "Gardeshgari Bank",
		persianName: "بانک گردشگری",
		code: "064",
		accountNumberAvailable: false,
	},
	{
		nickname: "hekmat-iranian",
		name: "Hekmat Iranian Bank",
		persianName: "بانک حکمت ایرانیان",
		code: "065",
		accountNumberAvailable: false,
	},
	{
		nickname: "dey",
		name: "Dey Bank",
		persianName: "بانک دی",
		code: "066",
		accountNumberAvailable: false,
	},
	{
		nickname: "iran-zamin",
		name: "Iran Zamin Bank",
		persianName: "بانک ایران زمین",
		code: "069",
		accountNumberAvailable: false,
	},
	{
		nickname: "resalat",
		name: "Resalat Bank",
		persianName: "بانک قرض الحسنه رسالت",
		code: "070",
		accountNumberAvailable: false,
	},
	{
		nickname: "kosar",
		name: "Kosar Credit Institute",
		persianName: "موسسه اعتباری کوثر",
		code: "073",
		accountNumberAvailable: false,
	},
	{
		nickname: "melal",
		name: "Melal Credit Institute",
		persianName: "موسسه اعتباری ملل",
		code: "075",
		accountNumberAvailable: false,
	},
	{
		nickname: "middle-east-bank",
		name: "Middle East Bank",
		persianName: "بانک خاورمیانه",
		code: "078",
		accountNumberAvailable: false,
	},
	{
		nickname: "noor-bank",
		name: "Noor Credit Institution",
		persianName: "موسسه اعتباری نور",
		code: "080",
		accountNumberAvailable: false,
	},
	{
		nickname: "mehr-eqtesad",
		name: "Mehr Eqtesad Bank",
		persianName: "بانک مهر اقتصاد",
		code: "079",
		accountNumberAvailable: false,
	},
	{
		nickname: "mehr-iran",
		name: "Mehr Iran Bank",
		persianName: "بانک مهر ایران",
		code: "090",
		accountNumberAvailable: false,
	},
	{
		nickname: "iran-venezuela",
		name: "Iran and Venezuela Bank",
		persianName: "بانک ایران و ونزوئلا",
		code: "095",
		accountNumberAvailable: false,
	},
];

export interface ShebaHashTable {
	[code: string]: ShebaResult;
}

const shebaHashTable: ShebaHashTable = {};
for (let i = 0; i < codesSkip.length; i++) {
	const bank = codesSkip[i];
	shebaHashTable[bank.code] = bank;
}

export { shebaHashTable };
