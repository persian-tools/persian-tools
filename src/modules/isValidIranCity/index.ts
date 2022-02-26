import iranCitiesNames from "./iranCitiesNames.skip";
/**
 * Checks whether this string is the name of an Iranian city or not
 *
 * @category City
 * @method expandNumber
 * @param {string} cityName
 * @return {boolean} string is the name of an Iranian city or not
 */

export const isValidIranCity = (cityName: string) => {
	return iranCitiesNames.indexOf(cityName) !== -1;
};
