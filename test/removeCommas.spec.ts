import { it, expect } from "vitest";
import { removeCommas } from "../src";

it("Remove commas", () => {
	expect(removeCommas("30,000,000")).toEqual(30000000);
	expect(removeCommas("300")).toEqual(300);
	// @ts-ignore
	expect(removeCommas("3000")).toBeTypeOf("number");

	try {
		//@ts-ignore
		removeCommas(300);
	} catch (e) {
		expect((e as Error).message).toEqual("PersianTools: removeCommas - The input must be string");
	}
	try {
		//@ts-ignore
		removeCommas();
	} catch (e) {
		expect((e as Error).message).toEqual("PersianTools: removeCommas - The input must be string");
	}
});
