import { carHashTable } from "./carProvinceCodes.skip";
import { categoryHashTable } from "./plateCategory.skip";
import { bikeHashTable } from "./bikeProvinceCodes.skip";
import { isPlateNumberValid, normalizePlate } from "./helpers";
import { NormilizedPlate, PlateOptions, PlateResultApi, PlateResultApiTypeString } from "./types.skip";

const plate = function (plate: PlateOptions): { info: PlateResultApi; isValid: boolean } {
	const normalizedPlate = normalizePlate(plate);
	const info = getPlateInfo(normalizedPlate);
	const isValid = isPlateValid(info, normalizedPlate.numbers);

	return {
		info,
		isValid,
	};
};

export function getPlateInfo(plate: NormilizedPlate): PlateResultApi {
	const getInfo = getPlateHandler(plate);
	return getInfo(plate);
}

export function isPlateValid(plateInfo: PlateResultApi, plateNumber: string): boolean {
	// 1. no zeros and chars, [1-9] allowed
	if (!isPlateNumberValid(plateNumber)) {
		return false;
	}

	// 2. if type Car => category should exist
	if (plateInfo.type === "Car" && !plateInfo?.category) {
		return false;
	}

	// 3. province exist
	if (!plateInfo?.province) {
		return false;
	}

	return true;
}

export function getPlateHandler(plate: NormilizedPlate): (plate: NormilizedPlate) => PlateResultApi {
	let handler;
	if (plate.numbers?.length === 7) {
		handler = carHandler;
	} else if (plate.numbers?.length === 8) {
		handler = bikeHandler;
	} else {
		throw new Error("a Plate must be 7 or 8 digits long");
	}

	return handler;
}

export function carHandler(plate: NormilizedPlate): PlateResultApi {
	const provinceCode = +plate.numbers.slice(5, 7);
	const type: PlateResultApiTypeString = "Car";
	const template = `${plate.numbers.slice(0, 2)}${plate.char ? plate.char : null}${plate.numbers.slice(
		2,
		5,
	)}ایران${provinceCode}`;

	const province = carHashTable[provinceCode];
	const category = plate.char ? categoryHashTable[plate.char]?.description : undefined;

	return {
		type,
		template,
		province,
		category,
	};
}
export function bikeHandler(plate: NormilizedPlate): PlateResultApi {
	const provinceCode = +plate.numbers.slice(0, 3);
	const type: PlateResultApiTypeString = "Motorcycle";
	const template = `${provinceCode}-${plate.numbers.slice(3)}`;

	const province = bikeHashTable[provinceCode];

	return {
		type,
		template,
		province,
		category: undefined,
	};
}

export default plate;
