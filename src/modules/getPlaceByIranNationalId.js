import NationalIdJSON from "../dummy/nationalId.json";
import ProvincesJSON from "../dummy/provincesCodes.json";

/**
 * Get Place by Iranian National-Id
 * @method getPlaceByIranNationalId
 * @param  {String?}                 nationalId [String of national id - like this: 1111111111]
 * @return {Object}                             [If nationalId is valid, function returning an object of details, but nationalId is invalid, return error message]
 */
function getPlaceByIranNationalId(nationalId) {
	if (!nationalId) return;

	if (nationalId && nationalId.length === 10) {
		let code = nationalId.toString().substring(0, 3);
		let find = NationalIdJSON.filter(row => row.code.indexOf(code) !== -1);

		if (find.length) {
			let findProvinces = ProvincesJSON.filter(
				province => province.code === find[0].parentCode
			);

			return {
				city: find[0].city,
				province: findProvinces.length
					? findProvinces[0].city
					: "unkown",
				codes:
					find[0].code.indexOf("-") !== -1
						? find[0].code.split("-")
						: [find[0].code]
			};
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export default getPlaceByIranNationalId;
