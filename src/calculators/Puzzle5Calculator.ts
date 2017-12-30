import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

class Puzzle5Calculator implements IPuzzleCalculator {
    
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        let lines = input.split(/\n/);
        let currentPosition = 0;
        let processCount = 0;
        while (currentPosition < lines.length)
        {
            processCount++;
            let instruction = lines[currentPosition];
            let actualInstruction: number = +instruction;
            lines[currentPosition] = (actualInstruction + 1).toString();
            currentPosition += actualInstruction;
        }
        return processCount.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
        return "";

        let lines = input.split(/\n/);
        let currentPosition = 0;
        let processCount = 0;
        while (currentPosition < lines.length && currentPosition >= 0)
        {
            processCount++;
            let instruction = lines[currentPosition];
            let actualInstruction: number = +instruction;            
            lines[currentPosition] = (actualInstruction + (actualInstruction >= 3 ? -1 : 1)).toString();
            currentPosition += actualInstruction;
        }
        
        return processCount.toString();
    }

}

export default Puzzle5Calculator;