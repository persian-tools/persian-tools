import { isPersian } from "../src";

it("isPersian", () => {
	expect(isPersian("این یک متن فارسی است؟")).not.toBeFalsy();
	expect(isPersian("Lorem Ipsum Test")).toBeFalsy();
	expect(isPersian("")).toBeFalsy();
});
