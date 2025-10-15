import { plateDataset } from "./codes.skip";
import { isPlateNumberValid, normalizePlate } from "./helpers";
// Errors
import { PersianToolsError } from "../../helpers";
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

/**
 * **getNumberPlateInfo**:
 * - Normalizes the input plate.
 * - Gets the plate info.
 * - Checks if the plate is valid.
 * - Returns the plate info and validation status.
 *
 * @param plate  An object containing the number and char value or a string.
 * @return  An object containing plate and validation info.
 */
export function getNumberPlateInfo(plate: PlateOptions): PlateResult {
	const normalizedPlate = normalizePlate(plate);
	const info = getPlateInfo(normalizedPlate);
	const isValid = isPlateValid(info, normalizedPlate.numbers);

	return {
		info,
		isValid,
	};
}

export function getPlateInfo(plate: NormalizedPlate): PlateResultApi {
	const getInfo = getPlateHandler(plate);
	return getInfo(plate);
}

export function isPlateValid(plateInfo: PlateResultApi, plateNumber: string): boolean {
	// 1. no zero and chars, [1-9] allowed
	if (!isPlateNumberValid(plateNumber)) {
		return false;
	}

	// 2. if type Car => category should exist
	if (plateInfo.type === "Car" && !plateInfo?.category) {
		return false;
	}

	// 3. province exist
	return !!plateInfo?.province;
}

export function getPlateHandler(plate: NormalizedPlate): (plate: NormalizedPlate) => PlateResultApi {
	let handler;
	if (plate.numbers?.length === 7) {
		handler = carHandler;
	} else if (plate.numbers?.length === 8) {
		handler = motorcycleHandler;
	} else {
		throw new PersianToolsError("Plate", `plate must be 7 or 8 digits long, but ${plate.numbers.length}`);
	}

	return handler;
}

export function carHandler(plate: NormalizedPlate): PlateResultApi {
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
}
export function motorcycleHandler(plate: NormalizedPlate): PlateResultApi {
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
}

export type { PlateTypes };
export type { PlateOptions, PlateResult, PlateApi, PlateResultApi, PlateResultApiTypeString };
