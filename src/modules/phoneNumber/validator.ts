import { getPhonePrefix, mobileRegex, prefixes } from "./utils";

/**
 *
 * @category Phone number
 */
export default function PhoneNumberValidator(mobile: string): boolean {
	return mobileRegex.test(mobile) && prefixes.includes(getPhonePrefix(mobile));
}
