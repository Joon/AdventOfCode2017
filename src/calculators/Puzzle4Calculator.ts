import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

class Puzzle4Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "0";
        
        let validCount = 0;
    
        var lines = input.split(/\n/);

        for (var line of lines)
        {
            let validLine = true;
            var words = line.split(/\s/);
            for (var i = 0; i < words.length; i++)
            {
                for (var j = 0; j < words.length; j++)
                {
                    if (i == j) continue;
                    if (words[i] == words[j])
                        validLine = false;
                }
            }
            if (validLine)
                validCount++;
        }
        return validCount.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
        return "0";

        let validCount = 0;
        
        var lines = input.split(/\n/);

        for (var line of lines)
        {
            let validLine = true;
            var words = line.split(/\s/);
            for (var i = 0; i < words.length; i++)
            {                
                let wordLetters: IHash = {};
                for(let c of words[i])
                {
                    if (isNaN(wordLetters[c]))
                        wordLetters[c] = 1;                            
                    else
                        wordLetters[c] = wordLetters[c] + 1;
                }

                for (var j = 0; j < words.length; j++)
                {
                    if (i == j) continue;

                    let word2Letters: IHash = {};
                    for(let c of words[j])
                    {
                        if (isNaN(word2Letters[c]))
                            word2Letters[c] = 1;                            
                        else
                            word2Letters[c] = word2Letters[c] + 1;
                    }                        
                    if (Object.keys(wordLetters).length == Object.keys(word2Letters).length)
                    {
                        let match = true;
                        Object.keys(wordLetters).forEach(element => {
                            if (wordLetters[element] != word2Letters[element])
                            {
                                match = false;
                            }
                        });
                        if (match)
                            validLine = false;
                    }
                }
            }
            if (validLine)
                validCount++;
        }
        return validCount.toString();
    }
}

export default Puzzle4Calculator;