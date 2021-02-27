import { isPersian } from "../src/modules/isPersian";

it("isPersian", () => {
	expect(isPersian("این یک متن فارسی است؟")).not.toBeFalsy();
	expect(isPersian("آیا سیستم میتواند گزینه های دیگری را به اشتباه به عنوان متن فارسی تشخیص دهد؟")).not.toBeFalsy();
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
