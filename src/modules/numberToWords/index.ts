import { removeCommas } from "../commas";
import { addOrdinalSuffix } from "../addOrdinalSuffix/addOrdinalSuffix";
// Constants
import { numbersWordList } from "./numbersWordList";

export interface NumberToWordsOptions {
	ordinal?: boolean;
}

type NumberToWordsType = (numberValue: number | string, options?: NumberToWordsOptions) => string | TypeError;

export const numberToWords: NumberToWordsType = (numberValue, options) => {
	const isNumberValid = (n: number) => typeof n === "number" && Number.isSafeInteger(n) && n !== 0;
	const isNegative = (n: number) => n < 0;
	const numberIsNotValidError = () =>
		TypeError("PersianTools: numberToWords - the number must be a safe integer value");

	if (typeof numberValue !== "string" && !Number.isSafeInteger(numberValue)) return numberIsNotValidError();
	const number = Number(typeof numberValue === "number" ? numberValue : removeCommas(numberValue));
	const isOrdinal = options?.ordinal || false;

	const getWord = (n: number) => numbersWordList[n] ?? "";
	const addNegativeSuffix = (str: string) => "منفی" + " " + str;

	function transformToWord(num: number): string {
		if (num === 0) return "";
		if (num <= 9) return getWord(num);
		else if (num >= 11 && num <= 19) return getWord(num);

		const residual = num <= 99 ? num % 10 : num % 100;
		return residual === 0 ? getWord(num) : `${getWord(num - residual)} و ${transformToWord(residual)}`;
	}

	/**
	 *
	 * @param {number} num - a positive number
	 * @returns {number} number word
	 */

	function performer(num: number): string {
		if (num <= 999) return transformToWord(num);

		const getUnitName = (numberOfZeros: number) =>
			numberOfZeros === 0 ? "" : numbersWordList[Number.parseInt(`1${"0".repeat(numberOfZeros)}`)];

		const seperated = Number(num).toLocaleString().split(",");

		const numbersArr = seperated
			.map((value, index) => {
				const { transformedVal, unitName } = Object.freeze({
					transformedVal: transformToWord(Number.parseInt(value, 10)),
					unitName: getUnitName((seperated.length - (index + 1)) * 3),
				});

				return transformedVal ? transformedVal + " " + unitName : "";
			})
			.filter((val) => val.length > 1);

		return numbersArr.join(" و ").trim();
	}

	const positiveNumber = Math.abs(number);
	const handleResult = () => {
		if (Number(numberValue) === 0) return "صفر";
		if (isNumberValid(number)) {
			const tmpResult = isNegative(number)
				? addNegativeSuffix(performer(positiveNumber))
				: performer(positiveNumber);
			return isOrdinal ? addOrdinalSuffix(tmpResult) : tmpResult;
		} else {
			return numberIsNotValidError();
		}
	};
	return handleResult();
};
