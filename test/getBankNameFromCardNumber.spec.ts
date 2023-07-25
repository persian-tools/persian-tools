import { getBankNameFromCardNumber } from "../src";
import { describe, it, expect } from "vitest";

it("Get the name of the bank by bank account number", () => {
	expect(getBankNameFromCardNumber(6037701689095443)).toEqual("بانک کشاورزی");
	expect(getBankNameFromCardNumber(6219861034529007)).toEqual("بانک سامان");
	expect(getBankNameFromCardNumber("6219861034529007")).toEqual("بانک سامان");

	expect(getBankNameFromCardNumber(610433)).toEqual("بانک ملت");
	expect(getBankNameFromCardNumber("50222919")).toEqual("بانک پاسارگاد");

	expect(getBankNameFromCardNumber("50222")).toBeNull();
	expect(getBankNameFromCardNumber("9999991034529007")).toBeNull();
	expect(getBankNameFromCardNumber()).toBeUndefined();
});
