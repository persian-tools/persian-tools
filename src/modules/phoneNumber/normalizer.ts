import { phoneNumberValidator } from ".";

/**
 * Normalize a phone number to a standard format based on the provided token.
 * This function is related to the {@link phoneNumberValidator} function to detect that the mobile number is valid or not
 *
 * @category Phone number
 * @public
 * @constructor
 * @param {string} number phone number
 * @param {string} token can be either `+98` or `0`
 * @return String | never
 * @example
 * phoneNumberNormalizer("+989022002580", "0"); // 09022002580
 * phoneNumberNormalizer("989022002580", "0"); // 09022002580
 * phoneNumberNormalizer("09022002580", "0"); // 09022002580
 * phoneNumberNormalizer("09022002580", "+98"); //+989022002580
 * phoneNumberNormalizer("09802002580", "0"); // Error : this is not valid phone number
 */
const phoneNumberNormalizer = (phoneNumber: string, token: "0" | "+98") => {
	if (!phoneNumberValidator(phoneNumber)) {
		throw new Error("phone number is not valid");
	}
	return token + phoneNumber.split(/^(?:\+98|98|0098|0)/).pop();
};

export default phoneNumberNormalizer;
