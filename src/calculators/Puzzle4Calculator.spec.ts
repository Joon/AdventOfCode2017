import Puzzle4Calculator from "./Puzzle4Calculator";

describe("Puzzle4Calculator", () => {
    it("should return zero for blank input", () => {

        let calc = new Puzzle4Calculator();

        expect(calc.CalcPart1("")).toEqual("0");
        expect(calc.CalcPart2("")).toEqual("0");
    });

    it("should return 1 for 1 valid input", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart1("aa bb cc dd")).toEqual("1");
    });

    it("should return 0 for 1 invalid input", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart1("aa bb aa dd")).toEqual("0");
    });

    it("should return 1 for 1 valid and 1 invalid input", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart1("aa bb aa dd\naa bb cc dd")).toEqual("1");
    });

    it("should return 1 for 1 valid input in part 2", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart2("aaa bab cac dad")).toEqual("1");
    });

    it("should return 0 for 1 invalid input in part 2", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart2("abcd edcb dcab")).toEqual("0");
    });

    it("should return 1 for 1 valid and 1 invalid input in part 2", () => {
        let calc = new Puzzle4Calculator();
        expect(calc.CalcPart2("aaa bab cac dad\nabcd edcb dcab")).toEqual("1");
    });
    
});
