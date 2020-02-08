import getPlaceByIranNationalId from "../src/modules/getPlaceByIranNationalId";

it("Get the city and province name by national code", () => {
	expect(getPlaceByIranNationalId("0499370899")?.city).toEqual("شهرری");
	expect(getPlaceByIranNationalId("0790419904")?.city).toEqual("سبزوار");
	expect(getPlaceByIranNationalId("0084575948")?.city).toEqual("تهران مرکزی");
	expect(getPlaceByIranNationalId("0060495219")?.city).toEqual("تهران مرکزی");
	expect(getPlaceByIranNationalId("0671658506")?.city).toEqual("بجنورد");
	expect(getPlaceByIranNationalId("0671658506")?.city).toEqual("بجنورد");
	expect(getPlaceByIranNationalId("0643005846")?.city).toEqual("بیرجند");
	expect(getPlaceByIranNationalId("0906582709")?.city).toEqual("کاشمر");
	expect(getPlaceByIranNationalId("0451727304")?.city).toEqual("شمیران");
	expect(getPlaceByIranNationalId("0371359058")?.city).toEqual("قم");

	expect(getPlaceByIranNationalId("0084545943")?.city).toEqual("تهران مرکزی");

	expect(getPlaceByIranNationalId()).toBeUndefined();
});
