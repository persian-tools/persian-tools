import removeCommas from "../src/modules/removeCommas";

it("Remove commas", () => {
	expect(removeCommas("30,000,000")).toEqual(30000000);
	expect(removeCommas(300)).toEqual(300);
	expect(removeCommas("300")).toEqual(300);
	// @ts-ignore
	expect(removeCommas("3000")).toBeType("number");
	expect(removeCommas()).toBeUndefined();
});
