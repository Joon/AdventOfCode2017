import Puzzle1Calculator from "./Puzzle1Calculator";

describe("Puzzle1Calculator", () => {

    it("should return blank for blank input", () => {

        let calc = new Puzzle1Calculator();

        expect(calc.calcOutputA("")).toEqual("");
        expect(calc.calcOutputB("")).toEqual("");
    });

    it("should return error for non-numeric input", () => {

        let calc = new Puzzle1Calculator();

        expect(calc.calcOutputA("123D")).toEqual("ERRNONUM");
        expect(calc.calcOutputB("123D")).toEqual("ERRNONUM");
    });

    it("should return '3' for '1122' in mode A", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputA("1122")).toEqual("3");
    });

    it("should return '4' for '1111' in mode A", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputA("1111")).toEqual("4");
    });

    it("should return '0' for '1234' in mode A", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputA("1234")).toEqual("0");
    });

    it("should return '9' for '91212129' in mode A", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputA("91212129")).toEqual("9");
    });

    it ("should return '6' for '1212' in Mode B", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputB("1212")).toEqual("6");
    });
    it ("should return '0' for '1221' in Mode B", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputB("1221")).toEqual("0");
    });
    it ("should return '4' for '123425' in Mode B", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputB("123425")).toEqual("4");
    });
    it ("should return '12' for '123123' in Mode B", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputB("123123")).toEqual("12");
    });
    it ("should return '4' for '12131415' in Mode B", () => {
        let calc = new Puzzle1Calculator();
        
        expect(calc.calcOutputB("12131415")).toEqual("4");
    });
});