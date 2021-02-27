/**
 * This Regex can find all kind of Iranian Banks' card number into a text such as these models:
 * 1. 6219-8610-3452-9007
 * 2. 5022291070873466
 * 3. ۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶
 * 4. ۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶
 * 5. ۵۰۲۲.۲۹۱۰.۷۰۸۷.۳۴۶۶
 * 6. ۵۰۲۲_۲۹۱۰_۷۰۸۷_۳۴۶۶
 * 7. ۵۰۲۲*۲۹۱۰*۷۰۸۷*۳۴۶۶
 *
 * @constant
 */
export const cardNumberRegex = new RegExp("([\u06F0-\u06F90-9-_.*]{16,20})", "img");
/**
 * Acceptable keywords between numbers are:
 * 1. Star -> *
 * 2. Underscore -> _
 * 3. Dash -> -
 * 4. Dot -> .
 *
 * @example:
 * 5022*2910_7087-3466
 * @constant
 */
export const acceptableKeywords = /[-_.*]/g;
