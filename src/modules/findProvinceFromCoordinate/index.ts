import { GeoJSONData } from "./IRGeoJSON";


interface Point {
	longitude: number;
	latitude: number;
}

interface GeoJSONFeature {
	id: number;
	osm_type: string;
	type: string;
	name: string;
	properties: Record<string, string | undefined>;
	geometry: {
		type: string;
		coordinates: object; // This represents MultiPolygon coordinates
	};
}

interface Province {
	name: string;
	properties: object;
	geometry: object; 
}

const provinces = GeoJSONData;

function pointInPolygon(polygon: number[][], point: Point): boolean {
	let odd = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
		if (((polygon[i][1] > point.latitude) !== (polygon[j][1] > point.latitude))
			&& (point.longitude < ((polygon[j][0] - polygon[i][0]) * (point.latitude - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
			odd = !odd;
		}
		j = i;
	}
	return odd;
}

/**
 * Find the province from a given coordinate point.
 * @param pointToCheck The coordinate point to check.
 * @returns The province information.
 * @throws {Error} If the province cannot be found based on the provided coordinates.
 * @example
 * const point: Point = { latitude: 35.6892, longitude: 51.3890 };
 * const province = findProvinceFromCoordinate(point);
 * console.log(province.name); // "تهران"
 * console.log(province.properties['name:fa']); // "تهران"
 * console.log(province.properties['name:en']); // "Tehran"
 */
export const findProvinceFromCoordinate = (pointToCheck: Point): Province => {
	let foundProvince: GeoJSONFeature | undefined;
	for (let index = 0; index < provinces.features.length; index++) {
		const province = provinces.features[index];
		const isInsideProvince = pointInPolygon(province.geometry.coordinates[0][0], pointToCheck);
		if (isInsideProvince) {
			foundProvince = province;
			break;
		}
	}
	if (foundProvince) {
		const normalizedProvinceObject: Province = {
			name: foundProvince.name,
			properties: {
				'name:fa': foundProvince.properties.name,
				'name:en': foundProvince.properties['name:en'],
				'ISO3166-2': foundProvince.properties['ISO3166-2'],
			},
			geometry: foundProvince.geometry
		};
		return normalizedProvinceObject;
	} else {
		throw new Error("Could not find province based on provided coordinates !");
	}
}

export default findProvinceFromCoordinate;
