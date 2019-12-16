import { IChartTypeProps } from "../../../components/viewpage/graphic/Graphic";
import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageMockSerie, generatePercentageYearMockSerie } from "../../support/mockers/seriesMockers";
import { getChartType } from "../../../helpers/common/chartTypeHandling";

describe("Chart Type settings between different series", () => {

    let props: IChartTypeProps;
    let commonMockSerieOne: ISerie;
    let commonMockSerieTwo: ISerie;
    let wholePercentageMockSerie: ISerie;
    let yearPercentageMockSerie: ISerie;

    beforeAll(() => {

        commonMockSerieOne = generateCommonMockSerieEMAE();
        commonMockSerieTwo = generateCommonMockSerieMotos();
        wholePercentageMockSerie = generatePercentageMockSerie();
        yearPercentageMockSerie = generatePercentageYearMockSerie();
        props = {
            'Motos_patentamiento_8myrF9': 'line',
            'EMAE2004:percent_change': 'column',
            'EMAE2004:percent_change_a_year_ago': 'area'
        }

    })

    it('There is no default chart type: it must be defined', () => {
        const chartType = getChartType(commonMockSerieOne, props);
        expect(chartType).toBeUndefined();
    });

    it('Explicitly chosen chart types are bound to their IDs', () => {
        const lineChartType = getChartType(commonMockSerieTwo, props);
        expect(lineChartType).toEqual('line');
        const columnChartType = getChartType(wholePercentageMockSerie, props);
        expect(columnChartType).toEqual('column');
        const areaChartType = getChartType(yearPercentageMockSerie, props);
        expect(areaChartType).toEqual('area');
    });


})