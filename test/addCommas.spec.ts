import addCommas from "../src/modules/addCommas";

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

it("Add and remove commas", () => {
	expect(addCommas(30000000)).toEqual("30,000,000");
	expect(addCommas(300)).toEqual("300");
	// @ts-ignore
	expect(addCommas(3000)).toBeType("string");
	expect(addCommas()).toBeUndefined();
});
