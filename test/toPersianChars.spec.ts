import toPersianChars from "../src/modules/toPersianChars";

it("toPersianChars", () => {
	expect(toPersianChars("علي")).toEqual("علی");
});
