import {CellNavigator} from "./Puzzle11Calculator";
import Puzzle11Calculator from "./Puzzle11Calculator";

describe("CellNavigator", () => {

    it("Must create new concentric rings when navigating", () => {
        let nav = new CellNavigator();

        let c1 = nav.Navigate(nav.Origin, "n");
        nav.LogCells();
        let c2 = nav.Navigate(c1, "n");
        nav.LogCells();
        expect(nav.AllCells.length).toBe(3);
    });

    it("Must create new concentric rings when navigating without going nuts", () => {
        let nav = new CellNavigator();

        let c1 = nav.Navigate(nav.Origin, "ne");
        let c2 = nav.Navigate(c1, "ne");
        let c3 = nav.Navigate(c2, "ne");
        expect(nav.AllCells.length).toBe(4);
    });

    it("Must not create new concentric rings when navigating in existing structure", () => {
        let nav = new CellNavigator();

        let c1 = nav.Navigate(nav.Origin, "ne");
        let c2 = nav.Navigate(c1, "ne");
        let c3 = nav.Navigate(c2, "ne");
        let c4 = nav.Navigate(c3, "sw");
        let c5 = nav.Navigate(c4, "sw");
        let c6 = nav.Navigate(c5, "sw");
        expect(nav.AllCells.length).toBe(4);
        expect(c6.X).toBe(0);
        expect(c6.Y).toBe(0);
    }); 
});

describe("Puzzle11Calculator", () => {

    it("Must return 3 for site example ne,ne,ne", () => {
        let calc = new Puzzle11Calculator();        
        expect(calc.CalcPart1("ne,ne,ne")).toBe("3");
    });

    it("Must return 0 for site example ne,ne,sw,sw", () => {
        let calc = new Puzzle11Calculator();        
        expect(calc.CalcPart1("ne,ne,sw,sw")).toBe("0");
    });

    it("Must return 2 for site example ne,ne,s,s", () => {
        let calc = new Puzzle11Calculator();        
        expect(calc.CalcPart1("ne,ne,s,s")).toBe("2");
    });

    it("Must return 3 for site example se,sw,se,sw,sw", () => {
        let calc = new Puzzle11Calculator();        
        expect(calc.CalcPart1("se,sw,se,sw,sw")).toBe("3");
    });
});