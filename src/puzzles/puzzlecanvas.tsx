// place it within your src/ directory
import * as React from "react";
import IPuzzleCalculator from "../calculators/IPuzzleCalculator";
import Puzzle1Calculator from "../calculators/Puzzle1Calculator";
import Puzzle2Calculator from "../calculators/Puzzle2Calculator";
import Puzzle3Calculator from "../calculators/Puzzle3Calculator";
import Puzzle4Calculator from "../calculators/Puzzle4Calculator";
import Puzzle5Calculator from "../calculators/Puzzle5Calculator";
import Puzzle6Calculator from "../calculators/Puzzle6Calculator";
import Puzzle7Calculator from "../calculators/Puzzle7Calculator";
import Puzzle8Calculator from "../calculators/Puzzle8Calculator";
import Puzzle9Calculator from "../calculators/Puzzle9Calculator";
import Puzzle10Calculator from "../calculators/Puzzle10Calculator";
import Puzzle11Calculator from "../calculators/Puzzle11Calculator";

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
                <input type="radio" value="Puzzle3" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 3
                <input type="radio" value="Puzzle4" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 4
                <input type="radio" value="Puzzle5" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 5
                <input type="radio" value="Puzzle6" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 6
                <input type="radio" value="Puzzle7" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 7
                <input type="radio" value="Puzzle8" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 8
                <input type="radio" value="Puzzle9" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 9
                <input type="radio" value="Puzzle10" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 10
                <input type="radio" value="Puzzle11" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 11
                </div>
            </div>                
            <div>Your puzzle input: <input className="dataIn" type="text" onChange={ e => this.updateInputValue(e) }/></div>
            <div>Multi-line input: <textarea className="dataIn" onChange={ e => this.updateInputValue(e) }></textarea></div>
            <div>Your puzzle output A: {this.state.puzzleOutput}</div>
            <div>Your puzzle output B: {this.state.puzzleOutputB}</div>
            </div>);
    }

    public selectPuzzle(event: React.ChangeEvent<HTMLInputElement> ): void {        
        let calc: IPuzzleCalculator = null;

        switch(event.target.value) {
            case "Puzzle1": calc = new Puzzle1Calculator(); break;
            case "Puzzle2": calc = new Puzzle2Calculator(); break;
            case "Puzzle3": calc = new Puzzle3Calculator(); break;
            case "Puzzle4": calc = new Puzzle4Calculator(); break;
            case "Puzzle5": calc = new Puzzle5Calculator(); break;
            case "Puzzle6": calc = new Puzzle6Calculator(); break;
            case "Puzzle7": calc = new Puzzle7Calculator(); break;
            case "Puzzle8": calc = new Puzzle8Calculator(); break;
            case "Puzzle9": calc = new Puzzle9Calculator(); break;
            case "Puzzle10": calc = new Puzzle10Calculator(); break;
            case "Puzzle11": calc = new Puzzle11Calculator(); break;
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

    public updateInputValue(event: React.ChangeEvent<any>) : void {
        var calc = this.state.puzzleCalculator;
        var output = calc.CalcPart1(event.target.value);
        var outputB = calc.CalcPart2(event.target.value);
        this.setState({ puzzleInput: event.target.value, puzzleOutput: output, puzzleOutputB: outputB, puzzleCalculator: this.state.puzzleCalculator });
    }

}

export default PuzzleCanvas;