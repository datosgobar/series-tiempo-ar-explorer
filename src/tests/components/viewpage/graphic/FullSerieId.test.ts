import { generateCommonMockSerieEMAE, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import { ISerie } from "../../../../api/Serie";
import { getFullSerieId } from "../../../../components/viewpage/graphic/Graphic";

describe("Obtainment of a serie's full ID", () => {

    let commonMockSerie: ISerie;
    let yearPercentageMockSerie: ISerie;

    beforeAll(() => {
        commonMockSerie = generateCommonMockSerieEMAE();
        yearPercentageMockSerie = generatePercentageYearMockSerie();
    })

    it('A serie with "value" representation mode does not append it to the ID', () => {
        const fullId = getFullSerieId(commonMockSerie);
        expect(fullId).toEqual('EMAE2004');
    });

    it('A representation mode different than "value" is appended to the ID', () => {
        const fullId = getFullSerieId(yearPercentageMockSerie);
        expect(fullId).toEqual('EMAE2004:percent_change_a_year_ago');
    });

})