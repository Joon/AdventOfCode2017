import IPuzzleCalculator from "./IPuzzleCalculator";

export default class Puzzle16Calculator implements IPuzzleCalculator {
    
    public SizeOverride: number;

    ApplyInstructions(progs: string[], inputs: string[]): string[] {
        for (let instruction of inputs) {
            if (instruction.startsWith("s"))
            {
                let cmdRegex = /s([0-9]*)/g;
                var match = cmdRegex.exec(instruction);
                progs = this.Spin(progs, +match[1]);
            } else if (instruction.startsWith("x"))
            {
                let cmdRegex = /x([0-9]*)\/([0-9]*)/g;
                var match = cmdRegex.exec(instruction);
                progs = this.Exchange(progs, +match[1], +match[2]);
            } else if (instruction.startsWith("p"))
            {
                let cmdRegex = /p([a-z]*)\/([a-z]*)/g;
                var match = cmdRegex.exec(instruction);
                progs = this.Partner(progs, match[1], match[2]);
            } else{
                throw "unknown instruction?!?!";
            }
        }
        return progs;
    }
   

    Spin(progs: string[], spinSize: number) : string[] {
        let result = new Array<string>();
        
        for(let i = progs.length - spinSize; i < progs.length; i++) {
            result.push(progs[i]);
        }
        
        for (let i = 0; i < progs.length - spinSize; i++) {
            result.push(progs[i]);
        }

        return result;
    }

    Exchange(progs: string[], x1: number, x2: number) : string[] {
        let temp = progs[x1];
        progs[x1] = progs[x2];
        progs[x2] = temp;
        return progs;
    }

    Partner(progs: string[], p1: string, p2: string) : string[] {
        let i = progs.indexOf(p1);
        let j = progs.indexOf(p2);
        return this.Exchange(progs, i, j);
    }

    InitPrograms(): string[] {
        let result = new Array<string>();

        let number = "a";

        let limit = this.SizeOverride ? this.SizeOverride : 15;
        for (let i = 0; i <= limit; i++) {
            result.push(String.fromCharCode("a".charCodeAt(0) + i));
        }        

        return result;
    }

    CalcPart1(input: string): string {
        let progs = this.InitPrograms();

        let inputs = input.split(",");

        progs = this.ApplyInstructions(progs, inputs);

        return progs.reduce((prev, current, ix, arr) => {
            if (prev)
                return prev + current;
            else
                return current;
        });
    }

    CalcPart2(input: string): string {
        let progs = this.InitPrograms();

        let inputs = input.split(",");

        let previousResults = new Array<string>();
        let lastOut = "np";

        while(previousResults.indexOf(lastOut) < 0){            
            if (lastOut != "np")
                previousResults.push(lastOut);

            progs = this.ApplyInstructions(progs, inputs);            
            lastOut = progs.reduce((prev, current, ix, arr) => {
                if (prev)
                    return prev + current;
                else
                    return current;
            });
        
        }
        
        let cycleLeftOver = (1000000000 % previousResults.length);
        return previousResults[(cycleLeftOver > 0 ? cycleLeftOver : previousResults.length) - 1];
    }
    
}