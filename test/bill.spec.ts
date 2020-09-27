import { Bill } from "../src/";

describe("Bill Calculator", () => {
	it("Calculate bill amount", () => {
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160, currency: "rial" }).getResult().amount).toEqual(
			120000,
		);
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160 }).getResult().amount).toEqual(12000);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108, currency: "rial" }).getResult().amount).toEqual(
			5000,
		);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108 }).getResult().amount).toEqual(500);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165, currency: "rial" }).getResult().amount).toEqual(
			17000,
		);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165 }).getResult().amount).toEqual(1700);
	});

	it("Call getAmount method directly", () => {
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160, currency: "rial" }).getAmount()).toEqual(120000);
		expect(new Bill({ billId: 1117753200140, paymentId: 12070160 }).getAmount()).toEqual(12000);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108, currency: "rial" }).getAmount()).toEqual(5000);
		expect(new Bill({ billId: 1177809000142, paymentId: 570108 }).getAmount()).toEqual(500);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165, currency: "rial" }).getAmount()).toEqual(17000);
		expect(new Bill({ billId: 1117753200140, paymentId: 1770165 }).getAmount()).toEqual(1700);
	});

	it("Get Bill type", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160, currency: "rial" }).getResult().type).toEqual(
			"تلفن ثابت",
		);

		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().type).toEqual("برق");
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().type).toEqual("آب");
		expect(new Bill({ billId: 9100074409151, paymentId: 12908190 }).getResult().type).toEqual("تلفن همراه");
	});

	it("Get Bill type by getBillType method", () => {
		expect(new Bill({ billId: 9100074409151, paymentId: 12908190 }).getBillType()).toEqual("تلفن همراه");
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getBillType()).toEqual("برق");
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getBillType()).toEqual("آب");
	});

	it("Check bill id validation", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValidBillId).toEqual(true);
		expect(new Bill({ billId: 9174639504124, paymentId: 1290819 }).getResult().isValidBillId).toEqual(true);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().isValidBillId).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().isValidBillId).toEqual(false);
	});

	it("Check bill id validation by isValidBillId method", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).verificationBillId()).toEqual(true);
		expect(new Bill({ billId: 9174639504124, paymentId: 1290819 }).verificationBillId()).toEqual(true);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).verificationBillId()).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).verificationBillId()).toEqual(false);
	});

	it("Check bill payment id validation", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValidBillPayment).toEqual(true);
		expect(new Bill({ billId: 7748317800142 }).getResult().isValidBillPayment).toEqual(false);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().isValidBillPayment).toEqual(false);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().isValidBillPayment).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().isValidBillPayment).toEqual(false);
	});

	it("Check bill payment id validation by verificationBillPayment method", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).verificationBillPayment()).toEqual(true);
		expect(new Bill({ billId: 7748317800142 }).verificationBillPayment()).toEqual(false);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).verificationBillPayment()).toEqual(false);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).verificationBillPayment()).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).verificationBillPayment()).toEqual(false);
	});

	it("Check bill id and bill payment id relation and validation", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().isValid).toEqual(true);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().isValid).toEqual(false);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().isValid).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().isValid).toEqual(false);
	});

	it("Check bill id and bill payment id relation and validation by verificationBill method", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).verificationBill()).toEqual(true);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).verificationBill()).toEqual(false);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).verificationBill()).toEqual(true);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).verificationBill()).toEqual(false);
	});

	it("Find bill's barcode", () => {
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).getResult().barcode).toEqual(
			"77483178001420001770160",
		);
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getResult().barcode).toEqual(
			"917463950412400012908197",
		);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getResult().barcode).toEqual(
			"20503276046130001070189",
		);
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).getResult().barcode).toEqual(
			"22343223446130001070189",
		);
	});

	it("Call getBarcode method directly", () => {
		expect(new Bill({ billId: 2234322344613, paymentId: 1070189 }).getBarcode()).toEqual("22343223446130001070189");
		expect(new Bill({ billId: 7748317800142, paymentId: 1770160 }).getBarcode()).toEqual("77483178001420001770160");
		expect(new Bill({ billId: 9174639504124, paymentId: 12908197 }).getBarcode()).toEqual(
			"917463950412400012908197",
		);
		expect(new Bill({ billId: 2050327604613, paymentId: 1070189 }).getBarcode()).toEqual("20503276046130001070189");
	});

	it("findByBarcode by constructor", () => {
		const BillInstance = new Bill({ barcode: "22343223446130001070189" });

		expect(BillInstance.findByBarcode().billId).toEqual(2234322344613);
		expect(BillInstance.findByBarcode().paymentId).toEqual(1070189);
	});

	it("findByBarcode by method", () => {
		const BillInstance = new Bill({});

		expect(BillInstance.findByBarcode("22343223446130001070189").billId).toEqual(2234322344613);
		expect(BillInstance.findByBarcode("22343223446130001070189").paymentId).toEqual(1070189);
	});
});
