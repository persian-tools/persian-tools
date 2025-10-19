import type { ShebaMapValue, ShebaProcess } from "./types";

/**
 * A map of Iranian bank codes to their respective bank information.
 *
 * @since 5.0.0 converted to Map, it was an object before
 */
export const shebaMapCodesMap = new Map<string, ShebaMapValue>([
	[
		"010",
		{
			nickname: "central-bank",
			name: "Central Bank of Iran",
			persianName: "بانک مرکزی جمهوری اسلامی ایران",
		},
	],
	[
		"011",
		{
			nickname: "sanat-o-madan",
			name: "Sanat O Madan Bank",
			persianName: "بانک صنعت و معدن",
		},
	],
	[
		"012",
		{
			nickname: "mellat",
			name: "Mellat Bank",
			persianName: "بانک ملت",
		},
	],
	[
		"013",
		{
			nickname: "refah",
			name: "Refah Bank",
			persianName: "بانک رفاه کارگران",
		},
	],
	[
		"014",
		{
			nickname: "maskan",
			name: "Maskan Bank",
			persianName: "بانک مسکن",
		},
	],
	[
		"015",
		{
			nickname: "sepah",
			name: "Sepah Bank",
			persianName: "بانک سپه",
		},
	],
	[
		"016",
		{
			nickname: "keshavarzi",
			name: "Keshavarzi",
			persianName: "بانک کشاورزی",
		},
	],
	[
		"017",
		{
			nickname: "melli",
			name: "Melli",
			persianName: "بانک ملی ایران",
		},
	],
	[
		"018",
		{
			nickname: "tejarat",
			name: "Tejarat Bank",
			persianName: "بانک تجارت",
		},
	],
	[
		"019",
		{
			nickname: "saderat",
			name: "Saderat Bank",
			persianName: "بانک صادرات ایران",
		},
	],
	[
		"020",
		{
			nickname: "tosee-saderat",
			name: "Tose Saderat Bank",
			persianName: "بانک توسعه صادرات",
		},
	],
	[
		"021",
		{
			nickname: "post",
			name: "Post Bank",
			persianName: "پست بانک ایران",
		},
	],
	[
		"022",
		{
			nickname: "toose-taavon",
			name: "Tosee Taavon Bank",
			persianName: "بانک توسعه تعاون",
		},
	],
	[
		"051",
		{
			nickname: "tosee",
			name: "Tosee Bank",
			persianName: "موسسه اعتباری توسعه",
		},
	],
	[
		"052",
		{
			nickname: "ghavamin",
			name: "Ghavamin Bank",
			persianName: "بانک قوامین",
		},
	],
	[
		"053",
		{
			nickname: "karafarin",
			name: "Karafarin Bank",
			persianName: "بانک کارآفرین",
		},
	],
	[
		"054",
		{
			nickname: "parsian",
			name: "Parsian Bank",
			persianName: "بانک پارسیان",
			process(str: string): ShebaProcess {
				const account = str.substring(14);
				const formatted = "0" + account.slice(0, 2) + "-0" + account.slice(2, 9) + "-" + account.slice(9, 12);
				return {
					normal: account,
					formatted,
				};
			},
		},
	],
	[
		"055",
		{
			nickname: "eghtesad-novin",
			name: "Eghtesad Novin Bank",
			persianName: "بانک اقتصاد نوین",
		},
	],
	[
		"056",
		{
			nickname: "saman",
			name: "Saman Bank",
			persianName: "بانک سامان",
		},
	],
	[
		"057",
		{
			nickname: "pasargad",
			name: "Pasargad Bank",
			persianName: "بانک پاسارگاد",
			process(str: string): ShebaProcess {
				let account = str.substring(7);
				while (account[0] === "0") {
					account = account.substring(1);
				}
				account = account.slice(0, account.length - 2);
				const formatted =
					account.slice(0, 3) + "-" + account.slice(3, 6) + "-" + account.slice(6, 14) + "-" + account.slice(14, 15);
				return {
					normal: account,
					formatted,
				};
			},
		},
	],
	[
		"058",
		{
			nickname: "sarmayeh",
			name: "Sarmayeh Bank",
			persianName: "بانک سرمایه",
		},
	],
	[
		"059",
		{
			nickname: "sina",
			name: "Sina Bank",
			persianName: "بانک سینا",
		},
	],
	[
		"060",
		{
			nickname: "mehr-iran",
			name: "Mehr Iran Bank",
			persianName: "بانک مهر ایران",
		},
	],
	[
		"061",
		{
			nickname: "shahr",
			name: "City Bank",
			persianName: "بانک شهر",
			process(str: string): ShebaProcess {
				let account = str.substring(7);
				while (account[0] === "0") {
					account = account.substring(1);
				}
				return {
					normal: account,
					formatted: account,
				};
			},
		},
	],
	[
		"062",
		{
			nickname: "ayandeh",
			name: "Ayandeh Bank",
			persianName: "بانک آینده",
		},
	],
	[
		"063",
		{
			nickname: "ansar",
			name: "Ansar Bank",
			persianName: "بانک انصار",
		},
	],
	[
		"064",
		{
			nickname: "gardeshgari",
			name: "Gardeshgari Bank",
			persianName: "بانک گردشگری",
		},
	],
	[
		"065",
		{
			nickname: "hekmat-iranian",
			name: "Hekmat Iranian Bank",
			persianName: "بانک حکمت ایرانیان",
		},
	],
	[
		"066",
		{
			nickname: "dey",
			name: "Dey Bank",
			persianName: "بانک دی",
		},
	],
	[
		"069",
		{
			nickname: "iran-zamin",
			name: "Iran Zamin Bank",
			persianName: "بانک ایران زمین",
		},
	],
	[
		"070",
		{
			nickname: "resalat",
			name: "Resalat Bank",
			persianName: "بانک قرض الحسنه رسالت",
		},
	],
	[
		"073",
		{
			nickname: "kosar",
			name: "Kosar Credit Institute",
			persianName: "موسسه اعتباری کوثر",
		},
	],
	[
		"075",
		{
			nickname: "melal",
			name: "Melal Credit Institute",
			persianName: "موسسه اعتباری ملل",
		},
	],
	[
		"078",
		{
			nickname: "middle-east-bank",
			name: "Middle East Bank",
			persianName: "بانک خاورمیانه",
		},
	],
	[
		"080",
		{
			nickname: "noor-bank",
			name: "Noor Credit Institution",
			persianName: "موسسه اعتباری نور",
		},
	],
	[
		"079",
		{
			nickname: "mehr-eqtesad",
			name: "Mehr Eqtesad Bank",
			persianName: "بانک مهر اقتصاد",
		},
	],
	[
		"090",
		{
			nickname: "mehr-iran",
			name: "Mehr Iran Bank",
			persianName: "بانک مهر ایران",
		},
	],
	[
		"095",
		{
			nickname: "iran-venezuela",
			name: "Iran and Venezuela Bank",
			persianName: "بانک ایران و ونزوئلا",
		},
	],
] as Array<[string, ShebaMapValue]>);
