import Puzzle19Calculator from "./Puzzle19Calculator";


describe("Puzzle19Calculator", () => {    
    it("Processes site input correctly", () => {
        let item = new Puzzle19Calculator();
        let input = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `;

        let output = item.CalcPart1(input);
        
        expect(output).toBe("ABCDEF");
    })
});