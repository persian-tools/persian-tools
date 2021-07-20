/**
 *
 * @category Plate
 */
export interface PlateResult {
	info: PlateResultApi;
	isValid: boolean;
}

/**
 *
 * @category Plate
 */
export interface PlateApi {
	number: string;
	char?: string;
}

/**
 *
 * @category Plate
 */
export enum PlateTypes {
	Car = 1,
	Motorcycle = 2,
}

/**
 *
 * @category Plate
 */
export type PlateResultApiTypeString = keyof typeof PlateTypes;

/**
 *
 * @category Plate
 */
export interface PlateResultDetailModel {
	firstTwoDigits: string;
	plateCharacter: string | null;
	nextThreeDigits: string;
	provinceCode: string;
}

/**
 *
 * @category Plate
 */
export interface PlateResultMotorcycleDetailModel {
	digits: string;
	provinceCode: string;
}

/**
 *
 * @category Plate
 */
export interface PlateResultApi {
	template: string;
	province: multiLangProvince | null;
	type: PlateResultApiTypeString;
	details: PlateResultDetailModel | PlateResultMotorcycleDetailModel;
	category: string | null;
}

/**
 *
 * @category Plate
 */
export type PlateOptions = string | PlateApi;
export type ProvinceObject = Array<{ province: string; codes: Array<number> }>;
export type multiLangProvince = { fa: string | Array<string>, en: string | Array<string> };

export interface NormalizedPlate {
	numbers: string;
	char: string | undefined;
}
