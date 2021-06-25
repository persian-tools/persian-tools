import { phoneNumberDetail, phoneNumberValidator } from "./index";
import { getPhonePrefix } from "./utils";

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
			expect(phoneNumberDetail("09022002580")?.province.length).toEqual(
				0,
			);
		});

		it("Should return null", () => {
			expect(phoneNumberDetail("09802002580")).toEqual(null);
		});
	});

	describe("Iranian Phone Number Validator", () => {
		it("Should return true", () => {
			expect(phoneNumberValidator("09022002580")).toBeTruthy();
			expect(phoneNumberValidator("09122002580")).toBeTruthy();
			expect(phoneNumberValidator("09322002580")).toBeTruthy();
			expect(phoneNumberValidator("09192002580")).toBeTruthy();
		});

		it("Should return true with different prefixes or without prefix", () => {
			expect(phoneNumberValidator("+989022002580")).toBeTruthy();
			expect(phoneNumberValidator("09022002580")).toBeTruthy();
			expect(phoneNumberValidator("989022002580")).toBeTruthy();
			expect(phoneNumberValidator("00989022002580")).toBeTruthy();
			expect(phoneNumberValidator("9022002580")).toBeTruthy();
		});

		it("Should return false", () => {
			expect(phoneNumberValidator("09802002580")).toBeFalsy();
		});
	});

	describe("Get Prefix", () => {
		it("Should return the prefix", () => {
			expect(getPhonePrefix("09022002580")).toEqual("902");
			expect(getPhonePrefix("09122002580")).toEqual("912");
			expect(getPhonePrefix("09981000000")).toEqual("998");
			expect(getPhonePrefix("09123200007")).toEqual("912");
			expect(getPhonePrefix("09300880440")).toEqual("930");
		});

		it("Should return the prefix with 98 or +98", () => {
			expect(getPhonePrefix("+989022002580")).toEqual("902");
			expect(getPhonePrefix("989122002580")).toEqual("912");
		});

		it("Should return nothing", () => {
			expect(getPhonePrefix("000989022002580")).toEqual("");
		});
	});
});
