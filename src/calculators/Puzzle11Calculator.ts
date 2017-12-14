import IPuzzleCalculator from "./IPuzzleCalculator";

export class Cell {
    public X: number;
    public Y: number;
    public ConcentricSeq: number;
    public NorthEast: Cell;
    public North: Cell;
    public NorthWest: Cell;
    public SouthWest: Cell;
    public South: Cell;
    public SouthEast: Cell;

    constructor(x: number, y: number, circleNum: number, father: CellNavigator) {
        this.X = x;
        this.Y = y;
        this.ConcentricSeq = circleNum;
        this.North = father.FindCell(x, y - 2);
        this.South = father.FindCell(x, y + 2);
        this.SouthEast = father.FindCell(x - 1, y + 1);
        this.SouthWest = father.FindCell(x + 1, y + 1);
        this.NorthEast = father.FindCell(x - 1, y - 1);
        this.NorthWest = father.FindCell(x + 1, y - 1);        
    }

    public SetConverseCells() {
        if (this.North)
            this.North.South = this;
        if (this.South)
            this.South.North = this;
        if (this.SouthEast)
            this.SouthEast.NorthWest = this;
        if (this.SouthWest)
            this.SouthWest.NorthEast = this;
        if (this.NorthEast)
            this.NorthEast.SouthWest = this;
        if (this.NorthWest)
            this.NorthWest.SouthEast = this;
    }

    public Neighbours() : Array<Cell> {
        let result = new Array<Cell>();
        if (this.North != null)
            result.push(this.North);
        if (this.NorthEast != null)
            result.push(this.NorthEast);
        if (this.NorthWest != null)
            result.push(this.NorthWest);
        if (this.South != null)
            result.push(this.South);
        if (this.SouthEast != null)
            result.push(this.SouthEast);
        if (this.SouthWest != null)
            result.push(this.SouthWest);

        return result;
    }

    public Navigate(instruction: string) : Cell {
        switch(instruction) {
            case "ne": return this.NorthEast;
            case "n": return this.North;
            case "nw": return this.NorthWest;
            case "sw": return this.SouthWest;
            case "s": return this.South;
            case "se": return this.SouthEast;
        }
        throw "Unknown navigation instruction: " + instruction;
    }
}

export class CellNavigator {

    public Origin: Cell;
    public AllCells: Array<Cell>;

    constructor() {
        this.AllCells = new Array<Cell>();
        this.Origin = new Cell(0, 0, 0, this);
        this.AllCells.push(this.Origin);
    }

    public FindCell(x: number, y: number): Cell {

        let result = this.AllCells.filter((current, index, arr) => { return current.X == x && current.Y == y; });
        return result[0];

    }

    private AddCell(fromCell: Cell, instruction: String, circleNumber: number) { 
        let args = null;
        switch(instruction)
        {
            case "n": args = {x: 0, y: -2, name: "n"}; break;
            case "s": args = {x: 0, y: 2, name: "s"}; break;
            case "ne": args = {x: -1, y: -1, name: "ne"}; break;
            case "nw": args = {x: 1, y: -1, name: "nw"}; break;
            case "se": args = {x: -1, y: 1, name: "se"}; break;
            case "sw": args = {x: 1, y: 1, name: "sw"} ; break;
        }
        
        let candidate = null;
        switch(args.name) {
            case "n" : candidate = fromCell.North; break;
            case "s" : candidate = fromCell.South; break;
            case "ne": candidate = fromCell.NorthEast; break;
            case "nw": candidate = fromCell.NorthWest; break;
            case "se": candidate = fromCell.SouthEast; break;
            case "sw": candidate = fromCell.SouthWest; break;
        }

        if (candidate == null)
        {                
            candidate = new Cell(fromCell.X + args.x, fromCell.Y + args.y, circleNumber, this);
            if (candidate.Neighbours().filter((current, index, add) => { return current.ConcentricSeq == circleNumber - 1;}).length > 0)
            {
                switch(args.name) {
                    case "n" : fromCell.North = candidate; break;
                    case "s" : fromCell.South = candidate; break;
                    case "ne": fromCell.NorthEast = candidate; break;
                    case "nw": fromCell.NorthWest = candidate; break;
                    case "se": fromCell.SouthEast = candidate; break;
                    case "sw": fromCell.SouthWest = candidate; break;
                }
                this.AllCells.push(candidate);
                candidate.SetConverseCells();
            }
        }
        return candidate;
    }

        
    private AddRing(fromCell: Cell, skipCell: Cell, circleNumber: number) {
        // Check if processing has come back round to a cell that has already added concentric items       
        if (fromCell.Neighbours().length == 6)
        {
            return;
        }
        if (fromCell.ConcentricSeq < circleNumber - 1)
        {
            return;
        }

        for(let args of [ {x: 0, y: -2, name: "n"}, {x: 0, y: 2, name: "s"}, {x: -1, y: -1, name: "ne"}, {x: 1, y: -1, name: "nw"},
                {x: -1, y: 1, name: "se"}, {x: 1, y: 1, name: "sw"} ]) {
            let candidate = null;
            switch(args.name) {
                case "n" : candidate = fromCell.North; break;
                case "s" : candidate = fromCell.South; break;
                case "ne": candidate = fromCell.NorthEast; break;
                case "nw": candidate = fromCell.NorthWest; break;
                case "se": candidate = fromCell.SouthEast; break;
                case "sw": candidate = fromCell.SouthWest; break;
            }
            if (candidate == null)
            {                
                candidate = new Cell(fromCell.X + args.x, fromCell.Y + args.y, circleNumber, this);
                if (candidate.Neighbours().filter((current, index, add) => { return current.ConcentricSeq == circleNumber - 1;}).length > 0)
                {
                    switch(args.name) {
                        case "n" : fromCell.North = candidate; break;
                        case "s" : fromCell.South = candidate; break;
                        case "ne": fromCell.NorthEast = candidate; break;
                        case "nw": fromCell.NorthWest = candidate; break;
                        case "se": fromCell.SouthEast = candidate; break;
                        case "sw": fromCell.SouthWest = candidate; break;
                    }
                    this.AllCells.push(candidate);
                    candidate.SetConverseCells();
                    this.AddRing(candidate, fromCell, circleNumber);
                }
            }
        }
    }

