import { fuzzy } from "../../src/modules/wordsToNumber/fuzzy";
import { ALL_WORDS } from "../../src/modules/wordsToNumber/constants";

describe("WordsToNumber - Fuzzy humanizer", () => {
	it("Should clean the Texts and the result should be human-readable", () => {
		expect(fuzzy("بیشت و هشت هزار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("بیشت و هشت هرار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("بیشت و هشط هرار")).toEqual("بیست و هشت هزار");
		expect(fuzzy("دویشت هزار")).toEqual("دویست هزار");
		expect(fuzzy("دویشت ر بیشت هزار")).toEqual("دویست و بیست هزار");
		expect(fuzzy("یگصد و بنجاه هزار")).toEqual("یکصد و پنجاه هزار");
	});

	it("Should works with single words", () => {
		expect(fuzzy("و")).toEqual("و");
		expect(fuzzy("ر")).toEqual("و");
	});

	it("Should return the string without any changes", () => {
		expect(fuzzy("متن نامشخص")).toEqual("متن نامشخص");
		expect(fuzzy("هیچ متن عددی ای برای تبدیل وجود ندارد")).toEqual("هیچ متن عددی ای برای تبدیل وجود ندارد");
	});

	it("Should works if we apply our custom dataset", () => {
		expect(
			fuzzy("دویشت ر بیشت هزار", {
				dataset: ALL_WORDS,
			}),
		).toEqual("دویست و بیست هزار");
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
	});
});
