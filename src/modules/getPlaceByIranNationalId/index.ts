import { StringNumber, StringNumberArray } from "../../types";
import NationalIdJSON from "./nationalId.skip";
import ProvincesJSON from "./provincesCodes.skip";

export interface IProvince {
	code: StringNumber;
	city: string;
}

export interface INationalId extends IProvince {
	parentCode: number;
}

/**
 *
 * @category National id
 */
export interface IPlaceByNationalId {
	codes: StringNumberArray;
	city: string;
	province: string;
}

/**
 * Get Province and City name by Iranian National-Id
 *
 * @category National id
 * @public
 * @method getPlaceByIranNationalId
 * @param nationalId - string of national id - like this: 1111111111
 * @return If nationalId is valid, function returns an object of details, but if nationalId is invalid, return an error message
 */
function getPlaceByIranNationalId(nationalId?: string): IPlaceByNationalId | null | undefined {
	if (!nationalId) {
		return;
	}

	if (nationalId.length === 10) {
		const nationalIdFilter = (row: INationalId) => row.code.toString().includes(code);

		const code = nationalId.substring(0, 3);
		const find = (NationalIdJSON as INationalId[]).find(nationalIdFilter);

		if (find) {
			const provinceFilter = (province: IProvince) => province.code === find.parentCode;

			const findProvinces = (ProvincesJSON as IProvince[]).find(provinceFilter);
			const { city: province } = findProvinces ?? { city: "unknown" };
			const codes = find.code.toString().split("-");
			const city = find.city;

			return {
				city,
				province,
				codes,
			};
		}
	}

	return null;
}

export default getPlaceByIranNationalId;
