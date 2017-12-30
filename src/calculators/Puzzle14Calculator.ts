import IPuzzleCalculator from "./IPuzzleCalculator";
import Puzzle10Calculator from "./Puzzle10Calculator";

export default class Puzzle14Calculator implements IPuzzleCalculator {
    
    CalcPart1(input: string): string {
        
        let hashCalc = new Puzzle10Calculator();

        let result = "";
        for (let count = 0; count < 128; count++) {
            let knotHash = hashCalc.CalcPart2(input + "-" + count.toString());

            for (let char of knotHash) {
                 result += ("00000000" + (parseInt(char, 16)).toString(2)).substr(-4);                 
            }
            result += "\n";
        }

        let oneCount = 0;
        for (let char of result) {
            if (char == "1") {
                oneCount++;
            }
        }   

        return oneCount.toString();
    }

    CalcPart2(input: string): string {
        if (input == "")
            return "";

        let hashCalc = new Puzzle10Calculator();

        let alreadyCountedCells: boolean[][] = new Array<Array<boolean>>();

        let regionMap: Array<string> = new Array<string>();
        for (let count = 0; count < 128; count++) {
            let knotHash = hashCalc.CalcPart2(input + "-" + count.toString());
            let rowString = "";
            for (let char of knotHash) {
                    rowString += ("00000000" + (parseInt(char, 16)).toString(2)).substr(-4);                 
            }
            regionMap.push(rowString);

            let rowUsedMap = new Array<boolean>();
            rowUsedMap.fill(false, 0, 127);            
            alreadyCountedCells.push(rowUsedMap);
        }

        let regionCount = 0;
        for(let y = 0; y < 128; y++) {
            for(let x = 0; x < 128; x++) {
                if (regionMap[y][x] == "1") {
                    if (!alreadyCountedCells[y][x]) {
                        regionCount++;
                        this.ExploreRegion(y,x,alreadyCountedCells, regionMap);
                    }
                }
            }
        }
    
        return regionCount.toString();
    }

    ExploreRegion(y: number, x: number, alreadyCountedCells: Array<Array<boolean>>, regionMap: Array<string>): any {
        if (alreadyCountedCells[y][x])
            return;
        if (regionMap[y][x] != "1")
            return;

        alreadyCountedCells[y][x] = true;
        // Look left
        if (x > 0)
            this.ExploreRegion(y, x - 1, alreadyCountedCells, regionMap);
        // look right
        if (x < regionMap[0].length - 1)
            this.ExploreRegion(y, x + 1, alreadyCountedCells, regionMap);
        // look up
        if (y > 0)
            this.ExploreRegion(y - 1, x, alreadyCountedCells, regionMap);
        //look down
        if (y < regionMap.length - 1)
            this.ExploreRegion(y + 1, x, alreadyCountedCells, regionMap);
    }
}