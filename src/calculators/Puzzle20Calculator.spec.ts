import Puzzle20Calculator from "./Puzzle20Calculator";
import { Particle } from "./Puzzle20Calculator";

describe("Particle", () => {
    it("parses inputs on construction", () => {
        let p = new Particle("p=<2688,-678,-926>", "v=<383,-97,-136>", "a=<-28,6,9>", 0);
        expect(p.Position.Y).toBe(-678);

        expect(p.Acceleration.Y).toBe(6);
    });
});

describe("Puzzle20Calculator", () => {    
    it("Processes site input correctly", () => {
        let item = new Puzzle20Calculator();
        let input = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`;

        let output = item.CalcPart1(input);
        
        expect(output).toBe("0");
    })

    it ("Processes Puzzle2 sample input correctly", () => {
        let item = new Puzzle20Calculator();
        let input = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;
        let output = item.CalcPart2(input);
        expect(output).toBe("1");
    })
});