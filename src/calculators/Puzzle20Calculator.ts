import IPuzzleCalculator from "./IPuzzleCalculator";

export class Triplet {
    
    X: number;
    Y: number;
    Z: number;

    EqualsTo(otherTriplet: Triplet): boolean {
        return this.X == otherTriplet.X && this.Y == otherTriplet.Y && 
            this.Z == otherTriplet.Z;
    }

    constructor(toParse: string) {
        let xyzRegex = /<(-?[0-9]*),(-?[0-9]*),(-?[0-9]*)>/g;
        let matches = xyzRegex.exec(toParse);        
        this.X = +matches[1];
        this.Y = +matches[2];
        this.Z = +matches[3];
    }
}

export class Particle {
    Position: Triplet;
    Acceleration: Triplet;
    Velocity: Triplet;

    TotalDistance: number;
    TotalMoves: number;
    AverageDistance: number;
    Index: number;

    public Tick() {
        //Increase the X velocity by the X acceleration.
        this.Velocity.X += this.Acceleration.X;
        //Increase the Y velocity by the Y acceleration.
        this.Velocity.Y += this.Acceleration.Y;
        //Increase the Z velocity by the Z acceleration.
        this.Velocity.Z += this.Acceleration.Z;

        //Increase the X position by the X velocity.
        this.Position.X += this.Velocity.X;
        //Increase the Y position by the Y velocity.
        this.Position.Y += this.Velocity.Y;
        //Increase the Z position by the Z velocity.
        this.Position.Z += this.Velocity.Z;        

        this.TotalMoves++;
        this.TotalDistance += Math.abs(this.Position.X) + 
            Math.abs(this.Position.Y) + Math.abs(this.Position.Z);

        this.AverageDistance = this.TotalDistance / this.TotalMoves;
    }
    
    constructor(position: string, velocity: string, acceleration: string, index: number) {
        this.Position = new Triplet(position);
        this.Acceleration = new Triplet(acceleration);
        this.Velocity =  new Triplet(velocity);

        this.TotalDistance = 0;
        this.TotalMoves = 0;

        this.Index = index;
    }
}

export default class Puzzle20Calculator implements IPuzzleCalculator {
    CalcPart1(input: string): string {
        let particles = this.ParseInput(input);
        for (let i = 0; i < 1000; i++) {
            particles.forEach((p, ix, arr) => { p.Tick() });
        }

        return particles.reduce((prev, current, ix, arr) => {
            if (prev == null)
                return current;
            
            if (prev.AverageDistance < current.AverageDistance)
                return prev;
            else
                return current;
        }).Index.toString();
    }

    ParseInput(input: string) : Particle[] {
        let result = new Array<Particle>();
        let inputs = input.split(/\n/);
        let index = 0;
        for(let line of inputs) {
            let triplets = line.split(", ");
            let part = new Particle(triplets[0], triplets[1], triplets[2], index);
            result.push(part);

            index++;
        }
        return result;
    }

    CalcPart2(input: string): string {
        let particles = this.ParseInput(input);
        for (let i = 0; i < 1000; i++) {
            particles.forEach((p, ix, arr) => { p.Tick(); });

            for(let i = particles.length; i >=0; i--)
            {
                if (i < particles.length) {
                    let compareParticle = particles[i];

                    let deleted = false;
                    for (let j = particles.length - 1; j >= 0; j--) {
                        if (compareParticle.Position.EqualsTo(particles[j].Position) && compareParticle.Index != particles[j].Index)
                        {
                            particles.splice(j, 1);
                            deleted = true;
                        }
                    }
                    if (deleted)
                        particles.splice(particles.indexOf(compareParticle), 1);
                }
            }
        }

        return particles.length.toString();
    }
    
}