import Puzzle16Calculator from "./Puzzle16Calculator";

describe("Puzzle15Calculator", () => {
    it("Spins 1 correctly", () => {

        let progs = new Array<string>();
        progs.push("a");
        progs.push("b");
        progs.push("c");
        progs.push("d");
        progs.push("e");
        let item = new Puzzle16Calculator();
        let result = item.Spin(progs, 1);
        expect(result[0]).toBe("e");
        expect(result[1]).toBe("a");
        expect(result[2]).toBe("b");
        expect(result[3]).toBe("c");
        expect(result[4]).toBe("d");
    })

    it("Spins 3 correctly", () => {

        let progs = new Array<string>();
        progs.push("a");
        progs.push("b");
        progs.push("c");
        progs.push("d");
        progs.push("e");
        let item = new Puzzle16Calculator();
        let result = item.Spin(progs, 3);
        expect(result[0]).toBe("c");
        expect(result[1]).toBe("d");
        expect(result[2]).toBe("e");
        expect(result[3]).toBe("a");
        expect(result[4]).toBe("b");
    })

    it("Spins full length correctly", () => {

        let progs = new Array<string>();
        progs.push("a");
        progs.push("b");
        progs.push("c");
        progs.push("d");
        progs.push("e");
        let item = new Puzzle16Calculator();
        let result = item.Spin(progs, 5);
        expect(result[0]).toBe("a");
        expect(result[1]).toBe("b");
        expect(result[2]).toBe("c");
        expect(result[3]).toBe("d");
        expect(result[4]).toBe("e");
    });

    it("Exchanges correctly", () => {
        let progs = new Array<string>();
        progs.push("a");
        progs.push("b");
        progs.push("c");
        progs.push("d");
        progs.push("e");
        let item = new Puzzle16Calculator();
        let result = item.Exchange(progs, 1, 2);
        expect(result[0]).toBe("a");
        expect(result[1]).toBe("c");
        expect(result[2]).toBe("b");
        expect(result[3]).toBe("d");
        expect(result[4]).toBe("e");
    })

    it("Partners correctly", () => {
        let progs = new Array<string>();
        progs.push("a");
        progs.push("b");
        progs.push("c");
        progs.push("d");
        progs.push("e");
        let item = new Puzzle16Calculator();
        let result = item.Partner(progs, "a", "e");
        expect(result[0]).toBe("e");
        expect(result[1]).toBe("b");
        expect(result[2]).toBe("c");
        expect(result[3]).toBe("d");
        expect(result[4]).toBe("a");
    })

    it("processes site test case correctly", () => {
        let item = new Puzzle16Calculator();
        item.SizeOverride = 4;
        let result = item.CalcPart1("s1,x3/4,pe/b");
        expect(result).toBe("baedc");
    }) 
    
    it("processes site test case correctly", () => {
        let item = new Puzzle16Calculator();
        item.SizeOverride = 4;
        let result = item.CalcPart2("s1,x3/4,pe/b");
        expect(result).toBe("abcde");
    })

});