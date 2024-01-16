import { describe, it, expect } from "vitest";
import { toPersianChars } from "../src";
import { isPersian, hasPersian } from "../src/modules/isPersian";

describe("isPersian", () => {
	it("Default", () => {
		expect(isPersian("این یک متن فارسی است؟")).toBeTruthy();
		expect(isPersian("آیا سیستم میتواند گزینه های دیگری را به اشتباه به عنوان متن فارسی تشخیص دهد؟")).toBeTruthy();

		expect(isPersian("Lorem Ipsum Test")).toBeFalsy();
		expect(isPersian("これはペルシア語のテキストですか")).toBeFalsy();
		expect(isPersian("Это персидский текст?")).toBeFalsy();
		expect(isPersian("这是波斯文字吗?")).toBeFalsy();
		expect(isPersian("هل هذا نص فارسي؟")).toBeFalsy();
		expect(
			isPersian(
				"أكد رئيس اللجنة العسكرية الممثلة لحكومة الوفاق الوطني في ليبيا أحمد علي أبو شحمة، أن اللجنة لا تستطيع تنفيذ خطتها لإخراج العناصر الأجنبية من أراضي البلاد.",
			),
		).toBeFalsy();
		expect(isPersian("")).toBeFalsy();
	});

	it("isPersian Fix Bug#208", () => {
		expect(isPersian(toPersianChars("مهدی") as string)).toBe(true);
		expect(isPersian(toPersianChars("شاه") as string)).toBe(true);
	});

	it("hasPersian", () => {
		expect(hasPersian("این یک متن فارسی است؟")).toBeTruthy();
		expect(hasPersian("هل هذا نص فارسي؟")).toBeTruthy();
		expect(hasPersian("آیا سیستم میتواند گزینه های دیگری را به اشتباه به عنوان متن فارسی تشخیص دهد؟")).toBeTruthy();
		expect(hasPersian("This text includes فارسی")).toBeTruthy();
		expect(hasPersian("Это персидский س текст?")).toBeTruthy();
		expect(hasPersian("أكد رئيس اللجنة العسكرية الممثلة لحكومة الوفاق أراضي البلاد.")).toBeTruthy();

		expect(hasPersian("Lorem Ipsum Test")).toBeFalsy();
		expect(hasPersian("これはペルシア語のテキストですか")).toBeFalsy();
		expect(hasPersian("Это персидский текст?")).toBeFalsy();
		expect(hasPersian("这是波斯文字吗?")).toBeFalsy();
		expect(hasPersian("")).toBeFalsy();
	});
});
