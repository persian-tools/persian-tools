import { remainingTime } from "../src";
jest.mock("../src/modules/remainingTime/getCurrentDateTime", () => {
	return {
		getCurrentDateTime: () => new Date("2022-04-12T10:30:51Z"),
	};
});

describe("remainingTime", () => {
	it("should throw error when we are not passing a correct date format", () => {
		expect(() => {
			remainingTime("Hello-World!");
		}).toThrow(new TypeError("PersianTools: remainingTime - The input must be a valid date"));
	});
	it("should calculate remained time correctly", () => {
		const { years, minutes, months, hours, seconds, days, isFinished } = remainingTime("2023-05-14T13:35:59Z");
		expect(years).toBe(1);
		expect(months).toBe(1);
		expect(days).toBe(2);
		expect(hours).toBe(3);
		expect(minutes).toBe(5);
		expect(seconds).toBe(8);
		expect(isFinished).toBe(false);
	});

	it("should return zero when the specified time is bigger than now", () => {
		const { years, minutes, months, hours, seconds, days, isFinished } = remainingTime("2018-04-12T10:30:51Z");
		expect(years).toBe(0);
		expect(months).toBe(0);
		expect(days).toBe(0);
		expect(hours).toBe(0);
		expect(minutes).toBe(0);
		expect(seconds).toBe(0);
		expect(isFinished).toBe(true);
		expect(remainingTime("2018-04-12T10:30:51Z").toString()).toBe("");
	});
	it("should convert to persian string correctly", () => {
		expect(remainingTime("2023-05-14T13:35:59Z").toString()).toBe(
			"۱ سال و ۱ ماه و ۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه",
		);
		expect(remainingTime("2022-05-14T13:35:59Z").toString()).toBe("۱ ماه و ۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(remainingTime("2022-04-14T13:35:59Z").toString()).toBe("۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(remainingTime("2022-04-12T13:35:59Z").toString()).toBe("۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(remainingTime("2022-04-12T10:35:59Z").toString()).toBe("۵ دقیقه و ۸ ثانیه");
		expect(remainingTime("2022-04-12T10:30:59Z").toString()).toBe("۸ ثانیه");
	});
});
