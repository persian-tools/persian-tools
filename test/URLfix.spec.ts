import { URLfix } from "../src";

it("URLfix", () => {
	expect(
		URLfix(
			"https://fa.wikipedia.org/wiki/%D9%85%D8%AF%DB%8C%D8%A7%D9%88%DB%8C%DA%A9%DB%8C:Gadget-Extra-Editbuttons-botworks.js",
		),
	).toEqual("https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-botworks.js");
	expect(URLfix("https://en.wikipedia.org/wiki/Persian_alphabet")).toEqual(
		"https://en.wikipedia.org/wiki/Persian_alphabet",
	);
	expect(URLfix()).toBeUndefined();
	expect(URLfix("Sample Text")).toEqual("Sample Text");
});
