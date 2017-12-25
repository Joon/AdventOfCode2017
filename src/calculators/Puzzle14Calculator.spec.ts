import Puzzle14Calculator from "./Puzzle14Calculator";

describe("Puzzle14Calculator", () => {
    it("Returns site puzzle output", () => {

        let item = new Puzzle14Calculator();

        let answer1 = item.CalcPart1("flqrgnkx");

        console.log(answer1);

        expect(answer1).toBe("8108");

    })

    it("Returns site puzzle region count for part 2", () => {

        let item = new Puzzle14Calculator();

        let answer1 = item.CalcPart2("flqrgnkx");

        console.log(answer1);

        expect(answer1).toBe("1242");

    })

});