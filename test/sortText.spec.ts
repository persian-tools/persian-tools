import { SortText } from "../src";

it("Sort Persian text", () => {
	expect(SortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
	expect(SortText("سلام علی ترکی سلام")).toEqual(["ترکی", "سلام", "سلام", "علی"]);
	expect(SortText("")).toBeFalsy();
});
