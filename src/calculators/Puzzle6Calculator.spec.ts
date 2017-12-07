import Puzzle6Calculator from "./Puzzle6Calculator";

describe("PuzzleCalculator6", () => {
    it("Must return blank for blank input", () => {
        let item = new Puzzle6Calculator();
        expect(item.CalcPart1("")).toBe("");
        expect(item.CalcPart2("")).toBe("");
    });

    it ("Must return 5 for the site example",  ()=> {
        let item = new Puzzle6Calculator();
        expect(item.CalcPart1("0 2 7 0")).toBe("5");
    });
    
    it ("Must return 4 for the site example in puzzle B",  ()=> {
        let item = new Puzzle6Calculator();
        expect(item.CalcPart2("0 2 7 0")).toBe("4");
    });
});