import extractCardNumber from "../src/modules/extractCardNumbers";

const mockString = `شماره کارتم رو برات نوشتم:
6219-8610-3452-9007
اینم یه شماره کارت دیگه ای که دارم
5022291070873466
۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶
۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶`;

describe("ExtractCardNumber", () => {
	it("Should find and extract 4 Card Numbers", () => {
		const result = [
			{ pure: "6219861034529007", base: "6219-8610-3452-9007", index: 1 },
			{ pure: "5022291070873466", base: "5022291070873466", index: 2 },
			{ pure: "5022291081873466", base: "۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶", index: 3 },
			{ pure: "5022291070873466", base: "۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶", index: 4 },
		];

		const list = extractCardNumber(mockString, {
			checkValidation: false,
		});
		expect(list).toEqual(result);
		expect(list).toBeDefined();
		expect(list).toHaveLength(4);
	});

	it("Should find and format the Card-Number into Text that includes Persian & English digits", () => {
		const mockString = `شماره کارتم رو برات نوشتم: ۵۰۲۲-2910-7۰۸۷-۳۴۶۶`;
		const result = [{ pure: "5022291070873466", base: "۵۰۲۲-2910-7۰۸۷-۳۴۶۶", index: 1 }];

		const list = extractCardNumber(mockString, {
			checkValidation: false,
		});
		expect(list).toEqual(result);
		expect(list).toBeDefined();
		expect(list).toHaveLength(1);
	});

	it("Should validate extract card-numbers", () => {
		const result = [
			{ pure: "6219861034529007", base: "6219-8610-3452-9007", index: 1, isValid: true },
			{ pure: "5022291070873466", base: "5022291070873466", index: 2, isValid: true },
			{ pure: "5022291081873466", base: "۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶", index: 3, isValid: false },
			{ pure: "5022291070873466", base: "۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶", index: 4, isValid: true },
		];
		expect(extractCardNumber(mockString, { checkValidation: true, filterValidCardNumbers: false })).toEqual(result);
		expect(extractCardNumber(mockString)).toBeDefined();
		expect(extractCardNumber(mockString, { checkValidation: true, filterValidCardNumbers: false })).toHaveLength(4);
	});

	it("Should return only valid card-numbers", () => {
		const result = [
			{ pure: "6219861034529007", base: "6219-8610-3452-9007", index: 1, isValid: true },
			{ pure: "5022291070873466", base: "5022291070873466", index: 2, isValid: true },
			{ pure: "5022291070873466", base: "۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶", index: 4, isValid: true },
		];
		const extractedCardNumbers = extractCardNumber(mockString, {
			filterValidCardNumbers: true,
			checkValidation: true,
		});

		expect(extractedCardNumbers).toEqual(result);
		expect(extractedCardNumbers).toBeDefined();
		expect(extractedCardNumbers).toHaveLength(3);
	});

	it("Should detect Banks number for valid card-numbers", () => {
		const result = [
			{ pure: "6219861034529007", base: "6219-8610-3452-9007", index: 1, isValid: true, bankName: "بانک سامان" },
			{ pure: "5022291070873466", base: "5022291070873466", index: 2, isValid: true, bankName: "بانک پاسارگاد" },
			{
				pure: "5022291070873466",
				base: "۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶",
				index: 4,
				isValid: true,
				bankName: "بانک پاسارگاد",
			},
		];
		const extractedCardNumbers = extractCardNumber(mockString, {
			filterValidCardNumbers: true,
			checkValidation: true,
			detectBankNumber: true,
		});

		expect(extractedCardNumbers).toEqual(result);
		expect(extractedCardNumbers).toBeDefined();
		expect(extractedCardNumbers).toHaveLength(3);
	});
});
