import { createProvinceHashTable, isPlateNumberValid, normalizePlate } from "../src/modules/numberplate/helpers";
import { PlateResultApi, ProvinceDataset } from "../src/modules/numberplate/types.skip";

import plate, { getPlateHandler, carHandler, bikeHandler, isPlateValid, getPlateInfo } from "../src/modules/numberplate/index";

describe("number plate module", () => {
	it("getPlateHandler should set handler to carHandler if plate length is 7", () => {
		const normalizedPlate = {
			numbers: "1214547",
			char: "ب",
		};
		const handlerFn = getPlateHandler(normalizedPlate);
		expect(handlerFn).toEqual(carHandler);
	});

	it("getPlateHandler should set handler to bikeHandler if plate length is 8", () => {
		const normalizedPlate = {
			numbers: "12145478",
			char: undefined,
		};
		const handlerFn = getPlateHandler(normalizedPlate);
		expect(handlerFn).toEqual(bikeHandler);
	});

	it("getPlateHandler should throw an error if plate length is not 7 or 8", () => {
		const normalizedPlate = {
			numbers: "121454789",
			char: undefined,
		};
		expect(() => getPlateHandler(normalizedPlate)).toThrow();
	});

	it("carHandler should return plate info from carProvinceCode and plateCategory", () => {
		const normalizedPlate1 = {
			numbers: "1214547",
			char: "ب",
		};
		const info1 = carHandler(normalizedPlate1);

		const _iran = "ایران";
		const _char = "ب";
		const template1 = `12${_char}145${_iran}47`;

		expect(info1).toEqual({
			type: "Car",
			template: template1,
			province: "مرکزی",
			category: "شخصی",
		});

		// undefiend values
		const normalizedPlate2 = {
			numbers: "1214501", // fake province code (01)
			char: undefined, // falsy char
		};
		const info2 = carHandler(normalizedPlate2);
		const template2 = `12null145${_iran}1`;

		expect(info2).toEqual({
			type: "Car",
			template: template2,
			province: undefined,
			category: undefined,
		});
	});

	it("bikeHandler should return plate info from bikeProvinceCode", () => {
		const normalizedPlate1 = {
			numbers: "12145478",
			char: undefined,
		};
		const info1 = bikeHandler(normalizedPlate1);

		const template1 = `121-45478`;

		expect(info1).toEqual({
			type: "Motorcycle",
			template: template1,
			province: "مرکز تهران",
			category: undefined,
		});

		// undefiend values
		const normalizedPlate2 = {
			numbers: "10045118", // fake province code (100)
			char: undefined, // there is no char when using motorcycle plate
		};
		const info2 = bikeHandler(normalizedPlate2);
		const template2 = `100-45118`;

		expect(info2).toEqual({
			type: "Motorcycle",
			template: template2,
			province: undefined,
			category: undefined,
		});
	});

	describe("isPlateValid truthy tests", () => {
		it("isPlateValid should validate plate info for type car", () => {
			const _iran = "ایران";
			const _char = "ب";
			const template1 = `12${_char}145${_iran}47`;

			const normalizedPlate1 = {
				numbers: "1214547",
				char: "ب",
			};
			const plate1Info: PlateResultApi = {
				type: "Car",
				template: template1,
				province: "مرکزی",
				category: "شخصی",
			};
			expect(isPlateValid(plate1Info, normalizedPlate1.numbers));
		});

		it("isPlateValid should validate plate info type motorcycle", () => {
			const normalizedPlate1 = {
				numbers: "12145478",
				char: undefined,
			};
			const info: PlateResultApi = {
				type: "Motorcycle",
				template: "121-45478",
				province: "مرکز تهران",
				category: undefined,
			};

			expect(isPlateValid(info, normalizedPlate1.numbers)).toBe(true);
		});
	});

	describe("isPlateValid falsy tests", () => {
		it("isPlateValid should validate plate info for type car", () => {
			const _iran = "ایران";
			const template1 = `12${"null"}145${_iran}47`;

			const normalizedPlate1 = {
				numbers: "1214501", // fake province code (01)
				char: undefined, // falsy char
			};
			const plate1Info: PlateResultApi = {
				type: "Car",
				template: template1,
				province: undefined,
				category: undefined,
			};
			expect(isPlateValid(plate1Info, normalizedPlate1.numbers)).toBe(false);
		});

		it("isPlateValid should validate plate info type motorcycle", () => {
			const normalizedPlate1 = {
				numbers: "10045118", // fake province code (100)
				char: undefined, // there is no char when using motorcycle plate
			};
			const template2 = `100-45118`;
			const info1: PlateResultApi = {
				type: "Motorcycle",
				template: template2,
				province: undefined,
				category: undefined,
			};

			expect(isPlateValid(info1, normalizedPlate1.numbers)).toBe(false);
		});

		it("should return false if category does not exist on type Car", () => {
			const normalizedPlate1 = {
				numbers: "1245147",
				char: "g" // undefined char (category)
			}

			const info: PlateResultApi = {
				type: "Car",
				template: `12${"g"}451${"ایران"}47`,
				province: "مرکزی",
				category: undefined,
			}

			expect(isPlateValid(info, normalizedPlate1.numbers)).toBe(false);
		})

		it("should return false if province does not exist on both types car & bike", () => {
			// car type
			const normalizedPlate1 = {
				numbers: "1245150",
				char: "الف",
			};

			const info1: PlateResultApi = {
				type: "Car",
				template: `12${"g"}451${"ایران"}50`, // province 50 does not exist
				category: "دولتی",
				province: undefined,
			};

			expect(isPlateValid(info1, normalizedPlate1.numbers)).toBe(false);

			const normalizedPlate2 = {
				numbers: "10045678",
				char: undefined,
			};

			const info2: PlateResultApi = {
				type: "Motorcycle",
				template: `100-45678`, // province 100 does not exist
				category: undefined,
				province: undefined,
			};

			expect(isPlateValid(info2, normalizedPlate2.numbers)).toBe(false);
		})
	});

	it("getPlateInfo should return plate info based on plate type", () => {
		// car type plate
		const normalizedPlate1 = {
			numbers: "1214547",
			char: "ب",
		};
		const info1 = getPlateInfo(normalizedPlate1);
		expect(info1).toEqual({
			type: "Car",
			template: `12${"ب"}145${"ایران"}47`,
			province: "مرکزی",
			category: "شخصی",
		});

		// bike type
		const normalizedPlate2 = {
			numbers: "12145478",
			char: undefined,
		};
		const info2 = getPlateInfo(normalizedPlate2);
		expect(info2).toEqual({
			type: "Motorcycle",
			template: "121-45478",
			province: "مرکز تهران",
			category: undefined,
		});
	});

	it("plate should expose info & isValid to the user", () => {
		const vehicle = plate("12ب45147");

		expect(vehicle.info).toBeTruthy();
		expect(vehicle.isValid).toBeDefined();
	});
});

