import IPuzzleCalculator from "./IPuzzleCalculator";
import { Direction } from "./Puzzle19Calculator";

export interface Coord {
    X: number;
    Y: number;
}

export class Grid {
   
    Lines: string[][];

    public Alternatives(): Grid[] {
        let result = new Array<Grid>();
        result.push(this);
        let rotated = this.Rotate();
        result.push(rotated);
        let rotated2 = rotated.Rotate();
        result.push(rotated2);
        let rotated3 = rotated2.Rotate();
        result.push(rotated3);
        let flipped = this.Flip();
        result.push(flipped);
        let flippedRotate = flipped.Rotate();
        result.push(flippedRotate);
        let flippedRotate2 = flippedRotate.Rotate();
        result.push(flippedRotate2);
        let flippedRotate3 = flippedRotate2.Rotate();
        result.push(flippedRotate3);
        return result;
    } 

    private CloneLines() {
        let result = new Array<string[]>();

        for(let line of this.Lines)
        {
            result.push(Array.from(line));
        }

        return result;
    }

    public Equals(other: Grid): boolean {
        if (other.Lines.length != this.Lines.length)
            return false;
        
        for (let y = 0; y < this.Lines.length; y++) {
            for(let x = 0; x < this.Lines[0].length; x++) {
                if (other.Lines[y][x] != this.Lines[y][x])
                    return false;
            }
        }

        return true;
    }

    public Flip() : Grid {
        let flippedLines = this.CloneLines();

        for(let i = 0; i < flippedLines.length; i++){
            let temp = flippedLines[i][0];
            flippedLines[i][0] = flippedLines[i][flippedLines[i].length - 1];
            flippedLines[i][flippedLines[i].length - 1] = temp;
        }

        return new Grid(flippedLines);
    }

    public LogStructure(): string {
        let result = "\n==================";
        for(let line of this.Lines) {
            result += "\n";
            result += line;
        }
        result += "\n==================";
        return result;
    }       

    public CountOn(): number {
        let onCount = 0;
        for(let line of this.Lines) {
            onCount += line.reduce<number>((val, curr, ux, arr) => {
                if (curr == "#")
                    return val + 1;
                else
                    return val;
            }, 0);
        }
        return onCount;
    }

    public Rotate() : Grid {
        if (this.Lines.length > 3)
            throw "cannot rotate... fewl!";
        
        let rotatedLines = new Array<string[]>();
        for (let y = this.Lines.length - 1; y >= 0; y--) {
            rotatedLines.push(new Array<string>());
        }


        for (let y = this.Lines.length - 1; y >= 0; y--) {
            for (let x = 0; x < this.Lines[0].length; x++) {
                rotatedLines[x].push(this.Lines[y][x]);
            }
        }

        return new Grid(rotatedLines);
    }

    public RotateByChar() : Grid {
        let rotatedLines = this.CloneLines();

        let x = -1;
        let y = 0;
        let keepOnTurning = true;
        let direction = Direction.Right;
        let keptChar = this.Lines[0][0];
        while(keepOnTurning) {            
            switch(direction) {
                case Direction.Right :
                    if (x == this.Lines[0].length - 1)
                        direction = Direction.Down;
                    break;
                case Direction.Left :
                    if (x == 0)
                        direction = Direction.Up;
                    break;
                case Direction.Down :
                    if (y == this.Lines.length - 1)
                        direction = Direction.Left;
                    break;
                case Direction.Up : 
                    if (y == 0)
                        direction = Direction.Right;
                    break;
            }

            switch(direction) {
                case Direction.Right : x++; break;
                case Direction.Left : x--; break;
                case Direction.Down : y++; break;
                case Direction.Up : y--; break;
            }

            let neighbour = this.RotatedNeighbor(x, y, direction);

            rotatedLines[y][x] = rotatedLines[neighbour.Y][neighbour.X];

            keepOnTurning = !((x == 0) && (y == 1));
        }
        rotatedLines[y][x] = keptChar;
        return new Grid(rotatedLines);
    }

