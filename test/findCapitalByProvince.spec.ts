import { findCapitalByProvince } from '../src/modules/findCapitalByProvince'

it("findCapitalByProvince", () => {
	expect(findCapitalByProvince("کهگیلویه و بویراحمد")).toBeTruthy();
	expect(findCapitalByProvince("خراسان رضوی")).toBeTruthy();

	expect(findCapitalByProvince("Lorem")).toBeFalsy();
	expect(findCapitalByProvince("خراسان")).toBeFalsy();
	expect(findCapitalByProvince("استانی که وجود ندارد")).toBeFalsy();
	expect(findCapitalByProvince("State")).toBeFalsy();
	expect(findCapitalByProvince("")).toBeFalsy();
});