import { describe, it, expect } from "vitest";
import { slugify, createSlug, slugifyWithNumbers, slugifySimple } from "../src/modules/slugify";

describe.skip("slugify", () => {
	describe("Basic functionality", () => {
		it("should convert Persian text to URL-safe slug", () => {
			expect(slugify("سلام دنیا")).toBe("سلام-دنیا");
			expect(slugify("این یک متن فارسی است")).toBe("این-یک-متن-فارسی-است");
		});

		it("should handle empty and invalid inputs", () => {
			expect(() => slugify("")).toThrow("slugify: Input must be a non-empty string");
			expect(() => slugify(null as any)).toThrow("slugify: Input must be a non-empty string");
			expect(() => slugify(undefined as any)).toThrow("slugify: Input must be a non-empty string");
		});

		it("should normalize Arabic characters to Persian", () => {
			expect(slugify("علي احمد")).toBe("علی-احمد");
			expect(slugify("يوسف")).toBe("یوسف");
			expect(slugify("ك")).toBe("ک");
		});

		it("should remove diacritics", () => {
			expect(slugify("سَلامٌ")).toBe("سلام");
			expect(slugify("بِسْمِ اللّٰهِ")).toBe("بسم-الله");
		});

		it("should handle punctuation", () => {
			expect(slugify("سلام، دنیا!")).toBe("سلام-دنیا");
			expect(slugify("آیا سلام؟")).toBe("آیا-سلام");
			expect(slugify("«نقل قول»")).toBe("نقل-قول");
		});
	});

	describe("Options", () => {
		it("should respect separator option", () => {
			expect(slugify("سلام دنیا", { separator: "_" })).toBe("سلام_دنیا");
			expect(slugify("سلام دنیا", { separator: "." })).toBe("سلام.دنیا");
		});

		it("should respect lowercase option", () => {
			expect(slugify("سلام دنیا", { lowercase: false })).toBe("سلام-دنیا");
			expect(slugify("Hello World", { lowercase: true })).toBe("hello-world");
		});

		it("should handle maxLength option", () => {
			const longText = "این یک متن بسیار طولانی است که باید کوتاه شود";
			expect(slugify(longText, { maxLength: 20 }).length).toBeLessThanOrEqual(20);
		});

		it("should preserve numbers when specified", () => {
			expect(slugify("متن ۱۲۳", { preserveNumbers: true })).toBe("متن-۱۲۳");
			expect(slugify("text 123", { preserveNumbers: true })).toBe("text-۱۲۳");
		});

		it("should apply custom replacements", () => {
			expect(slugify("سلام دنیا", { customReplacements: { سلام: "hello" } })).toBe("hello-دنیا");
		});

		it("should remove repeated separators", () => {
			expect(slugify("سلام   دنیا", { removeRepeatedSeparators: true })).toBe("سلام-دنیا");
			expect(slugify("سلام---دنیا", { removeRepeatedSeparators: false, separator: "-" })).toContain("---");
		});
	});

	describe("Edge cases", () => {
		it("should handle text with only spaces", () => {
			expect(slugify("   ")).toBe("");
		});

		it("should handle text with only punctuation", () => {
			expect(slugify("!!!???")).toBe("");
		});

		it("should handle mixed languages", () => {
			expect(slugify("hello سلام world")).toBe("hello-سلام-world");
		});

		it("should handle numbers in text", () => {
			expect(slugify("سال ۱۴۰۰")).toBe("سال-۱۴۰۰");
			expect(slugify("year 2023")).toBe("year-۲۰۲۳");
		});

		it("should trim leading and trailing separators", () => {
			expect(slugify("  سلام دنیا  ")).toBe("سلام-دنیا");
		});
	});

	describe("Helper functions", () => {
		it("createSlug should work with default separator", () => {
			expect(createSlug("سلام دنیا")).toBe("سلام-دنیا");
			expect(createSlug("سلام دنیا", "_")).toBe("سلام_دنیا");
		});

		it("slugifyWithNumbers should preserve numbers", () => {
			expect(slugifyWithNumbers("متن ۱۲۳")).toBe("متن-۱۲۳");
			expect(slugifyWithNumbers("text 456")).toBe("text-۴۵۶");
		});

		it("slugifySimple should use default options", () => {
			expect(slugifySimple("سلام دنیا")).toBe("سلام-دنیا");
		});
	});

	describe("Real-world examples", () => {
		it("should handle blog post titles", () => {
			expect(slugify("چگونه برنامه‌نویسی یاد بگیریم؟")).toBe("چگونه-برنامه-نویسی-یاد-بگیریم");
			expect(slugify("۱۰ نکته مهم برای توسعه‌دهندگان")).toBe("۱۰-نکته-مهم-برای-توسعه-دهندگان");
		});

		it("should handle product names", () => {
			expect(slugify("گوشی آیفون ۱۴ پرو")).toBe("گوشی-آیفون-۱۴-پرو");
			expect(slugify("لپ‌تاپ MacBook Pro")).toBe("لپ-تاپ-macbook-pro");
		});

		it("should handle names with special characters", () => {
			expect(slugify("علی‌رضا احمدی")).toBe("علی-رضا-احمدی");
			expect(slugify("شرکت پردازش داده‌های ایران")).toBe("شرکت-پردازش-داده-های-ایران");
		});
	});
});
