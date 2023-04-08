import { getPhonePrefix, mobileRegex, prefixes } from "./utils";

/**
 *
 * @category Phone number
 */
const phoneNumberValidator = (mobile: string): boolean =>
	mobileRegex.test(mobile) && prefixes.includes(getPhonePrefix(mobile));

export default phoneNumberValidator;
