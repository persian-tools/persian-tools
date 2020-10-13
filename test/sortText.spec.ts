import sortText from "../src/modules/sortText";

it("Sort Persian text", () => {
	expect(sortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
	expect(sortText("سلام علی ترکی سلام")).toEqual(["ترکی", "سلام", "سلام", "علی"]);
	expect(sortText("")).toBeFalsy();
});
