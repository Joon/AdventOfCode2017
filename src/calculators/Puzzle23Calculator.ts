import IHash from "./IHash";
import IPuzzleCalculator from "./IPuzzleCalculator";




export class PuzzleBuffers {

    public Contents: IHash;

    constructor() {
        this.Contents = {};
        let idCode = "a".charCodeAt(0);
        for (let i = 0; i <= 7; i++) {
            this.Contents[String.fromCharCode(idCode + i)] = 0;
        }        
    }

    public GetValue(valueIdentifier: string): number {
        let idCode = valueIdentifier.charCodeAt(0);
        let zeroCode = "0".charCodeAt(0);
        let nineCode = "9".charCodeAt(0);
        let negCode = "-".charCodeAt(0);
        if ((idCode == negCode) || (idCode >= zeroCode && idCode <= nineCode)) {
            return +valueIdentifier;
        }

        return this.Contents[valueIdentifier];
    }

    public Set(x: string, y: string) {
        // set X Y sets register X to the value of Y
        this.Contents[x] = this.GetValue(y);
    }

    public Subtract(x: string, y: string) {
        // set X Y sets register X to the value of Y
        this.Contents[x] = this.Contents[x] - this.GetValue(y);
    }

    public Add(x: string, y: string) {
        // add X Y increases register X by the value of Y.
        this.Contents[x] = this.Contents[x] + this.GetValue(y);
    }

    public Mul(x: string, y: string) {
        // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
        this.Contents[x] = this.Contents[x] * this.GetValue(y);
    }

    public Mod(x: string, y: string) {
        //mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y 
        // (that is, it sets X to the result of X modulo Y).
        this.Contents[x] = this.Contents[x] % this.GetValue(y);
    }

}

export class PuzzleProcessor {
    Buffers: PuzzleBuffers;
    MultiplyCount: number;

    constructor() {
        this.Buffers = new PuzzleBuffers();
        this.MultiplyCount = 0;
    }

    ProcessInstructions(instructions: string[]): string {
        let nextInstruction = 0;
        while(nextInstruction >= 0 && nextInstruction < instructions.length) {
            let instruction = instructions[nextInstruction];
            
            nextInstruction++;

            let instructionParts = instruction.split(" ");
            if (instructionParts[0] == "set") {
                this.Buffers.Set(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "sub") {
                this.Buffers.Subtract(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "mul") {
                this.Buffers.Mul(instructionParts[1], instructionParts[2]);
                this.MultiplyCount++;
            } else if (instructionParts[0] == "jnz") {
                if (this.Buffers.GetValue(instructionParts[1]) != 0) {
                    nextInstruction--;
                    nextInstruction += this.Buffers.GetValue(instructionParts[2]);
                }
            } else {
                throw "Unknown instruction ?!?!";
            }

        }
        return this.MultiplyCount.toString();
    }
}

export default class Puzzle23Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        let proc = new PuzzleProcessor();
        return proc.ProcessInstructions(input.split(/\n/));        
    }

    CalcPart2(input: string): string {
        let notPrimeCount = 0;
        let lowerBound = 108100;
        let upperBound = lowerBound + 17000;
        for (let numberToCheck = 108100; numberToCheck <= upperBound; numberToCheck += 17){
            let isNotPrime = false;
            for (let factor = 2; factor <= Math.round(numberToCheck / 2); factor++) {
                isNotPrime = (numberToCheck % factor) == 0;
                if (isNotPrime) break;
            }
            if (isNotPrime)
                notPrimeCount++;
        }

        return notPrimeCount.toString();
    }

}
