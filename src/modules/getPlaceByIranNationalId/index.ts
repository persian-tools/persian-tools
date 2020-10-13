import NationalIdJSON from "./nationalId.skip";
import ProvincesJSON from "./provincesCodes.skip";

export interface IProvince {
	code: number | string;
	city: string;
}

export interface INationalId extends IProvince {
	parentCode: number;
}

export interface IPlaceByNationalId {
	codes: number[] | string[];
	city: string;
	province: string;
}

/**
 * Get Province and City name by Iranian National-Id
 *
 * @public
 * @method getPlaceByIranNationalId
 * @param nationalId - string of national id - like this: 1111111111
 * @return If nationalId is valid, function returns an object of details, but if nationalId is invalid, return an error message
 */
function getPlaceByIranNationalId(nationalId?: string): IPlaceByNationalId | null | undefined {
	if (!nationalId) return;

	if (nationalId && nationalId.length === 10) {
		const code = nationalId.toString().substring(0, 3);
		const find = (NationalIdJSON as INationalId[]).filter((row) => row.code.toString().includes(code));

		if (find.length) {
			const findProvinces = (ProvincesJSON as IProvince[]).filter(
				(province) => province.code === find[0].parentCode,
			);
			const code = find[0].code.toString();

			return {
				city: find[0].city,
				province: findProvinces.length ? findProvinces[0].city : "unknown",
				codes: code.includes("-") ? code.split("-") : [code],
			};
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export default getPlaceByIranNationalId;
