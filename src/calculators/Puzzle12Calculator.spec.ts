import Puzzle12Calculator from "./Puzzle12Calculator";

describe("Puzzle12Calculator", () => {

    it("Must return blank for blank input", () => {
        let calc = new Puzzle12Calculator();        
        expect(calc.CalcPart1("")).toBe("");
        expect(calc.CalcPart2("")).toBe("");
    });

    it ("Must return the site example value", () => {
        let calc = new Puzzle12Calculator();
        let input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
5 <-> 5
6 <-> 4, 5`;
        expect(calc.CalcPart2(input)).toBe("2");
    });

    it ("Must combine deep hierarchies", () => {
        let calc = new Puzzle12Calculator();
        let input = `0 <-> 1
1 <-> 2
2 <-> 3
3 <-> 4
4 <-> 5
5 <-> 6
6 <-> 7
7 <-> 8
9 <-> 10
10 <-> 11
11 <-> 12
12 <-> 13
13 <-> 14
14 <-> 15
15 <-> 15
16 <-> 17
17 <-> 18
18 <-> 19
19 <-> 20
20 <-> 21
21 <-> 18,13,5`;
        expect(calc.CalcPart2(input)).toBe("1");
    });

    it ("Must combine deep hierarchies", () => {
        let calc = new Puzzle12Calculator();
        let input = `0 <-> 1
1 <-> 2
2 <-> 3
3 <-> 4
4 <-> 5
5 <-> 6
6 <-> 7
7 <-> 8
9 <-> 10
10 <-> 11
11 <-> 12
12 <-> 13
13 <-> 14
14 <-> 15
15 <-> 15
16 <-> 17
17 <-> 18
18 <-> 19
19 <-> 20
20 <-> 21
21 <-> 18
18 <-> 13
13 <-> 5`;
        expect(calc.CalcPart2(input)).toBe("1");
    });
    
});


