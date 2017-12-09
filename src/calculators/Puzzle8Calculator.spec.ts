import Puzzle8Calculator from "./Puzzle8Calculator";

describe("PuzzleCalculator8", () => {
    it("Must return blank for blank input", () => {
        let item = new Puzzle8Calculator();
        expect(item.CalcPart1("")).toBe("");
        expect(item.CalcPart2("")).toBe("");
    });

    it ("Must return 1 for the site example",  ()=> {
        let item = new Puzzle8Calculator();
        let input = `pb inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;
        expect(item.CalcPart1(input)).toBe("1");
    });

    
    
});