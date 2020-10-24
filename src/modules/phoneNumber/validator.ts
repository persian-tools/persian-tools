import { getPhonePrefix, mobileRegex, prefixes } from "./utils";

export default function PhoneNumberValidator(mobile: string): boolean {
	return mobileRegex.test(mobile) && prefixes.includes(getPhonePrefix(mobile));
}
