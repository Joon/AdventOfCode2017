import PuzzleCalculator6 from "./PuzzleCalculator6";

describe("PuzzleCalculator6", () => {
    it("Must return blank for blank input", () => {
        let item = new PuzzleCalculator6();
        expect(item.CalcPart1("")).toBe("");
        expect(item.CalcPart2("")).toBe("");
    });
});