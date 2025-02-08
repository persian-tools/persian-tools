import { getPhoneNumberPrefix, mobileRegex, prefixes } from "./utils";

/**
 *
 * @category Phone number
 */
export function isPhoneNumberValid(mobile: string): boolean {
	return mobileRegex.test(mobile) && prefixes.includes(getPhoneNumberPrefix(mobile));
}
