import { describe, it, expect } from "vitest";
import { phoneNumberDetail, isPhoneNumberValid, phoneNumberNormalizer, getPhoneNumberPrefix } from "../src";

describe("Iranian Phone Number Utilities", () => {
	describe("Find details", () => {
		it("Should return true", () => {
			expect(phoneNumberDetail("09022002580")).toEqual(
				expect.objectContaining({
					base: "کشوری",
					operator: "ایرانسل",
					type: ["permanent", "credit"],
				}),
			);
			expect(phoneNumberDetail("09981000000")).toEqual(
				expect.objectContaining({
					base: "کشوری",
					operator: "شاتل موبایل",
					type: ["credit"],
				}),
			);
			expect(phoneNumberDetail("09300880440")).toEqual(
				expect.objectContaining({
					base: "کشوری",
					operator: "ایرانسل",
					type: ["permanent", "credit"],
				}),
			);
			expect(phoneNumberDetail("09022002580")?.province.length).toEqual(0);
		});

		it("Should return null", () => {
			expect(phoneNumberDetail("09802002580")).toEqual(null);
		});
	});

	describe("Iranian Phone Number Validator", () => {
		it("Should return true", () => {
			expect(isPhoneNumberValid("09022002580")).toBeTruthy();
			expect(isPhoneNumberValid("09122002580")).toBeTruthy();
			expect(isPhoneNumberValid("09322002580")).toBeTruthy();
			expect(isPhoneNumberValid("09192002580")).toBeTruthy();
			expect(isPhoneNumberValid("09002002580")).toBeTruthy();
		});

		it("Should return true with different prefixes or without prefix", () => {
			expect(isPhoneNumberValid("+989022002580")).toBeTruthy();
			expect(isPhoneNumberValid("09022002580")).toBeTruthy();
			expect(isPhoneNumberValid("989022002580")).toBeTruthy();
			expect(isPhoneNumberValid("00989022002580")).toBeTruthy();
			expect(isPhoneNumberValid("9022002580")).toBeTruthy();
		});

		it("Should return false", () => {
			expect(isPhoneNumberValid("09802002580")).toBeFalsy();
		});
	});

	describe("Extract PhoneNumber Prefix", () => {
		it("Should return the prefix", () => {
			expect(getPhoneNumberPrefix("09022002580")).toEqual("902");
			expect(getPhoneNumberPrefix("09122002580")).toEqual("912");
			expect(getPhoneNumberPrefix("09981000000")).toEqual("998");
			expect(getPhoneNumberPrefix("09123200007")).toEqual("912");
			expect(getPhoneNumberPrefix("09300880440")).toEqual("930");
			expect(getPhoneNumberPrefix("09000880440")).toEqual("900");
		});

		it("Should return the prefix with 98 or +98", () => {
			expect(getPhoneNumberPrefix("+989022002580")).toEqual("902");
			expect(getPhoneNumberPrefix("989122002580")).toEqual("912");
		});

		it("Should return nothing", () => {
			expect(getPhoneNumberPrefix("000989022002580")).toEqual("");
		});
	});

	describe("Normalize", () => {
		it("Should return the normalized phone number", () => {
			// normalize to 0
			expect(phoneNumberNormalizer("+989373708555", "0")).toEqual("09373708555");
			expect(phoneNumberNormalizer("989373708555", "0")).toEqual("09373708555");
			expect(phoneNumberNormalizer("00989022002580", "0")).toEqual("09022002580");
			expect(phoneNumberNormalizer("09122002580", "0")).toEqual("09122002580");
			expect(phoneNumberNormalizer("9322002580", "0")).toEqual("09322002580");

			// normalize to +98
			expect(phoneNumberNormalizer("09373708555", "+98")).toEqual("+989373708555");
			expect(phoneNumberNormalizer("09022002580", "+98")).toEqual("+989022002580");
			expect(phoneNumberNormalizer("09122002580", "+98")).toEqual("+989122002580");
			expect(phoneNumberNormalizer("9322002580", "+98")).toEqual("+989322002580");
			expect(phoneNumberNormalizer("00989022002580", "+98")).toEqual("+989022002580");
		});

		it("should throw if phone number is not valid", () => {
			expect(() => phoneNumberNormalizer("0", "+98")).toThrow();
			expect(() => phoneNumberNormalizer("+98", "+98")).toThrow();
			expect(() => phoneNumberNormalizer("99999999999", "+98")).toThrow();
			expect(() => phoneNumberNormalizer("   99999999     ", "+98")).toThrow();
			expect(() => phoneNumberNormalizer("09802002580", "0")).toThrow();
		});
	});
});
