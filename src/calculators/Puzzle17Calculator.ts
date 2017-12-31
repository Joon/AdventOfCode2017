import IPuzzleCalculator from "./IPuzzleCalculator";


export default class Puzzle17Calculator implements IPuzzleCalculator {

    CalcPart1(input: string): string {
        let buffer = new Array<number>();
        let steps = +input;
        let currentIndex = 0;
        buffer.push(0);

        for(let i = 1; i <= 2017; i++) {
            let moveSteps = steps;
            if (steps > buffer.length)
                moveSteps = steps % buffer.length;
            currentIndex += moveSteps;
            if (currentIndex >= buffer.length)
                currentIndex = currentIndex - buffer.length;
            
            buffer.splice(currentIndex + 1, 0, i);
            currentIndex++;
            if (currentIndex >= buffer.length)
                currentIndex = 0;

        }       

        return buffer[currentIndex + 1].toString();        
    }

    CalcPart2(input: string): string {
        let steps = +input;
        let currentIndex = 0;
        let zeroIndex = 0;
        let numberAfterZero = null;
        let bufferLength = 1;

        for(let i = 1; i <= 50000000; i++) {
            let moveSteps = steps;
            if (steps > bufferLength)
                moveSteps = steps % bufferLength;
            currentIndex += moveSteps;
            if (currentIndex >= bufferLength)
                currentIndex = currentIndex - bufferLength;
            
            if (currentIndex == 0)
                numberAfterZero = i;    

            bufferLength++;
            
            currentIndex++;
            if (currentIndex >= bufferLength)
                currentIndex = 0;
        }       

        return numberAfterZero.toString();  
    }
    
}