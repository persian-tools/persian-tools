// Digits Converter
export * from "./modules/digits";
// check and convert persian string
export { default as isPersian } from "./modules/isPersian";
export { default as toPersianChars } from "./modules/toPersianChars";
// String and Number Converter and their utilities
export { default as NumberToWords } from "./modules/numberToWords";
export { default as WordsToNumber } from "./modules/wordsToNumber";
export { default as removeOrdinalSuffix } from "./modules/removeOrdinalSuffix";
export { default as addOrdinalSuffix } from "./modules/addOrdinalSuffix/addOrdinalSuffix";
// Add and Remove Commas
export * from "./modules/commas";
// Iran National-ID
export { default as verifyIranianNationalId } from "./modules/nationalId";
export { default as getPlaceByIranNationalId } from "./modules/getPlaceByIranNationalId";
// Card-Number utilities
export { default as verifyCardNumber } from "./modules/verifyCardNumber";
export { default as extractCardNumber } from "./modules/extractCardNumbers";
export { default as getBankNameFromCardNumber } from "./modules/getBankNameFromCardNumber";
// Fix and sort persian string
export { default as URLfix } from "./modules/URLfix";
export { default as SortText } from "./modules/sortText";
export { default as halfSpace } from "./modules/halfSpace";
// Bill info
export { default as Bill } from "./modules/bill";
// Sheba
export { default as Sheba } from "./modules/sheba";
// Phone number utilities
export * from "./modules/phoneNumber";