    public Navigate(from: Cell, instruction: string) : Cell {

        if (from.Navigate(instruction) == null)
        {
            //this.AddRing(from, null, from.ConcentricSeq + 1);
            this.AddCell(from, instruction, from.ConcentricSeq + 1);
        }

        let result = from.Navigate(instruction);
        return result;
    }

    public LogCells() {

        let minX = this.AllCells.reduce((prev, current, index, arr) => { return current.X < prev ? current.X : prev; }, 0);
        let maxX = this.AllCells.reduce((prev, current, index, arr) => { return current.X > prev ? current.X : prev; }, 0);
        let minY = this.AllCells.reduce((prev, current, index, arr) => { return current.Y < prev ? current.Y : prev; }, 0);
        let maxY = this.AllCells.reduce((prev, current, index, arr) => { return current.Y > prev ? current.Y : prev; }, 0);
        
        for (let y = minY; y <= maxY; y++) {
            let line = "";

            for (let x = minX; x <= maxX; x++) {          
                let nodes = this.AllCells.filter((current, index, arr) => { return current.X == x && current.Y == y});
                if (nodes.length > 1)
                    throw "multiple duplicate nodes!?!";
                if (nodes.length > 0)
                    line += " " + nodes[0].ConcentricSeq + " ";
                else
                    line += " . ";
            }
        }                                    
    }

}


export default class Puzzle11Calculator implements IPuzzleCalculator
{
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";     
        
        let nav = new CellNavigator();
        let currentCell = nav.Origin;
        for(let instruction of input.split(",")) {
            currentCell = nav.Navigate(currentCell, instruction);
        }

        let stepCount = this.NavigateHome(currentCell, nav);
        return stepCount.toString();
    }

    NavigateHome(originCell: Cell, nav: CellNavigator): number {
        let stepCount = 0
        let currentCell = {X: originCell.X, Y: originCell.Y};
        
        while ((currentCell.X != 0) || (currentCell.Y != 0))
        {
            if (currentCell.X == 0)
            {
                if (currentCell.Y > 0)
                    currentCell.Y = currentCell.Y - 2;
                else if (currentCell.Y < 0)
                    currentCell.Y = currentCell.Y + 2;
            }
            if (currentCell.X > 0 && currentCell.Y > 0) {
                currentCell.X = currentCell.X - 1;
                currentCell.Y = currentCell.Y - 1;
            }
            if (currentCell.X < 0 && currentCell.Y < 0) {
                currentCell.X = currentCell.X + 1;
                currentCell.Y = currentCell.Y + 1;
            }
            if (currentCell.X > 0 && currentCell.Y < 0) {
                currentCell.X = currentCell.X - 1;
                currentCell.Y = currentCell.Y + 1;
            }
            if (currentCell.X < 0 && currentCell.Y > 0) {
                currentCell.X = currentCell.X + 1;
                currentCell.Y = currentCell.Y - 1;
            }
            stepCount++;
        }
        return stepCount;
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";     
        
        let nav = new CellNavigator();
        let currentCell = nav.Origin;
        let highestTrackBack = 0;
        let furthestCell = currentCell;
        for(let instruction of input.split(",")) {
            currentCell = nav.Navigate(currentCell, instruction);            
            if ((Math.abs(currentCell.X) + Math.abs(currentCell.Y)) > (Math.abs(furthestCell.X) + Math.abs(furthestCell.Y)))
                furthestCell = currentCell;
        }
        return this.NavigateHome(furthestCell, nav).toString();
    }

}