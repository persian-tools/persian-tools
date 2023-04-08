import { plateDataset } from "./codes.skip";
import { isPlateNumberValid, normalizePlate } from "./helpers";
// Types
import type {
	NormalizedPlate,
	PlateOptions,
	PlateResult,
	PlateApi,
	PlateResultApi,
	PlateResultApiTypeString,
	PlateResultDetailModel,
	PlateResultMotorcycleDetailModel,
	PlateTypes,
} from "./types.skip";

export type PlateHandler = (plate: NormalizedPlate) => PlateResultApi;

/**
 * Get plate info and validation
 *
 * @param plate  An object containing the number and char value or a string.
 * @return  An object containing plate and validation info.
 */
const plate = (plate: PlateOptions): PlateResult => {
	const normalizedPlate = normalizePlate(plate);
	const info = getPlateInfo(normalizedPlate);
	const isValid = isPlateValid(info, normalizedPlate.numbers);
	return {
		info,
		isValid,
	};
};

const getPlateInfo = (plate: NormalizedPlate): PlateResultApi => getPlateHandler(plate)(plate);

// 1. no zeros and chars, [1-9] allowed
// 2. if type Car => category should exist
// 3. province exist
const isPlateValid = (plateInfo: PlateResultApi, plateNumber: string): boolean =>
	!(!isPlateNumberValid(plateNumber) || (plateInfo.type === "Car" && !plateInfo?.category) || !plateInfo?.province);

const getPlateHandler = (plate: NormalizedPlate): PlateHandler => {
	const len = plate.numbers?.length;
	if (len === 7) {
		return carHandler;
	}
	if (len === 8) {
		return motorcycleHandler;
	}
	throw new Error("a Plate must be 7 or 8 digits long");
};

const carHandler = (plate: NormalizedPlate): PlateResultApi => {
	const provinceCode = +plate.numbers.slice(5, 7);
	const type: PlateResultApiTypeString = "Car";
	const template = `${plate.numbers.slice(0, 2)}${plate.char ? plate.char : null}${plate.numbers.slice(
		2,
		5,
	)}ایران${provinceCode}`;

	const province = plateDataset.Car[provinceCode];
	const category = plate.char ? plateDataset.Category[plate.char] : null;
	const details: PlateResultDetailModel = {
		firstTwoDigits: plate.numbers.slice(0, 2),
		plateCharacter: plate.char || null,
		nextThreeDigits: plate.numbers.slice(2, 5),
		provinceCode: provinceCode.toString(),
	};

	return {
		type,
		template,
		details,
		province: province || null,
		category,
	};
};

const motorcycleHandler = (plate: NormalizedPlate): PlateResultApi => {
	const provinceCode = +plate.numbers.slice(0, 3);
	const type: PlateResultApiTypeString = "Motorcycle";
	const template = `${provinceCode}-${plate.numbers.slice(3)}`;

	const province = plateDataset.Motorcycle[provinceCode];
	const details: PlateResultMotorcycleDetailModel = {
		digits: plate.numbers.slice(3),
		provinceCode: provinceCode.toString(),
	};

	return {
		type,
		template,
		province: province || null,
		details,
		category: null,
	};
};

export default plate;
export {
	getPlateHandler,
	PlateOptions,
	PlateResult,
	PlateApi,
	PlateResultApi,
	PlateResultApiTypeString,
	PlateTypes,
	carHandler,
	motorcycleHandler,
	isPlateValid,
	getPlateInfo,
};
