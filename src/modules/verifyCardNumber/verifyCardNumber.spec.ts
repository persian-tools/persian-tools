import verifyCardNumber from "./index";

it("Bank number validation", () => {
	expect(verifyCardNumber(6037701689095443)).toBeTruthy();
	expect(verifyCardNumber(6219861034529007)).toBeTruthy();

	expect(verifyCardNumber(6219861034529008)).toBeFalsy();
	expect(verifyCardNumber(621986103452900)).toBeFalsy();

	expect(verifyCardNumber(0)).toBeFalsy();
});
