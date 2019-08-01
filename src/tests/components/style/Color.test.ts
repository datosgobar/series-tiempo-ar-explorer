import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos } from "../../support/mockers/seriesMockers";
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
        const series = [mockSerieOne, mockSerieTwo];
        const color = colorFor(series, getFullSerieId(mockSerieOne));
        
        expect(color.name).toEqual("blue1");
    });
});
