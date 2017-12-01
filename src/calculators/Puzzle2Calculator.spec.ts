import Puzzle2Calculator from "./Puzzle2Calculator";

describe("Puzzle1Calculator", () => {
    it("should return blank for blank input", () => {

        let calc = new Puzzle2Calculator();

        expect(calc.CalcPart1("")).toEqual("");
        expect(calc.CalcPart2("")).toEqual("");
    });

    it("should return error for non-numeric input", () => {

        let calc = new Puzzle2Calculator();

        expect(calc.CalcPart1("123D")).toEqual("ERRNONUM");
        expect(calc.CalcPart2("123D")).toEqual("ERRNONUM");
    });
});