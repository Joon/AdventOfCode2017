import Puzzle21Calculator, { Grid, Translation } from "./Puzzle21Calculator";

describe("Grid", () => {
    it("rotates correctly", () => {
        let input = [["a","b","c"], ["d","e","f"], ["g","h","i"]];

        let item = new Grid(input);
        let rotated = item.Rotate().Lines;

        expect(rotated[0][0]).toBe('g');
        expect(rotated[0][1]).toBe('d');
        expect(rotated[0][2]).toBe('a');
        expect(rotated[1][0]).toBe('h');
        expect(rotated[1][1]).toBe('e');
        expect(rotated[1][2]).toBe('b');
        expect(rotated[2][0]).toBe('i');
        expect(rotated[2][1]).toBe('f');
        expect(rotated[2][2]).toBe('c');
    });

    it("generates alternatives", () => {
        let input = [["a","b","c"], ["d","e","f"], ["g","h","i"]];

        let item = new Grid(input);
        let alts = item.Alternatives();
        expect(alts.length).toBe(8);
    });

    it("flips correctly", () => {
        let input = [["a","b","c"], ["d","e","f"], ["g","h","i"]];

        let item = new Grid(input);
        let flipped = item.Flip().Lines;

        expect(flipped[0][0]).toBe('c');
        expect(flipped[0][1]).toBe('b');
        expect(flipped[0][2]).toBe('a');
        expect(flipped[1][0]).toBe('f');
        expect(flipped[1][1]).toBe('e');
        expect(flipped[1][2]).toBe('d');
        expect(flipped[2][0]).toBe('i');
        expect(flipped[2][1]).toBe('h');
        expect(flipped[2][2]).toBe('g');
    });

    it("flip doesn't affect source", () => {
        let input = [["a","b","c"], ["d","e","f"], ["g","h","i"]];

        let item = new Grid(input);
        let flipped = item.Flip();
        let toCheck = item.Lines;

        expect(toCheck[0][0]).toBe('a');
        expect(toCheck[0][1]).toBe('b');
        expect(toCheck[0][2]).toBe('c');
        expect(toCheck[1][0]).toBe('d');
        expect(toCheck[1][1]).toBe('e');
        expect(toCheck[1][2]).toBe('f');
        expect(toCheck[2][0]).toBe('g');
        expect(toCheck[2][1]).toBe('h');
        expect(toCheck[2][2]).toBe('i');
    });


    it("rotate doesn't affect source", () => {
        let input = [["a","b","c"], ["d","e","f"], ["g","h","i"]];

        let item = new Grid(input);
        let rotated = item.Rotate();
        let toCheck = item.Lines;

        expect(toCheck[0][0]).toBe('a');
        expect(toCheck[0][1]).toBe('b');
        expect(toCheck[0][2]).toBe('c');
        expect(toCheck[1][0]).toBe('d');
        expect(toCheck[1][1]).toBe('e');
        expect(toCheck[1][2]).toBe('f');
        expect(toCheck[2][0]).toBe('g');
        expect(toCheck[2][1]).toBe('h');
        expect(toCheck[2][2]).toBe('i');
    });

    it("Splits 2x grids correctly", () =>{
        let testGrid = new Grid([
            ['a', 'b', 'c', 'd'],
            ['e', 'f', 'g', 'h'],
            ['i', 'j', 'k', 'l'],
            ['m', 'n', 'o', 'p']
        ]);
        let splits = testGrid.SeperateGrids();
        expect(splits.length).toBe(2);

        expect(splits[0].length).toBe(2);
        expect(splits[1].length).toBe(2);
        expect(splits[0][0].Lines.length).toBe(2);
        expect(splits[1][1].Lines.length).toBe(2);

        expect(splits[0][0].Lines[0][0]).toBe('a');
        expect(splits[1][1].Lines[1][1]).toBe('p');
    });

    it("compares to a match", () =>{
        let gridA = new Grid([
            ['a', 'b'],
            ['g', 'h']]);
        let gridB = new Grid([
            ['a', 'b'],
            ['g', 'h']]);
        let result = gridA.Equals(gridB);
        expect(result).toBe(true);
    });
    
    it ("Counts enabled cells correctly", () => {
        let gridA = new Grid([
            ['.', '#'],
            ['#', '#']]);
        expect(gridA.CountOn()).toBe(3);
    });

    it("does not compare to a non-match", () =>{
        let gridA = new Grid([
            ['a', 'b'],
            ['g', 'x']]);
        let gridB = new Grid([
            ['a', 'b'],
            ['g', 'h']]);
        let result = gridA.Equals(gridB);
        expect(result).toBe(false);
    });

});


