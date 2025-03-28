import { getBankLogoAndNameFromCardNumber } from "../src";
import { it, expect } from "vitest";
import config from "../src/config/index";
const baseUrl = config.baseUrl;

it("Get the name of the bank by bank account number", () => {
	expect(getBankLogoAndNameFromCardNumber(6037701689095443)).toEqual(
		expect.objectContaining({ name: "بانک کشاورزی", logo: `${baseUrl}/Keshavarzi.svg` }),
	);
	expect(getBankLogoAndNameFromCardNumber(6219861034529007)).toEqual(
		expect.objectContaining({ name: "بانک سامان", logo: `${baseUrl}/Saman.svg` }),
	);
	expect(getBankLogoAndNameFromCardNumber("6219861034529007")).toEqual(
		expect.objectContaining({ name: "بانک سامان", logo: `${baseUrl}/Saman.svg` }),
	);

	expect(getBankLogoAndNameFromCardNumber(610433)).toEqual(
		expect.objectContaining({ name: "بانک ملت", logo: `${baseUrl}/Mellat.svg` }),
	);
	expect(getBankLogoAndNameFromCardNumber("50222919")).toEqual(
		expect.objectContaining({ name: "بانک پاسارگاد", logo: `${baseUrl}/Pasargad.svg` }),
	);

	expect(getBankLogoAndNameFromCardNumber("50222")).toBeNull();
	expect(getBankLogoAndNameFromCardNumber("")).toBeNull();
	expect(getBankLogoAndNameFromCardNumber("9999991034529007")).toBeNull();
});
