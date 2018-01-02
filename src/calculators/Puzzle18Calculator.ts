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
    PlayedFreqs: number[];
    RecoveredFreqs: number[];

    constructor() {
        this.Buffers = new DuetBuffers();
        this.PlayedFreqs = new Array<number>();
        this.RecoveredFreqs = new Array<number>();
    }

    ProcessInstructions(instructions: string[], abortAtFirstReceive: boolean): string {
        let nextInstruction = 0;
        while(nextInstruction >= 0 && nextInstruction < instructions.length) {
            let instruction = instructions[nextInstruction];
            
            nextInstruction++;

            let instructionParts = instruction.split(" ");
            if (instructionParts[0] == "snd") {
                this.PlayedFreqs.push(this.Buffers.GetValue(instructionParts[1]));
            } else if (instructionParts[0] == "set") {
                this.Buffers.Set(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "add") {
                this.Buffers.Add(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "mul") {
                this.Buffers.Mul(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "mod") {
                this.Buffers.Mod(instructionParts[1], instructionParts[2]);
            } else if (instructionParts[0] == "rcv") {
                if (this.Buffers.GetValue(instructionParts[1]) != 0)
                {
                    this.RecoveredFreqs.push(this.PlayedFreqs[this.PlayedFreqs.length - 1]);
                    if (abortAtFirstReceive)
                        return this.RecoveredFreqs[0].toString();
                }
            } else if (instructionParts[0] == "jgz") {
                if (this.Buffers.GetValue(instructionParts[1]) != 0) {
                    nextInstruction--;
                    nextInstruction += this.Buffers.GetValue(instructionParts[2]);
                }
            } else {
                throw "Unknown instruction ?!?!";
            }

        }
        return "";
    }
}

export interface InstructionStatus {
    ProgramTerminated: boolean;
    ProgramLocked: boolean;
}

export class DuetProcessorV2 {
    Buffers: DuetBuffers;
    SentFreqs: number[];
    SendCount: number;
    Instructions: string[];
    NextInstruction: number;
    Partner: DuetProcessorV2;
    AbsolteInstructionsPerformed: number;

    constructor(instructions: string[], pBufferVal: number) {
        this.Buffers = new DuetBuffers();
        this.Buffers.Set("p", pBufferVal.toString());
        this.SentFreqs = new Array<number>();
        this.Instructions = instructions;
        this.NextInstruction = 0;
        this.SendCount = 0;
        this.AbsolteInstructionsPerformed = 0;
    }

    SetPartner(partner: DuetProcessorV2) {
        this.Partner = partner;
        partner.Partner = this;
    }

    ProcessInstruction(processName: string): InstructionStatus {
        this.AbsolteInstructionsPerformed ++;
        let result: InstructionStatus = {ProgramLocked: false, ProgramTerminated: false};

        let instruction = this.Instructions[this.NextInstruction];
        
        this.NextInstruction++;

        let instructionParts = instruction.split(" ");
        if (instructionParts[0] == "snd") {
            this.SentFreqs.push(this.Buffers.GetValue(instructionParts[1]));
            this.SendCount++;
        } else if (instructionParts[0] == "set") {
            this.Buffers.Set(instructionParts[1], instructionParts[2]);
        } else if (instructionParts[0] == "add") {
            this.Buffers.Add(instructionParts[1], instructionParts[2]);
        } else if (instructionParts[0] == "mul") {
            this.Buffers.Mul(instructionParts[1], instructionParts[2]);
        } else if (instructionParts[0] == "mod") {
            this.Buffers.Mod(instructionParts[1], instructionParts[2]);
        } else if (instructionParts[0] == "rcv") {
            if (this.Partner.SentFreqs.length > 0) {
                let received = this.Partner.SentFreqs.shift();
                this.Buffers.Set(instructionParts[1], received.toString());
            } else {                
                this.NextInstruction--;
                result.ProgramLocked = true;
            }
        } else if (instructionParts[0] == "jgz") {
            if (this.Buffers.GetValue(instructionParts[1]) > 0) {
                this.NextInstruction--;
                this.NextInstruction += this.Buffers.GetValue(instructionParts[2]);
            }
        } else {
            throw "Unknown instruction ?!?!";
        }
        
        result.ProgramTerminated = this.NextInstruction < 0 || this.NextInstruction >= this.Instructions.length;
        return result;
    }
}

export default class Puzzle18Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        let proccessor = new DuetProcessor();
        return proccessor.ProcessInstructions(input.split(/\n/), true);
    }

    CalcPart2(input: string): string {
        let continueProcessing = true;
        let processorA = new DuetProcessorV2(input.split(/\n/), 0);
        let processorB = new DuetProcessorV2(input.split(/\n/), 1);
        processorA.SetPartner(processorB);
        while(continueProcessing)
        {
            let statusA = processorA.ProcessInstruction("A");
            let statusB = processorB.ProcessInstruction("B");

            if (statusA.ProgramTerminated && statusB.ProgramTerminated)
                continueProcessing = false;
            if (statusA.ProgramLocked && statusB.ProgramLocked)
                continueProcessing = false;
            if (statusA.ProgramTerminated && statusB.ProgramLocked)
                continueProcessing = false;
            if (statusA.ProgramLocked && statusB.ProgramTerminated)
                continueProcessing = false;
        }
        return processorB.SendCount.toString();
    }
    
}