import IPuzzleCalculator from "./IPuzzleCalculator";

class Puzzle2Calculator implements IPuzzleCalculator {

    public canvas: HTMLCanvasElement;
    
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        var result: number = 0;
        var numbers = this.ParseInput(input);
        
        for (var i = 0; i < numbers.length; i++)
        {
            let lineNumbers: number[] = numbers[i];
            
            let min : number = 999999;
            let max : number = 0;
            
            lineNumbers.map((value: number, index: number, array: number[]) => {
                if (value < min)
                    min = value;                    
                if (value > max)
                    max = value;                    
            });

            result += max - min;
        }
        return result.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";

        var result: number = 0;
        var numbers = this.ParseInput(input);
        
        for (var i = 0; i < numbers.length; i++)
        {
            let lineNumbers: number[] = numbers[i];
            for(var j = 0; j < lineNumbers.length; j++)
            {
                let currentNum = lineNumbers[j];
                for (var k = 0; k < lineNumbers.length; k++)
                {                    
                    if (k == j)
                        continue;
                    
                    let compareNum = lineNumbers[k];

                    if (currentNum % compareNum == 0)
                    {
                        result += (currentNum / compareNum);
                    }
                }
            }
        }
        return result.toString();
    }


    ParseInput(input:string): number[][]
    {
        let result: number[][] = [];

        let lines = input.split(/\n/);
        for (var lineCount = 0; lineCount < lines.length; lineCount++)
        {
            let line = lines[lineCount];

            let lineNumbers: number[] = [];
            let numbers = line.split("\t");
            for (var rowCount = 0; rowCount < numbers.length; rowCount++)
            {
                let num = numbers[rowCount];
                lineNumbers.push(+num);
            }
            result.push(lineNumbers);
        }

        return result;
    }
}

export default Puzzle2Calculator;