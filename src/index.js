// Digits Converter
import {
  digitsEnToFa,
  digitsFaToEn,
  digitsArToFa,
  digitsArToEn
} from "./modules/digits";
// check and convert persian string
import isPersian from "./modules/isPersian";
import toPersianChars from "./modules/toPersianChars";
// String and Number Converter
import NumberToWords from "./modules/NumberToWords";
import WordsToNumber from "./modules/WordsToNumber";
// Add and Remove Commas
import addCommas from "./modules/addCommas";
import removeCommas from "./modules/removeCommas";
// Iran National-ID
import verifyIranianNationalId from "./modules/nationalId";
import getPlaceByIranNationalId from "./modules/getPlaceByIranNationalId";
// Verify Card Number and Get Bank Name from Card-Number
import verifyCardNumber from "./modules/verifyCardNumber";
import getBankNameFromCardNumber from "./modules/getBankNameFromCardNumber";
// Fix and sort persian string
import URLfix from "./modules/URLfix";
import SortText from "./modules/SortText";

window.NumberToWords = NumberToWords;
window.WordsToNumber = WordsToNumber;
window.isPersian = isPersian;
window.toPersianChars = toPersianChars;
window.addCommas = addCommas;
window.removeCommas = removeCommas;
window.digitsEnToFa = digitsEnToFa;
window.digitsFaToEn = digitsFaToEn;
window.digitsArToFa = digitsArToFa;
window.digitsArToEn = digitsArToEn;
window.verifyIranianNationalId = verifyIranianNationalId;
window.getPlaceByIranNationalId = getPlaceByIranNationalId;
window.verifyCardNumber = verifyCardNumber;
window.getBankNameFromCardNumber = getBankNameFromCardNumber;
window.URLfix = URLfix;
window.SortTex = SortText;

export {
  // String and Number Converter
  NumberToWords,
  WordsToNumber,
  // check and convert persian string
  isPersian,
  toPersianChars,
  // Add and Remove Commas
  addCommas,
  removeCommas,
  // Digits
  digitsEnToFa,
  digitsFaToEn,
  digitsArToFa,
  digitsArToEn,
  // Iran National-ID
  verifyIranianNationalId,
  getPlaceByIranNationalId,
  // Verify Card Number and Get Bank Name from Card-Number
  verifyCardNumber,
  getBankNameFromCardNumber,
  // Fix and sort persian string
  URLfix,
  SortText
};
