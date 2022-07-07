import { it, expect } from "vitest";
import { toPersianChars } from "../src";

it("toPersianChars", () => {
	expect(toPersianChars("علي")).toEqual("علی");
	expect(toPersianChars("")).toBeFalsy();
});
