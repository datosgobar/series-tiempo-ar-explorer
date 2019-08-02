import { generateCommonMockSerieEMAE, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import { ISerie } from "../../../../api/Serie";
import { getFullSerieId } from "../../../../components/viewpage/graphic/Graphic";
import SerieConfig from "../../../../api/SerieConfig";

describe("Obtainment of full IDs", () => {

    let commonMockSerie: ISerie;
    let yearPercentageMockSerie: ISerie;

    beforeAll(() => {
        commonMockSerie = generateCommonMockSerieEMAE();
        yearPercentageMockSerie = generatePercentageYearMockSerie();
    })

    /*it("Prueba", () => {

        const motosSerie = generateCommonMockSerieMotos();
        const percentSerie = generatePercentageMockSerie();
        const series = [commonMockSerie, motosSerie, yearPercentageMockSerie, percentSerie];
        const chartTypes: IChartTypeProps = {
            'EMAE2004': 'column',
            'EMAE2004:percent_change_a_year_ago': 'area',
            'Motos_patentamiento_8myrF9': 'area'
        }
        adjustPropsUponIds(series, chartTypes);
        expect(1).toEqual(1);

    })*/

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