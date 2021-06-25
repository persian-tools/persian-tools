import toPersianChars from "./index";

it("toPersianChars", () => {
	expect(toPersianChars("علي")).toEqual("علی");
	expect(toPersianChars("")).toBeFalsy();
});
