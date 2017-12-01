class Puzzle2Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";
    
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        return "hi from P2a";
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";
    
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        return "hi from P2";
    }
}

export default Puzzle2Calculator;