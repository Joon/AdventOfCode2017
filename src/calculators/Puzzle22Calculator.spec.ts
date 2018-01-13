import Puzzle22Calculator, { InfectedCells, CellStatus } from "./Puzzle22Calculator";



describe("InfectedCells", () => {

    it ("adds infected cell", () => {
        let item = new InfectedCells();
        item.SetStatus(12, -12, CellStatus.Infected);
        let isInfected = item.IsInfected(12, -12);
        expect(isInfected).toBe(true);
    });

    it ("removes infected cell", () => {
        let item = new InfectedCells();
        item.SetStatus(12, -12, CellStatus.Infected);
        item.Clean(12, -12);
        let isInfected = item.IsInfected(12, -12);
        expect(isInfected).toBe(false);
    });

    it ("parses infections", () => {
        let item = new InfectedCells();
        let input = `#.#.#..
.......
#######
#.#...#
...#...
.......
##.##.#`

        item.ParseInfections(input);

        expect(item.IsInfected(-3,3)).toBe(true);
        expect(item.IsInfected(-2,3)).toBe(false);
        expect(item.IsInfected(-1,3)).toBe(true);
        expect(item.IsInfected(0,3)).toBe(false);
        expect(item.IsInfected(1,3)).toBe(true);
        expect(item.IsInfected(2,3)).toBe(false);
        expect(item.IsInfected(3,3)).toBe(false);

        expect(item.IsInfected(-3,0)).toBe(true);
        expect(item.IsInfected(-2,0)).toBe(false);
        expect(item.IsInfected(-1,0)).toBe(true);
        expect(item.IsInfected(0,0)).toBe(false);
        expect(item.IsInfected(1,0)).toBe(false);
        expect(item.IsInfected(2,0)).toBe(false);
        expect(item.IsInfected(3,0)).toBe(true);

        expect(item.IsInfected(-3,-3)).toBe(true);
        expect(item.IsInfected(-2,-3)).toBe(true);
        expect(item.IsInfected(-1,-3)).toBe(false);
        expect(item.IsInfected(0,-3)).toBe(true);
        expect(item.IsInfected(1,-3)).toBe(true);
        expect(item.IsInfected(2,-3)).toBe(false);
        expect(item.IsInfected(3,-3)).toBe(true);
    });
})

describe("Puzzle22Calculator", () => {
    it("performs as per site test case over 7 iterations", () =>  {
        let calc = new Puzzle22Calculator();
        calc.NumberIterations = 7;
        let input = `..#
#..
...`;

        calc.CalcPart1(input).then((val)=> expect(val).toBe("5"));
    });

    it("performs as per site test case over 70 iterations", () =>  {
        let calc = new Puzzle22Calculator();
        calc.NumberIterations = 70;
        let input = `..#
#..
...`;

        let output = "";
        calc.CalcPart1(input).then((val)=> expect(val).toBe("41"));
    });

//     it("performs as per site test case over 10,000 iterations", () =>  {
//         let calc = new Puzzle22Calculator();
//         let input = `..#
// #..
// ...`;

//         let output = calc.CalcPart1(input);
//         expect(output).toBe("5587");
//     });

//     it("performs as per site test for part 2  over 100 iterations", () =>  {
//         let calc = new Puzzle22Calculator();
//         calc.NumberIterationsPart2 = 100;
//         let input = `..#
// #..
// ...`;

//         let output = "";
//         calc.CalcPart2(input).then((val)=> output = val);
//         expect(output).toBe("26");
//     });
})