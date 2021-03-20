import {digitsEnToFa, digitsFaToEn, digitsArToFa, digitsArToEn} from "../src";

describe("Digits", () => {
    it("digitsArToFa", () => {
        expect(digitsArToFa("٠١٢٣٤٥٦٧٨٩")).toEqual("۰۱۲۳۴۵۶۷۸۹");
        expect(digitsArToFa("۸۹123۴۵")).toEqual("۸۹123۴۵");
        expect(digitsArToFa("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text ۰۱۲۳۴۵۶۷۸۹");
        try {
            digitsArToFa()
        }catch (e) {
            expect(e.message).toEqual('the input must be string')
        }
    });

    it("digitsArToEn", () => {
        expect(digitsArToEn("٠١٢٣٤٥٦٧٨٩")).toEqual("0123456789");
        expect(digitsArToEn("٨٩123٤٥")).toEqual("8912345");
        expect(digitsArToEn("Text ٠١٢٣٤٥٦٧٨٩")).toEqual("Text 0123456789");

        try {
            digitsArToEn()
        } catch (e) {
            expect(e.message).toEqual('the input must be string')
        }

        try {
            // @ts-ignore
            digitsArToEn(456128)
        } catch (e) {
            expect(e.message).toEqual('the input must be string')
        }
    });

    it("digitsEnToFa", () => {
        expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");
        expect(digitsEnToFa("٤٥٦")).toEqual("٤٥٦");
        expect(digitsEnToFa("123۴۵۶")).toEqual("۱۲۳۴۵۶");

        try {
            //@ts-ignore
            digitsEnToFa()
        } catch (e) {
            expect(e.message).toEqual('the input must be string or number')
        }

        try {
            //@ts-ignore
            digitsEnToFa([])
        } catch (e) {
            expect(e.message).toEqual('the input must be string or number')
        }
    });

    it("digitsFaToEn", () => {
        expect(digitsFaToEn("123۴۵۶")).toEqual("123456");
        expect(digitsFaToEn("۸۹123۴۵")).toEqual("8912345");
        expect(digitsFaToEn("۰۱۲۳۴۵۶۷۸۹")).toEqual("0123456789");

        try {
            //@ts-ignore
            digitsFaToEn()
        } catch (e) {
            expect(e.message).toEqual('the input must be string')
        }

        try {
            //@ts-ignore
            digitsFaToEn({})
        } catch (e) {
            expect(e.message).toEqual('the input must be string')
        }

    });
});
