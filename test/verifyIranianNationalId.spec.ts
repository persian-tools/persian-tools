import { verifyIranianNationalId } from "../src";

it("Validation of Iranian National Number(code-e Melli)", () => {
	expect(verifyIranianNationalId(123000000)).toBeFalsy();
	expect(verifyIranianNationalId("0000000000")).toBeFalsy();
	expect(verifyIranianNationalId("")).toBeUndefined();
	expect(verifyIranianNationalId()).toBeUndefined();

	expect(verifyIranianNationalId("0499370899")).not.toBeFalsy();
	expect(verifyIranianNationalId("0790419904")).not.toBeFalsy();
	expect(verifyIranianNationalId("0084575948")).not.toBeFalsy();
	expect(verifyIranianNationalId("0963695398")).not.toBeFalsy();
	expect(verifyIranianNationalId("0684159414")).not.toBeFalsy();
	expect(verifyIranianNationalId("0067749828")).not.toBeFalsy();

	expect(verifyIranianNationalId("0650451252")).not.toBeFalsy();
	expect(verifyIranianNationalId("1583250689")).not.toBeFalsy();
	expect(verifyIranianNationalId("4032152314")).not.toBeFalsy();
	expect(verifyIranianNationalId("0076229645")).not.toBeFalsy();
	expect(verifyIranianNationalId("4271467685")).not.toBeFalsy();
	expect(verifyIranianNationalId("0200203241")).not.toBeFalsy();
	expect(verifyIranianNationalId("0684159415")).toBeFalsy();
	expect(verifyIranianNationalId("068415941")).toBeFalsy();
});
