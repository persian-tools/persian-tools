import halfSpace from "../src/modules/halfSpace";

it("halfSpace", () => {
    expect("این یک متن فارسی می‌باشد؟").toEqual(halfSpace("این یک متن فارسی می باشد؟"));
    expect("ای دوست سلام من به تو. نمی‌خواهمت درخت‌های چنار هاله صمیمی من").toEqual(
		halfSpace("ای دوست سلام من به تو. نمی خواهمت درخت های چنار هاله صمیمی من"),
	);
	expect(halfSpace("")).toBeFalsy();
});
