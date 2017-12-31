import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

export class DuetBuffers {

    public Contents: IHash;

    constructor() {
        this.Contents = {};
        let idCode = "a".charCodeAt(0);
        for (let i = 0; i <= 15; i++) {
            this.Contents[String.fromCharCode(idCode + i)] = 0;
        }
        
    }

    public GetValue(valueIdentifier: string): number {
        let idCode = valueIdentifier.charCodeAt(0);
        let zeroCode = "0".charCodeAt(0);
        let nineCode = "9".charCodeAt(0);
        if (idCode >= zeroCode && idCode <= nineCode) {
            return +valueIdentifier;
        }

        return this.Contents[valueIdentifier];
    }

    public Set(x: string, y: string) {
        // set X Y sets register X to the value of Y
        this.Contents[x] = this.GetValue(y);
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

export class DuetProcessor {
    Buffers: DuetBuffers;

    constructor() {
        this.Buffers = new DuetBuffers();
    }

    ProcessInstructions(instructions: string[]) {
        for (let instruction of instructions) {
            let instructionParts = instruction.split(" ");
            if (instructionParts[0] == "add") {
                this.Buffers.Add(instructionParts[1], instructionParts[2]);
            }
        }
    }
}

export default class Puzzle18Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        return "";
    }
    CalcPart2(input: string): string {
        return "";
    }
    
}