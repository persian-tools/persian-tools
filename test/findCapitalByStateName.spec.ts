import { findCapitalByStateName } from '../src/modules/findCapitalByStateName'

it("findCapitalByStateName", () => {
	expect(findCapitalByStateName("کهگیلویه و بویراحمد")).toBeTruthy();
	expect(findCapitalByStateName("خراسان رضوی")).toBeTruthy();

	expect(findCapitalByStateName("Lorem")).toBeFalsy();
	expect(findCapitalByStateName("خراسان")).toBeFalsy();
	expect(findCapitalByStateName("استانی که وجود ندارد")).toBeFalsy();
	expect(findCapitalByStateName("State")).toBeFalsy();
	expect(findCapitalByStateName("")).toBeFalsy();
});