describe("number plate helpers", () => {
	it("normalizePlate should normalize plate value to a Object", () => {
		const norm1 = normalizePlate("1234567الف");
		expect(norm1).toEqual({
			numbers: "1234567",
			char: "الف",
		});

		const norm2 = normalizePlate({
			number: "1234567",
			char: "ب",
		});
		expect(norm2).toEqual({
			numbers: "1234567",
			char: "ب",
		});

		// without char
		const norm3 = normalizePlate("1234567");
		expect(norm3).toEqual({
			numbers: "1234567",
			char: undefined,
		});

		const norm4 = normalizePlate({
			number: "12345678",
		});
		expect(norm4).toEqual({
			numbers: "12345678",
			char: undefined,
		});
	});
	it("isPlateNumberValid should validate plateNumber", () => {
		expect(isPlateNumberValid("1234560")).toBe(true); // Car plate
		expect(isPlateNumberValid("12345678")).toBe(true); // Motorcycle plate
		expect(isPlateNumberValid("12345670")).toBe(true);

		expect(isPlateNumberValid("1230567")).toBe(false);
		expect(isPlateNumberValid("12305678")).toBe(false);
		expect(isPlateNumberValid("1ی23456")).toBe(false);
		expect(isPlateNumberValid("1234f560")).toBe(false);
		expect(isPlateNumberValid("123450d0")).toBe(false);
	});
	it("createProvinceHashTable should create hash table for given dataset", () => {
		const randomDataset: ProvinceDataset = [
			{
				codes: [1, 2, 3, 4],
				province: "random",
			},
		];

		const table = createProvinceHashTable(randomDataset);

		expect(table[1]).toBe("random");
		expect(table[2]).toBe("random");
		expect(table[3]).toBe("random");
		expect(table[4]).toBe("random");

		expect(table).toEqual({
			1: "random",
			2: "random",
			3: "random",
			4: "random",
		});
	});
});
