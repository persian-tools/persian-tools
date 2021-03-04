import { Plate } from "../src";

describe("Plate class", () => {
	// const normilizerSpy = jest.spyOn(Plate.prototype as any, "normalizePlate"); // convert to any, allow private method

	it("plate instances should not be same", () => {
		const vehc1 = new Plate("1234567");
		const vehc2 = new Plate("1234567");
		expect(vehc1 === vehc2).toBe(false);
	});

	it("should throw an error if plate length is not 7 or 8", () => {
		expect(() => {
			new Plate("123");
		}).toThrow();
	});

	it("should normalize plate", () => {
		const vehicle1 = new Plate("1234567گ");
		expect(Reflect.get(vehicle1, "plate")).toEqual({
			char: "گ",
			numbers: "1234567",
		});

		const vehicle2 = new Plate({
			number: "1234567",
			char: "الف",
		});
		expect(Reflect.get(vehicle2, "plate")).toEqual({
			char: "الف",
			numbers: "1234567",
		});

		const vehicle3 = new Plate({
			number: "1234567",
		});
		expect(Reflect.get(vehicle3, "plate")).toEqual({
			char: undefined,
			numbers: "1234567",
		});
	});
	it("calling info() should call initCar if given plate has 7 digits", () => {
		const initCarSpy = jest.spyOn(Plate.prototype as any, "initCar");

		new Plate("1234567").info();
		expect(initCarSpy).toHaveBeenCalled();
	});

	it("calling info() should call initBike if given plate has 8 digits", () => {
		const initBikeSpy = jest.spyOn(Plate.prototype as any, "initBike");

		new Plate("12345678").info();
		expect(initBikeSpy).toHaveBeenCalled();
	});

	it("initCar should set plateType to خودرو", () => {
		const vehicle = new Plate("1234567");
		vehicle.info();
		expect(Reflect.get(vehicle, "plateType")).toBe("خودرو");
	});

	it("initBike should set plateType to موتور سیکلت", () => {
		const vehicle = new Plate("12345678");
		vehicle.info();
		expect(Reflect.get(vehicle, "plateType")).toBe("موتور سیکلت");
	});

	it("should set province code for car plate", () => {
		const vehicle = new Plate("1234567");
		vehicle.info();

		// last 2 digits
		expect(Reflect.get(vehicle, "provinceCode")).toBe(67);
	});
	it("should set province code for bike plate", () => {
		const vehicle = new Plate("12345678");
		vehicle.info();

		// first 3 digits
		expect(Reflect.get(vehicle, "provinceCode")).toBe(123);
	});

	it("calling info() should return proper info", () => {
		// car plate
		const vehicle1 = new Plate("1234547ص");
		const data1 = vehicle1.info();

		const _provinceCode = "ص";
		const _iranText = "ایران";
		let fakeTemplate = `12${_provinceCode}345${_iranText}47`;

		expect(data1).toEqual({
			category: "شخصی",
			province: ["مرکزی"],
			template: fakeTemplate,
			type: "خودرو",
		});

		// bike plate
		const vehicle2 = new Plate("11145678");
		const data2 = vehicle2.info();
		fakeTemplate = `111-45678`;

		expect(data2).toEqual({
			category: undefined,
			province: ["مرکز تهران"],
			template: fakeTemplate,
			type: "موتور سیکلت",
		});
	});

	it("isPlateNumberValid should return false if plate is not an Integer or has zeros in it (expect the last number)", () => {
		const vehicle1 = new Plate("1234560"); // initialize to access isPlateNumberValid method
		const isPlateNumberValid = Reflect.get(vehicle1, "isPlateNumberValid");

		expect(isPlateNumberValid("1034567")).toBe(false);
		expect(isPlateNumberValid("123456گ")).toBe(false);

		// extra
		expect(isPlateNumberValid("00000000")).toBe(false);
		expect(isPlateNumberValid("ضصثقفغع")).toBe(false);
	});

	it("isPlateNumberValid should return true if plate is an Integer without zeros (expect the last number)", () => {
		const vehicle1 = new Plate("1234560"); // initialize to access isPlateNumberValid method
		const isPlateNumberValid = Reflect.get(vehicle1, "isPlateNumberValid");

		expect(isPlateNumberValid("1234569")).toBe(true);
		expect(isPlateNumberValid("12345691")).toBe(true);
		expect(isPlateNumberValid("1234560")).toBe(true);

		// extra
		expect(isPlateNumberValid("11111111")).toBe(true);
		expect(isPlateNumberValid("2222222")).toBe(true);
	});

	it("isValid should return false if provinceCode does not exist in the collection", () => {
		const vehicle1 = new Plate("12گ45350");
		// province code 50 does not exist
		expect(vehicle1.isValid()).toBe(false);

		// bike plate
		// province code 100 does not exist
		const vehicle2 = new Plate("10045678");
		expect(vehicle2.isValid()).toBe(false);
	});

	it("isValid should return false if type is خودرو and plateInfo does not contain category", () => {
		const vehicle1 = new Plate("1234547"); // no char provided for category  -> category should be undefiend
		expect(vehicle1.isValid()).toBe(false);

		const vehicle2 = new Plate({
			number: "1234567"
		})
		expect(vehicle2.isValid()).toBe(false);
	});

	it("isValid should return false if province code is undefiend", () => {
		const vehicle1 = new Plate("1234550");
		expect(vehicle1.isValid()).toBe(false);

		const vehicle2 = new Plate("10045678");
		expect(vehicle2.isValid()).toBe(false);
	});


	it("isValid should return true if plate is Valid", () => {
		const car = new Plate("12گ45647");
		expect(car.isValid()).toBe(true);

		const bike = new Plate("76145678");
		expect(bike.isValid()).toBe(true);
	})
});
