import { verifyIranianLegalId } from "../src";

it("Validation of Iranian Legal Number", () => {
	expect(verifyIranianLegalId(123000000)).toBeFalsy();
	expect(verifyIranianLegalId("123000000")).toBeFalsy();
	expect(verifyIranianLegalId(11111111111)).toBeFalsy();
	expect(verifyIranianLegalId("1111111111")).toBeFalsy();
	expect(verifyIranianLegalId(10380284792)).toBeFalsy();
	expect(verifyIranianLegalId(10380285692)).toBeFalsy();

	expect(verifyIranianLegalId(10380284790)).toBeTruthy();
	expect(verifyIranianLegalId("10380284790")).toBeTruthy();
	expect(verifyIranianLegalId("09748208301")).toBeFalsy();
});
