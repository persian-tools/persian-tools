import { it, expect } from "vitest";
import { toPersianChars } from "../src";

it("toPersianChars", () => {
	expect(toPersianChars("علي")).toEqual("علی");
	expect(toPersianChars("تلفن همراه")).toEqual("تلفن همراه");
	expect(toPersianChars("")).toBeFalsy();
});
