import Bill from "../src/modules/bill";

describe("bill", () => {
	it("billAmount", () => {
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160, currency: "rial" }).getData().amount).toEqual(
			120000,
		);
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160 }).getData().amount).toEqual(12000);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108, currency: "rial" }).getData().amount).toEqual(5000);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108 }).getData().amount).toEqual(500);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165, currency: "rial" }).getData().amount).toEqual(
			17000,
		);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165 }).getData().amount).toEqual(1700);
	});

	it("billType", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getData().type).toEqual(
			"تلفن ثابت",
		);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197, currency: "rial" }).getData().type).toEqual(
			"برق",
		);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189, currency: "rial" }).getData().type).toEqual("آب");
		expect(new Bill({ billId: 9100074409151, paymentId: 12908190, currency: "rial" }).getData().type).toEqual(
			"تلفن همراه",
		);
	});

	it("verificationBillId", () => {
		expect(
			new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getData().isValidBillId,
		).toEqual(true);
		expect(
			new Bill({ billId: 9174639504124, paymentId: 12908197, currency: "rial" }).getData().isValidBillId,
		).toEqual(true);
		expect(
			new Bill({ billId: 2050327604613, paymentId: 1070189, currency: "rial" }).getData().isValidBillId,
		).toEqual(true);
		expect(
			new Bill({ billId: 2234322344613, paymentId: 1070189, currency: "rial" }).getData().isValidBillId,
		).toEqual(false);
	});

	it("verificationBIllPayment", () => {
		expect(
			new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getData().isValidBillPayment,
		).toEqual(true);
		expect(
			new Bill({ billId: 9174639504124, paymentId: 12908197, currency: "rial" }).getData().isValidBillPayment,
		).toEqual(false);
		expect(
			new Bill({ billId: 2050327604613, paymentId: 1070189, currency: "rial" }).getData().isValidBillPayment,
		).toEqual(true);
		expect(
			new Bill({ billId: 2234322344613, paymentId: 1070189, currency: "rial" }).getData().isValidBillPayment,
		).toEqual(false);
	});

	it("verificationBill", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getData().isValid).toEqual(
			true,
		);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197, currency: "rial" }).getData().isValid).toEqual(
			false,
		);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189, currency: "rial" }).getData().isValid).toEqual(
			true,
		);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189, currency: "rial" }).getData().isValid).toEqual(
			false,
		);
	});

	it("getBarcode", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getData().barcode).toEqual(
			"77483178001420001770160",
		);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197, currency: "rial" }).getData().barcode).toEqual(
			"917463950412400012908197",
		);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189, currency: "rial" }).getData().barcode).toEqual(
			"20503276046130001070189",
		);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189, currency: "rial" }).getData().barcode).toEqual(
			"22343223446130001070189",
		);
	});
});
