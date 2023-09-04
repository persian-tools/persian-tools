import { iranianPostalCodeValidate } from "../src";
import { describe, it, expect } from "vitest";

const validPostalCode = "1193653471"
const invalidPostalCodes = [
    '142386473',
    '12',
    '1111111111',
    '0423437584',
    "test invalid postalCode"
]

describe("iranianPostalCode", () => {
    it('valid postal code', () => {
        expect(iranianPostalCodeValidate(validPostalCode)).toBeTruthy()
    })

    it('invalid postal codes', () => {
        invalidPostalCodes.forEach((invalidPostalCode) => {
            expect(iranianPostalCodeValidate(invalidPostalCode)).toBeFalsy()
        })
    })
});
