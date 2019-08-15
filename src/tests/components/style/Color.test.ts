import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageMockSerie } from "../../support/mockers/seriesMockers";
import Colors, { colorFor, Color, getColorArray } from "../../../components/style/Colors/Color";
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
        const colorsString = ["#aaeeff", "#f2fe05f", "#06f140"]
        const colors = getColorArray(colorsString)
        expect(colors).toBeDefined()
        if (colors !== undefined) {            
            expect(colors.map(color => color.code)).toEqual(colorsString)
            expect(colors.map(color => color.name)).toEqual(colorsString)
        }
    });

    it("Create array of colors from a undefined string array", () => {
        const colorsString = undefined
        const colors = getColorArray(colorsString)
        expect(colors).toBeUndefined()
    });
});
