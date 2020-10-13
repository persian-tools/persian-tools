// Digits Converter
import { digitsEnToFa, digitsFaToEn, digitsArToFa, digitsArToEn } from "./modules/digits";
// check and convert persian string
export { default as isPersian } from "./modules/isPersian";
export { default as toPersianChars } from "./modules/toPersianChars";
// String and Number Converter
export { default as NumberToWords } from "./modules/numberToWords";
export { default as WordsToNumber } from "./modules/wordsToNumber";
// Add and Remove Commas
export * from "./modules/commas";
// Iran National-ID
export * from "./modules/getPlaceByIranNationalId";
export { default as verifyIranianNationalId } from "./modules/nationalId";
// Verify Card Number and Get Bank Name from Card-Number
export { default as verifyCardNumber } from "./modules/verifyCardNumber";
export { default as getBankNameFromCardNumber } from "./modules/getBankNameFromCardNumber";
// Fix and sort persian string
export { default as URLfix } from "./modules/URLfix";
export { default as SortText } from "./modules/sortText";
export { default as halfSpace } from "./modules/halfSpace";
// Index info
export { default as Bill } from "./modules/bill";
// Sheba
export { default as Sheba } from "./modules/sheba";

export {
	// Digits
	digitsEnToFa,
	digitsFaToEn,
	digitsArToFa,
	digitsArToEn,
};
