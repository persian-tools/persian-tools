import addOrdinalSuffix from "../src/modules/addOrdinalSuffix/addOrdinalSuffix";

describe("Ordinal suffix", () => {
	it("Add", () => {
		expect(addOrdinalSuffix("چهل و سه")).toEqual("چهل و سوم");
		expect(addOrdinalSuffix("چهل و پنج")).toEqual("چهل و پنجم");
		expect(addOrdinalSuffix("سی")).toEqual("سی اُم");
	});

	it("Should throw an undefined error", () => {
		expect(addOrdinalSuffix()).toBeUndefined();
	});
});
