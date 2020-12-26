import { getBankNameFromCardNumber } from "../src";

it("Get the name of the bank by bank account number", () => {
	expect(getBankNameFromCardNumber(6037701689095443)).toEqual("بانک کشاورزی");
	expect(getBankNameFromCardNumber(6219861034529007)).toEqual("بانک سامان");
	expect(getBankNameFromCardNumber("6219861034529007")).toEqual("بانک سامان");

	expect(getBankNameFromCardNumber("621986103452900")).toBeNull();
	expect(getBankNameFromCardNumber("9999991034529007")).toBeNull();
	expect(getBankNameFromCardNumber()).toBeUndefined();
});
