import { createProvinceHashTable } from "./helpers";
import { ProvinceDataset } from "./types.skip";

export const carProvinceDataset: ProvinceDataset = [
	{
		province: "تهران",
		codes: [11, 22, 33, 44, 55, 66, 77, 88, 99, 10, 20, 40],
	},
	{
		province: "البرز",
		codes: [68],
	},
	{
		province: "تهران - البرز",
		codes: [21, 38, 30, 78],
	},
	{
		province: "اصفحان",
		codes: [13, 23, 43, 53, 67],
	},
	{
		province: "فارس",
		codes: [63, 73, 83, 93],
	},
	{
		province: "مازندران",
		codes: [62, 72, 82, 92],
	},
	{
		province: "خوزستان",
		codes: [14, 24, 34],
	},
	{
		province: "آذربایجان شرقی",
		codes: [15, 25, 35],
	},
	{
		province: "آذربایجان غربی",
		codes: [17, 27, 37],
	},
	{
		province: "کرمان",
		codes: [45, 65, 75],
	},
	{
		province: "گیلان",
		codes: [46, 56, 76],
	},
	{
		province: "سیستان و بلوچستان",
		codes: [85, 95],
	},
	{
		province: "کرمانشاه",
		codes: [19, 29],
	},
	{
		province: "گلستان",
		codes: [59, 69],
	},
	{
		province: "هرمزگان",
		codes: [84, 94],
	},
	{
		province: "بوشهر",
		codes: [48, 58],
	},
	{
		province: "لرستان",
		codes: [31, 41],
	},
	{
		province: "کردستان",
		codes: [51, 61],
	},
	{
		province: "همدان",
		codes: [18, 28],
	},
	{
		province: "زنجان",
		codes: [87, 97],
	},
	{
		province: "مرکزی",
		codes: [47, 57],
	},
	{
		province: "اردبیل",
		codes: [91],
	},
	{
		province: "قم",
		codes: [16],
	},
	{
		province: "قزوین",
		codes: [79, 89],
	},
	{
		province: "سمنان",
		codes: [86, 96],
	},
	{
		province: "یزد",
		codes: [45, 64],
	},
	{
		province: "ایلام",
		codes: [98],
	},
	{
		province: "چهارمحال و بختیاری",
		codes: [81, 71],
	},
	{
		province: "کهگیلویه و بویراحمد",
		codes: [49],
	},
	{
		province: "خراسان شمالی",
		codes: [26],
	},
	{
		province: "خراسان جنوبی",
		codes: [52],
	},
	{
		province: "خراسان رضوی",
		codes: [12, 42, 36, 74],
	},
	{
		province: "خراسان شمالی - خراسان جنوبی - خراسان رضوی",
		codes: [32],
	},
];

const carHashTable = createProvinceHashTable(carProvinceDataset);

export { carHashTable };
