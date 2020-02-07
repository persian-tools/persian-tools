import NationalIdJSON from "../dummy/nationalId.json";
import ProvincesJSON from "../dummy/provincesCodes.json";

interface IProvince {
	code: number | string;
	city: string;
}

interface INationalId extends IProvince {
	parentCode: number;
}

interface IGetPlaceByNationalIId {
	codes: number[] | string[];
	city: string;
	province: string;
}

/**
 * Get Place by Iranian National-Id
 * @method getPlaceByIranNationalId
 * @param  {String?}                 nationalId [String of national id - like this: 1111111111]
 * @return {Object}                             [If nationalId is valid, function returning an object of details, but nationalId is invalid, return error message]
 */
function getPlaceByIranNationalId(nationalId?: string): IGetPlaceByNationalIId | null | undefined {
	if (!nationalId) return;

	if (nationalId && nationalId.length === 10) {
		const code = nationalId.toString().substring(0, 3);
		const find = (NationalIdJSON as INationalId[]).filter(row => row.code.toString().includes(code));

		if (find.length) {
			const findProvinces = (ProvincesJSON as IProvince[]).filter(
				province => province.code === find[0].parentCode,
			);
			const code = find[0].code.toString();

			return {
				city: find[0].city,
				province: findProvinces.length ? findProvinces[0].city : "unkown",
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
