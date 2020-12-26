import { removeOrdinalSuffix } from "../src";

it("Remove ordinal suffix", () => {
	expect(removeOrdinalSuffix("چهل و سوم")).toEqual("چهل و سه");
	expect(removeOrdinalSuffix("چهل و پنجم")).toEqual("چهل و پنج");
	expect(removeOrdinalSuffix("سی اُم")).toEqual("سی");
	// @ts-ignore
	expect(removeOrdinalSuffix()).toBeUndefined();
});
