import verifyIranianNationalId from "../src/modules/nationalId";

it("Validation of Iranian National Number(code-e Melli)", () => {
	expect(verifyIranianNationalId("0499370899")).not.toBeFalsy();
	expect(verifyIranianNationalId("0790419904")).not.toBeFalsy();
	expect(verifyIranianNationalId("0084575948")).not.toBeFalsy();
	expect(verifyIranianNationalId("0963695398")).not.toBeFalsy();
	expect(verifyIranianNationalId("0684159414")).not.toBeFalsy();
	expect(verifyIranianNationalId("0067749828")).not.toBeFalsy();

	expect(verifyIranianNationalId("0684159415")).toBeFalsy();

	expect(verifyIranianNationalId()).toBeUndefined();
});
