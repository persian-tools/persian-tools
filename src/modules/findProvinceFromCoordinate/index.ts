import { GeoJSONData } from "./irGeoJSON";

interface Point {
	longitude: number;
	latitude: number;
}

interface GeoJSONFeature {
	properties: Record<string, string | undefined>;
	geometry: {
		type: string;
		coordinates: object; // This represents MultiPolygon coordinates
	};
}

interface Province {
	fa: string;
	en: string;
}

const provinces = GeoJSONData;

function pointInPolygon(polygon: number[][], point: Point): boolean {
	let isInside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i][0];
		const yi = polygon[i][1];
		const xj = polygon[j][0];
		const yj = polygon[j][1];

		const { longitude: x, latitude: y } = point;

		if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
			isInside = !isInside;
		}
	}
	return isInside;
}

/**
 * Find the province from a given coordinate point.
 * @param pointToCheck The coordinate point to check.
 * @returns The province information.
 * @throws {Error} If the province cannot be found based on the provided coordinates.
 * @example
 * const point: Point = { latitude: 35.6892, longitude: 51.3890 };
 * const province = findProvinceFromCoordinate(point);
 * console.log(province.fa); // "تهران"
 * console.log(province.en); // "Tehran"
 * @example
 * const {fa , en} = findProvinceFromCoordinate(point);
 */
export const findProvinceFromCoordinate = (pointToCheck: Point): Province => {
	let foundProvince: GeoJSONFeature | undefined;
	for (let index = 0; index < provinces.features.length; index++) {
		const province = provinces.features[index];
		const provinceGeometryCoords = province.geometry.coordinates[0][0];
		const isInsideProvince = pointInPolygon(provinceGeometryCoords, pointToCheck);
		if (isInsideProvince) {
			foundProvince = province;
			break;
		}
	}
	if (foundProvince) {
		const normalizedProvinceObject: Province = {
			fa: foundProvince.properties.name || "",
			en: foundProvince.properties["name:en"] || "",
		};
		return normalizedProvinceObject;
	} else {
		throw new Error("Could not find province based on provided coordinates !");
	}
};
