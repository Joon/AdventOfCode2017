import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

class Garbage {
    public Text: string;
}

class Group {
    public Text: string;
    public Groups: Group[];
    public Garbages: Garbage[];

    constructor() {
        this.Groups = new Array<Group>();
        this.Garbages = new Array<Garbage>();
    }
}

export default class Puzzle9Calculator implements IPuzzleCalculator
{

    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";

        let group = this.ParseGroups(input);
        return this.CalcGroupScore(group, 0).toString();
    }

    CalcGroupScore(parentGroup: Group, parentScore: number): number {
        let result = parentScore + 1;
        for(let g of parentGroup.Groups) {
            result += this.CalcGroupScore(g, parentScore + 1);
        }
        return result;
    }

    ParseGroups(input: string): Group {
        let groupStack = new Array<Group>();
        let ignoreNext = false;
        let inGarbage = false;
        let currentGroup: Group = null;
        let currentGarbage: Garbage = null;
        let result = null;

        for(let c of input){
            if (ignoreNext)
            {
                ignoreNext = false;
            } else {
                if (c == "!") 
                {
                    ignoreNext = true;
                } else {
                    if (inGarbage) {
                        if (c == ">") {
                            inGarbage = false;
                            currentGarbage = null;
                        }
                    } else {
                        if (c == "{") {
                            let parent = currentGroup;
                            if (currentGroup != null)
                            {
                                groupStack.push(currentGroup);
                            }
                            currentGroup = new Group();
                            currentGroup.Text = "{";
                            if (groupStack.length == 0)
                                result = currentGroup;
                            if (parent != null)
                                parent.Groups.push(currentGroup);                       
                        }
                        if (c == "}") {                       
                            currentGroup.Text += "}";     
                            currentGroup = groupStack.pop();
                        }                
                        if (c == "<") {
                            inGarbage = true;
                            currentGarbage = new Garbage();
                            currentGarbage.Text = "<";
                            if (currentGroup == null)
                            {
                                throw "New garbage outside of a group!";
                            }
                            currentGroup.Garbages.push(currentGarbage);
                        }
                    }
                    if (currentGroup != null) {
                        if (c != "{" && c != "}")
                            currentGroup.Text += c;
                    }
                    if (currentGarbage != null) {
                        currentGarbage.Text += c;
                    }    
                }
            }
        }

        return result;
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";
        
        let group = this.ParseGroups(input);
        return this.CountGarbageChars(group).toString();
    }

    CountGarbageChars(g: Group) : number {
        let result = 0;
        for(let garb of g.Garbages) {
            result += garb.Text.length - 2;
        }
        for(let gr of g.Groups) {
            result += this.CountGarbageChars(gr);
        }
        return result;
    }

}