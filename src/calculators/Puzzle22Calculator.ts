import IPuzzleCalculator from "./IPuzzleCalculator";
import { Direction } from "./Puzzle19Calculator";
import IDrawablePuzzleCalculator from "./IDrawablePuzzleCalculator";

export enum CellStatus {
    Clean,
    Weakened,
    Infected,
    Flagged
}

export interface Cell {
    X: number;
    Y: number;
    Status: CellStatus;
}

export class InfectedCells {
    InfectedCells: Cell[];

    constructor() {
        this.InfectedCells = new Array<Cell>();
    }

    Clean(x: number, y: number) {
        let removeIndex = this.IndexOf(x, y);
        if (removeIndex >= 0)
            this.InfectedCells.splice(removeIndex, 1);       
    }

    SetStatus(x: number, y: number, status: CellStatus) {
        let index = this.IndexOf(x, y) ;
        let newCell = null;
        if (index >= 0)
            this.InfectedCells[index].Status = status;
        else {
            let newCell = {X: x, Y: y, Status: status};
            this.InfectedCells.push(newCell);
        }
    }

    IsInfected(x: number, y: number): boolean {
        return this.GetStatus(x, y) == CellStatus.Infected;
    }

    GetStatus(x: number, y: number): CellStatus {
        let index = this.IndexOf(x, y);
        if (index < 0)
            return CellStatus.Clean;
        else
            return this.InfectedCells[index].Status;        
    }

    ParseInfections(status: string){
        let statusLines = status.split(/\n/);
        let middleY = Math.trunc(statusLines.length / 2);
        let middleX = Math.trunc(statusLines[0].length / 2);
        
        for(let y = 0; y < statusLines.length; y++) {
            for(let x = 0; x < statusLines[0].length; x++) {
                let char = statusLines[y].charAt(x);
                if (char == "#") {
                    let infectedX = -1 * (middleX - x);
                    let infectedY = middleY - y;
                    this.SetStatus(infectedX, infectedY, CellStatus.Infected);
                }
            }
        }
    }

    private IndexOf(x: number, y: number): number {
        return this.InfectedCells.reduce((prevVal, currCell, ix, arr) => {
            if (currCell.X == x && currCell.Y == y)
                return ix;
            else
                return prevVal;
        }, -1);
    }

}


export class Navigator {
    MovingIn: Direction;
    CurrentX: number;
    CurrentY: number;
    Infections: InfectedCells;
    InfectionCount: number;
    
    constructor(infections: InfectedCells) {
        this.CurrentX = 0;
        this.CurrentY = 0;
        this.MovingIn = Direction.Up;
        this.Infections = infections;
        this.InfectionCount = 0; 
    }

    TurnLeft() {
        switch(this.MovingIn) {
            case Direction.Up: this.MovingIn = Direction.Left; break;
            case Direction.Left: this.MovingIn = Direction.Down; break;
            case Direction.Down: this.MovingIn = Direction.Right; break;
            case Direction.Right: this.MovingIn = Direction.Up; break;
        }
    }

    TurnRight() {
        switch(this.MovingIn) {
            case Direction.Up: this.MovingIn = Direction.Right; break;
            case Direction.Right: this.MovingIn = Direction.Down; break;
            case Direction.Down: this.MovingIn = Direction.Left; break;
            case Direction.Left: this.MovingIn = Direction.Up; break;
        }
    }

    TurnAround() {
        switch(this.MovingIn) {
            case Direction.Up: this.MovingIn = Direction.Down; break;
            case Direction.Right: this.MovingIn = Direction.Left; break;
            case Direction.Down: this.MovingIn = Direction.Up; break;
            case Direction.Left: this.MovingIn = Direction.Right; break;
        }
    }

    Move() {
        let deltaX = 0;
        let deltaY = 0;
        switch(this.MovingIn) {
            case Direction.Up: deltaY = 1; break;
            case Direction.Left: deltaX = -1; break;
            case Direction.Down: deltaY = -1; break;
            case Direction.Right: deltaX = 1; break;
        }

        this.CurrentX += deltaX;
        this.CurrentY += deltaY;
    }

    WorkPart1() {
        let onInfectedCell = this.Infections.IsInfected(this.CurrentX, this.CurrentY);
        if (onInfectedCell){
            this.TurnRight();
            this.Infections.Clean(this.CurrentX, this.CurrentY);
        } else {
            this.TurnLeft();
            this.Infections.SetStatus(this.CurrentX, this.CurrentY, CellStatus.Infected);
            this.InfectionCount++;
        }
        this.Move();
    }

    WorkPart2() {
        let status = this.Infections.GetStatus(this.CurrentX, this.CurrentY);
        switch(status) {
            case CellStatus.Clean: {
                this.TurnLeft();
                this.Infections.SetStatus(this.CurrentX, this.CurrentY, CellStatus.Weakened);
                break;
            }
            case CellStatus.Weakened: {
                this.Infections.SetStatus(this.CurrentX, this.CurrentY, CellStatus.Infected);
                this.InfectionCount++;
                break;
            }
            case CellStatus.Infected: {
                this.TurnRight();
                this.Infections.SetStatus(this.CurrentX, this.CurrentY, CellStatus.Flagged);
                break;
            }
            case CellStatus.Flagged: {
                this.TurnAround();
                this.Infections.Clean(this.CurrentX, this.CurrentY);
                break;
            }
        }
        this.Move();
    }

}

export default class Puzzle22Calculator implements IDrawablePuzzleCalculator {
    canvas: HTMLCanvasElement;

    NumberIterations: number;
    NumberIterationsPart2: number;

    constructor() {
        this.NumberIterations = 10000;
        this.NumberIterationsPart2 = 10000000;
    }

    CalcPart1(input: string): Promise<string> {
        if (input == "")
            return new Promise((resolve) => { resolve(""); });

        let infections = new InfectedCells();
        infections.ParseInfections(input);

        let nav = new Navigator(infections);
        for(let i = 1; i <= this.NumberIterations; i++) {
            nav.WorkPart1();
        }

        return new Promise<string>( (resolve) => { resolve(nav.InfectionCount.toString()); });
    }

    CalcPart2(input: string): Promise<string> {
        if (input == "")
            return new Promise((resolve) => { resolve(""); });

        let infections = new InfectedCells();
        infections.ParseInfections(input);

        return new Promise<string>( (resolve) => {
            let nav = new Navigator(infections);
            let i = 0;
            var drawctxt: CanvasRenderingContext2D;
            let worker = ()=>{
                let limit = i + 10000;
                while(i < limit && i < this.NumberIterationsPart2) {
                    i++;
                    nav.WorkPart2();                
                }
                if (!drawctxt)
                    drawctxt = this.canvas.getContext("2d");
                drawctxt.fillStyle = "white";
                drawctxt.fillRect(0, 0, 350, 75);
                drawctxt.fillStyle = "black";
                drawctxt.font = "18px Arial";
                drawctxt.fillText("Now processing iteration " + i.toString(), 3, 15);
                if (i >= this.NumberIterationsPart2) 
                    resolve(nav.InfectionCount.toString());
                else
                    window.setTimeout(worker, 10);
            };
            window.setTimeout(worker, 10);
        });
    }
}
