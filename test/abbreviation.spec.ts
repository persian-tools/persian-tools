import { abbreviateNumber, expandNumber } from "../src";

describe("Abbreviation", () => {
	it("abbreviateNumber", () => {
		expect(abbreviateNumber(-25, { digit: 0 })).toBe("-25");
		expect(abbreviateNumber(-999, { digit: 2 })).toBe("-999");
		expect(abbreviateNumber(1000, { digit: 0 })).toBe("1 کیلو");
		expect(abbreviateNumber(1000)).toBe("1.0 کیلو");
		expect(abbreviateNumber(1000, { digit: 2, padding: false })).toBe("1 کیلو");
		expect(abbreviateNumber(12344, { digit: 2 })).toBe("12.34 کیلو");
		expect(abbreviateNumber(47475782130, { digit: 2 })).toBe("47.48 گیگا");
		expect(abbreviateNumber(47475782130000, { digit: 2 })).toBe("47.48 ترا");
		expect(abbreviateNumber(-1234, { symbols: ["", "Kilo"] })).toBe("-1.2Kilo");
		expect(abbreviateNumber(-1200, { digit: 4, symbols: ["", "Kilo"], padding: false })).toBe("-1.2Kilo");
		expect(() => {
			// @ts-ignore
			abbreviateNumber("1000");
		}).toThrow();
		expect(() => {
			// @ts-ignore
			abbreviateNumber();
		}).toThrow();
	});

	it("expandNumber", () => {
		expect(expandNumber("0")).toBe(0);
		expect(expandNumber("0000")).toBe(0);
		expect(expandNumber("25")).toBe(25);
		expect(expandNumber("666")).toBe(666);
		expect(expandNumber("-25")).toBe(-25);
		expect(expandNumber("-4800")).toBe(-4800);
		expect(expandNumber("25 کیلو")).toBe(25000);
		expect(expandNumber("-1.123456 کیلو")).toBe(-1123.456);
		expect(expandNumber("237 مگا")).toBe(237000000);
		expect(expandNumber("666 کیلو", ["", " کیلو"])).toBe(666000);

		expect(() => expandNumber("abkc")).toThrow(new Error("This is not a valid input"));
		expect(() => expandNumber("237k k")).toThrow(new Error("This is not a valid input"));
		expect(expandNumber("666kilo", ["", "kilo", "Mega"])).toBe(666000);
		expect(expandNumber("666Zetta", ["", "kilo", "Mega", "Giga", "Tera", "peta", "Exa", "Zetta"])).toBe(
			666000000000000000000000,
		);
		expect(() => {
			// @ts-ignore
			expandNumber(1000);
		}).toThrow();
		expect(() => {
			// @ts-ignore
			expandNumber();
		}).toThrow();
	});
});
