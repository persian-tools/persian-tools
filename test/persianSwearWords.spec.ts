import { persianSwear } from "../src";

describe("persianSwear", () => {
    it("should detect swear word", () => {
        let swear = new persianSwear()
        expect(swear.isBad("لاشی")).toBe(true)
        expect(swear.isBad("سلام")).toBe(false)
    })
    it("should add and remove word from list", () => {
        let swear = new persianSwear()
        swear.addWord("تست")
        expect(swear.isBad("تست")).toBe(true)
        swear.removeWord("تست")
        expect(swear.isBad("تست")).toBe(false)
    })
    it("should detect swear contain in text", () => {
        let swear = new persianSwear()
        expect(swear.isContain("چطوری لاشی")).toBe(true)
        expect(swear.isContain("چطوری داداشم")).toBe(false)
    })
    it("should filter swear word in text with custom symbol", () => {
        let swear = new persianSwear()
        expect(swear.filterSwear("چطوری لاشی")).toBe("چطوری *** ")
        expect(swear.filterSwear("چطوری لاشی", "+++")).toBe("چطوری +++ ")
    })
})
