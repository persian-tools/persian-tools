import SortText from "../src/modules/SortText";

it("SortText", () => {
	expect(SortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
});