    private RotatedNeighbor(x: number, y: number, direction: Direction): Coord  {
        let result = {X: x, Y: y};

        switch(direction) {
            case Direction.Right :
                if (x == this.Lines[0].length - 1) {
                    result.Y = y + 1;
                } else {
                    result.X = x + 1;
                }
                break;
            case Direction.Left :
                if (x == 0) {
                    result.Y = y - 1;
                } else {
                    result.X = x - 1;
                }                    
                break;
            case Direction.Down :
                if (y == this.Lines.length - 1) {
                    result.X = x - 1;
                } else {
                    result.Y = y + 1;
                }                    
                break;
            case Direction.Up : 
                if (y == 0) {
                    result.X = x + 1;
                } else {
                    result.Y = y - 1;
                }
                break;
        }

        return result;
    }

    SeperateGrids(): Grid[][] {
        let result = new Array<Grid[]>();
        let gridY = 0;
        let divisor = 0;
        if (this.Lines.length % 2 == 0)
            divisor = 2;
        else
            divisor = 3;
        for(let i = 0; i < this.Lines.length; i += divisor){
            if (result.length <= gridY) {
                result.push(new Array<Grid>());
            }
            for(let j = 0; j < this.Lines[0].length; j += divisor) {
                let gridLines = new Array<string[]>();
                for (let y = i; y < i + divisor; y++) {
                    let gridline = new Array<string>();
                    for(let x = j; x < j + divisor; x++) {
                        gridline.push(this.Lines[y][x]);
                    }
                    gridLines.push(gridline);
                }    
                let grid = new Grid(gridLines);
                result[gridY].push(grid);
            }

            gridY++;
        }

        return result;
    }

    constructor(lines: string[][]) {
        this.Lines = lines;
    }
}  

export class Translation {
    FromPatterns: Grid[];
    To: Grid;

    constructor(input: string) {
        let halves = input.split(" => ");
        let from = this.MakeGrid(halves[0]);
        this.FromPatterns = from.Alternatives();
        this.To = this.MakeGrid(halves[1]);
    }

    MakeGrid(input: string): Grid {
        let lines = input.split("/");
        let constructGrid = new Array<string[]>();
        for(let line of lines) {
            constructGrid.push(Array.from(line));
        }
        return new Grid(constructGrid);
    }

}

export default class Puzzle21Calculator implements IPuzzleCalculator {

    NumberIterations: number;

    constructor() {
        this.NumberIterations = 5;
    }

    CalcPart1(input: string): string {
        return this.CalcPixelsOn(input, this.NumberIterations);
    }

    CalcPixelsOn(input: string, nrIterations: number): string {
        let translations = this.ParseInput(input);
        let workingGrid = new Grid([[".","#","."],[".",".","#"],["#","#","#"]]);
        for (let i = 1; i <= nrIterations; i++) {
            let grids = workingGrid.SeperateGrids();
            let transformedGrids = new Array<Grid[]>();
            for (let gridY = 0; gridY < grids.length; gridY++){
                let transformedGridLine = new Array<Grid>();
                for(let gridX = 0; gridX < grids[0].length; gridX++){
                    transformedGridLine.push(this.TransformGrid(translations, 
                        grids[gridY][gridX]));
                }
                transformedGrids.push(transformedGridLine);
            }
            workingGrid = this.CombineGrids(transformedGrids);
        }
        return workingGrid.CountOn().toString();
    }

    CombineGrids(grids: Grid[][]): Grid {
        let lines = new Array<string[]>();
        let gridHeight = grids[0][0].Lines.length;

        for (let gridY = 0; gridY < grids.length; gridY++) {            
            for (let y = 0; y < gridHeight; y++) {
                let line = new Array<string>();
                for (let gridX = 0; gridX < grids[gridY].length; gridX++) {
                    line.push(...grids[gridY][gridX].Lines[y]);
                }
                lines.push(line);
            }
        }
        return new Grid(lines);
    }
    
    TransformGrid(translations: Translation[], grid: Grid): any {
        for (let translation of translations) {
            for(let candidate of translation.FromPatterns) {
                if (candidate.Equals(grid)) {
                    return translation.To;
                }                
            }
        }
        throw "Grid could not be resolved for transformation";
    }
    
    ParseInput(input: string) : Translation[] {
        let result = new Array<Translation>();
        let inputs = input.split(/\n/);
        let index = 0;
        for(let line of inputs) {
            let translation = new Translation(line);
            result.push(translation);
        }
        return result;
    }

    CalcPart2(input: string): string {
        return this.CalcPixelsOn(input, 18);
    }
    
}