import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

class Register 
{
    constructor(name: string) {
        this.name = name;
        this.value = 0;
        this.highestVal = 0;
    }

    public name: string;
    public value: number;
    public highestVal: number;
    
    SetValue(newVal: number) {
        this.value = newVal;
        if (newVal > this.highestVal)
            this.highestVal = newVal;
    }
}

interface IRegisterHash {
    [letter: string] : Register;
}

class Instruction
{
    constructor(line: string) {
        
        let words = line.split(/\s/);

        // b inc 5 if a > 1
        this.name = words[0];
        this.instruction = words[1];
        this.value = +words[2];
        this.conditionName = words[4];
        this.instructionCondition = words[5];
        this.conditionValue = +words[6];        
    }

    public name: string;
    public instruction: string;
    public value: number;
    public conditionName: string;
    public instructionCondition: string;
    public conditionValue: number;
}

export default class Puzzle8Calculator implements IPuzzleCalculator
{
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        return this.ProcessInstructions(input).currentHigestVal.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
        return "";
        
        return this.ProcessInstructions(input).highestEverVal.toString();
    }

    ProcessInstructions(input: string) : any {
        let instructions = this.ParseInstructions(input);

        let instructionNames = instructions.map((val, index, arr) => { return val.name});
        let conditionNames = instructions.map((val, index, arr) => { return val.conditionName});
        let allNames = instructionNames.concat(conditionNames);

        let uniqueNames = allNames.filter((value, index, self) => { 
            return self.indexOf(value) == index;
        });

        let allRegisters = uniqueNames.map((val, index, arr) => { return new Register(val) });
        let registers: IRegisterHash = {};
        allRegisters.forEach((item, index, arr) => { registers[item.name] = item; });

        for (let instruction of instructions) {
            let operateOn = registers[instruction.name];
            let checkVal = registers[instruction.conditionName];

            let applyInstruction = false;
            switch(instruction.instructionCondition) {
                case "<": applyInstruction = checkVal.value < instruction.conditionValue; break;
                case ">": applyInstruction = checkVal.value > instruction.conditionValue; break;
                case ">=": applyInstruction = checkVal.value >= instruction.conditionValue; break;
                case "<=": applyInstruction = checkVal.value <= instruction.conditionValue; break;
                case "!=": applyInstruction = checkVal.value != instruction.conditionValue; break;
                case "==": applyInstruction = checkVal.value == instruction.conditionValue; break;
                default: throw "wronnnnggg";
            }
            if (applyInstruction) {
                if (instruction.instruction == "inc")
                    operateOn.SetValue(operateOn.value + instruction.value);
                if (instruction.instruction == "dec")
                    operateOn.SetValue(operateOn.value - instruction.value);
            }
        }
        let result: any = {};
        result.highestEverVal = allRegisters.reduce((prevVal, item, index, arr) => { if (item.highestVal > prevVal) return item.highestVal; else return prevVal;  }, 0);  
        result.currentHigestVal = allRegisters.reduce((prevVal, item, index, arr) => { if (item.value > prevVal) return item.value; else return prevVal;  }, 0);
        return result;;
    }

    private highestVal: number;

    ParseInstructions(input: string): Instruction[]
    {
        let lines = input.split(/\n/);
        let result = lines.map((val, index, arr) => { return new Instruction(val) });
        return result;
    }

}