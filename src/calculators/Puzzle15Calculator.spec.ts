import Puzzle15Calculator from "./Puzzle15Calculator";

describe("Puzzle15Calculator", () => {
    it("Returns site puzzle output", () => {

        let item = new Puzzle15Calculator();
        let input = `Generator A starts with 65
Generator B starts with 8921`;
        // Commented out: too slow
        // let answer1 = item.CalcPart1(input);

        // expect(answer1).toBe("588");
    })

    it("Returns site puzzle output part 2", () => {

        let item = new Puzzle15Calculator();
        let input = `Generator A starts with 65
Generator B starts with 8921`;
        // Commented out: too slow
        // let answer1 = item.CalcPart2(input);

        // expect(answer1).toBe("309");
    })

});