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


export interface PlateResultApiTypeObject {
	first_two_digits: string;
	plate_character: string;
	next_three_digits: string;
	province_code: string;
}
/**
 *
 * @category Plate
 */
export interface PlateResultApi {
	template: string;
	province: string | null;
	type: PlateResultApiTypeString;
	typeDetails: PlateResultApiTypeObject;
	category: string | null;
}

/**
 *
 * @category Plate
 */
export type PlateOptions = string | PlateApi;
export type ProvinceObject = Array<{ province: string; codes: Array<number> }>;

export interface NormalizedPlate {
	numbers: string;
	char: string | undefined;
}
