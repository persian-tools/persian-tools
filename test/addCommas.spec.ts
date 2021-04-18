import { addCommas } from "../src";

describe("AddCommas", () => {
    it("Add and remove commas", () => {
        expect(addCommas(30000000)).toEqual("30,000,000");
        expect(addCommas("30000000")).toEqual("30,000,000");
        expect(addCommas("30,000,000")).toEqual("30,000,000");
        expect(addCommas("۳۰۰۰۰۰۰۰")).toEqual("30,000,000");

        // float numbers
        expect(addCommas("30,000,000.02")).toEqual("30,000,000.02");
        expect(addCommas("12500.9")).toEqual("12,500.9");
        expect(addCommas(12500.9)).toEqual("12,500.9");
        expect(addCommas("51000.123456789")).toEqual("51,000.123456789");

        expect(addCommas(300)).toEqual("300");
        // @ts-ignore
        expect(addCommas(3000)).toBeType("string");
    });

    it("Add falsy value", () => {
        expect(addCommas(0)).toEqual("0");
        // @ts-ignore
        expect(addCommas()).toEqual("");
        // @ts-ignore
        expect(addCommas(undefined)).toEqual("");
    });
})
