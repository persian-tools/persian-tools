import { describe, it, expect } from "vitest";
import { wordsToNumber } from "../src";
import { UNITS, TEN, MAGNITUDE } from "../src/modules/wordsToNumber/constants";

/**
 * Covers:
 * - Basic conversions (positive/negative, ordinal removal)
 * - Digit style conversions (Persian, Arabic, English)
 * - Comma formatting
 * - Unit dictionaries (UNITS, TEN, MAGNITUDE)
 */
describe("WordsToNumber", () => {
	/**
	 * **Group**: Basic conversions to numbers and strings.
	 */
	it("Should convert truly", () => {
		// **Negative small number** => `منفی سه هزار` => -3000
		expect(wordsToNumber<number>("منفی سه هزار")).toEqual(-3000);

		// **A mix** => `سه هزار دویست و دوازده` => 3212
		expect(wordsToNumber<number>("سه هزار دویست و دوازده")).toEqual(3212);

		// **Partial phrase** => `دوازده هزار بیست دو` => 12022
		expect(wordsToNumber<number>("دوازده هزار بیست دو")).toEqual(12022);

		// **String output with commas** => "12,022"
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");

		// **With an extra "و"** => `دوازده هزار و بیست و دو` => "12,022" with commas
		expect(wordsToNumber<string>("دوازده هزار و بیست و دو", { addCommas: true })).toEqual("12,022");
	});

	/**
	 * **Group**: Conversions with Arabic digits (when digits="ar").
	 */
	it("Should convert truly and convert to Arabic digits", () => {
		// **Arabic digits** for negative number => "-٣٠٠٠"
		expect(wordsToNumber<string>("منفی سه هزار", { digits: "ar" })).toEqual("-٣٠٠٠");

		// **Arabic digits** => "٣٢١٢"
		expect(wordsToNumber<string>("سه هزار دویست و دوازده", { digits: "ar" })).toEqual("٣٢١٢");

		// **Arabic digits** for partial phrase => "١٢٠٢٢"
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { digits: "ar" })).toEqual("١٢٠٢٢");

		// **Arabic digits + commas** => "١٢,٠٢٢"
		expect(wordsToNumber<string>("دوازده هزار بیست دو", { digits: "ar", addCommas: true })).toEqual("١٢,٠٢٢");

		// **Arabic digits** with extra "و" => "١٢,٠٢٢"
		expect(wordsToNumber<string>("دوازده هزار و بیست و دو", { digits: "ar", addCommas: true })).toEqual("١٢,٠٢٢");

		// **Arabic digits** => "٤٥٠,٠٠٠"
		expect(wordsToNumber<string>("چهارصد پنجاه هزار", { digits: "ar", addCommas: true })).toEqual("٤٥٠,٠٠٠");

		// **Arabic digits** without commas => "٤٥٠٠٠٠"
		expect(wordsToNumber<string>("چهارصد پنجاه هزار", { digits: "ar" })).toEqual("٤٥٠٠٠٠");
	});

	/**
	 * **Group**: Tests involving **ordinal words** (e.g., "هزارمین", "سی اُم").
	 */
	it("Should convert with ordinal words", () => {
		// **Negative + Persian digits + commas** => "-۳,۰۰۰"
		expect(wordsToNumber<string>("منفی ۳ هزار", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");

		// **Mix** of numeric and text => "-۳,۲۰۰"
		expect(wordsToNumber<string>("منفی 3 هزار و 200", { digits: "fa", addCommas: true })).toEqual("-۳,۲۰۰");

		// **Ordinal** => `منفی سه هزارمین` => "-۳,۰۰۰"
		expect(wordsToNumber<string>("منفی سه هزارمین", { digits: "fa", addCommas: true })).toEqual("-۳,۰۰۰");

		// **Ordinal** without commas => "-۳۰۰۰"
		expect(wordsToNumber<string>("منفی سه هزارمین", { digits: "fa" })).toEqual("-۳۰۰۰");

		// **Ordinal** => numeric return => -3000
		expect(wordsToNumber<number>("منفی سه هزارمین")).toEqual(-3000);

		// **Another suffix** => -3000
		expect(wordsToNumber<number>("منفی سه هزارم")).toEqual(-3000);

		// **Ensure** string mismatch => "منفی سه هزارمین" => not "-3000"
		expect(wordsToNumber<string>("منفی سه هزارمین")).not.toEqual("-3000");

		// **Length** check => numeric => "منفی سه هزارمین" => `"-3000"` => length 5
		expect(String(wordsToNumber<number>("منفی سه هزارمین"))).toHaveLength(5);

		// **Ordinal** => "منفی سی اُم" => -30
		expect(wordsToNumber<number>("منفی سی اُم")).toEqual(-30);
	});

	/**
	 * **Group**: Tests returning undefined or empty.
	 */
	it("Should return empty string on empty input or undefined input", () => {
		// **Empty string** => ""
		expect(wordsToNumber<string>("", { digits: "fa", addCommas: true })).toEqual("");

		// **Undefined** input => ""
		// @ts-expect-error - intentionally ignoring to test no-arg scenario
		expect(wordsToNumber()).toEqual("");
	});

	/**
	 * **Group**: Tests for each entry in UNITS, verifying correctness.
	 */
	describe("UNITS", () => {
		Array.from(UNITS.entries()).forEach(([key, value]) => {
			// Each test ensures that the word => expected numeric value
			it(`Unit "${key}" => ${value}`, () => {
				expect(wordsToNumber<number>(key)).toEqual(value);
			});
		});
	});

	/**
	 * **Group**: Tests for each entry in TEN, verifying correctness.
	 */
	describe("TEN", () => {
		Array.from(TEN.entries()).forEach(([key, value]) => {
			// Each test ensures that the word => expected numeric value
			it(`Ten "${key}" => ${value}`, () => {
				expect(wordsToNumber<number>(key)).toEqual(value);
			});
		});
	});

	/**
	 * **Group**: Tests for each entry in MAGNITUDE, verifying correctness.
	 */
	describe("MAGNITUDE", () => {
		Array.from(MAGNITUDE.entries()).forEach(([key, value]) => {
			// Each test ensures that the magnitude word => expected numeric multiplier
			it(`Magnitude "${key}" => ${value}`, () => {
				expect(wordsToNumber<number>(key)).toEqual(value);
			});
		});
	});

	/**
	 * **New Group**: Additional Coverage Tests (No Fuzzy)
	 *
	 * Here we add 10 brand-new tests focusing on scenarios *without* fuzzy logic.
	 */
	describe("Non-Fuzzy Additional Tests", () => {
		/**
		 * **Test 1**: Large spelled out => "یک میلیون و سی هزار"
		 * **Expect**: 1,030,000
		 */
		it("1) Large spelled => 1,030,000", () => {
			expect(wordsToNumber<number>("یک میلیون و سی هزار")).toEqual(1030000);
		});

		/**
		 * **Test 2**: Negative large spelled => "-1,030,000"
		 */
		it("2) Negative large spelled => -1,030,000", () => {
			expect(wordsToNumber<number>("منفی یک میلیون و سی هزار")).toEqual(-1030000);
		});

		/**
		 * **Test 3**: Mixed text + numeric => "منفی چهارصد 200"
		 * => -600
		 */
		it("3) Mixed text + numeric => -600", () => {
			expect(wordsToNumber<number>("منفی چهارصد 200")).toEqual(-600);
		});

		/**
		 * **Test 4**: Zero alone => "0" => 0
		 */
		it("4) Zero alone => 0", () => {
			expect(wordsToNumber<number>("0")).toEqual(0);
		});

		/**
		 * **Test 5**: Negative zero => "منفی صفر" => 0
		 */
		it("5) Negative zero => 0", () => {
			expect(wordsToNumber<number>("منفی صفر")).toEqual(0);
		});

		/**
		 * **Test 6**: Already negative numeric => "-999" => -999
		 */
		it("6) Already negative numeric => -999", () => {
			expect(wordsToNumber<number>("-999")).toEqual(-999);
		});

		/**
		 * **Test 7**: Large numeric
		 */
		it("7) Large numeric => 999,999", () => {
			expect(wordsToNumber<number>("نهصد نود نه هزار نهصد نود نه")).toEqual(999999);
		});

		/**
		 * **Test 8**: Ordinal with non-suffix => "دهم هزار" (invalid phrase but no fuzzy)
		 * Likely => "دهم" => 10, "هزار" => 1000 => 10*1000 => 10000
		 */
		it("8) 'دهم هزار' => 10,000", () => {
			expect(wordsToNumber<number>("دهم هزار", {})).toEqual(10000);
		});

		/**
		 * **Test 9**: Non-numeric random text => "سلام دنیا" => 0
		 */
		it("9) Random text => 0", () => {
			expect(wordsToNumber<number>("سلام دنیا")).toEqual(0);
		});

		/**
		 * **Test 10**: Negative random text => "منفی سلام دنیا" => 0
		 */
		it("10) Negative random text => 0", () => {
			expect(wordsToNumber<number>("منفی سلام دنیا")).toEqual(0);
		});
	});
});
/**
 * **wordsToNumber Options Test (autoConvertDigitsToEn, autoConvertArabicCharsToPersian)**
 *
 * **Overview**:
 *  - Verifies that digits from other locales (Persian/Arabic) are converted to English digits
 *    if `autoConvertDigitsToEn` is true.
 *  - Verifies that Arabic characters (e.g., "ك", "ي") become Persian "ک", "ی" if
 *    `autoConvertArabicCharsToPersian` is true **before** parsing.
 *  - Ensures the rest of wordsToNumber logic (negative signs, ordinal suffix removal,
 *    magnitude checks, etc.) still works correctly with these new options.
 */
