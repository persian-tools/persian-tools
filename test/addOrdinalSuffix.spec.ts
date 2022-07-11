import { addOrdinalSuffix } from "../src";
import { describe, it, expect } from "vitest";

describe("Ordinal suffix", () => {
	it("Add", () => {
		expect(addOrdinalSuffix("چهل و سه")).toEqual("چهل و سوم");
		expect(addOrdinalSuffix("چهل و پنج")).toEqual("چهل و پنجم");
		expect(addOrdinalSuffix("سی")).toEqual("سی اُم");
	});

	it("Should throw TypedError", () => {
		try {
			addOrdinalSuffix();
		} catch (e) {
			expect((e as Error).message).toBe("PersianTools: addOrdinalSuffix - The input must be string");
		}
	});
});
