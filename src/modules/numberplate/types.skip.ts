export interface PlateResult {
	info: PlateResultApi;
	isValid: boolean;
}

export interface PlateApi {
	number: string;
	char?: string;
}

export enum PlateTypes {
	Car = 1,
	Motorcycle = 2,
}

export type PlateResultApiTypeString = keyof typeof PlateTypes;

export interface PlateResultApi {
	template: string;
	province: string | null;
	type: PlateResultApiTypeString;
	category: string | null;
}

export type PlateOptions = string | PlateApi;
export type ProvinceObject = Array<{ province: string; codes: Array<number> }>;

export interface NormilizedPlate {
	numbers: string;
	char: string | undefined;
}
