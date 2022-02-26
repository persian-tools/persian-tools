import { isValidIranCity } from "../src/modules/isValidIranCity";
it("is string valid iran city", () => {
	expect(isValidIranCity("تهران")).toBe(true);
	expect(isValidIranCity("مشهد")).toBe(true);
	expect(isValidIranCity("تهرانی")).toBe(false);
	expect(isValidIranCity("تهرانیا")).toBe(false);
	expect(isValidIranCity("تستمشهد")).toBe(false);
});
