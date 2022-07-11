import { describe, it, expect } from "vitest";
import { fuzzy } from "../src/modules/wordsToNumber/fuzzy";
import { ALL_WORDS } from "../src/modules/wordsToNumber/constants";

describe("wordsToNumber - Fuzzy humanizer", () => {
	it("Should clean the Texts and the result should be human-readable", () => {
		expect(fuzzy("بیشت و هشت هزار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("بیشت و هشت هرار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("بیشت و هشط هرار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("دویشت هزار")).toEqual("دویست هزار");
		expect(fuzzy("دویشت ر بیشت هزار")).toEqual("دویست و بیست هزار");
		expect(fuzzy("یگصد و بنجاه هزار")).toEqual("یکصد و پنجاه هزار");
		expect(fuzzy("ضد و بنچاه و دو")).toEqual("صد و پنجاه و دو");
		expect(fuzzy("منقی ضد")).toEqual("منفی صد");
		expect(fuzzy("مثبت دبیشت")).toEqual("مثبت بیست");
	});

	it("Should works with single words", () => {
		expect(fuzzy("و")).toEqual("و");
		expect(fuzzy("ر")).toEqual("و");
	});

	it("Should works if we apply our custom dataset", () => {
		expect(fuzzy("دویشت ر بیشت هزار", ALL_WORDS)).toEqual("دویست و بیست هزار");
	});

	it("Should be falsy", () => {
		expect(fuzzy("")).toBeFalsy();
		// @ts-ignore
		expect(fuzzy(12)).toBeFalsy();
	});

	it("There is nothing to replace", () => {
		expect(fuzzy("یک")).toEqual("یک");
		expect(fuzzy("یکصد")).toEqual("یکصد");
		expect(fuzzy("صد و پنجاه")).toEqual("صد و پنجاه");
		expect(fuzzy("منفی سه هزار")).toEqual("منفی سه هزار");
	});
});
