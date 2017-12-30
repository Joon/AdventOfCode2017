import IPuzzleCalculator from "./IPuzzleCalculator";

export default class Puzzle6Calculator implements IPuzzleCalculator
{

    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        let blocks: Array<number> = input.split(/\s/).map<number>((value, index, arr) => { return +value; });
        let alreadySeenConfigs: Array<string> = [];
        let continueProcessing = true;
        let processingCycles = 0;

        while (continueProcessing)
        {
            let currentConfig = this.EncodeBlockState(blocks);

            if (alreadySeenConfigs.filter((value, index, arr) => { return value == currentConfig}).length > 0)
            {
                continueProcessing = false;
            } else {
                alreadySeenConfigs.push(currentConfig);
                processingCycles++;
                let highValue = blocks.reduce((prev, val, index, arr) => { if (val > prev) return val; else return prev;});
                let workIndex = 0;
                for (let i = 0; i < blocks.length; i++)
                {
                    if (blocks[i] == highValue)
                    {
                        workIndex = i;
                        blocks[i] = 0;
                        break;
                    }
                }
                while (highValue > 0)
                {
                    workIndex++;
                    if (workIndex >= blocks.length)
                        workIndex = 0;
                    blocks[workIndex] ++;
                    highValue--;
                }
            }            
        }
        return processingCycles.toString();
    }

    EncodeBlockState(blocks: Array<number>): string {
        return blocks.reduce((previous, current, index, strings) => { return previous.toString() + " " + current.toString() }, "");       
    }
    
    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";

        let blocks: Array<number> = input.split(/\s/).map<number>((value, index, arr) => { return +value; });
        let alreadySeenConfigs: Array<string> = [];
        let continueProcessing = true;
        let processingCycles = 0;

        while (continueProcessing)
        {
            let currentConfig = this.EncodeBlockState(blocks);

            if (alreadySeenConfigs.filter((value, index, arr) => { return value == currentConfig}).length > 0)
            {
                continueProcessing = false;
                let found = false;
                processingCycles = alreadySeenConfigs.length - alreadySeenConfigs.reduce((prev, value, index, arr) => 
                    {
                        if (value == currentConfig)
                            return index;
                        else
                            return prev;
                    }, 0);
            } else {
                alreadySeenConfigs.push(currentConfig);
                processingCycles++;
                let highValue = blocks.reduce((prev, val, index, arr) => { if (val > prev) return val; else return prev;});
                let workIndex = 0;
                for (let i = 0; i < blocks.length; i++)
                {
                    if (blocks[i] == highValue)
                    {
                        workIndex = i;
                        blocks[i] = 0;
                        break;
                    }
                }
                while (highValue > 0)
                {
                    workIndex++;
                    if (workIndex >= blocks.length)
                        workIndex = 0;
                    blocks[workIndex] ++;
                    highValue--;
                }
            }            
        }
        return processingCycles.toString(); 
    }

}