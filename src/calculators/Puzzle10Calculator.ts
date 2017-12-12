import IPuzzleCalculator from "./IPuzzleCalculator";

export default class Puzzle10Calculator implements IPuzzleCalculator
{
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";
        
        let numbers = this.InitializeArray(input.length > 10 ? 256 : 5);
        
        let currentPosition = 0;
        let skipSize = 0;
        for (let cmdSize of input.split(",")) {
            if (+cmdSize > numbers.length)
                continue;
            let reverseArr = numbers.slice(currentPosition, currentPosition + +cmdSize);
            if (reverseArr.length < +cmdSize) {
                let concatAdditional = numbers.slice(0, +cmdSize - reverseArr.length);
                reverseArr = reverseArr.concat(...concatAdditional);
            }           
            
            let replaceArr = reverseArr.reverse();
            let replacePos = currentPosition;
            for (let i = 0; i < replaceArr.length; i++) {               
                numbers[replacePos] = replaceArr[i];
                replacePos++;
                if (replacePos >= numbers.length)
                {
                    replacePos = 0;
                }
            }
            currentPosition = currentPosition + +cmdSize + skipSize;
            if (currentPosition >= numbers.length)
            {
                currentPosition -= numbers.length
            }
            skipSize++;
        }
        return (numbers[0] * numbers[1]).toString();
    }

    InitializeArray(length: number) : Array<number> {
        let result = new Array<number>();
        for(let i = 0; i < length; i++) {
            result.push(i);
        }
        return result;
    }

    ParseCharacterInput(input: string) : number[] {
        let result = new Array<number>();

        for(let c of input) {
            result.push(c.charCodeAt(0));
        }

        result.push(17, 31, 73, 47, 23);
        return result;
    }

    CalcPart2(input: string): string {
        let numbers = this.InitializeArray(256);
        let inputs = this.ParseCharacterInput(input);
        
        let currentPosition = 0;
        let skipSize = 0;

        for(let arbCount = 1; arbCount <= 64; arbCount++) {
            for (let cmdSize of inputs) {
                if (+cmdSize > numbers.length)
                    continue;
                let reverseArr = numbers.slice(currentPosition, currentPosition + +cmdSize);
                if (reverseArr.length < +cmdSize) {
                    let concatAdditional = numbers.slice(0, +cmdSize - reverseArr.length);
                    reverseArr = reverseArr.concat(...concatAdditional);
                }           
                
                let replaceArr = reverseArr.reverse();
                let replacePos = currentPosition;
                for (let i = 0; i < replaceArr.length; i++) {               
                    numbers[replacePos] = replaceArr[i];
                    replacePos++;
                    if (replacePos >= numbers.length)
                    {
                        replacePos = 0;
                    }
                }
                currentPosition = currentPosition + +cmdSize + skipSize;
                if (currentPosition >= numbers.length)
                {
                    currentPosition = currentPosition % numbers.length;
                }
                skipSize++;
            }
        }

        let denseHash = new Array<number>();

        for(let x = 0; x < 16; x++)
        {
            let wordStart = x * 16;
            let wordBit = numbers[wordStart];
            for (let y = 1; y < 16; y++) {
                wordBit ^= numbers[wordStart + y];
            }
            denseHash.push(wordBit);
        }

        let result = "";
        for(let i = 0; i < 16; i++)
        {
            let digit = denseHash[i].toString(16);
            if (digit.length == 1)
                result += "0" + digit;
            else
                result += digit;
        }

        return result;
    }

}