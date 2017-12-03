import Puzzle3Calculator from "./Puzzle3Calculator";

describe("Puzzle3Calculator", () => {
    it("should return blank for blank input", () => {

        let calc = new Puzzle3Calculator();

        expect(calc.CalcPart1("")).toEqual("");
        expect(calc.CalcPart2("")).toEqual("");
    });

    it("should return 0 for 1 from sample on site", () => {
        let calc = new Puzzle3Calculator();
        expect(calc.CalcPart1("1")).toEqual("0");
    });

    it("should return 3 for 12 from sample on site", () => {
        let calc = new Puzzle3Calculator();
        expect(calc.CalcPart1("12")).toEqual("3");
    });

    it("should return 2 for 23 from sample on site", () => {
        let calc = new Puzzle3Calculator();
        expect(calc.CalcPart1("23")).toEqual("2");
    });

    it("should return 23 for 12 for Part B from sample on site", () => {
        let calc = new Puzzle3Calculator();
        expect(calc.CalcPart2("12")).toEqual("23");
    });
    
    it("should return 806 for 748 for Part B from sample on site", () => {
        let calc = new Puzzle3Calculator();
        expect(calc.CalcPart2("748")).toEqual("806");
    });
});