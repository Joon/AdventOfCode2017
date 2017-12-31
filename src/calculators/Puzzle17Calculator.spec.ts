import Puzzle17Calculator from "./Puzzle17Calculator";

describe("Puzzle17Calculator", () => {
    it("Passes site example", () => {

        let item = new Puzzle17Calculator();
        let result = item.CalcPart1("3");
        expect(result).toBe("638");
    })

});