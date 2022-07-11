import { isArabic } from "../src/modules/isArabic";
import { describe, it, expect } from "vitest";

it("isArabic", () => {
	expect(isArabic("این یک متن فارسی است؟")).toBeFalsy();
	expect(isArabic("آیا سیستم میتواند گزینه های دیگری را به اشتباه به عنوان متن فارسی تشخیص دهد؟")).toBeFalsy();
	expect(isArabic("Lorem Ipsum Test")).toBeFalsy();
	expect(isArabic("これはペルシア語のテキストですか")).toBeFalsy();
	expect(isArabic("Это персидский текст?")).toBeFalsy();
	expect(isArabic("这是波斯文字吗?")).toBeFalsy();
	expect(isArabic("هل هذا نص فارسي؟")).not.toBeFalsy();
	expect(
		isArabic(
			"أكد رئيس اللجنة العسكرية الممثلة لحكومة الوفاق الوطني في ليبيا أحمد علي أبو شحمة، أن اللجنة لا تستطيع تنفيذ خطتها لإخراج العناصر الأجنبية من أراضي البلاد.",
		),
	).not.toBeFalsy();
	expect(isArabic("")).toBeFalsy();
});