describe("Translation", () => {
    it("creates correctly", () => {
        let item = new Translation("../.# => ##./#../...");
        expect(item.FromPatterns.length).toBe(8);
        expect(item.To.Lines.length).toBe(3);
        expect(item.To.Lines[2][2]).toBe(".");
    });
});

describe("Puzzle21Calculator", () => {
    it("combines grids", () => {
        let gridA = new Grid([
            ['a', 'b'],
            ['e', 'f']]);
        let gridB = new Grid([
            ['c', 'd'],
            ['g', 'h']]);
        let gridC = new Grid([
            ['i', 'j'],
            ['m', 'n']]);
        let gridD = new Grid([
            ['k', 'l'],
            ['o', 'p']]);
        let grids = new Array<Grid[]>();
        let row1 = new Array<Grid>();
        row1.push(gridA, gridB);
        let row2 = new Array<Grid>();
        row2.push(gridC, gridD);
        grids.push(row1, row2);

        let item = new Puzzle21Calculator();
        let grr = item.CombineGrids(grids);
        expect(grr.Lines.length).toBe(4);
        expect(grr.Lines[0].length).toBe(4);
        expect(grr.Lines[0][0]).toBe('a');
        expect(grr.Lines[3][3]).toBe('p');
    });

    it("succeeds with site input", () => {
        let input = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;
        let item = new Puzzle21Calculator();
        item.NumberIterations = 2;
        let grr = item.CalcPart1(input);
        expect(grr).toBe('12');
    });

    it ("succeeds with real input", () => {
        let input = `../.. => .#./###/##.
#./.. => ..#/.#./#.#
##/.. => ###/#../...
.#/#. => .#./..#/##.
##/#. => ..#/#.#/###
##/## => .##/.##/.#.
.../.../... => #.#./..##/##../###.
#../.../... => .###/.##./.##./....
.#./.../... => ####/..../..../.#.#
##./.../... => #.../#..#/#.../###.
#.#/.../... => ..##/###./..#./.#..
###/.../... => #.../#.#./..#./#.#.
.#./#../... => #.#./..#./.#../...#
##./#../... => ###./.###/#.##/.#..
..#/#../... => .##./.##./####/####
#.#/#../... => ..##/.#.#/##../#.##
.##/#../... => ...#/..##/...#/#...
###/#../... => ..../##.#/..#./###.
.../.#./... => ###./..##/#..#/#.#.
#../.#./... => #..#/..#./#.##/#..#
.#./.#./... => ##.#/..../...#/....
##./.#./... => #.#./.##./.###/####
#.#/.#./... => ####/.##./.#../##.#
###/.#./... => #.##/..../.#.#/.##.
.#./##./... => ##.#/#.##/#.##/..##
##./##./... => .###/..../#.../..#.
..#/##./... => ..../.#../..#./##..
#.#/##./... => #.##/##../..##/.#.#
.##/##./... => ..../..#./#..#/....
###/##./... => #..#/#.##/##.#/..##
.../#.#/... => ..../#.#./.##./.#.#
#../#.#/... => .###/.#.#/#.#./..#.
.#./#.#/... => ####/#.../.#../.##.
##./#.#/... => ..##/..#./.#.#/#.#.
#.#/#.#/... => #.##/##../##../#..#
###/#.#/... => .###/.##./.##./.#.#
.../###/... => ##.#/..##/...#/..##
#../###/... => ..##/####/..#./.###
.#./###/... => #.##/#.##/.##./..##
##./###/... => #.../.#.#/####/..##
#.#/###/... => #.../.###/..../.###
###/###/... => .##./####/##../..#.
..#/.../#.. => #..#/.###/.#.#/##.#
#.#/.../#.. => ###./.##./.##./##..
.##/.../#.. => .###/.#../...#/.#.#
###/.../#.. => ###./..##/..##/.#.#
.##/#../#.. => ##.#/...#/####/#.##
###/#../#.. => .#.#/...#/.###/#..#
..#/.#./#.. => #.#./.###/##../#...
#.#/.#./#.. => ####/..#./.###/##..
.##/.#./#.. => #.#./##../..../#.#.
###/.#./#.. => .#.#/#.#./#.../#.#.
.##/##./#.. => ##../.#../...#/..#.
###/##./#.. => ##../#.../.###/..#.
#../..#/#.. => ##../####/##.#/#.##
.#./..#/#.. => #..#/..../..#./#...
##./..#/#.. => ..#./..##/#.##/#.##
#.#/..#/#.. => #.##/..#./.#.#/.#..
.##/..#/#.. => ###./##../.#.#/##..
###/..#/#.. => #.#./.#.#/.#.#/#..#
#../#.#/#.. => #..#/.#.#/####/.#.#
.#./#.#/#.. => #.../#.##/#.../#.#.
##./#.#/#.. => .##./.#../.#.#/..#.
..#/#.#/#.. => ##.#/.###/#..#/#...
#.#/#.#/#.. => .#.#/.###/#..#/.#..
.##/#.#/#.. => ..#./####/.#../...#
###/#.#/#.. => .###/.#../.##./.#.#
#../.##/#.. => ..##/##.#/#.#./.###
.#./.##/#.. => ####/.##./..../.##.
##./.##/#.. => ...#/##../..##/..##
#.#/.##/#.. => .###/##.#/.###/..#.
.##/.##/#.. => ..#./##../..##/...#
###/.##/#.. => ###./.#.#/.###/.###
#../###/#.. => .##./##.#/##.#/..#.
.#./###/#.. => ...#/...#/##.#/#.##
##./###/#.. => .#../.#.#/.#.#/..#.
..#/###/#.. => ####/.#.#/..../##.#
#.#/###/#.. => ..../.###/.##./#.#.
.##/###/#.. => #.#./..##/.##./##..
###/###/#.. => .###/##.#/#.#./#.##
.#./#.#/.#. => ...#/###./..../####
##./#.#/.#. => ..../###./#.##/..##
#.#/#.#/.#. => #.../###./##.#/#...
###/#.#/.#. => #.../##../..#./..#.
.#./###/.#. => ###./..../.#.#/..#.
##./###/.#. => ##.#/..../.##./###.
#.#/###/.#. => #.##/##../...#/....
###/###/.#. => .##./####/##../.#..
#.#/..#/##. => .#.#/#.#./##.#/#.##
###/..#/##. => ####/##../..##/####
.##/#.#/##. => .#.#/#..#/####/##..
###/#.#/##. => #.##/.#../.###/.#..
#.#/.##/##. => ...#/.#.#/#.#./....
###/.##/##. => ..#./#.#./.###/###.
.##/###/##. => .###/.###/.##./.#..
###/###/##. => #.../#.../#.##/.#..
#.#/.../#.# => ..#./..../##../#.##
###/.../#.# => ..#./#.##/####/...#
###/#../#.# => #.../###./#.../...#
#.#/.#./#.# => ..##/#.##/.#.#/.#..
###/.#./#.# => #.../.#.#/#.#./##..
###/##./#.# => ##../.###/.#../...#
#.#/#.#/#.# => ..##/#.#./#.##/##..
###/#.#/#.# => .###/..##/..#./.###
#.#/###/#.# => ##.#/.###/..../.###
###/###/#.# => ##.#/#.##/##../..#.
###/#.#/### => ##../.#../#.#./##.#
###/###/### => .##./##../..#./.###`;
        let calc = new Puzzle21Calculator();
        calc.NumberIterations = 5;
        let result = calc.CalcPart1(input);
        expect(result).toBe("150");
    })

    it ("doesn't have overlapping input patterns", () => {
        let input = `../.. => .#./###/##.
#./.. => ..#/.#./#.#
##/.. => ###/#../...
.#/#. => .#./..#/##.
##/#. => ..#/#.#/###
##/## => .##/.##/.#.
.../.../... => #.#./..##/##../###.
#../.../... => .###/.##./.##./....
.#./.../... => ####/..../..../.#.#
##./.../... => #.../#..#/#.../###.
#.#/.../... => ..##/###./..#./.#..
###/.../... => #.../#.#./..#./#.#.
.#./#../... => #.#./..#./.#../...#
##./#../... => ###./.###/#.##/.#..
..#/#../... => .##./.##./####/####
#.#/#../... => ..##/.#.#/##../#.##
.##/#../... => ...#/..##/...#/#...
###/#../... => ..../##.#/..#./###.
.../.#./... => ###./..##/#..#/#.#.
#../.#./... => #..#/..#./#.##/#..#
.#./.#./... => ##.#/..../...#/....
##./.#./... => #.#./.##./.###/####
#.#/.#./... => ####/.##./.#../##.#
###/.#./... => #.##/..../.#.#/.##.
.#./##./... => ##.#/#.##/#.##/..##
##./##./... => .###/..../#.../..#.
..#/##./... => ..../.#../..#./##..
#.#/##./... => #.##/##../..##/.#.#
.##/##./... => ..../..#./#..#/....
###/##./... => #..#/#.##/##.#/..##
.../#.#/... => ..../#.#./.##./.#.#
#../#.#/... => .###/.#.#/#.#./..#.
.#./#.#/... => ####/#.../.#../.##.
##./#.#/... => ..##/..#./.#.#/#.#.
#.#/#.#/... => #.##/##../##../#..#
###/#.#/... => .###/.##./.##./.#.#
.../###/... => ##.#/..##/...#/..##
#../###/... => ..##/####/..#./.###
.#./###/... => #.##/#.##/.##./..##
##./###/... => #.../.#.#/####/..##
#.#/###/... => #.../.###/..../.###
###/###/... => .##./####/##../..#.
..#/.../#.. => #..#/.###/.#.#/##.#
#.#/.../#.. => ###./.##./.##./##..
.##/.../#.. => .###/.#../...#/.#.#
###/.../#.. => ###./..##/..##/.#.#
.##/#../#.. => ##.#/...#/####/#.##
###/#../#.. => .#.#/...#/.###/#..#
..#/.#./#.. => #.#./.###/##../#...
#.#/.#./#.. => ####/..#./.###/##..
.##/.#./#.. => #.#./##../..../#.#.
###/.#./#.. => .#.#/#.#./#.../#.#.
.##/##./#.. => ##../.#../...#/..#.
###/##./#.. => ##../#.../.###/..#.
#../..#/#.. => ##../####/##.#/#.##
.#./..#/#.. => #..#/..../..#./#...
##./..#/#.. => ..#./..##/#.##/#.##
#.#/..#/#.. => #.##/..#./.#.#/.#..
.##/..#/#.. => ###./##../.#.#/##..
###/..#/#.. => #.#./.#.#/.#.#/#..#
#../#.#/#.. => #..#/.#.#/####/.#.#
.#./#.#/#.. => #.../#.##/#.../#.#.
##./#.#/#.. => .##./.#../.#.#/..#.
..#/#.#/#.. => ##.#/.###/#..#/#...
#.#/#.#/#.. => .#.#/.###/#..#/.#..
.##/#.#/#.. => ..#./####/.#../...#
###/#.#/#.. => .###/.#../.##./.#.#
#../.##/#.. => ..##/##.#/#.#./.###
.#./.##/#.. => ####/.##./..../.##.
##./.##/#.. => ...#/##../..##/..##
#.#/.##/#.. => .###/##.#/.###/..#.
.##/.##/#.. => ..#./##../..##/...#
###/.##/#.. => ###./.#.#/.###/.###
#../###/#.. => .##./##.#/##.#/..#.
.#./###/#.. => ...#/...#/##.#/#.##
##./###/#.. => .#../.#.#/.#.#/..#.
..#/###/#.. => ####/.#.#/..../##.#
#.#/###/#.. => ..../.###/.##./#.#.
.##/###/#.. => #.#./..##/.##./##..
###/###/#.. => .###/##.#/#.#./#.##
.#./#.#/.#. => ...#/###./..../####
##./#.#/.#. => ..../###./#.##/..##
#.#/#.#/.#. => #.../###./##.#/#...
###/#.#/.#. => #.../##../..#./..#.
.#./###/.#. => ###./..../.#.#/..#.
##./###/.#. => ##.#/..../.##./###.
#.#/###/.#. => #.##/##../...#/....
###/###/.#. => .##./####/##../.#..
#.#/..#/##. => .#.#/#.#./##.#/#.##
###/..#/##. => ####/##../..##/####
.##/#.#/##. => .#.#/#..#/####/##..
###/#.#/##. => #.##/.#../.###/.#..
#.#/.##/##. => ...#/.#.#/#.#./....
###/.##/##. => ..#./#.#./.###/###.
.##/###/##. => .###/.###/.##./.#..
###/###/##. => #.../#.../#.##/.#..
#.#/.../#.# => ..#./..../##../#.##
###/.../#.# => ..#./#.##/####/...#
###/#../#.# => #.../###./#.../...#
#.#/.#./#.# => ..##/#.##/.#.#/.#..
###/.#./#.# => #.../.#.#/#.#./##..
###/##./#.# => ##../.###/.#../...#
#.#/#.#/#.# => ..##/#.#./#.##/##..
###/#.#/#.# => .###/..##/..#./.###
#.#/###/#.# => ##.#/.###/..../.###
###/###/#.# => ##.#/#.##/##../..#.
###/#.#/### => ##../.#../#.#./##.#
###/###/### => .##./##../..#./.###`;
        let calc = new Puzzle21Calculator();
        let translations = calc.ParseInput(input);
        for(let i = 0; i < translations.length; i++) {
            for (let j = 0; j < translations.length; j++) {
                if (i == j) continue;

                for(let pattern1 of translations[i].FromPatterns) {
                    for (let pattern2 of translations[j].FromPatterns) {
                        if (pattern1.Equals(pattern2))
                        {
                            throw "OVERLAPPING PATTERNS!!";
                        }
                    }
                }
            }
        }
    })


});