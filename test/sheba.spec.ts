import { describe, it, expect } from "vitest";
import { getBankLogoWithIban, getShebaInfo, isShebaValid } from "../src/modules/sheba";
import { shebaIso7064Mod97 } from "../src/modules/sheba/helpers";
import { ibanBankLogo } from "../src/modules/sheba/ibanBankLogos.skip";
import { shebaMapCodesMap } from "../src/modules/sheba/codes.skip";

describe("Sheba", () => {
	it("isShebaValid Should return true", () => {
		expect(isShebaValid("IR820540102680020817909002")).toBeTruthy();
		expect(isShebaValid("IR550570022080013447370101")).toBeTruthy();
	});

	it("isShebaValid Should return false", () => {
		expect(isShebaValid("IR01234567890123456789")).toBeFalsy();
		expect(isShebaValid("IR012345678901234567890123456789")).toBeFalsy();
		expect(isShebaValid("IR012345678901234567890123")).toBeFalsy();
		expect(isShebaValid("012345678901234567890123")).toBeFalsy();
	});

	it("shebaIso7064Mod97 should return true value", () => {
		expect(shebaIso7064Mod97("820540102680020817909002")).toEqual(1);
		expect(shebaIso7064Mod97("550570022080013447370101")).toEqual(6);
	});

	it("shebaIso7064Mod97 should return wrong value", () => {
		expect(shebaIso7064Mod97("012345678901234567890123456789")).toEqual(44);
		expect(shebaIso7064Mod97("01234567890123456789")).toEqual(10);
		expect(shebaIso7064Mod97("012345678901234567890123")).toEqual(19);
	});

	it("getShebaInfo should works", () => {
		expect(getShebaInfo("IR790610000000700796858044")).toEqual(
			expect.objectContaining({
				nickname: "shahr",
				accountNumber: "700796858044",
				code: "061",
			}),
		);
		expect(getShebaInfo("IR820540102680020817909002")).toEqual(
			expect.objectContaining({
				nickname: "parsian",
				accountNumber: "020817909002",
				code: "054",
			}),
		);
		expect(getShebaInfo("IR550570022080013447370101")).toEqual({
			accountNumber: "220800134473701",
			accountNumberAvailable: true,
			code: "057",
			formattedAccountNumber: "220-800-13447370-1",
			name: "Pasargad Bank",
			nickname: "pasargad",
			persianName: "بانک پاسارگاد",
		});
	});

	it("getShebaInfo should return null", () => {
		expect(getShebaInfo("IR012345678901234567890123")).toBeFalsy();
		expect(getShebaInfo("IR012345678A01234567890123")).toBeFalsy();
	});

	describe("getBankLogoWithIban", () => {
		it("returns validated bank details and its SVG logo", () => {
			expect(getBankLogoWithIban("IR820540102680020817909002")).toEqual(
				expect.objectContaining({
					code: "054",
					name: "Parsian Bank",
					persianName: "بانک پارسیان",
					logo: expect.stringMatching(/^(?:data:image\/svg\+xml,.*|.*Parsian[^/]*\.svg)$/),
				}),
			);
		});

		it("accepts a lowercase IBAN without the IR prefix", () => {
			expect(getBankLogoWithIban("550570022080013447370101")).toEqual(
				expect.objectContaining({
					code: "057",
					persianName: "بانک پاسارگاد",
					logo: expect.stringMatching(/^(?:data:image\/svg\+xml,.*|.*Pasargad[^/]*\.svg)$/),
				}),
			);
		});

		it("returns null for invalid or unknown IBANs", () => {
			expect(getBankLogoWithIban("IR012345678901234567890123")).toBeNull();
			expect(getBankLogoWithIban("IR012345678A01234567890123")).toBeNull();
		});

		it("provides a logo for every supported IBAN bank code", () => {
			for (const code of shebaMapCodesMap.keys()) {
				expect(ibanBankLogo.get(code)).toEqual(expect.any(String));
			}
		});
	});
});
