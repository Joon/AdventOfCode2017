import Puzzle10Calculator from "./Puzzle10Calculator";

describe("Puzzle10Calculator", () => {
    it("Must return blank for blank input", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart1("")).toBe("");
    });

    it("Must return 12 for the site example input", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart1("3,4,1,5")).toBe("12");
    });

    it("Must return a2582a3a0e66e6e86e3812dcb672a272 for the site example input blank string in Part 2", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart2("")).toBe("a2582a3a0e66e6e86e3812dcb672a272");
    });

    it("Must return 33efeb34ea91902bb2f59c9920caa6cd for the site example input AoC 2017 in Part 2", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart2("AoC 2017")).toBe("33efeb34ea91902bb2f59c9920caa6cd");
    });

    it("Must return 3efbe78a8d82f29979031a4aa0b16a9d for the site example input 1,2,3 in Part 2", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart2("1,2,3")).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
    });

    it("Must return 63960835bcdc130f0b66d7ff4f6a5a8e for the site example input 1,2,4 in Part 2", () => {
        let item = new Puzzle10Calculator();
        expect(item.CalcPart2("1,2,4")).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
    });
});