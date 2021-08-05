const faNums = "۰۱۲۳۴۵۶۷۸۹";
const arNums = ["۰۱۲۳٤٥٦۷۸۹", "٠١٢٣٤٥٦٧٨٩"];

/**
 * digitsEnToFa
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Persian digits
 */
export function digitsEnToFa(value?: number | string): string {
	const isString = typeof value === "string";
	if (typeof value !== "number" && !isString) {
		throw new TypeError("PersianTools: digitsEnToFa - The input must be string or number");
	}

	let str = (!isString ? `${value}` : value) as string;
	for (let i = 0; i < 10; i++) {
		str = str.replace(new RegExp(`${i}`, "g"), faNums[i]);
	}

	return str;
}

/**
 * digitsEnToAr
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Arabic digits
 */
export function digitsEnToAr(value?: number | string): string {
	if (typeof value !== "number" && typeof value !== "string") {
		throw new TypeError("PersianTools: digitsEnToAr - The input must be number or string");
	}

	let str = `${value}`;
	for (let i = 0; i < 10; i++) {
		str = str.replace(new RegExp(`${i}`, "g"), arNums[0][i]);
	}

	return str;
}

/**
 * digitsFaToEn
 *
 * @category Digits
 * @description Takes a string made of English digits only, and
 * returns a string that represents the same number but with
 * Persian digits
 */
export function digitsFaToEn(str: string): string {
	if (typeof str !== "string") {
		throw new Error("PersianTools: digitsFaToEn - The input must be string");
	}

	for (let i = 0; i < 10; i++) {
		str = str.replace(new RegExp(faNums[i], "g"), `${i}`);
	}

	return str;
}

/**
 * digitsArToFa
 *
 * @category Digits
 * @description Takes a string that contains digits, and
 * replaces all Arabic digits with the corresponding Persian
 * digits
 */
export function digitsArToFa(str: string): string {
	if (typeof str !== "string") {
		throw new TypeError("PersianTools: digitsArToFa - The input must be string");
	}

	let result = `${str}`;
	for (let i = 0; i < 10; i++) {
		result = result.replace(new RegExp(arNums[0][i] + "|" + arNums[1][i], "g"), faNums[i]);
	}

	return result;
}

/**
 * digitsArToEn
 *
 * @category Digits
 * @description Takes a string that contains digits, and
 * replaces all Arabic digits with the corresponding English
 * digits
 */
export function digitsArToEn(str: string): string {
	if (typeof str !== "string") {
		throw new TypeError("PersianTools: digitsArToEn - The input must be string");
	}

	let result = str;
	for (let i = 0; i < 10; i++) {
		result = String(result).replace(new RegExp(arNums[0][i] + "|" + arNums[1][i], "g"), `${i}`);
	}

	return result;
}
