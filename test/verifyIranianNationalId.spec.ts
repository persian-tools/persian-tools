import { describe, it, expect } from "vitest";
import { verifyIranianNationalId, validNationalIdPrefixes } from "../src"; // Adjust path as needed

describe("verifyIranianNationalId Function Tests", () => {
	/**
	 * Group 1: Invalid Cases
	 */
	describe("Invalid National IDs", () => {
		it("1) should return false for an empty string", () => {
			expect(verifyIranianNationalId("")).toBe(false);
		});

		it("2) should return false for `undefined` or `null` input", () => {
			// @ts-expect-error Testing an undefined scenario
			expect(verifyIranianNationalId(undefined)).toBe(false);
			// @ts-expect-error Testing a null scenario
			expect(verifyIranianNationalId(null)).toBe(false);
		});

		it("3) should return false for a code with length < 8 (e.g. '1234567')", () => {
			expect(verifyIranianNationalId("1234567")).toBe(false);
		});

		it("4) should return false when parseInt(...) == 0 (e.g. '00000000')", () => {
			expect(verifyIranianNationalId("00000000")).toBe(false);
		});

		it("5) should return false for repeated-digit sequence '0000000000'", () => {
			expect(verifyIranianNationalId("0000000000")).toBe(false);
		});

		it("6) should return false for repeated-digit sequence '9999999999'", () => {
			expect(verifyIranianNationalId("9999999999")).toBe(false);
		});

		it("7) should return false if the 6 middle digits are all zero (e.g. '0010000000')", () => {
			expect(verifyIranianNationalId("0010000000")).toBe(false);
		});

		it("8) should return false for an invalid checksum (e.g. '1234567890')", () => {
			// Typically fails mod-11 check
			expect(verifyIranianNationalId("1234567890")).toBe(false);
		});

		it("9) should return false for 8-digit ID with invalid checksum (e.g. '12345678')", () => {
			expect(verifyIranianNationalId("12345678")).toBe(false);
		});

		it("10) should return false for a numeric input 0", () => {
			expect(verifyIranianNationalId(0)).toBe(false);
		});

		it("11) should return false for a known repeated-digit sequence '3333333333'", () => {
			expect(verifyIranianNationalId("3333333333")).toBe(false);
		});

		it("12) should return false for a 9-digit repeated code '777777777'", () => {
			expect(verifyIranianNationalId("777777777")).toBe(false);
		});

		it("13) should return false for a code that fails after zero-padding (e.g. '000123456')", () => {
			// After zero-padding to length 10 => '0000123456' => likely invalid
			expect(verifyIranianNationalId("000123456")).toBe(false);
		});
	});

	/**
	 * Group 2: Valid Cases
	 */
	describe("Valid National IDs", () => {
		// These are examples; ensure they actually pass the checksum and other rules
		it("14) should return true for '0499370899'", () => {
			expect(verifyIranianNationalId("0499370899")).toBe(true);
		});

		it("15) should return true for '0790419904'", () => {
			expect(verifyIranianNationalId("0790419904")).toBe(true);
		});

		it("16) should return true for '1583250689'", () => {
			expect(verifyIranianNationalId("1583250689")).toBe(true);
		});

		it("17) should return true for '0684159414'", () => {
			expect(verifyIranianNationalId("0684159414")).toBe(true);
		});

		it("18) should return true for a valid 8-digit ID that passes zero-padding (e.g. '68415941')", () => {
			expect(verifyIranianNationalId("68415941")).toBe(true);
		});

		it("19) should return true for numeric input 1583250689", () => {
			expect(verifyIranianNationalId(1583250689)).toBe(true);
		});

		it("20) should return true for '4400276201'", () => {
			// Known example that used to have prefix issues
			expect(verifyIranianNationalId("4400276201")).toBe(true);
		});

		it("21) should return true for '2540201288' - issue #413 regression test", () => {
			// Test for issue #413: This national ID should be valid
			expect(verifyIranianNationalId("2540201288")).toBe(true);
		});

		it("22) should return true for '7400076205' - issue #439 regression test", () => {
			// Test for issue #439: This national ID should be valid
			expect(verifyIranianNationalId("7400076205")).toBe(true);
		});
	});

	/**
	 * Group 3: Tests Related to checkPrefix Option
	 */
	describe("Prefix Check (checkPrefix Option)", () => {
		const validListedPrefix = "0499370899";
		const validUnlistedPrefix = "7400076205";

		it("23) should default to skipping the prefix check", () => {
			expect(validNationalIdPrefixes.has("740")).toBe(false);
			expect(verifyIranianNationalId(validUnlistedPrefix)).toBe(true);
		});

		it("24) should reject an unlisted prefix only when checkPrefix is explicitly true", () => {
			expect(verifyIranianNationalId(validUnlistedPrefix, { checkPrefix: true })).toBe(false);
		});

		it("25) should accept a listed prefix under either setting", () => {
			expect(verifyIranianNationalId(validListedPrefix, { checkPrefix: true })).toBe(true);
			expect(verifyIranianNationalId(validListedPrefix, { checkPrefix: false })).toBe(true);
		});

		it("26) should reject a failing checksum whatever checkPrefix says", () => {
			expect(verifyIranianNationalId("9990419904")).toBe(false);
			expect(verifyIranianNationalId("9990419904", { checkPrefix: true })).toBe(false);
			expect(verifyIranianNationalId("9990419904", { checkPrefix: false })).toBe(false);
		});

		it("27) should apply the non-prefix rules when checkPrefix is false", () => {
			expect(verifyIranianNationalId("12345678", { checkPrefix: false })).toBe(false); // bad checksum
			expect(verifyIranianNationalId("7750000000", { checkPrefix: false })).toBe(false); // middle digits all zero
			expect(verifyIranianNationalId("1111111111", { checkPrefix: false })).toBe(false); // repeated-digit sequence
		});
	});

	/**
	 * Group 4: The late-added prefixes 775, 778 and 986.
	 *
	 * These are in validNationalIdPrefixes, so they exercise the case where the prefix passes but
	 * everything else still has to hold. Each fabricated ID is paired with its corrected form —
	 * same first 9 digits, the check digit the mod-11 rule actually demands.
	 */
	describe("Additional Prefix Cases (775, 778, 986)", () => {
		it("28) should reject prefix 775 when the middle digits are all zero", () => {
			// '7750000000' -> middle digits '000000' => rejected before the checksum runs
			expect(verifyIranianNationalId("7750000000")).toBe(false);
			expect(verifyIranianNationalId("7750000000", { checkPrefix: true })).toBe(false);
		});

		it("29) should reject prefix 775 on a bad check digit, and accept the corrected one", () => {
			// sum % 11 = 7 => check digit must be 4, not 3
			expect(verifyIranianNationalId("7751234503")).toBe(false);
			expect(verifyIranianNationalId("7751234504")).toBe(true);
			expect(verifyIranianNationalId("7751234504", { checkPrefix: true })).toBe(true);
		});

		it("30) should reject prefix 778 on a bad check digit, and accept the corrected one", () => {
			// sum % 11 = 10 => check digit must be 1, not 7
			expect(verifyIranianNationalId("7781234567")).toBe(false);
			expect(verifyIranianNationalId("7781234561")).toBe(true);
			expect(verifyIranianNationalId("7781234561", { checkPrefix: true })).toBe(true);
		});

		it("31) should reject prefix 986 on a bad check digit, and accept the corrected one", () => {
			// sum % 11 = 1, which is < 2, so the check digit must equal the remainder: 1, not 8
			expect(verifyIranianNationalId("9861234568")).toBe(false);
			expect(verifyIranianNationalId("9861234561")).toBe(true);
			expect(verifyIranianNationalId("9861234561", { checkPrefix: true })).toBe(true);
		});

		it("32) should reject a second prefix-986 code failing mod-11, and accept the corrected one", () => {
			// sum % 11 = 7 => check digit must be 4, not 3
			expect(verifyIranianNationalId("9869876543")).toBe(false);
			expect(verifyIranianNationalId("9869876544")).toBe(true);
			expect(verifyIranianNationalId("9869876544", { checkPrefix: true })).toBe(true);
		});
	});
});
