expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? (Array.isArray(received) ? "array" : initialType) : initialType;
		const isPassed = type === argument;

		return {
			message: () => `expected ${received} to be type ${argument}`,
			pass: isPassed,
		};
	},
});
