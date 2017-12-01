// place it within your src/ directory
import * as React from "react";
import Puzzle1Calculator from "../calculators/Puzzle1Calculator";
import Puzzle2Calculator from "../calculators/Puzzle2Calculator";

export interface PuzzleState {
    puzzleInput: string,
    puzzleOutput: string,
    puzzleOutputB: string,
    puzzleCalculator: IPuzzleCalculator
  }

class PuzzleCanvas extends React.Component<object, PuzzleState> {
        
    constructor(props: any, context: any) {
        super(props, context);
        var stateObj: PuzzleState;
        stateObj = { puzzleInput: "test", puzzleOutput: "anchor", puzzleOutputB: "boat", puzzleCalculator: null };
        this.state = stateObj;
    } 
    
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<div>
            <div>We're doing the AoC puzzles. 
            <div>
                <input type="radio" value="Puzzle1" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 1
                <input type="radio" value="Puzzle2" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 2
            </div>

            </div>                
            <div>Your puzzle input: <input type="text" onChange={ e => this.updateInputValue(e) }/></div>
            <div>Your puzzle output A: {this.state.puzzleOutput}</div>
            <div>Your puzzle output B: {this.state.puzzleOutputB}</div>
            </div>);
    }

    public selectPuzzle(event: React.ChangeEvent<HTMLInputElement> ): void {        
        let calc: IPuzzleCalculator = null;

        switch(event.target.value) {
            case "Puzzle1": calc = new Puzzle1Calculator(); break;
            case "Puzzle2": calc = new Puzzle2Calculator(); break;
            default: throw "Invalid puzzle number";
        }
                
        this.setState(
            {
                puzzleInput: this.state.puzzleInput,
                puzzleOutput: this.state.puzzleOutput, 
                puzzleOutputB: this.state.puzzleOutputB, 
                puzzleCalculator: calc
            });
    }

    public updateInputValue(event: React.ChangeEvent<HTMLInputElement>) : void {
        var calc = this.state.puzzleCalculator;
        var output = calc.CalcPart1(event.target.value);
        var outputB = calc.CalcPart2(event.target.value);
        this.setState({ puzzleInput: event.target.value, puzzleOutput: output, puzzleOutputB: outputB, puzzleCalculator: this.state.puzzleCalculator });
    }

}

export default PuzzleCanvas;