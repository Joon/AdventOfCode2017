import IPuzzleCalculator from "./IPuzzleCalculator";


class Generator {
    private LastResult: number;
    private MagicNumber: number;
    private Divisor: number;

    constructor(lastResult: number, isGenA: boolean, divisor: number = 1) {
        this.LastResult = lastResult;
        this.MagicNumber = isGenA ? 16807 : 48271;
        this.Divisor = divisor;
    }

    public Calc(): number {        
        let result = (this.LastResult * this.MagicNumber) % 2147483647;
        
        this.LastResult = result;
        if (result % this.Divisor == 0)
            return result;
        else
            return null;
    }
}

export default class Puzzle15Calculator implements IPuzzleCalculator {
   
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        let inputs = input.split(/\n/);
        console.log(inputs[0]);
        let genAStart = +inputs[0].split(" ")[4];
        let genBStart = +inputs[1].split(" ")[4];

        let generatorA = new Generator(genAStart, true);
        let generatorB = new Generator(genBStart, false);

        let matchCount = 0;
        let start = 0;
        
        for(let i = start; i <= 40000000; i++) {
            let partA = generatorA.Calc();
            let partB = generatorB.Calc();
            if ((partA & 0xFFFF) == (partB & 0xFFFF)) {
                matchCount++;
            }            
        }

        return matchCount.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";

        let inputs = input.split(/\n/);
        console.log(inputs[0]);
        let genAStart = +inputs[0].split(" ")[4];
        let genBStart = +inputs[1].split(" ")[4];

        let generatorA = new Generator(genAStart, true, 4);
        let generatorB = new Generator(genBStart, false, 8);
        let matchCount = 0;
        let checkedCount = 0;
        let checkAStack = new Array<number>();
        let checkBStack = new Array<number>();
        let start = 0;
        let totalChecked = 0;

        while(checkedCount <= 5000000) {
            let partA = null;
            while(!partA) partA = generatorA.Calc();
            
            let partB = null;
            while(!partB) partB = generatorB.Calc();
            checkedCount++;

            if ((partA & 0xFFFF) == (partB & 0xFFFF)) {
                matchCount++;
            }            
        }

        return matchCount.toString();
    }
    
}