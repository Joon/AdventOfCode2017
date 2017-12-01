
import * as React from "react";
import * as ReactDOM from "react-dom";
import Puzzle1 from "./puzzles/puzzle1";
import Hello from "./hello";


interface CompProps {
    AName: String,
    ANotherName: String
}

function SimpleComp(props: CompProps) {
  return <div>Haaaai {props.AName} {props.ANotherName}</div>;
}


ReactDOM.render(
    <div>
      <Puzzle1 />
    </div>,
    document.getElementById("root") as HTMLElement
  );