import { it, expect } from "vitest";
import { sortText } from "../src";

it("Sort Persian text", () => {
	expect(sortText("سلام علی ترکی")).toEqual(["ترکی", "سلام", "علی"]);
	expect(sortText("سلام علی ترکی سلام")).toEqual(["ترکی", "سلام", "سلام", "علی"]);
	expect(sortText(["مومنی", "هستم", "سلام", "مهدی"])).toEqual(["سلام", "مومنی", "مهدی", "هستم"]);
	expect(sortText(["اب", "اا"])).toEqual(["اا", "اب"]);
	expect(sortText(["مهدی"])).toEqual(["مهدی"]);
	expect(sortText(["۲ مهدی", "۱ مهدی"])).toEqual(["۱ مهدی", "۲ مهدی"]);
	expect(sortText("")).toEqual([""]);
});
