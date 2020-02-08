import removeCommas from "../src/modules/removeCommas";

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? (Array.isArray(received) ? "array" : initialType) : initialType;
		return type === argument
			? {
					message: () => `expected ${received} to be type ${argument}`,
					pass: true,
			  }
			: {
					message: () => `expected ${received} to be type ${argument}`,
					pass: false,
			  };
	},
});

it("Remove commas", () => {
	expect(removeCommas("30,000,000")).toEqual(30000000);
	expect(removeCommas(300)).toEqual(300);
	expect(removeCommas("300")).toEqual(300);
	// @ts-ignore
	expect(removeCommas("3000")).toBeType("number");
	expect(removeCommas()).toBeUndefined();
});
