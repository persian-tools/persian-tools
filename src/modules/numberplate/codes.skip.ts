export interface CarDataset {
	[index: number]: {
		fa : string | Array<string>,
		en: string | Array<string>,
	};
}
export interface CategoryDataset {
	[index: string]: string;
}
export type MotorcycleDataset = CarDataset;

export interface PlateDataset {
	Car: CarDataset;
	Motorcycle: MotorcycleDataset;
	Category: CategoryDataset;
}

export const plateDataset: PlateDataset = {
	Car: {
		10: {
			fa: "تهران",
			en: "Tehran"
		},
		11: {
			fa: "تهران",
			en: "Tehran"
		},
		12: {
			fa: "خراسان رضوی",
			en: "Khorasan-Razavi"
		},
		13: {
			fa: "اصفهان",
			en: "Esfahan"
		},
		14: {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		15: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		16: {
			fa: "قم",
			en: "Qom"
		},
		17: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		18: {
			fa: "همدان",
			en: "Hamedan"
		},
		19: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		20: {
			fa: "تهران",
			en: "Tehran"
		},
		21: {
			fa: ["تهران", "البرز"],
			en: ["Tehran", "Alborz"]
		},
		22: {
			fa: "تهران",
			en: "Tehran"
		},
		23: {
			fa: "اصفهان",
			en: "Esfahan"
		},
		24:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		25: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		26: {
			fa: "خراسان شمالی",
			en: "Khorasan-Shomali"
		},
		27: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		28: {
			fa: "همدان",
			en: "Hamedan"
		},
		29: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		30: {
			fa: ["تهران", "البرز"],
			en: ["Tehran", "Alborz"]
		},
		31: {
			fa: "لرستان",
			en: "Lorestan"
		},
		32: {
			fa: ["خراسان رضوی", "خراسان شمالی", "خراسان جنوبی"],
			en: ["Khorasan-Razavi", "Khorasan-Shomali", "Khorasan-Jonoobi"],
		},
		33: {
			fa: "تهران",
			en: "Tehran"
		},
		34:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		35: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		36: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		37: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		38: {
			fa: ["تهران", "البرز"],
			en: ["Tehran", "Alborz"]
		},
		40: {
			fa: "تهران",
			en: "Tehran"
		},
		41: {
			fa: "لرستان",
			en: "Lorestan"
		},
		42: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		43: {
			fa: "اصفهان",
			en: "Esfahan"
		},
		44: {
			fa: "تهران",
			en: "Tehran"
		},
		45: {
			fa: "یزد",
			en: "Yazd"
		},
		46: {
			fa: "گیلان",
			en: "Gilan"
		},
		47: {
			fa: "مرکزی",
			en: "Markazi"
		},
		48: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		49: {
			fa: "کهگیلویه و بویراحمد",
			en: "Kohgiloyeh-Va-BoyerAhmad"
		},
		51: {
			fa: "کردستان",
			en: "Kordestan"
		},
		52: {
			fa: "خراسان جنوبی",
			en: "Khorasan-Jonoobi"
		},
		53: {
			fa: "اصفهان",
			en: "Esfahan"
		},
		55: {
			fa: "تهران",
			en: "Tehran"
		},
		56: {
			fa: "گیلان",
			en: "Gilan"
		},
		57: {
			fa: "مرکزی",
			en: "Markazi"
		},
		58: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		59: {
			fa: "گلستان",
			en: "Golestan"
		},
		61: {
			fa: "کردستان",
			en: "Kordestan"
		},
		62: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		63: {
			fa: "فارس",
			en: "Fars"
		},
		64: {
			fa: "یزد",
			en: "Yazd"
		},
		65: {
			fa: "کرمان",
			en: "Kerman"
		},
		66: {
			fa: "تهران",
			en: "Tehran"
		},
		67: {
			fa: "اصفهان",
			en: "Esfahan"
		},
		68: {
			fa: "البرز",
			en: "Alborz"
		},
		69: {
			fa: "گلستان",
			en: "Golestan"
		},
		71: {
			fa: "چهارمحال و بختیاری",
			en: "CharMahal-Va-Bkhatiyari"
		},
		72: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		73: {
			fa: "فارس",
			en: "Fars"
		},
		74: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		75: {
			fa: "کرمان",
			en: "Kerman"
		},
		76: {
			fa: "گیلان",
			en: "Gilan"
		},
		77: {
			fa: "تهران",
			en: "Tehran"
		},
		78: {
			fa: ["تهران", "البرز"],
			en: ["Tehran", "Alborz"]
		},
		79: {
			fa: "قزوین",
			en: "Qazvin"
		},
		81: {
			fa: "چهارمحال و بختیاری",
			en: "CharMahal-Va-Bkhatiyari"
		},
		82: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		83: {
			fa: "فارس",
			en: "Fars"
		},
		84: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		85: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		86: {
			fa: "سمنان",
			en: "Semnan"
		},
		87: {
			fa: "زنجان",
			en: "Zanjan"
		},
		88: {
			fa: "تهران",
			en: "Tehran"
		},
		89: {
			fa: "قزوین",
			en: "Qazvin"
		},
		91: {
			fa: "اردبیل",
			en: "Ardabil"
		},
		92: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		93: {
			fa: "فارس",
			en: "Fars"
		},
		94: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		95: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		96: {
			fa: "سمنان",
			en: "Semnan"
		},
		97: {
			fa: "زنجان",
			en: "Zanjan"
		},
		98: {
			fa: "ایلام",
			en: "Ilam"
		},
		99: {
			fa: "تهران",
			en: "Tehran"
		},
	},
	Motorcycle: {
		111: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		112: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		113: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		114: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		115: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		116: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		117: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		118: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		119: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		120: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		121: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		122: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		123: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		124: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		125: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		126: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		127: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		128: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		129: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		130: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		131: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		132: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		133: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		134: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		135: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		136: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		137: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		138: {
			fa: "مرکز تهران",
			en: "Tehran"
		},
		319: {
			fa: ["شهرستان های تهران", "البرز"],
			en: ["Suburbs of Tehran", "Alborz"]
		},
		321: {
			fa: ["شهرستان های تهران", "البرز"],
			en: ["Suburbs of Tehran", "Alborz"]
		},
		322: {
			fa: ["شهرستان های تهران", "البرز"],
			en: ["Suburbs of Tehran", "Alborz"]
		},
		323: {
			fa: ["شهرستان های تهران", "البرز"],
			en: ["Suburbs of Tehran", "Alborz"]
		},
		324: {
			fa: ["شهرستان های تهران", "البرز"],
			en: ["Suburbs of Tehran", "Alborz"]
		},
		371: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		372: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		373: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		374: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		375: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		376: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		377: {
			fa: "آذربایجان غربی",
			en: "Azarbayjan-Gharbi"
		},
		391: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		392: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		393: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		394: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		395: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		396: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		397: {
			fa: "آذربایجان شرقی",
			en: "Azarbayjan-Sharghi"
		},
		442: {
			fa: "اردبیل",
			en: "Ardabil"
		},
		443: {
			fa: "اردبیل",
			en: "Ardabil"
		},
		461: {
			fa: "کردستان",
			en: "Kordestan"
		},
		462: {
			fa: "کردستان",
			en: "Kordestan"
		},
		479: {
			fa: "زنجان",
			en: "Zanjan"
		},
		481: {
			fa: "زنجان",
			en: "Zanjan"
		},
		482: {
			fa: "زنجان",
			en: "Zanjan"
		},
		498: {
			fa: "همدان",
			en: "Hamedan"
		},
		499: {
			fa: "همدان",
			en: "Hamedan"
		},
		511: {
			fa: "همدان",
			en: "Hamedan"
		},
		514: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		515: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		516: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		517: {
			fa: "کرمانشاه",
			en: "Kermanshah"
		},
		523: {
			fa: "قزوین",
			en: "Qazvin"
		},
		524: {
			fa: "قزوین",
			en: "Qazvin"
		},
		525: {
			fa: "قزوین",
			en: "Qazvin"
		},
		531: {
			fa: "مرکزی",
			en: "Markazi"
		},
		532: {
			fa: "مرکزی",
			en: "Markazi"
		},
		533: {
			fa: "مرکزی",
			en: "Markazi"
		},
		534: {
			fa: "مرکزی",
			en: "Markazi"
		},
		535: {
			fa: "مرکزی",
			en: "Markazi"
		},
		538: {
			fa: "لرستان",
			en: "Lorestan"
		},
		539: {
			fa: "لرستان",
			en: "Lorestan"
		},
		540: {
			fa: "لرستان",
			en: "Lorestan"
		},
		541: {
			fa: "لرستان",
			en: "Lorestan"
		},
		542: {
			fa: "لرستان",
			en: "Lorestan"
		},
		543: {
			fa: "لرستان",
			en: "Lorestan"
		},
		547: {
			fa: "ایلام",
			en: "Ilam"
		},
		555: {
			fa: "چهارمحال و بختیاری",
			en: "CharMahal-Va-Bkhatiyari"
		},
		561:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		562:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		563:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		564:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		565:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		566:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		567:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		568:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		569:  {
			fa: "خوزستان",
			en: "Khoozestan"
		},
		571: {
			fa: "کهگیلویه و بویراحمد",
			en: "Kohgiloyeh-Va-BoyerAhmad"
		},
		578: {
			fa: "گیلان",
			en: "Gilan"
		},
		579: {
			fa: "گیلان",
			en: "Gilan"
		},
		581: {
			fa: "گیلان",
			en: "Gilan"
		},
		582: {
			fa: "گیلان",
			en: "Gilan"
		},
		586: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		587: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		588: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		589: {
			fa: "مازندران",
			en: "Mazandaran"
		},
		596: {
			fa: "گلستان",
			en: "Golestan"
		},
		597: {
			fa: "گلستان",
			en: "Golestan"
		},
		611: {
			fa: "قم",
			en: "Qom"
		},
		612: {
			fa: "قم",
			en: "Qom"
		},
		613: {
			fa: "قم",
			en: "Qom"
		},
		614: {
			fa: "قم",
			en: "Qom"
		},
		637: {
			fa: "یزد",
			en: "Yazd"
		},
		638: {
			fa: "یزد",
			en: "Yazd"
		},
		639: {
			fa: "یزد",
			en: "Yazd"
		},
		641: {
			fa: "یزد",
			en: "Yazd"
		},
		642: {
			fa: "یزد",
			en: "Yazd"
		},
		643: {
			fa: "یزد",
			en: "Yazd"
		},
		687: {
			fa: "فارس",
			en: "Fars"
		},
		688: {
			fa: "فارس",
			en: "Fars"
		},
		689: {
			fa: "فارس",
			en: "Fars"
		},
		691: {
			fa: "فارس",
			en: "Fars"
		},
		692: {
			fa: "فارس",
			en: "Fars"
		},
		693: {
			fa: "فارس",
			en: "Fars"
		},
		694: {
			fa: "فارس",
			en: "Fars"
		},
		695: {
			fa: "فارس",
			en: "Fars"
		},
		696: {
			fa: "فارس",
			en: "Fars"
		},
		697: {
			fa: "فارس",
			en: "Fars"
		},
		751: {
			fa: "سمنان",
			en: "Semnan"
		},
		752: {
			fa: "سمنان",
			en: "Semnan"
		},
		753: {
			fa: "سمنان",
			en: "Semnan"
		},
		761: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		762: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		763: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		764: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		765: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		766: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		767: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		768: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		769: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		771: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		772: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		773: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		774: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		775: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		776: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		777: {
			fa: "خراسان رضوی",
			en: "khorasan-Razavi"
		},
		779: {
			fa: "خراسان شمالی",
			en: "Khorasan-Shomali"
		},
		781: {
			fa: "خراسان شمالی",
			en: "Khorasan-Shomali"
		},
		791: {
			fa: "خراسان جنوبی",
			en: "Khorasan-Jonoobi"
		},
		792: {
			fa: "خراسان جنوبی",
			en: "Khorasan-Jonoobi"
		},
		812: {
			fa: "کرمان",
			en: "Kerman"
		},
		813: {
			fa: "کرمان",
			en: "Kerman"
		},
		814: {
			fa: "کرمان",
			en: "Kerman"
		},
		815: {
			fa: "کرمان",
			en: "Kerman"
		},
		816: {
			fa: "کرمان",
			en: "Kerman"
		},
		817: {
			fa: "کرمان",
			en: "Kerman"
		},
		819: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		821: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		822: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		823: {
			fa: "سیستان و بلوچستان",
			en: "Sistan-Va-Baloochestan"
		},
		827: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		828: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		829: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		831: {
			fa: "بوشهر",
			en: "Booshehr"
		},
		835: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		836: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		837: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		838: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
		839: {
			fa: "هرمزگان",
			en: "Hormozgan"
		},
	},
	Category: {
		D: "دیپلمات",
		S: "سفارتخانه ها ",
		ف: "ستاد کل نیرو های مسلح",
		ز: "وزارت دفاع و پشتیبانی",
		ش: "ارتش",
		تشریفات: "تشریفات",
		الف: "دولتی",
		پ: "پلیس",
		ث: "سپاه",
		ک: "کشاورزی",
		ع: "حمل و نقل عمومی",
		گ: "گذر موقت",
		ژ: "معلولان و جانبازان",
		ت: "تاکسی",
		ب: "شخصی",
		ج: "شخصی",
		د: "شخصی",
		س: "شخصی",
		ص: "شخصی",
		ط: "شخصی",
		ق: "شخصی",
		ل: "شخصی",
		م: "شخصی",
		ن: "شخصی",
		و: "شخصی",
		ه: "شخصی",
		ی: "شخصی",
	},
};
