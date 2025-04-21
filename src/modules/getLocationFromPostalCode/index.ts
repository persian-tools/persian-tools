import { postalCodeRanges } from "./postalCodeRanges.skip";

export interface LocationInfo {
	state: string;
	city: string;
}

/**
 * Find state and city information from postal code
 * @category Location
 * @method getLocationFromPostalCode
 * @param postalCode - Postal code as string or number
 * @return LocationInfo | null | undefined
 */
export function getLocationFromPostalCode(postalCode: string): LocationInfo | null {
	const prefix = parseInt(postalCode.substring(0, 5));

	for (const range of postalCodeRanges) {
		if (prefix >= range.start && prefix <= range.end) {
			return { state: range.state, city: range.city };
		}
	}

	return null;
}
