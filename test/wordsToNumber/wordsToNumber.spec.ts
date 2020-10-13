import WordsToNumber from "../../src/modules/wordsToNumber";

it("WordsToNumber", () => {
	expect(WordsToNumber.convert("منفی سه هزارمین", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");
	expect(WordsToNumber.convert("منفی سه هزارمین", { digits: "fa" })).toEqual("-۳۰۰۰");
	expect(WordsToNumber.convert("منفی سه هزارمین")).toEqual(-3000);
	expect(WordsToNumber.convert("منفی سه هزارم")).toEqual(-3000);
	expect(WordsToNumber.convert("منفی سه هزار")).toEqual(-3000);
	expect(WordsToNumber.convert("سه هزار دویست و دوازده")).toEqual(3212);
	expect(WordsToNumber.convert("منفی سه هزارمین")).not.toEqual("-3000");
	expect(String(WordsToNumber.convert("منفی سه هزارمین"))).toHaveLength(5);
	expect(WordsToNumber.convert("منفی سی اُم")).toEqual(-30);
	expect(WordsToNumber.convert("سی و سوم")).toEqual(33);

	expect(WordsToNumber.convert("دوازده هزار بیست دو")).toEqual(12022);
	expect(WordsToNumber.convert("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");
});
