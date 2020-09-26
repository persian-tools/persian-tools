import zwnj from "../src/modules/zwnj";

it("zwnj", () => {
    expect("این یک متن فارسی می‌باشد؟").toEqual(zwnj("این یک متن فارسی می باشد؟"));
    expect("ای دوست سلام من به تو. نمی‌خواهمت درخت‌های چنار هاله صمیمی من").toEqual(
		zwnj("ای دوست سلام من به تو. نمی خواهمت درخت های چنار هاله صمیمی من"),
	);
	expect(zwnj("")).toBeFalsy();
});
