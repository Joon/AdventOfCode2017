import Puzzle5Calculator from "./Puzzle5Calculator";

describe("PuzzleCalculator5", () => {

    it("should return empty for empty input", () => {
        let calc5 = new Puzzle5Calculator();
        expect(calc5.CalcPart1("")).toEqual("");
        expect(calc5.CalcPart2("")).toEqual("");
    });

    it("should return 5 for site sample input", () => {
        let calc5 = new Puzzle5Calculator();
        let input = `0
3
0
1
-3`;
        expect(calc5.CalcPart1(input)).toEqual("5");        
    });

    it("should return 10 for site sample input in part B", () => {
        let calc5 = new Puzzle5Calculator();
        let input = `0
3
0
1
-3`;
        expect(calc5.CalcPart2(input)).toEqual("10");
    });

    
});