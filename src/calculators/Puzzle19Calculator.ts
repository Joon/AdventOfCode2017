import IPuzzleCalculator from "./IPuzzleCalculator";

export enum Direction {
    Up,
    Down,
    Left,
    Right,
}

export class LandscapeNavigator {
    X: number;
    Y: number;
    MovedSteps: number;
    private MovingIn: Direction;
    private Landscape: PipeLandscape;
    public AccruedLetters: string[];    

    constructor(landscape: PipeLandscape) {
        this.Landscape = landscape; 
        this.MovingIn = Direction.Down;
        this.AccruedLetters = new Array<string>();
        this.MovedSteps = 0;
    }

    public IdentifyStart() {
        for(let i = 0; i < this.Landscape.LandscapeWidth(); i++) {
            if (this.Landscape.CharAt(0, i) == "|") {
                this.X = i;
                this.Y = 0;
                return;
            }
        }
        throw "Start not found!";
    }

    public MoveToEndOfLine(): boolean {
        let moving = true;
        let atEndOfPuzzle = false;
        let deltaX = 0;
        let deltaY = 0;
        switch(this.MovingIn) {
            case Direction.Down: 
                deltaY = 1;
                break;
            case Direction.Up:
                deltaY = -1;
                break;
            case Direction.Left:
                deltaX = -1;
                break;
            case Direction.Right: 
                deltaX = 1;
                break;
        }

        while (moving) {
            this.X += deltaX;
            this.Y += deltaY;
            this.MovedSteps++;
            
            let currentChar = this.Landscape.CharAt(this.Y, this.X);
            let currentCharCode = currentChar.charCodeAt(0);
            if (currentCharCode >= "A".charCodeAt(0) && currentCharCode <= "Z".charCodeAt(0))
                this.AccruedLetters.push(currentChar);

            // Got to bend in pipe
            if (currentChar == "+")
            {
                this.FigureOutTurnDirection();
                moving = false;
            } else if (this.Y + deltaY >= this.Landscape.LandscapeHeight() ||
                this.X + deltaX >= this.Landscape.LandscapeWidth() ||
                this.X + deltaX < 0 || this.Landscape.CharAt(this.Y + deltaY, this.X + deltaX) == " ") {
                moving = false;
                atEndOfPuzzle = true;
            }                
        }
        return atEndOfPuzzle;
    }

    IsNavigableChar(checkChar: string, navigationChar: string): boolean {
        let checkCharCode = checkChar.charCodeAt(0);
        if (checkChar == navigationChar || (checkCharCode >= "A".charCodeAt(0) && 
            checkCharCode <= "Z".charCodeAt(0)))
            return true;
        return false;
    }

    FigureOutTurnDirection() {
        if (this.IsNavigableChar(this.Landscape.CharAt(this.Y, this.X - 1), "-") && this.MovingIn != Direction.Right)
        {
            this.MovingIn = Direction.Left;
            return;
        }

        if (this.IsNavigableChar(this.Landscape.CharAt(this.Y, this.X + 1), "-") && this.MovingIn != Direction.Left)
        {
            this.MovingIn = Direction.Right;
            return;
        }

        if (this.IsNavigableChar(this.Landscape.CharAt(this.Y + 1, this.X), "|") && this.MovingIn != Direction.Up)
        {
            this.MovingIn = Direction.Down;
            return;
        }

        if (this.IsNavigableChar(this.Landscape.CharAt(this.Y - 1, this.X), "|") && this.MovingIn != Direction.Down)
        {
            this.MovingIn = Direction.Up;
            return;
        }

        throw "Could not figure out direction to move in!";
    }

}


export class PipeLandscape {

    private LandscapeLines: string[];

    constructor (lines: string) {
        this.LandscapeLines = new Array<string>();
        this.LandscapeLines.push(...lines.split(/\n/));
    }

    public CharAt(y: number, x: number) {
        if (y < 0 || y >= this.LandscapeHeight() || x < 0 || x >= this.LandscapeWidth())
            return "";
        return this.LandscapeLines[y].charAt(x);
    }

    public LandscapeHeight() : number {
        return this.LandscapeLines.length;
    }

    public LandscapeWidth(): number {
        return this.LandscapeLines[0].length;
    }

}


export default class Puzzle19Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        let navigator = this.NavigatePuzzle(input);
        return navigator.AccruedLetters.reduce((prev, current, index, arr) => { return prev + current;});
    }

    NavigatePuzzle(input: string): LandscapeNavigator {
        let landscape = new PipeLandscape(input);
        let navigator = new LandscapeNavigator(landscape);
        navigator.IdentifyStart();
        while(!navigator.MoveToEndOfLine()) {
            console.log("moved to: " + navigator.X + ":" + navigator.Y);
        }

        return navigator;
    }

    CalcPart2(input: string): string {
        let navigator = this.NavigatePuzzle(input);
        return (navigator.MovedSteps + 1).toString();
    }
    
}