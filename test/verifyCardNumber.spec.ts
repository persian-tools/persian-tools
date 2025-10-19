import { it, expect, describe } from "vitest";
import { verifyCardNumber } from "../src";

describe("verifyCardNumber", () => {
	it("should validate correct Iranian bank card numbers", () => {
		expect(verifyCardNumber(6037701689095443)).toBeTruthy();
		expect(verifyCardNumber(6219861034529007)).toBeTruthy();
		expect(verifyCardNumber("6037701689095443")).toBeTruthy();
		expect(verifyCardNumber("6219861034529007")).toBeTruthy();
	});

	it("should reject invalid card numbers", () => {
		expect(verifyCardNumber(6219861034529008)).toBeFalsy();
		expect(verifyCardNumber(621986103452900)).toBeFalsy(); // Too short
		expect(verifyCardNumber("6219861034529008")).toBeFalsy();
		expect(verifyCardNumber("621986103452900")).toBeFalsy();
	});

	it("should reject the problematic test cases that were incorrectly validated", () => {
		// These were incorrectly passing with the old algorithm
		expect(verifyCardNumber("4444333322221111")).toBeFalsy();
		expect(verifyCardNumber("2222444499996666")).toBeFalsy();
		expect(verifyCardNumber(4444333322221111)).toBeFalsy();
		expect(verifyCardNumber(2222444499996666)).toBeFalsy();
	});

	it("should handle edge cases correctly", () => {
		expect(verifyCardNumber(0)).toBeFalsy();
		expect(verifyCardNumber("")).toBe(undefined);
		expect(verifyCardNumber(null as any)).toBe(undefined);
		expect(verifyCardNumber(undefined as any)).toBe(undefined);
	});

	it("should reject invalid formats", () => {
		expect(verifyCardNumber("1234567890123456789")).toBeFalsy(); // Too long
		expect(verifyCardNumber("123456789012345")).toBeFalsy(); // Too short
		expect(verifyCardNumber("abcd1234567890ab")).toBeFalsy(); // Non-numeric
		expect(verifyCardNumber("1234 5678 9012 3456")).toBeFalsy(); // With spaces (should be cleaned but still invalid)
	});

	it("should reject non-Iranian card numbers even if they pass Luhn", () => {
		// These are valid Luhn numbers but not Iranian bank cards
		expect(verifyCardNumber("4000000000000002")).toBeFalsy(); // Visa test number
		expect(verifyCardNumber("5555555555554444")).toBeFalsy(); // Mastercard test number
	});

	it("should reject obviously invalid patterns", () => {
		expect(verifyCardNumber("0000000000000000")).toBeFalsy();
		expect(verifyCardNumber("1111111111111111")).toBeFalsy();
		expect(verifyCardNumber("1234567890123456")).toBeFalsy();
	});
});
