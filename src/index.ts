// Digits Converter
export * from "./modules/digits";
// check Persian or Arabic string
export { isArabic, hasArabic } from "./modules/isArabic";
export { isPersian, hasPersian } from "./modules/isPersian";
// Convert Arabic Chars to Persian
export { default as toPersianChars } from "./modules/toPersianChars";
// String and Number Converter and their utilities
export {
	default as wordsToNumber,
	WordsToNumberOptions,
} from "./modules/wordsToNumber";
export {
	default as numberToWords,
	NumberToWordsOptions,
} from "./modules/numberToWords";
export { default as removeOrdinalSuffix } from "./modules/removeOrdinalSuffix";
export { default as addOrdinalSuffix } from "./modules/addOrdinalSuffix/addOrdinalSuffix";
// Add and Remove Commas
export * from "./modules/commas";
// Iran National-ID
export { default as verifyIranianNationalId } from "./modules/nationalId";
export {
	default as getPlaceByIranNationalId,
	IPlaceByNationalId,
} from "./modules/getPlaceByIranNationalId";
// Card-Number utilities
export { default as verifyCardNumber } from "./modules/verifyCardNumber";
export * from "./modules/extractCardNumbers/utils";
export {
	default as extractCardNumber,
	ExtractCardNumber,
	ExtractCardNumberOptions,
} from "./modules/extractCardNumbers";
export { default as getBankNameFromCardNumber } from "./modules/getBankNameFromCardNumber";
// Fix and sort persian string
export { default as URLfix } from "./modules/URLfix";
export { default as SortText } from "./modules/sortText";
export { default as halfSpace } from "./modules/halfSpace";
// Bill info
export { default as Bill } from "./modules/bill";
// Sheba
export { default as Sheba } from "./modules/sheba";
// Number plate
export {
	default as Plate,
	PlateOptions,
	PlateResult,
	PlateApi,
	PlateResultApi,
	PlateResultApiTypeString,
	PlateTypes,
} from "./modules/numberplate";
// Phone number utilities
export * from "./modules/phoneNumber";

// TimeAgo
export { default as timeAgo } from "./modules/timeAgo";