describe("wordsToNumber (Auto Converter Options)", () => {
	/**
	 * **Group**: autoConvertDigitsToEn
	 */
	describe("autoConvertDigitsToEn", () => {
		/**
		 * **Test 1**: Arabic digits only => "٤٥٦٧" => 4567
		 */
		it("1) Arabic digits => 4567 when autoConvertDigitsToEn=true", () => {
			expect(
				wordsToNumber<number>("٤٥٦٧", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(4567);
		});

		/**
		 * **Test 2**: Persian digits only => "۱۲۳" => 123
		 */
		it("2) Persian digits => 123 when autoConvertDigitsToEn=true", () => {
			expect(
				wordsToNumber<number>("۱۲۳", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(123);
		});

		/**
		 * **Test 3**: Mixed Persian + Arabic => "۱۲٣٤" => 1234
		 */
		it("3) Mixed Persian+Arabic digits => 1234", () => {
			expect(
				wordsToNumber<number>("۱۲٣٤", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(1234);
		});

		/**
		 * **Test 4**: Negative + Arabic => "منفی ٥٠٠" => -500
		 */
		it("4) Negative Arabic => -500", () => {
			expect(
				wordsToNumber<number>("منفی ٥٠٠", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(-500);
		});

		/**
		 * **Test 5**: No effect on Latin digits => "123" => 123
		 */
		it("5) Already English digits => 123", () => {
			expect(
				wordsToNumber<number>("123", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(123);
		});

		/**
		 * **Test 6**: Large spelled with Persian digits => "منفی ۱۲۰ هزار"
		 * => "منفی 120 هزار" => -120000
		 */
		it("6) Persian digits in spelled phrase => -120,000", () => {
			expect(
				wordsToNumber<number>("منفی ۱۲۰ هزار", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(-120000);
		});

		/**
		 * **Test 7**: Ordinal with Persian digits => "دهمین ۲۱" => "دهمین 21"
		 * => 10 + 21 => 31 if your parser sums them or does something else
		 * (Adjust expectation to your logic).
		 */
		it("7) Ordinal with Persian digits => 31", () => {
			expect(
				wordsToNumber<number>("دهمین ۲۱", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(31);
		});

		/**
		 * **Test 8**: Commas + Arabic digits => "٤٥,٦٧٨" => 45678
		 */
		it("8) Commas + Arabic digits => 45,678 => 45678", () => {
			expect(
				wordsToNumber<number>("٤٥,٦٧٨", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(45678);
		});

		/**
		 * **Test 9**: "منفی صفر" still => 0 even if digits are Arabic => "منفی ٠"
		 */
		it("9) Arabic zero => 0", () => {
			expect(
				wordsToNumber<number>("منفی ٠", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(0);
		});

		/**
		 * **Test 10**: Make sure partial spelled text is unaffected, only digits convert
		 * => "چهارصد و ٥٠" => 450
		 */
		it("10) Partial spelled + Arabic => 450", () => {
			expect(
				wordsToNumber<number>("چهارصد و ٥٠", {
					autoConvertDigitsToEn: true,
				}),
			).toEqual(450);
		});
	});

	/**
	 * **Group**: autoConvertArabicCharsToPersian
	 */
	describe("autoConvertArabicCharsToPersian", () => {
		/**
		 * **Test 1**: 'ك' => 'ک', 'ي' => 'ی' => "منفی سه كيلومتر" => "منفی سه کیلومتر"
		 * Then parse numeric => -3 (assuming "کیلومتر" is leftover text).
		 */
		it("1) 'ك','ي' => 'ک','ی' => parse -3", () => {
			expect(
				wordsToNumber<number>("منفی سه كيلومتر", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(-3);
		});

		/**
		 * **Test 2**: 'ك' => "صك هزار" => "صک هزار"?
		 * If 'صک' doesn't map to anything numeric, result is "ص" => might be 0?
		 * Adjust based on your logic. For demonstration, we assume the leftover "صک" is not recognized
		 * => total 0 + 1000 => 1000 if 'هزار' remains recognized.
		 */
		it("2) Mixed Arabic char => 1000", () => {
			expect(
				wordsToNumber<number>("صك هزار", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(1000);
		});

		/**
		 * **Test 3**: "ك" in spelled-out number => "بيست ك" => "بیست ک"?
		 * Possibly "بیست" => 20, "ک"?
		 * If 'ک' alone is not recognized, total => 20.
		 */
		it("3) 'بيست ك' => 20", () => {
			expect(
				wordsToNumber<number>("بيست ك", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(20);
		});

		/**
		 * **Test 4**: Only Arabic letters => "كى" => "کی"?
		 * Probably not recognized => 0
		 */
		it("4) 'كى' => 0", () => {
			expect(
				wordsToNumber<number>("كى", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(0);
		});

		/**
		 * **Test 5**: Combining negative + diacritics => "مَنفی كَباب" => parse -0?
		 * => final numeric => 0, negative sign moot
		 */
		it("5) Negative with Arabic chars => 0", () => {
			expect(
				wordsToNumber<number>("مَنفی كَباب", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(0);
		});

		/**
		 * **Test 6**: "ك" in the middle => "سه هزار ك دویست" => "سه هزار ک دویست"
		 * => (3000 + ??? + 200?) => 3200 if "ک" is unrecognized or 3000 if "ک" breaks the flow.
		 * Adjust to your logic. We'll assume final is 3200 if "ک" is just a no-op.
		 */
		it("6) 'سه هزار ك دویست' => 3200", () => {
			expect(
				wordsToNumber<number>("سه هزار ك دویست", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(3200);
		});

		/**
		 * **Test 7**: Large spelled => "كیك میلیون" => "کیک میلیون" =>
		 *   - "کیک" unknown => 0, "میلیون" => 1,000,000 => total => 1,000,000
		 */
		it("7) 'كیك میلیون' => 1,000,000", () => {
			expect(
				wordsToNumber<number>("كیك میلیون", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(1000000);
		});

		/**
		 * **Test 8**: Mixed Arabic char + partial spelled => "منفی چارصد یك" => "منفی چارصد یک"
		 * => possibly -401 if "چارصد" => 400, "یک" => 1
		 */
		it("8) 'منفی چارصد یك' => -401", () => {
			expect(
				wordsToNumber<number>("منفی چارصد یك", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(-401);
		});

		/**
		 * **Test 9**: Ordinal => "منفی هزارمین" with 'ى' => "هزارمين"? If 'ى' => 'ی'
		 * => "هزارمین" => 1000 => -1000
		 */
		it("9) Negative ordinal => -1000", () => {
			expect(
				wordsToNumber<number>("منفی هزارمين", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(-1000);
		});

		/**
		 * **Test 10**: "كل" => "کل"? Possibly not recognized => 0
		 * + "چهارصد" => 400 => total => 400
		 */
		it("10) 'كل چهارصد' => 400", () => {
			expect(
				wordsToNumber<number>("كل چهارصد", {
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(400);
		});
	});

	/**
	 * **Group**: Combination of both options
	 * - If both autoConvertDigitsToEn and autoConvertArabicCharsToPersian are true,
	 *   we do both transforms before parsing.
	 */
	describe("Combination: autoConvertDigitsToEn + autoConvertArabicCharsToPersian", () => {
		/**
		 * **Test 1**: "٤٤٤ ك" => "444 ک" => numeric => 444, leftover "ک" => 444 total
		 */
		it("1) Arabic digits + Arabic char => 444", () => {
			expect(
				wordsToNumber<number>("٤٤٤ ك", {
					autoConvertDigitsToEn: true,
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(444);
		});

		/**
		 * **Test 2**: Negative => "منفی ٢٠٠ ك" => => "منفی 200 ک" => numeric => -200
		 */
		it("2) Negative => -200", () => {
			expect(
				wordsToNumber<number>("منفی ٢٠٠ ك", {
					autoConvertDigitsToEn: true,
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(-200);
		});

		/**
		 * **Test 3**: Ordinal => "دهمین ١٢ ك" => "دهمین 12 ک" => 10 + 12 => 22
		 */
		it("3) Ordinal + Arabic => 22", () => {
			expect(
				wordsToNumber<number>("دهمین ١٢ ك", {
					autoConvertDigitsToEn: true,
					autoConvertArabicCharsToPersian: true,
				}),
			).toEqual(22);
		});
	});
});
