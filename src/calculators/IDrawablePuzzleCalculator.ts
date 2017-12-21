interface IDrawablePuzzleCalculator
{
    canvas: HTMLCanvasElement;
    CalcPart1 (input: string): Promise<string>;
    CalcPart2 (input: string): Promise<string>;
}
export default IDrawablePuzzleCalculator;