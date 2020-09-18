import SortText from "../src/modules/SortText";

it("SortText", () => {
	expect(SortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
	expect(SortText("سلام علی ترکی سلام")).toEqual(["ترکی", "سلام", "سلام", "علی"]);
	expect(SortText("")).toBeFalsy();
});
