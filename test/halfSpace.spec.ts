import { halfSpace } from "../src";
import { describe, it, expect } from "vitest";

describe("halfSpace", () => {
	it("should replace spaces by half-space ", () => {
		expect("این یک متن فارسی می‌باشد؟").toEqual(halfSpace("این یک متن فارسی می باشد؟"));
		expect("ای دوست سلام من به تو. نمی‌خواهمت درخت‌های چنار هاله صمیمی من").toEqual(
			halfSpace("ای دوست سلام من به تو. نمی خواهمت درخت های چنار هاله صمیمی من"),
		);
		expect(halfSpace("")).toBeFalsy();
	});

	it("gets applied on ending ها and تر", () => {
		const pairs = [
			{actual: "درخت ها", expected: "درخت‌ها"},
			{actual: "درخت های", expected: "درخت‌های"},
			{actual: "درخت هایش", expected: "درخت‌هایش"},
			{actual: "بزرگ تر", expected: "بزرگ‌تر"},
		]

		pairs.forEach(({actual, expected}) => {
			expect(halfSpace(actual)).toEqual( expected)
		})
	})

	it("gets applied on ها and تر followed by special characters", () => {
		const pairs = [
			{actual: "درخت ها، باد", expected: "درخت‌ها، باد"},
			{actual: "«درخت های»", expected: "«درخت‌های»"},
			{actual: "(درخت هایش)", expected: "(درخت‌هایش)"},
			{actual: "بزرگ تر،", expected: "بزرگ‌تر،"},

		]

		pairs.forEach(({actual, expected}) => {
			expect(halfSpace(actual)).toEqual( expected)
		})
	})

	it("should throw", () => {
		expect(() => {
			// @ts-ignore
			halfSpace();
		}).toThrow();
	});
});
