import { NormilizedPlate, PlateOptions, ProvinceDataset } from "./types.skip";

export const normalizePlate = (plate: PlateOptions): NormilizedPlate => {
	let char;
	let plateNumbers;

	const nonDigitRegex = /\D/g;

	if (typeof plate === "string") {
		char = plate.match(nonDigitRegex)?.join("");
		plateNumbers = plate.replace(nonDigitRegex, "");
	} else {
		char = plate?.char;
		plateNumbers = plate.number.replace(nonDigitRegex, "");
	}

	return {
		char,
		numbers: plateNumbers,
	};
};

export const isPlateNumberValid = (numbers: string): boolean => {
	if (isNaN(+numbers)) {
		return false;
	}
	// we don't care about last number it can be any number
	return numbers
		.split("")
		.slice(0, -1)
		.every((num) => +num !== 0);
};

export const createProvinceHashTable = (provinceDataset: ProvinceDataset): { [index: string]: string } => {
	const hashTable: {
		[index: string]: string;
	} = {};
	for (let i = 0; i < provinceDataset.length; i++) {
		const _province = provinceDataset[i];
		for (let j = 0; j < _province.codes.length; j++) {
			const _code = _province.codes[j];
			hashTable[_code] = _province.province;
		}
	}

	return hashTable;
};
