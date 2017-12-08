import Puzzle7Calculator from "./Puzzle7Calculator";

describe("PuzzleCalculator7", () => {
    it("Must return blank for blank input", () => {
        let item = new Puzzle7Calculator();
        expect(item.CalcPart1("")).toBe("");
        expect(item.CalcPart2("")).toBe("");
    });

    it ("Must return tknk for the site example",  ()=> {
        let item = new Puzzle7Calculator();
        let input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
        expect(item.CalcPart1(input)).toBe("tknk");
    });

    it ("Must return 60 for the site example in mode 2",  ()=> {
        let item = new Puzzle7Calculator();
        let input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
        expect(item.CalcPart2(input)).toBe("60");
    });
    
});