import { findProvinceFromCoordinate } from "../src";
import { it, expect } from "vitest";

it("should throw an error when there isn't any coordinate", () => {
	expect(() => {
		findProvinceFromCoordinate({
            longitude: 1,
            latitude: 2
        });
	}).toThrow();
});

it("Should return the correct province for a given coordinate", () => {

    const pointToCheck = { longitude: 51.38897, latitude: 35.6892 };

    const result = findProvinceFromCoordinate(pointToCheck);
  
    expect(result.name).toBe('تهران');
    expect(result.properties['name:fa']).toBe('تهران');
    expect(result.properties['name:en']).toBe('Tehran');
});

it("Should return the correct province for a coordinate in Isfahan", () => {

    const pointToCheck = { longitude: 51.6660, latitude: 32.6546 };
  
    const result = findProvinceFromCoordinate(pointToCheck);
  
    expect(result.name).toBe('اصفهان');
    expect(result.properties['name:fa']).toBe('اصفهان');
    expect(result.properties['name:en']).toBe('Isfahan');
  });

