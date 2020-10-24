/**
 * This Regex can find all kind of Iranian Banks card numbers into a text such as these models:
 * @example
 * 1. 6219-8610-3452-9007
 * 2. 5022291070873466
 * 3. ۵۰۲۲۲۹۱۰۸۱۸۷۳۴۶۶
 * 4. ۵۰۲۲-۲۹۱۰-۷۰۸۷-۳۴۶۶
 *
 * @author Ali.Torki
 * @constant
 * @type regex
 */
const cardNumberRegex = /^([\u06F0-\u06F90-9]{4})+(?:[-_])?([\u06F0-\u06F90-9]{4})+(?:[-_])?([\u06F0-\u06F90-9]{4})+(?:[-_])?([\u06F0-\u06F90-9]{4})$/gm;
