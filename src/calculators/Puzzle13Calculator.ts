import IDrawablePuzzleCalculator from "./IDrawablePuzzleCalculator";

export class Scanner {
    public scanColumn: number;
    public range: number;
    public currentScanPos: number;

    private scanDelta = 1;

    constructor(depth: number, width: number) {
        this.scanColumn = depth;
        this.range = width;
        this.currentScanPos = 0;
    }

    public Tick() {
        this.currentScanPos += this.scanDelta;
        if (this.currentScanPos > this.range - 1)
        {
            this.scanDelta = -1;
            this.currentScanPos = this.range - 2;
        }
        if (this.currentScanPos < 0) {
            this.scanDelta = 1;
            this.currentScanPos = 1;
        }
    }
}

declare type PacketHandler = (packet: Packet) => void;
declare type CaughtHandler = (packet: Packet, scanner: Scanner) => boolean;

export class Packet {
    startedAt: number;
    currentColumn: number;
    caughtAt: number;
    catchCallback: CaughtHandler;
    madeItCallback: PacketHandler;
    
    constructor(catchCallback: CaughtHandler, madeItCallback: PacketHandler, startedAt: number) {
        this.startedAt = startedAt;
        this.currentColumn = startedAt;
        this.caughtAt = -1;
        this.catchCallback = catchCallback;
        this.madeItCallback = madeItCallback;
    }

    public Tick() {
        this.currentColumn++;
    }

    public Caught(scan: Scanner): boolean{
        this.caughtAt = this.currentColumn;
        return this.catchCallback(this, scan);
    }

    public MadeIt(){
        this.madeItCallback(this);
    }
}

export class Firewall {
    scanners: Scanner[];
    packets: Packet[];
    totalScanDepth: number;

    constructor() {
        this.scanners = new Array<Scanner>();
        this.packets = new Array<Packet>();
        this.totalScanDepth = -1;
    }

    private drawctxt: any;

    public Render(canvas: any, stage: string) {
        if (canvas) {
            if (!this.drawctxt)
                this.drawctxt = canvas.getContext("2d");
            this.drawctxt.fillStyle = "white";
            this.drawctxt.fillRect(0, 0, 1000, 1000);
            this.drawctxt.fillStyle = "black";

            this.drawctxt.font = "18px Arial";
            this.drawctxt.fillText(stage, 3, 15);
        
            for (let scan of this.scanners) {
                let x = scan.scanColumn * 30;
                for (let i = 0; i < scan.range; i++) {
                    this.drawctxt.fillRect(x + 1, (i * 22) + 21, 28, 20);
                    if (i == scan.currentScanPos) {
                        this.drawctxt.beginPath();
                        this.drawctxt.lineWidth = 1;
                        this.drawctxt.strokeStyle = "red";
                        this.drawctxt.strokeRect(x, (i*22) + 20, 30, 21);
                    }
                }
            }

            for (let packet of this.packets) {
                this.drawctxt.font = "11px Arial";
                this.drawctxt.fillStyle = "orange";
                this.drawctxt.fillText(packet.startedAt.toString(), (packet.currentColumn * 30) + 3, 35);
            }
        }
    }

    public TickPackets() {
        this.packets.forEach((val, index, arr) => { val.Tick(); });
    }

    public TickScanners() {
        this.scanners.forEach((val, index, arr) => { val.Tick(); });
    }

    public CheckCollisions(clock: number) {
        for (let counter = this.packets.length - 1; counter >= 0; counter--)
        {
            let valu = this.packets[counter];
            let scan = this.scanners.filter(
                (scanner, index, arr) => { return scanner.scanColumn == valu.currentColumn})[0];
            
            if (scan) {
                if (scan.currentScanPos == 0)
                {
                    if (valu.Caught(scan))
                    {
                        this.packets.splice(counter, 1);
                    }    
                }
            }

            if (valu.currentColumn > this.totalScanDepth)
            {
                valu.MadeIt();
                this.packets.splice(this.packets.indexOf(valu), 1);
            }
        }

    }

    public Tick(clock: number) {

        this.TickPackets() ;
        this.CheckCollisions(clock);
        this.TickScanners();
        
    }

}

export default class Puzzle13Calculator implements IDrawablePuzzleCalculator {

    public canvas: HTMLCanvasElement;

    public logInfo = false;

    private log (message: string) {
        if (this.logInfo)
            console.log(message);
    }

    CalcPart1(input: string): Promise<string> {
        if (input == "")
            return new Promise((resolve) => { resolve(""); });
        
        let fw = this.ParseInput(input);

        if (this.logInfo)
            this.log("Total scan depth: " + fw.totalScanDepth);

        let processing = true;
        let clock = 0;
        let tripSeverity = 0;
        let packet = new Packet((pack, scan) => 
            {
                tripSeverity += scan.scanColumn * scan.range;
                this.log("Packet caught at position " + scan.scanColumn);
                return false;
            },
            (pack) => { 
                processing = false; 
                this.log("Packet is all the way through");
            }, -1);
        fw.packets.push(packet);
        while (processing) {
            fw.Tick(clock);
            this.log("picosecond: " + clock);
            if (fw.packets.length > 0) {
                this.log("Packets[0].depth: " + fw.packets[0].currentColumn);
            }
            fw.scanners.forEach((val, index, arr) => { this.log("Scanner at pos: " + val.scanColumn + " now in position: " + val.currentScanPos)});
            clock++;
        }

        return new Promise<string>( (resolve) => { resolve(tripSeverity.toString()); });
    }

    ParseInput(input: string): Firewall {
        let result = new Firewall();

        let inputs = input.split(/\n/);
        for (let input of inputs) {
            let halves = input.split(": ");
            let depth = +halves[0];
            let width = +halves[1];
            let scanner = new Scanner(depth, width);
            result.scanners.push(scanner);

            if (scanner.scanColumn > result.totalScanDepth)
                result.totalScanDepth = scanner.scanColumn;
        }

        return result;
    }

    async ProcessPuzzlePart2(input: string) : Promise<string> {
        return new Promise<string> ((solve) => {
            let fw = this.ParseInput(input);
            
            let processing = true;
            let clock = 0;
            let solveStart = 0;

            while (processing) {
                let packet = new Packet((pack, scan) => 
                    {
                        return true;
                    },
                    (pack) => { 
                        processing = false; 
                        solveStart = pack.startedAt;
                    }, -1);
                packet.startedAt = clock;
                fw.packets.push(packet);
                fw.TickPackets();
                fw.CheckCollisions(clock);
                fw.TickScanners();
                clock++;
            }                            
            solve(solveStart.toString());
        });
    }

    CalcPart2(input: string): Promise<string> {
        if (input == "")
            return new Promise((resolve) => { resolve(""); });
        return this.ProcessPuzzlePart2(input);
    }

}