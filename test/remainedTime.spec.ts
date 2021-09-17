import { RemainedTime } from "../src";
jest.mock("../src/modules/remainedTime/getCurrentDateTime", () => {
	return {
		getCurrentDateTime: () => new Date("2022-04-12T10:30:51Z"),
	};
});

describe("RemainedTime", () => {
	it("should calculate remained time correctly", () => {
		const { Years, Minutes, Months, Hours, Seconds, Days, isFinished } = RemainedTime("2023-05-14T13:35:59Z");
		expect(Years).toBe(1);
		expect(Months).toBe(1);
		expect(Days).toBe(2);
		expect(Hours).toBe(3);
		expect(Minutes).toBe(5);
		expect(Seconds).toBe(8);
		expect(isFinished).toBe(false);
	});

	it("should return zero when the specified time is bigger than now", () => {
		const { Years, Minutes, Months, Hours, Seconds, Days, isFinished } = RemainedTime("2018-04-12T10:30:51Z");
		expect(Years).toBe(0);
		expect(Months).toBe(0);
		expect(Days).toBe(0);
		expect(Hours).toBe(0);
		expect(Minutes).toBe(0);
		expect(Seconds).toBe(0);
		expect(isFinished).toBe(true);
		expect(RemainedTime("2018-04-12T10:30:51Z").toString()).toBe("");
	});
	it("should convert to persian string correctly", () => {
		expect(RemainedTime("2023-05-14T13:35:59Z").toString()).toBe(
			"۱ سال و ۱ ماه و ۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه",
		);
		expect(RemainedTime("2022-05-14T13:35:59Z").toString()).toBe("۱ ماه و ۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(RemainedTime("2022-04-14T13:35:59Z").toString()).toBe("۲ روز و ۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(RemainedTime("2022-04-12T13:35:59Z").toString()).toBe("۳ ساعت و ۵ دقیقه و ۸ ثانیه");
		expect(RemainedTime("2022-04-12T10:35:59Z").toString()).toBe("۵ دقیقه و ۸ ثانیه");
		expect(RemainedTime("2022-04-12T10:30:59Z").toString()).toBe("۸ ثانیه");
	});
});
