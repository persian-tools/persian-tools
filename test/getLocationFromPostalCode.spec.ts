import { describe, it, expect } from "vitest";

import { getLocationFromPostalCode } from "../src";

describe("getLocationFromPostalCode", () => {
	it("should return correct city and state for a valid 10-digit postal code in range", () => {
		const result = getLocationFromPostalCode("5715000000"); // Between 57131 and 57591
		expect(result).toEqual({ state: "آذربایجان غربی", city: "ارومیه" });
	});

	it("should return correct city and state for another valid 10-digit postal code", () => {
		const result = getLocationFromPostalCode("5355000000"); // Between 53511 and 53591
		expect(result).toEqual({ state: "آذربایجان شرقی", city: "اسکو" });
	});

	it("should return null for a 10-digit postal code not in any range", () => {
		const result = getLocationFromPostalCode("1234567890"); // Outside all ranges
		expect(result).toBeNull();
	});

	it("should return null for a 10-digit postal code just outside a range", () => {
		const result = getLocationFromPostalCode("5861000000"); // Just before the start of the range
		expect(result).toBeNull();
	});
});
