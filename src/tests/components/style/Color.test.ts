import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageMockSerie } from "../../support/mockers/seriesMockers";
import Colors, { colorFor, Color, getColorArray, isHexaColor } from "../../../components/style/Colors/Color";
import { getFullSerieId } from "../../../components/viewpage/graphic/Graphic";

describe("Colors", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
    });

    it("Single serie returns blue color", () => {
        const series = [mockSerieOne];
        const color = colorFor(series, getFullSerieId(mockSerieOne));
        
        expect(color.name).toEqual("blue1");
    });

    it("Same serie id different rep mode returns different colors", () => {
        const emae2 = generatePercentageMockSerie()
        const series = [mockSerieOne, emae2]
        const color = colorFor(series, getFullSerieId(series[0]));
        const color2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).not.toEqual(color2)
    });

    it("Different serie ids return different colors - default colors", () => {
        const series = [mockSerieOne, mockSerieTwo];
        const color = colorFor(series, getFullSerieId(series[0]));
        const color2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).not.toEqual(color2)
    });

    it("Different serie ids return different colors - custom colors", () => {
        const series = [mockSerieOne, mockSerieTwo];
        const colors = [Colors.a1Blue1, new Color("ColorRaro", "#fffaaf")]
        const color = colorFor(series, getFullSerieId(series[0]), colors);
        const color2 = colorFor(series, getFullSerieId(series[1]), colors);
        expect(color).not.toEqual(color2)
    });

    it("Same serie with same rep mode returns same color - default colors", () => {
        const series = [mockSerieOne, mockSerieOne];
        const color = colorFor(series, getFullSerieId(series[0]));
        const color2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).toEqual(color2)
    });

    it("Same serie with same rep mode returns same color - custom colors", () => {
        const series = [mockSerieOne, mockSerieOne];
        const colors = [Colors.a1Blue1, new Color("ColorRaro", "#fffaaf")]
        const color = colorFor(series, getFullSerieId(series[0]), colors);
        const color2 = colorFor(series, getFullSerieId(series[1]), colors);
        expect(color).toEqual(color2)
    });

    it("Create array of colors from string array", () => {
        const colorsString = ["#aaeeff", "#f2fe05", "#06f140"]
        const colors = getColorArray(colorsString)
        expect(colors).toBeDefined()
        if (colors !== undefined) {            
            expect(colors.map(color => color.code)).toEqual(colorsString)
            expect(colors.map(color => color.name)).toEqual(colorsString)
        }
    });

    it("Create array of colors from a undefined string array returns the default colors", () => {
        const colorsString = undefined
        const colors = getColorArray(colorsString)
        expect(colors).toEqual((Object as any).values(Colors))
    });

    it("Create array of colors from index array", () => {
        const colorsString = ["3", "4", "9"]
        const colors = getColorArray(colorsString)
        expect(colors).toBeDefined()
        if (colors !== undefined) {
            const expectedColors = [
                new Color("orange", "#F9A822"), 
                new Color("violet", "#6A1B99"),
                new Color("blue1", "#0072BB")
            ]
            expect(colors).toEqual(expectedColors)
        }
    });

    it("Create array of colors from an array of hexas and indexes", () => {
        const colorsString = ["3", "#f2fe05", "9"]
        const colors = getColorArray(colorsString)
        expect(colors).toBeDefined()
        if (colors !== undefined) {
            const expectedColors = [
                new Color("orange", "#F9A822"), 
                new Color("#f2fe05", "#f2fe05"), 
                new Color("blue1", "#0072BB")
            ]
            expect(colors).toEqual(expectedColors)
        }
    });

    it("Create array of colors from an array of indexes out of range", () => {
        const colorsString = ["1015", "11", "42"]
        const colors = getColorArray(colorsString)
        expect(colors).toBeDefined()
        if (colors !== undefined) {
            const expectedColors = [
                new Color("blue2", "#039BE5"), 
                new Color("red", "#C62828"),
                new Color("purple", "#C2185B")
            ]
            expect(colors).toEqual(expectedColors)
        }
    });

    it("isHexaColor works", () => {
        const validHexaColors = ["#ffaaee", Colors.a4Orange.code, "#123456"]
        const invalidHexaColors = ["#ffaee", "#1y34aj", "#ffaeeae", "#f", "asd", "123456", ".", "#"]
        for (const validColor of validHexaColors) {
            expect(isHexaColor(validColor)).toEqual(true)
        }
        for (const invalidColor of invalidHexaColors) {
            expect(isHexaColor(invalidColor)).toEqual(false)
        }
    });
});
