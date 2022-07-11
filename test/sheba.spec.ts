import { describe, it, expect } from "vitest";
import { isShebaValid, getShebaInfo, shebaIso7064Mod97 } from "../src/modules/sheba";

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
});
