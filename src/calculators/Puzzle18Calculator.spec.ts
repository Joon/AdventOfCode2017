import Puzzle18Calculator from "./Puzzle18Calculator";
import { DuetBuffers } from "./Puzzle18Calculator";

describe("DuetBuffers", () => {
    
    it("Initializes 16 buffers with zero on construction", () => {
        let item = new DuetBuffers();
        
        expect(item.Contents["a"]).toBe(0);
        expect(item.Contents["p"]).toBe(0);
    })

    it("Adds number to buffers with add instruction", () => {
        let item = new DuetBuffers();
        item.Add("a", "1");
        expect(item.Contents["a"]).toBe(1);
    })

    it("Adds buffer to buffers with add instruction", () => {
        let item = new DuetBuffers();
        item.Add("a", "1");
        item.Add("b", "1");
        item.Add("b", "a");        
        expect(item.Contents["b"]).toBe(2);
    })

    it("Sets number to buffers with set instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "19999");
        expect(item.Contents["a"]).toBe(19999);
    })

    it("Sets buffer to buffers with set instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "19999");
        item.Set("b", "a");
        expect(item.Contents["b"]).toBe(19999);
    })

    it("Multiplies buffer with number with mul instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "2");
        item.Mul("a", "2");
        expect(item.Contents["a"]).toBe(4);
    })

    it("Multiplies buffer with buffer with mul instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "2");
        item.Set("b", "2");
        item.Mul("a", "b");
        expect(item.Contents["a"]).toBe(4);
    })

    it("Modulises buffer with number with mod instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "9");
        item.Mod("a", "2");
        expect(item.Contents["a"]).toBe(1);
    })

    it("Modulises buffer with buffer with mod instruction", () => {
        let item = new DuetBuffers();
        item.Set("a", "9");
        item.Set("b", "2");
        item.Mod("a", "b");
        expect(item.Contents["a"]).toBe(1);
    })

});

describe("Puzzle18Calculator", () => {
    
    it("Processes site input correctly", () => {
        let item = new Puzzle18Calculator();
        let input = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

        let output = item.CalcPart1(input);
        
        expect(output).toBe("4");
    })

    it("Processes site example 2 correctly", () => {
        let item = new Puzzle18Calculator();
        let input = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

        let output = item.CalcPart2(input);
        
        expect(output).toBe("3");
    });

});