import addOrdinalSuffix from "../src/modules/addOrdinalSuffix";

it("Add ordinal suffix", () => {
	expect(addOrdinalSuffix("چهل و سه")).toEqual("چهل و سوم");
	expect(addOrdinalSuffix("چهل و پنج")).toEqual("چهل و پنجم");
	expect(addOrdinalSuffix("سی")).toEqual("سی اُم");
	expect(addOrdinalSuffix()).toBeUndefined();
});
