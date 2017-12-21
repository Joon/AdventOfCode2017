import IPuzzleCalculator from "./IPuzzleCalculator";

class Puzzle2Calculator implements IPuzzleCalculator {

    public canvas: HTMLCanvasElement;
    
    CalcPart1(input: string): string {
        if (input.length == 0)
        return "";
    
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        var memorySpace = this.AllocateSquare(+input);
        memorySpace = this.FillSquareSequences(memorySpace, +input);

        let origin = this.offset - 1;
        let destX = 0;
        let destY = 0;

        for (var y = 0; y < this.squareSize; y++)
        {
            for (var x = 0; x < this.squareSize; x++)
            {
                if (memorySpace[y][x] == +input)
                {
                    destX = x;
                    destY = y;
                }
            }    
        }
        
        return (Math.abs(destY - origin) + Math.abs(destX - origin)).toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";
    
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        var memorySpace = this.AllocateSquare(+input);
        memorySpace = this.FillSquareSums(memorySpace, +input);
        
        let origin = this.offset - 1;
        let destX = 0;
        let destY = 0;
        let answerCandidate = 99999999999999999;
        for (var y = 0; y < this.squareSize; y++)
        {
            for (var x = 0; x < this.squareSize; x++)
            {
                if (memorySpace[y][x] > +input)
                {
                    answerCandidate = Math.min(answerCandidate, memorySpace[y][x]);
                }
            }    
        }
        
        return answerCandidate.toString();
    }

    private offset: number;
    private squareSize: number;

    FillSquareSequences(input: number[][], fillUpTo: number): number[][]
    {
        var result = input;

        let x = -1;
        let y = -1;
        let currentDelta = 1;
        let changingX = true;
        let currentValue = 0;
        let currentSeq = 0;
        while (currentValue < fillUpTo)
        {
            currentSeq++;
            
            for (var k = 1; k <= Math.abs(currentDelta); k++)
            {
                currentValue++;

                result[y + this.offset][x + this.offset] = currentValue;

                if (changingX)
                {
                    if (currentDelta > 0) {
                        x++;
                    } else {
                        x--;
                    }                    
                } else
                {
                    if (currentDelta > 0) {
                        y++;
                    } else {
                        y--;
                    }
                }
            }
            changingX = !changingX;
            if (currentSeq % 2 == 1)
            {
                currentDelta *= -1;
            } else
            {
                if (currentDelta > 0) {
                    currentDelta++;
                } else {
                    currentDelta--;
                }
            }
        }
        return result;
    }

    FillSquareSums(input: number[][], fillUpTo: number): number[][]
    {
        var result = input;

        let x = -1;
        let y = -1;
        let currentDelta = 1;
        let changingX = true;
        let currentValue = 0;
        let currentSeq = 0;
        while (currentValue <= fillUpTo)
        {
            currentSeq++;
            
            for (var k = 1; k <= Math.abs(currentDelta); k++)
            {
                let workY = y + this.offset;
                let workX = x + this.offset;

                currentValue = 0;
                if (workY > 0)
                {
                    currentValue += result[workY - 1][workX];
                    if (workX > 0){
                        currentValue += result[workY - 1][workX - 1];
                    }
                    if (workX < this.squareSize - 1)
                    {
                        currentValue += result[workY - 1][workX + 1];
                    }
                }
                if (workX > 0) {
                    currentValue += result[workY][workX - 1];
                }
                if (workX < this.squareSize - 1)
                {
                    currentValue += result[workY][workX + 1];
                }
                if (workY < this.squareSize - 1)
                {
                    currentValue += result[workY + 1][workX];
                    if (workX > 0)
                    {
                        currentValue += result[workY + 1][workX - 1];
                    }
                    if (workX < this.squareSize - 1)
                    {
                        currentValue += result[workY + 1][workX + 1];
                    }
                }

                if (currentSeq == 1)
                    currentValue = 1;
                result[workY][workX] = currentValue;

                if (changingX)
                {
                    if (currentDelta > 0) {
                        x++;
                    } else {
                        x--;
                    }                    
                } else
                {
                    if (currentDelta > 0) {
                        y++;
                    } else {
                        y--;
                    }
                }
            }
            changingX = !changingX;
            if (currentSeq % 2 == 1)
            {
                currentDelta *= -1;
            } else
            {
                if (currentDelta > 0) {
                    currentDelta++;
                } else {
                    currentDelta--;
                }
            }
        }
        return result;
    }

    AllocateSquare(input:number): number[][]    
    {
        var result = [];
        var x: number = 0;
        var y: number = 0;
        var minx: number = 0;
        var miny: number = 0;
        var maxx: number = 0;
        var maxy: number = 0;
        var currentDelta: number = 1;
        var changingX = true;
                
        let currentValue = 0;
        let currentSeq = 0;
        this.offset = 0;
        while (currentValue < input)
        {
            currentSeq++;
            for (var k = 1; k <= Math.abs(currentDelta); k++)
            {
                if (changingX)
                {
                    if (currentDelta > 0) {
                        x++;
                    } else {
                        x--;
                    }
                    currentValue++;
                } else
                {
                    if (currentDelta > 0) {
                        y++;
                    } else {
                        y--;
                    }
                    currentValue++;
                }
            }
            changingX = !changingX;
            if (currentSeq % 2 == 1)
            {
                currentDelta *= -1;
            } else
            {
                if (currentDelta > 0) {
                    currentDelta++;
                } else {
                    currentDelta--;
                }
            }
            
            this.offset = Math.max(Math.abs(x), Math.abs(y), this.offset);
        }
        
        this.squareSize = this.offset * 2;
        
        for (var localy = 0; localy < this.squareSize; localy++)
        {
            let row: number[] = new Array<number>(this.squareSize);
            for (var i = 0; i < this.squareSize; i++) {
                row[i] = 0;
            }
            result.push(row);
        }

        return result;
    }
}

export default Puzzle2Calculator;