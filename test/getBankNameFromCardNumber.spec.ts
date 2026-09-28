import { getBankLogoWithCardNumber, getBankNameFromCardNumber } from "../src";
import { cardBank } from "../src/modules/getBankNameFromCardNumber/banksCode.skip";
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

describe("getBankLogoWithCardNumber", () => {
	it("returns the bank's Persian name and packaged SVG logo", () => {
		expect(getBankLogoWithCardNumber("6219861034529007")).toEqual({
			name: "بانک سامان",
			logo: expect.stringMatching(/^(?:data:image\/svg\+xml,.*|.*Saman[^/]*\.svg)$/),
		});
	});

	it("accepts a 6-digit BIN and preserves Persian Tools bank names", () => {
		expect(getBankLogoWithCardNumber("621986")).toEqual({
			name: "بانک سامان",
			logo: expect.stringMatching(/^(?:data:image\/svg\+xml,.*|.*Saman[^/]*\.svg)$/),
		});
	});

	it("returns null for unknown or incomplete BINs", () => {
		expect(getBankLogoWithCardNumber("9999991234567890")).toBeNull();
		expect(getBankLogoWithCardNumber("60376")).toBeNull();
	});

	it("provides a logo for every supported bank BIN", () => {
		for (const code of Object.keys(cardBank)) {
			expect(getBankLogoWithCardNumber(code)).toEqual(
				expect.objectContaining({
					name: cardBank[code],
					logo: expect.any(String),
				}),
			);
		}
	});
});
