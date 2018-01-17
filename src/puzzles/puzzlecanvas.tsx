// place it within your src/ directory
import * as React from "react";
import IPuzzleCalculator from "../calculators/IPuzzleCalculator";
import IDrawablePuzzleCalculator from "../calculators/IDrawablePuzzleCalculator";
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
import Puzzle12Calculator from "../calculators/Puzzle12Calculator";
import Puzzle13Calculator from "../calculators/Puzzle13Calculator";
import Puzzle14Calculator from "../calculators/Puzzle14Calculator";
import Puzzle15Calculator from "../calculators/Puzzle15Calculator";
import Puzzle16Calculator from "../calculators/Puzzle16Calculator";
import Puzzle17Calculator from "../calculators/Puzzle17Calculator";
import Puzzle18Calculator from "../calculators/Puzzle18Calculator";
import Puzzle19Calculator from "../calculators/Puzzle19Calculator";
import Puzzle20Calculator from "../calculators/Puzzle20Calculator";
import Puzzle21Calculator from "../calculators/Puzzle21Calculator";
import Puzzle22Calculator from "../calculators/Puzzle22Calculator";
import Puzzle23Calculator from "../calculators/Puzzle23Calculator";

export interface PuzzleState {
    puzzleInput: string,
    puzzleOutput: string,
    puzzleOutputB: string,
    puzzleCalculator: IPuzzleCalculator,
    drawablePuzzleCalcultor: IDrawablePuzzleCalculator;
  }

class PuzzleCanvas extends React.Component<object, PuzzleState> {
        
    constructor(props: any, context: any) {
        super(props, context);
        var stateObj: PuzzleState;
        stateObj = { puzzleInput: "test", puzzleOutput: "anchor", puzzleOutputB: "boat", puzzleCalculator: null, drawablePuzzleCalcultor: null };
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
                <input type="radio" value="Puzzle12" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 12
                <input type="radio" value="Puzzle13" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 13
                <input type="radio" value="Puzzle14" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 14
                <input type="radio" value="Puzzle15" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 15
                <input type="radio" value="Puzzle16" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 16
                <input type="radio" value="Puzzle17" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 17
                <input type="radio" value="Puzzle18" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 18
                <input type="radio" value="Puzzle19" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 19
                <input type="radio" value="Puzzle20" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 20
                <input type="radio" value="Puzzle21" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 21
                <input type="radio" value="Puzzle22" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 22
                <input type="radio" value="Puzzle23" name="puzzleType" onChange={ event => this.selectPuzzle(event) }/> Puzzle 23
                </div>
            </div>                
            <div>Your puzzle input: <input className="dataIn" type="text" onChange={ e => this.updateInputValue(e) }/></div>
            <div>Multi-line input: <textarea className="dataIn" onChange={ e => this.updateInputValue(e) }></textarea></div>
            <div>Your puzzle output A: {this.state.puzzleOutput}</div>
            <div>Your puzzle output B: {this.state.puzzleOutputB}</div>

            <canvas id="cnvRender" width="1000" height="1000"/>
            </div>);
    }

    public selectPuzzle(event: React.ChangeEvent<HTMLInputElement> ): void {        
        let calc: IPuzzleCalculator = null;
        let drawcalc: IDrawablePuzzleCalculator = null;

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
            case "Puzzle12": calc = new Puzzle12Calculator(); break;
            case "Puzzle13": drawcalc = new Puzzle13Calculator(); break;
            case "Puzzle14": calc = new Puzzle14Calculator(); break;
            case "Puzzle15": calc = new Puzzle15Calculator(); break;
            case "Puzzle16": calc = new Puzzle16Calculator(); break;
            case "Puzzle17": calc = new Puzzle17Calculator(); break;
            case "Puzzle18": calc = new Puzzle18Calculator(); break;
            case "Puzzle19": calc = new Puzzle19Calculator(); break;
            case "Puzzle20": calc = new Puzzle20Calculator(); break;
            case "Puzzle21": calc = new Puzzle21Calculator(); break;
            case "Puzzle22": drawcalc = new Puzzle22Calculator(); break;
            case "Puzzle23": calc = new Puzzle23Calculator(); break;
            default: throw "Invalid puzzle number";
        }
                
        this.setState(
            {
                puzzleInput: this.state.puzzleInput,
                puzzleOutput: this.state.puzzleOutput, 
                puzzleOutputB: this.state.puzzleOutputB, 
                puzzleCalculator: calc,
                drawablePuzzleCalcultor: drawcalc
            });
    }

    public updateInputValue(event: React.ChangeEvent<any>) : void {
        if (this.state.puzzleCalculator) {
            var calc = this.state.puzzleCalculator;        
            var output = calc.CalcPart1(event.target.value);
            var outputB = calc.CalcPart2(event.target.value);
            this.setState({ puzzleInput: event.target.value, puzzleOutput: output, puzzleOutputB: outputB, 
                puzzleCalculator: this.state.puzzleCalculator, drawablePuzzleCalcultor: this.state.drawablePuzzleCalcultor });
        } else
        if (this.state.drawablePuzzleCalcultor) {
            var dcalc = this.state.drawablePuzzleCalcultor;        
            dcalc.canvas = document.getElementById('cnvRender') as HTMLCanvasElement;
            dcalc.CalcPart1(event.target.value).then((output) => {
                this.setState({ puzzleInput: this.state.puzzleInput, puzzleOutput: output, puzzleOutputB: this.state.puzzleOutputB, 
                    puzzleCalculator: this.state.puzzleCalculator, drawablePuzzleCalcultor: this.state.drawablePuzzleCalcultor });
                });
            dcalc.CalcPart2(event.target.value).then((outputB) => {
                this.setState({ puzzleInput: this.state.puzzleInput, puzzleOutput: this.state.puzzleOutput, puzzleOutputB: outputB, 
                    puzzleCalculator: this.state.puzzleCalculator, drawablePuzzleCalcultor: this.state.drawablePuzzleCalcultor });
                });
        }
    }

}

export default PuzzleCanvas;