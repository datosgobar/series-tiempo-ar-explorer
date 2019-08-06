import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { IYAxisConf, ISeriesAxisSides } from "../../../../components/viewpage/graphic/Graphic";
import { generateYAxisBySeries } from "../../../../components/viewpage/graphic/axisConfiguration";
import { generateCommonMockSerieMotos, generateCommonMockSerieEMAE } from "../../../support/mockers/seriesMockers";
import { ILegendConfiguration, getLegendLabel } from "../../../../components/viewpage/graphic/legendConfiguration";

describe("Axis Configuration functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let series: ISerie[];
    let mockConfig: SerieConfig[];
    let axisSides: ISeriesAxisSides;
    let yAxisBySeries: IYAxisConf;
    let legendProps: ILegendConfiguration;
    const locale = 'AR';
    const formatUnits = false;

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
        series = [mockSerieOne, mockSerieTwo];
        mockConfig = [new SerieConfig(mockSerieOne),
                        new SerieConfig(mockSerieTwo)];
    })

    describe("Default axis configuration, without optional parameter", () => {     

        beforeAll(() => {
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
        })

        it("Each unit label goes to a different axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Unit label titles are properly written", () => {
            expect(yAxisBySeries.EMAE2004.title.text).toEqual("Índice 2004=100");
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.title.text).toEqual("Unidades");
        });
        it("Each unit values column goes to a different axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(0);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });
        it("Legend labels below the graphic are properly written", () => {
            legendProps = {
                axisConf: yAxisBySeries,
                rightSidedSeries: true
            }
            expect(getLegendLabel(mockSerieOne, legendProps)).toContain("(izq)");
            expect(getLegendLabel(mockSerieTwo, legendProps)).toContain("(der)");
        });

    })

    describe("Explicit configuration, switching the default sides", () => {

        beforeAll(() => {
            axisSides = { 'EMAE2004': 'left',
                          'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })

        it("Originally left-sided serie goes to the right", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(0);
        });
        it("Originally right-sided serie goes to the left", () => {
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });
        it("Legend labels below the graphic are properly written", () => {
            legendProps = {
                axisConf: yAxisBySeries,
                rightSidedSeries: true
            }
            expect(getLegendLabel(mockSerieOne, legendProps)).toEqual("EMAE. Base 2004 (izq)");
            expect(getLegendLabel(mockSerieTwo, legendProps)).toEqual("Motos: número de patentamientos de motocicletas (der)");
        });

    })

    describe("Explicit configuration, both on the left side", () => {

        beforeAll(() => {
            axisSides = { 'EMAE2004': 'left',
                          'Motos_patentamiento_8myrF9': 'left' }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(0);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(0);
        });
        it("As there are no series on the auxiliar axes, no text is appended to legend labels", () => {
            legendProps = {
                axisConf: yAxisBySeries,
                rightSidedSeries: false
            }
            expect(getLegendLabel(mockSerieOne, legendProps)).toEqual("EMAE. Base 2004");
            expect(getLegendLabel(mockSerieTwo, legendProps)).toEqual("Motos: número de patentamientos de motocicletas");
        });

    })

    describe("Explicit configuration, both on the right side", () => {

        beforeAll(() => {
            axisSides = { 'EMAE2004': 'right',
                          'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.yAxis).toEqual(1);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });
        it("Legend labels below the graphic are properly written", () => {
            legendProps = {
                axisConf: yAxisBySeries,
                rightSidedSeries: true
            }
            expect(getLegendLabel(mockSerieOne, legendProps)).toEqual("EMAE. Base 2004 (der)");
            expect(getLegendLabel(mockSerieTwo, legendProps)).toEqual("Motos: número de patentamientos de motocicletas (der)");
        });

    })

})