import SortText from "./index";

it("Sort Persian text", () => {
	expect(SortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
	expect(SortText("سلام علی ترکی سلام")).toEqual([
		"ترکی",
		"سلام",
		"سلام",
		"علی",
	]);
	expect(SortText(["مومنی", "هستم", "سلام", "مهدی"])).toEqual([
		"سلام",
		"مومنی",
		"مهدی",
		"هستم",
	]);
	expect(SortText(["اب", "اا"])).toEqual(["اا", "اب"]);
	expect(SortText(["مهدی"])).toEqual(["مهدی"]);
	expect(SortText(["۲ مهدی", "۱ مهدی"])).toEqual(["۱ مهدی", "۲ مهدی"]);
	expect(SortText("")).toEqual([""]);
});
