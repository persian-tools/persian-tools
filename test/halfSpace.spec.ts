import { describe, it, expect } from "vitest";
import { halfSpace } from "../src";
import { ZWNJ } from "../src/modules/halfSpace/costants";

describe("halfSpace", () => {
	it("should return empty string for empty input", () => {
		expect(halfSpace("")).toBe("");
	});

	it("should not alter a string with no spaces", () => {
		expect(halfSpace("سلام")).toBe("سلام");
	});

	it("should reduce multiple spaces to single space when no rules apply", () => {
		expect(halfSpace("سلام   دنیا")).toBe("سلام دنیا");
	});

	it('should insert ZWNJ for prefix "می" before a Persian word', () => {
		expect(halfSpace("می رود")).toBe(`می${ZWNJ}رود`);
	});

	it('should insert ZWNJ for prefix "نمی"', () => {
		expect(halfSpace("نمی دانم")).toBe(`نمی${ZWNJ}دانم`);
	});

	it('should insert ZWNJ for prefix "بی"', () => {
		expect(halfSpace("بی دلیل")).toBe(`بی${ZWNJ}دلیل`);
	});

	it('should insert ZWNJ for prefix "هم"', () => {
		expect(halfSpace("هم زمان")).toBe(`هم${ZWNJ}زمان`);
	});

	it('should insert ZWNJ before suffix "ها"', () => {
		expect(halfSpace("خانه ها")).toBe(`خانه${ZWNJ}ها`);
	});

	it('should join comparative "تر" without ZWNJ', () => {
		expect(halfSpace("بزرگ تر")).toBe("بزرگتر");
	});

	it('should join superlative "ترین" without ZWNJ', () => {
		expect(halfSpace("بزرگ ترین")).toBe("بزرگترین");
	});

	it("should handle multiple prefix rules in one sentence", () => {
		expect(halfSpace("می رود و نمی خواهد")).toBe(`می${ZWNJ}رود و نمی${ZWNJ}خواهد`);
	});

	it("should handle multiple suffix rules in one sentence", () => {
		expect(halfSpace("خانه ها بزرگ تر شدند")).toBe(`خانه${ZWNJ}ها بزرگتر شدند`);
	});

	it("should not add ZWNJ where not applicable", () => {
		expect(halfSpace("سلام دنیا")).toBe("سلام دنیا");
	});

	it('should handle known compound "به هر"', () => {
		expect(halfSpace("به هر حال")).toBe(`به${ZWNJ}هر حال`);
	});

	it('should handle known compound "به وجود"', () => {
		expect(halfSpace("به وجود آمد")).toBe(`به${ZWNJ}وجود آمد`);
	});

	it('should handle known compound "هم چنین"', () => {
		expect(halfSpace("هم چنین گفت")).toBe(`هم${ZWNJ}چنین گفت`);
	});

	it("should handle multiple known compounds in a sentence", () => {
		expect(halfSpace("به هر حال خانه ها بزرگ تر شدند")).toBe(`به${ZWNJ}هر حال خانه${ZWNJ}ها بزرگتر شدند`);
	});

	it("should handle compound with prefixes and suffixes together", () => {
		expect(halfSpace("می تواند به هر حال کوچک تر بماند")).toBe(`می${ZWNJ}تواند به${ZWNJ}هر حال کوچکتر بماند`);
	});

	it("should reduce multiple spaces between words", () => {
		expect(halfSpace("می   رود")).toBe(`می${ZWNJ}رود`);
	});

	it("should handle punctuation: before and after rules", () => {
		expect(halfSpace("خانه ها ، بزرگ تر هستند.")).toBe(`خانه${ZWNJ}ها، بزرگتر هستند.`);
	});

	it("should not alter English words", () => {
		expect(halfSpace("Hello World")).toBe("Hello World");
	});

	it("should not insert ZWNJ between Persian and English", () => {
		expect(halfSpace("خانه test")).toBe("خانه test");
	});

	it("should handle multiple instances of the same rule", () => {
		expect(halfSpace("خانه ها خانه ها خانه ها")).toBe(`خانه${ZWNJ}ها خانه${ZWNJ}ها خانه${ZWNJ}ها`);
	});

	it("should not add extra spaces at the end", () => {
		expect(halfSpace("خانه ها ")).toBe(`خانه${ZWNJ}ها`);
	});

	it('should handle compound words like "این جا"', () => {
		expect(halfSpace("این جا است")).toBe(`این${ZWNJ}جا است`);
	});

	it('should handle compound words like "آن که"', () => {
		expect(halfSpace("آن که می رود")).toBe(`آن${ZWNJ}که می${ZWNJ}رود`);
	});

	it('should handle compound words like "چند سال"', () => {
		expect(halfSpace("چند سال بعد")).toBe(`چند${ZWNJ}سال بعد`);
	});

	it("should handle multiple known compounds and prefixes in one go", () => {
		// Tests a complex scenario combining multiple rules
		const input = "نمی دانم به هر حال بزرگ تر خواهد شد";
		const output = `نمی${ZWNJ}دانم به${ZWNJ}هر حال بزرگتر خواهد شد`;
		expect(halfSpace(input)).toBe(output);
	});

	it("should handle words that appear like suffixes but not at the end", () => {
		// "ها" inside a longer word should not trigger a suffix rule unless spaced
		expect(halfSpace("هادی")).toBe("هادی");
	});

	it("should handle multiple ZWNJ insertions in a long sentence", () => {
		const input = "می رود و نمی خواهد خانه ها را به هر شکل بزرگ تر از این جا کند";
		const output = `می${ZWNJ}رود و نمی${ZWNJ}خواهد خانه${ZWNJ}ها را به${ZWNJ}هر شکل بزرگتر از این${ZWNJ}جا کند`;
		expect(halfSpace(input)).toBe(output);
	});

	it("should not insert ZWNJ if space is not present", () => {
		// No space between "می" and "رود" means no change
		expect(halfSpace("میرود")).toBe("میرود");
	});

	it("should keep the output stable on multiple calls", () => {
		// Calling twice should not change the result further
		const input = "می رود";
		const once = halfSpace(input);
		const twice = halfSpace(once);
		expect(twice).toBe(`می${ZWNJ}رود`);
	});

	it("should handle suffix before punctuation without space", () => {
		expect(halfSpace("خانه ها، آپارتمان ها")).toBe(`خانه${ZWNJ}ها، آپارتمان${ZWNJ}ها`);
	});

	it("should handle comparative in parentheses without ZWNJ", () => {
		expect(halfSpace("(آبی تر)")).toBe("(آبیتر)");
	});

	it("should handle end-of-string plural suffix", () => {
		expect(halfSpace("درخت ها")).toBe(`درخت${ZWNJ}ها`);
	});
});
