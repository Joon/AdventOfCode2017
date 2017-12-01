class Puzzle1Calculator {

    public calcOutputA(input: string) : string
    {
        if (input.length == 0)
            return "";
        
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        let output: number = 0;
        var currentDigit = input.charAt(0);

        for(var i = 0; i < input.length; i++) {
            let digit : number = parseInt(input.charAt(i));
            let nextDigit: number = +input.charAt(i + 1 == input.length ? 0 : i + 1);
            if (digit == nextDigit)
                output += digit;
        }

        return output.toString();
    }

    public calcOutputB(input: string) : string
    {
        if (input.length == 0)
            return "";
        
        if (input.match("[0-9]*")[0].length != input.length)
            return "ERRNONUM";

        let output: number = 0;
        var currentDigit = input.charAt(0);
        let stepSize: number = input.length / 2;
        
        for(var i = 0; i < input.length; i++) {
            let digit : number = parseInt(input.charAt(i));
            let nextDigit: number = +input.charAt(i + stepSize >= input.length ? i + stepSize - input.length : i + stepSize);
            if (digit == nextDigit)
                output += digit;
        }

        return output.toString();
    }

}

export default Puzzle1Calculator;