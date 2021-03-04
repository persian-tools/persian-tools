import bikeProvinceCodesJSON from "./bikeProvinceCodes.skip";
import carProvinceCodesJSON from "./carProvinceCodes.skip";
import plateTypeJSON from "./plateType.skip";

export interface PlateConstructor {
	[index: string]: any;
	number: string;
	char?: string;
}

export type PlateOptions = string | PlateConstructor;
export type ProvinceObject = Array<{ province: string; codes: Array<number> }>;
export type plateType = "خودرو" | "موتور سیکلت";

export interface NormilizedPlate {
	numbers: string;
	char: string | undefined;
}

export interface PlateInfoReturnType {
	template: string;
	province: Array<string>;
	type: plateType;
	category: string | undefined;
}

class Plate {
	private plate: NormilizedPlate;
	private provinceCode!: number;
	private plateTemplate!: string;
	private plateType!: plateType;
	private plateInfo: PlateInfoReturnType;

	constructor(options: PlateOptions) {
		this.plate = this.normalizePlate(options);
		this.plateInfo = this.init();
	}

	private init(): PlateInfoReturnType | never {
		let plateResult;
		if (this.plate.numbers?.length === 7) {
			plateResult = this.initCar();
		} else if (this.plate.numbers?.length === 8) {
			plateResult = this.initBike();
		} else {
			throw new Error("a Plate must be 7 or 8 digits long");
		}

		return plateResult;
	}

	private initCar(): PlateInfoReturnType {
		this.plateType = "خودرو";
		this.provinceCode = +this.plate.numbers.slice(5, 7);

		// {first two digits} {plate character} {next three digits} ایران {province code}
		this.plateTemplate = `${this.plate.numbers.slice(0, 2)}${this.plate.char}${this.plate.numbers.slice(
			2,
			5,
		)}ایران${this.provinceCode}`;
		const plateCategory = plateTypeJSON.find((t) => t.label === this.plate.char)?.description;
		const provinces = this.getProvince(carProvinceCodesJSON, this.provinceCode);

		return {
			category: plateCategory,
			province: provinces,
			template: this.plateTemplate,
			type: this.plateType,
		};
	}
	private initBike(): PlateInfoReturnType {
		this.plateType = "موتور سیکلت";
		this.provinceCode = +this.plate.numbers.slice(0, 3);

		// {province code} - {next five digits}
		this.plateTemplate = `${this.provinceCode}-${this.plate.numbers.slice(3)}`;
		const provinces = this.getProvince(bikeProvinceCodesJSON, this.provinceCode);

		return {
			category: undefined, // there is no category on bike plates
			province: provinces || [],
			template: this.plateTemplate,
			type: this.plateType,
		};
	}

	private normalizePlate(rawPlate: PlateOptions): NormilizedPlate {
		let char;
		let plateNumbers;

		const nonDigitRegex = /\D/g;

		if (typeof rawPlate === "string") {
			char = rawPlate.match(nonDigitRegex)?.join("");
			plateNumbers = rawPlate.replace(nonDigitRegex, "");
		} else {
			char = rawPlate?.char;
			plateNumbers = rawPlate.number.replace(nonDigitRegex, "");
		}

		return {
			char,
			numbers: plateNumbers,
		};
	}

	private getProvince(Data: ProvinceObject, provinceCode: number) {
		const provinces = Data.filter((province) => province.codes.find((code) => code === provinceCode));
		return this.normalizeProvince(provinces);
	}

	private normalizeProvince(provinces: ProvinceObject) {
		const provinceNames: Array<string> = [];
		provinces.forEach((p) => provinceNames.push(p.province));
		return provinceNames;
	}

	private isPlateNumberValid(numbers: string): boolean {
		if (isNaN(+numbers)) {
			return false;
		}
		// we don't care about last number it can be any number
		const arr = numbers.split("").slice(0, -1);
		return arr.every((num) => +num !== 0);
	}

	public info(): PlateInfoReturnType {
		return this.plateInfo;
	}

	public isValid(): boolean {
		// 1. no zeros and charas [1-9] allowed
		if (!this.isPlateNumberValid(this.plate.numbers)) {
			return false;
		}

		// 2. if type car => category should exist
		if (this.plateType === "خودرو" && !this.plateInfo?.category) {
			return false;
		}

		// 3. province exist
		if (this.plateInfo.province.length === 0) {
			return false;
		}

		return true;
	}
}

export default Plate;
