import phoneNumberValidator from "./validator";
import { getPhonePrefix, operators, OperatorModel } from "./utils";

/**
 * Find information such as Province, type and model of mobile number.
 * This function is related to the {@link phoneNumberValidator} function to detect that the mobile number is valid or not
 * If the Mobile number was valid, then the {@link OperatorModel} will be resolved if it was existed.
 * To get more information about phone numbers operators' details, referer to {@link https://fa.wikipedia.org/wiki/شماره‌های_تلفن_در_ایران|Wikipedia}
 *
 * @category Phone number
 * @public
 * @constructor
 * @param mobile
 * @return OperatorModel | null
 * @example
 * phoneNumberDetail("9123456789")
 */
export default function phoneNumberDetail(mobile: string): OperatorModel | null {
	if (phoneNumberValidator(mobile)) {
		const prefix = getPhonePrefix(mobile);

		return operators[prefix];
	}

	return null;
}
