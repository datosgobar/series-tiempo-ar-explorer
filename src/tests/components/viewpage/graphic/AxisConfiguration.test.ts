import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { IYAxisConf, ISeriesAxisSides } from "../../../../components/viewpage/graphic/Graphic";
import { generateYAxisBySeries } from "../../../../components/viewpage/graphic/axisConfiguration";
import { generateCommonMockSerieMotos, generateCommonMockSerieEMAE } from "../../../support/mockers/seriesMockers";

describe("Axis Configuration functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let series: ISerie[];
    let seriesConfig: SerieConfig[];
    let yAxisBySeries: IYAxisConf;
    const locale = 'AR';
    const formatUnits = false;

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
        series = [mockSerieOne, mockSerieTwo];
        seriesConfig = [new SerieConfig(mockSerieOne),
                        new SerieConfig(mockSerieTwo)];
    })

    describe("Default axis configuration, without optional parameter", () => {     

        beforeAll(() => {
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale);
        })

        it("Each unit label goes to a different axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("Unit label titles are properly written", () => {
            expect(yAxisBySeries.EMAE2004.title.text).toEqual("Índice 2004=100");
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.title.text).toEqual("Unidades");
        });
        it("Each unit values column goes to a different axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(1);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(0);
        });

    })

    describe("Explicit configuration, switching the default sides", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'EMAE2004': 'left',
                                                  'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Originally left-sided serie goes to the right", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(0);
        });
        it("Originally right-sided serie goes to the left", () => {
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });

    })

    describe("Explicit configuration, both on the left side", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'EMAE2004': 'left',
                                                  'Motos_patentamiento_8myrF9': 'left' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(0);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(0);
        });

    })

    describe("Explicit configuration, both on the right side", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'EMAE2004': 'right',
                                                  'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(1);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });

    })

})