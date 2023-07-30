import { findCapitalByProvince } from "../src";
import { it, expect } from "vitest";

it("should throw an error when there isn't any province", () => {
	expect(() => {
		findCapitalByProvince("random");
	}).toThrow();
});

it("should return the correct value", () => {
	expect(findCapitalByProvince("تهران")).toBe("تهران");
	expect(findCapitalByProvince("مرکزی")).toBe("اراک");
	expect(findCapitalByProvince("خراسان رضوی")).toBe("مشهد");
});

it("should work with arabic letter", () => {
	expect(findCapitalByProvince("خراسان رضوي")).toBe("مشهد");
});

