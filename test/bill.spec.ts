import Bill from "../src/modules/bill";

describe("bill", () => {
	it("billAmount", () => {
		expect(new Bill(1117753200140, 12070160, "rial").getData().amount).toEqual(120000);
		expect(new Bill(1117753200140, 12070160).getData().amount).toEqual(12000);
		expect(new Bill(1177809000142, 570108, "rial").getData().amount).toEqual(5000);
		expect(new Bill(1177809000142, 570108).getData().amount).toEqual(500);
		expect(new Bill(5573391300141, 1770165, "rial").getData().amount).toEqual(17000);
		expect(new Bill(5573391300141, 1770165).getData().amount).toEqual(1700);
	});

	it("billType", () => {
		expect(new Bill(7748317800142, 1770160, "rial").getData().type).toEqual("تلفن ثابت");
		expect(new Bill(9174639504124, 12908197, "rial").getData().type).toEqual("برق");
		expect(new Bill(2050327604613, 1070189, "rial").getData().type).toEqual("آب");
		expect(new Bill(9100074409151, 12908190, "rial").getData().type).toEqual("تلفن همراه");
	});

	it("verificationBillId", () => {
		expect(new Bill(7748317800142, 1770160, "rial").getData().isValidBillId.isValid).toEqual(true);
		expect(new Bill(9174639504124, 12908197, "rial").getData().isValidBillId.isValid).toEqual(true);
		expect(new Bill(2050327604613, 1070189, "rial").getData().isValidBillId.isValid).toEqual(true);
		expect(new Bill(2234322344613, 1070189, "rial").getData().isValidBillId.isValid).toEqual(false);
	});

	it("verificationBIllPayment", () => {
		expect(new Bill(7748317800142, 1770160, "rial").getData().isValidBillPayment.isValid).toEqual(true);
		expect(new Bill(9174639504124, 12908197, "rial").getData().isValidBillPayment.isValid).toEqual(false);
		expect(new Bill(2050327604613, 1070189, "rial").getData().isValidBillPayment.isValid).toEqual(true);
		expect(new Bill(2234322344613, 1070189, "rial").getData().isValidBillPayment.isValid).toEqual(false);
	});

	it("verificationBill", () => {
		expect(new Bill(7748317800142, 1770160, "rial").getData().isValid).toEqual(true);
		expect(new Bill(9174639504124, 12908197, "rial").getData().isValid).toEqual(false);
		expect(new Bill(2050327604613, 1070189, "rial").getData().isValid).toEqual(true);
		expect(new Bill(2234322344613, 1070189, "rial").getData().isValid).toEqual(false);
	});

	it("getBarcode", () => {
		expect(new Bill(7748317800142, 1770160, "rial").getData().barcode).toEqual("77483178001420001770160");
		expect(new Bill(9174639504124, 12908197, "rial").getData().barcode).toEqual("917463950412400012908197");
		expect(new Bill(2050327604613, 1070189, "rial").getData().barcode).toEqual("20503276046130001070189");
		expect(new Bill(2234322344613, 1070189, "rial").getData().barcode).toEqual("22343223446130001070189");
	});
});
