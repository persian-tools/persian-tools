import Sheba from "./index";

describe("Sheba", () => {
	it("Verify, Should be truthy", () => {
		expect(new Sheba("IR820540102680020817909002").validate()).toBeTruthy();
	});

	it("Verify, Should be falsy", () => {
		expect(new Sheba("IR01234567890123456789").validate()).toBeFalsy();
		expect(
			new Sheba("IR012345678901234567890123456789").validate(),
		).toBeFalsy();
		expect(new Sheba("IR01234567890123456789").validate()).toBeFalsy();
		expect(new Sheba("IR012345678901234567890123").validate()).toBeFalsy();
		expect(new Sheba("IR012345678901234567890123").validate()).toBeFalsy();
	});

	it("Recognize", () => {
		expect(new Sheba("IR820540102680020817909002").recognize()).toEqual(
			expect.objectContaining({
				nickname: "parsian",
				accountNumber: "020817909002",
				code: "054",
			}),
		);
	});

	it("Recognize should be falsy", () => {
		expect(new Sheba("IR012345678901234567890123").recognize()).toBeFalsy();
		expect(new Sheba("IR012345678A01234567890123").recognize()).toBeFalsy();
	});
});
