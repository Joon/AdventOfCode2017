import Puzzle9Calculator from "./Puzzle9Calculator";

describe("PuzzleCalculator9", () => {
    it("Must return blank for blank input", () => {
        let item = new Puzzle9Calculator();
        expect(item.CalcPart1("")).toBe("");
        expect(item.CalcPart2("")).toBe("");
    });

    it ("Must return 1 for the site example {}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{}";
        expect(item.CalcPart1(input)).toBe("1");
    });

    it ("Must return 6 for the site example {{{}}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{{}}}";
        expect(item.CalcPart1(input)).toBe("6");
    });

    it ("Must return 5 for the site example {{},{}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{},{}}";
        expect(item.CalcPart1(input)).toBe("5");
    });

    it ("Must return 16 for the site example {{{},{},{{}}}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{{},{},{{}}}}";
        expect(item.CalcPart1(input)).toBe("16");
    });

    it ("Must return 1 for the site example {<a>,<a>,<a>,<a>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<a>,<a>,<a>,<a>}";
        expect(item.CalcPart1(input)).toBe("1");
    });

    it ("Must return 9 for the site example {{<ab>},{<ab>},{<ab>},{<ab>}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{<ab>},{<ab>},{<ab>},{<ab>}}";
        expect(item.CalcPart1(input)).toBe("9");
    });

    it ("Must return 9 for the site example {{<!!>},{<!!>},{<!!>},{<!!>}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{<!!>},{<!!>},{<!!>},{<!!>}}";
        expect(item.CalcPart1(input)).toBe("9");
    });
    
    it ("Must return 3 for the site example {{<a!>},{<a!>},{<a!>},{<ab>}}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{{<a!>},{<a!>},{<a!>},{<ab>}},";
        expect(item.CalcPart1(input)).toBe("3");
    });

    /*
    , 0 characters.
    , 0 characters.
    , 10 characters.*/
    it ("Must return 0 for the site example {<>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<>}";
        expect(item.CalcPart2(input)).toBe("0");
    });

    it ("Must return 17 for the site example {<random characters>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<random characters>}";
        expect(item.CalcPart2(input)).toBe("17");
    });

    it ("Must return 3 for the site example {<<<<>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<<<<>}";
        expect(item.CalcPart2(input)).toBe("3");
    });
    
    it ("Must return 2 for the site example {<{!>}>,}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<{!>}>,}";
        expect(item.CalcPart2(input)).toBe("2");
    });

    it ("Must return 0 for the site example {<!!>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<!!>}";
        expect(item.CalcPart2(input)).toBe("0");
    });

    it ("Must return 0 for the site example {<!!!>>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<!!!>>}";
        expect(item.CalcPart2(input)).toBe("0");
    });

    it ("Must return 0 for the site example {<{o\"i!a,<{i<a>}",  ()=> {
        let item = new Puzzle9Calculator();
        let input = "{<{o\"i!a,<{i<a>}";
        expect(item.CalcPart2(input)).toBe("10");
    });

});
