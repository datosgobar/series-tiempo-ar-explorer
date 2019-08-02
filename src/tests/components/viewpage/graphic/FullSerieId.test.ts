import { generateCommonMockSerieEMAE, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import Serie, { ISerie } from "../../../../api/Serie";
import { getFullSerieId } from "../../../../components/viewpage/graphic/Graphic";
import SerieConfig from "../../../../api/SerieConfig";

describe("Obtainment of full IDs", () => {

    let commonMockSerie: ISerie;
    let yearPercentageMockSerie: ISerie;

    beforeAll(() => {
        commonMockSerie = generateCommonMockSerieEMAE();
        yearPercentageMockSerie = generatePercentageYearMockSerie();
    })

    describe("Full ID of a ISerie object", () => {

        it('A serie with "value" representation mode does not append it to the ID', () => {
            const fullId = getFullSerieId(commonMockSerie);
            expect(fullId).toEqual('EMAE2004');
        });
        it('A representation mode different than "value" is appended to the ID', () => {
            const fullId = getFullSerieId(yearPercentageMockSerie);
            expect(fullId).toEqual('EMAE2004:percent_change_a_year_ago');
        });

    })

    describe("Full ID of a SerieConfig object", () => {
        
        let commonMockSerieConfig: SerieConfig;
        let yearPercentageMockSerieConfig: SerieConfig;

        beforeAll(() => {
            commonMockSerieConfig = new SerieConfig(commonMockSerie);
            yearPercentageMockSerieConfig = new SerieConfig(yearPercentageMockSerie);
        })

        it('A SerieConfig from a Serie with "value" representation mode does not append it to the ID', () => {
            const fullId = commonMockSerieConfig.getFullSerieId();
            expect(fullId).toEqual('EMAE2004');
        });
        it('A SerieConfig from a Serie with another representation mode is appended to the ID', () => {
            const fullId = yearPercentageMockSerieConfig.getFullSerieId();
            expect(fullId).toEqual('EMAE2004:percent_change_a_year_ago');
        });

    })

})