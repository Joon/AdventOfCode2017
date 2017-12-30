import IPuzzleCalculator from "./IPuzzleCalculator";
import IHash from "./IHash";

class TreeItem
{
    constructor(line: string) {
        
        let halves = line.split("->");
        // fwft (72) -> ktlj, cntj, xhth
        this.name = halves[0].split(/\s/)[0];
        this.weight = +(halves[0].match(/\d+/g)[0]);
        this.childItems = [];
        if (halves.length == 2)
        {
            this.childNames = halves[1].trim().split(", ");
        } else {
            this.childNames = [];
        }
    }

    public name: string;
    public weight: number;
    public childItems: Array<TreeItem>;
    public childNames: Array<string>;
}


export default class Puzzle7Calculator implements IPuzzleCalculator
{
    
    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";
        let tree = this.ParseTreeItems(input);

        return tree.name;
    }

    ParseTreeItems(input: string): TreeItem
    {
        let lines = input.split(/\n/);
        let treeItems = lines.map((val, index, arr) => { return new TreeItem(val) });
        let rootItem = treeItems[0];
        let lastFindCount = 1;
        while (lastFindCount > 0) {
            lastFindCount --;
            // Find a parent for root
            let rootsParent = treeItems.reduce((prev, current, index, arr) => {
                if (current.childNames.filter((val, index, arr) => { return val == rootItem.name}).length > 0){
                    return current;
                } else {
                    return prev;
                }
            }, null);
            if (rootsParent != null) {
                lastFindCount = 1;
                rootItem = rootsParent;
            }
        }
        this.ProcessChildren(rootItem, treeItems);

        return rootItem;
    }

    ProcessChildren(parent: TreeItem, treeItems: Array<TreeItem>){
        for(let child of parent.childNames) {
            let newChild = treeItems.filter((val, index, arr) => { return val.name == child })[0];
            if (newChild != null) {
                if (parent.childItems.indexOf(newChild) < 0) {
                    parent.childItems.push(newChild);
                    this.ProcessChildren(newChild, treeItems);
                }
            } else
            {  console.log("Child not found. Name: |" + child + "|" + " from " + treeItems.length + " items");}
        }
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";
        let tree = this.ParseTreeItems(input);
        
        let weight = this.FindUnbalancedTowerWeight(tree, this.CalcTreeWeight(tree));

        return weight.toString();
    }

    FindUnbalancedTowerWeight(parent: TreeItem, expectedWeight: number): number {
        let weights: IHash = {};
        for(let child of parent.childItems) {
            let weight = this.CalcTreeWeight(child);
            if (Object.keys(weights).indexOf(weight.toString()) >= 0)
                weights[weight.toString()] = weights[weight.toString()] + 1;
            else
                weights[weight.toString()] = 1;
        }

        let keys = Object.keys(weights);
        // All children are balanced, current node must be unbalancing the parent
        if (keys.length == 1)
        {
            let childWeight = (+weights[keys[0]]) * (+keys[0]);
            return expectedWeight - childWeight;
        }
        let unbalancedWeight = 0;
        let balancedWeight = 0;
        for (let key of Object.keys(weights)) {
            if (weights[key] == 1)
            {
                unbalancedWeight = +key;
            } else
            {
                balancedWeight = +key;   
            }
        }
        let unbalancedChild = null;
        for(let child of parent.childItems) {
            if (this.CalcTreeWeight(child) == unbalancedWeight)
                unbalancedChild = child;
        }

        return this.FindUnbalancedTowerWeight(unbalancedChild, balancedWeight);
    }

    CalcTreeWeight(parent: TreeItem): number {
        let result = parent.weight;
        for (let child of parent.childItems) {
            result += this.CalcTreeWeight(child);
        }
        return result;
    }

}