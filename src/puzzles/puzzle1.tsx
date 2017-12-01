// place it within your src/ directory
import * as React from "react";
import Puzzle1Calculator from "../calculators/Puzzle1Calculator";

export interface PuzzleState {
    puzzleInput: string,
    puzzleOutput: string,
    puzzleOutputB: string
  }

class Puzzle1 extends React.Component<object, PuzzleState> {
    
    constructor(props: any, context: any) {
        super(props, context);
        var stateObj: PuzzleState;
        stateObj = { puzzleInput: "test", puzzleOutput: "anchor", puzzleOutputB: "boat" };
        this.state = stateObj;
    } 
    
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<div>
            <div>We're doing the first AoC puzzle. Your puzzle input: <input type="text" onChange={ e => this.updateInputValue(e) }/></div>
            <div>Your puzzle output A: {this.state.puzzleOutput}</div>
            <div>Your puzzle output B: {this.state.puzzleOutputB}</div>
            </div>);
    }

    public updateInputValue(event: React.ChangeEvent<HTMLInputElement>) : void {
        var calc: Puzzle1Calculator = new Puzzle1Calculator();
        var output = calc.calcOutputA(event.target.value);
        var outputB = calc.calcOutputB(event.target.value);
        this.setState({ puzzleInput: event.target.value, puzzleOutput: output, puzzleOutputB: outputB });
    }

}

export default Puzzle1;