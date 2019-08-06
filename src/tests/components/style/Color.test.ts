import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageMockSerie } from "../../support/mockers/seriesMockers";
import { colorFor } from "../../../components/style/Colors/Color";
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
        let emae_2 = generatePercentageMockSerie()
        const series = [mockSerieOne, emae_2]
        const color = colorFor(series, getFullSerieId(series[0]));
        const color_2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).not.toEqual(color_2)
    });

    it("Different serie ids return different colors", () => {
        const series = [mockSerieOne, mockSerieTwo];
        const color = colorFor(series, getFullSerieId(series[0]));
        const color_2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).not.toEqual(color_2)
    });

    it("Same serie with same rep mode returns same color", () => {
        const series = [mockSerieOne, mockSerieOne];
        const color = colorFor(series, getFullSerieId(series[0]));
        const color_2 = colorFor(series, getFullSerieId(series[1]));
        expect(color).toEqual(color_2)
    });
});
