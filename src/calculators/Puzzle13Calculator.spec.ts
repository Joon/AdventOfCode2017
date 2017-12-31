import Puzzle13Calculator, { Scanner, Firewall, Packet } from "./Puzzle13Calculator";


describe("Scanner", () => {
    it ("starts scanning at position 0",  () => {
        let scanner = new Scanner(0, 3);
        expect(scanner.currentScanPos).toBe(0);
    });

    it ("increases scan position on tick",  () => {
        let scanner = new Scanner(0, 3);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(1);
    });

    it ("scan back and forth on tick",  () => {
        let scanner = new Scanner(0, 3);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(1);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(2);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(1);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(0);
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(1);
    });

    it ("resets scan position to zero on tick at depth",  () => {
        let scanner = new Scanner(0, 3);
        scanner.Tick();
        scanner.Tick();
        scanner.Tick();
        scanner.Tick();
        expect(scanner.currentScanPos).toBe(0);        
    });

});

describe("Firewall",  () => {
    it ("ticks scanners on tick", () => {
        let fw = new Firewall();
        fw.scanners.push(new Scanner(0, 3));
        fw.scanners.push(new Scanner(3, 5));
        
        fw.Tick(0);

        expect(fw.scanners[0].currentScanPos).toBe(1);
        expect(fw.scanners[1].currentScanPos).toBe(1);
    });

    it("ticks packets on tick", () => {
        let fw = new Firewall();
        fw.scanners.push(new Scanner(0, 3));
        fw.scanners.push(new Scanner(3, 5));
        fw.totalScanDepth = 3;
        
        fw.packets.push(new Packet((p) => { return false;}, (p) => { }, -1));
        
        fw.Tick(0);

        expect(fw.packets[0].currentColumn).toBe(0);
    });
    it ("exhibits correct state at 10 picoseconds",() => {
        let calc = new Puzzle13Calculator();
        let input = `0: 3
1: 2
4: 4
6: 4`;
        let fw = calc.ParseInput(input);

        for(let i = 0; i < 10; i++) {
            fw.Tick(i);
        }

        fw.Tick(0);
    });
});

describe("Puzzle13Calculator", () => {
    it("must pass site puzzle part 1", () => {
        let calc = new Puzzle13Calculator();
        let input = `0: 3
1: 2
4: 4
6: 4`;
        calc.CalcPart1(input).then((output) => {expect(output).toBe("24");},
        (error) => {console.log("a herror happened");});
    });

    it("must pass site puzzle part 2", () => {
        let calc = new Puzzle13Calculator();
        
        let input = `0: 3
1: 2
4: 4
6: 4`;
        calc.CalcPart2(input).then((output) => { expect(output).toBe("10"); },
            (error) => {console.log("a herror happened");});
    });
});
