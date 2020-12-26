import { verifyCardNumber } from "../src";

it("Bank number validation", () => {
	expect(verifyCardNumber(6037701689095443)).not.toBeFalsy();
	expect(verifyCardNumber(6219861034529007)).not.toBeFalsy();
	expect(verifyCardNumber(6219861034529008)).toBeFalsy();
	expect(verifyCardNumber(621986103452900)).toBeFalsy();
	expect(verifyCardNumber(0)).toBeFalsy();
});
