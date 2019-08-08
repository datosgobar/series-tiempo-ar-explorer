import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { IYAxisConf, ISeriesAxisSides, IYAxis } from "../../../../components/viewpage/graphic/Graphic";
import { generateYAxisBySeries } from "../../../../components/viewpage/graphic/axisConfiguration";
import { generateCommonMockSerieMotos, generateCommonMockSerieEMAE, generatePercentageMockSerie, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import { ILegendConfiguration, getLegendLabel } from "../../../../components/viewpage/graphic/legendConfiguration";

describe("Axis Configuration functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let mockSeriePercentChange: ISerie;
    let mockSeriePercentChangeYearAgo: ISerie;
    let series: ISerie[];
    let percentageSeries: ISerie[];
    let mockConfig: SerieConfig[];
    let axisSides: ISeriesAxisSides;
    let yAxisBySeries: IYAxisConf;
    let legendProps: ILegendConfiguration;
    const locale = 'AR';
    const formatUnits = false;

    function areInOppositeSides(yAxisConfOne: IYAxis, yAxisConfTwo: IYAxis) {
        expect(yAxisConfOne.opposite).toBe(false);
        expect(yAxisConfOne.yAxis).toEqual(0);

        expect(yAxisConfTwo.opposite).toBe(true);
        expect(yAxisConfTwo.yAxis).toEqual(1);
    }

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
        mockSeriePercentChange = generatePercentageMockSerie();
        mockSeriePercentChangeYearAgo = generatePercentageYearMockSerie();
        percentageSeries = [mockSeriePercentChange, mockSeriePercentChangeYearAgo]

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
            axisSides = {
                'EMAE2004': 'left',
                'Motos_patentamiento_8myrF9': 'right'
            }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })

        it("Series have opposite side each other because outOfScale", () => {
            const yAxiEmae = yAxisBySeries.EMAE2004;
            const yAxiMotos = yAxisBySeries.Motos_patentamiento_8myrF9;
            areInOppositeSides(yAxiEmae, yAxiMotos)
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

    describe("Explicit configuration, one without axis side and without out of scale", () => {

        beforeAll(() => {
            yAxisBySeries = generateYAxisBySeries(percentageSeries, mockConfig, formatUnits, locale, axisSides);
        })

        it("Both series goes to the left side because same scale of percentage.", () => {
            expect(yAxisBySeries["EMAE2004:percent_change"].opposite).toBe(false);
            expect(yAxisBySeries["EMAE2004:percent_change"].yAxis).toEqual(0);
            expect(yAxisBySeries["EMAE2004:percent_change_a_year_ago"].opposite).toBe(false);
            expect(yAxisBySeries["EMAE2004:percent_change_a_year_ago"].yAxis).toEqual(0);
        });

    })

    describe("Explicit configuration, one without axis side and with out of scale", () => {

        beforeAll(() => {
            axisSides = { 'EMAE2004': 'left' }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })

        it("Series have opposite side each other", () => {
            const yAxiEmae = yAxisBySeries.EMAE2004;
            const yAxiMotos = yAxisBySeries.Motos_patentamiento_8myrF9;
            areInOppositeSides(yAxiEmae, yAxiMotos)
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

    describe("Explicit configuration, axis empty, each goes to opposite side", () => {

        beforeAll(() => {
            series = [mockSerieOne, mockSerieTwo];
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, {});
        })

        it("Series have opposite side each other", () => {
            const yAxiEmae = yAxisBySeries.EMAE2004;
            const yAxiMotos = yAxisBySeries.Motos_patentamiento_8myrF9;
            areInOppositeSides(yAxiEmae, yAxiMotos)
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
            series = [mockSerieOne, mockSerieTwo];
            axisSides = {
                'EMAE2004': 'left',
                'Motos_patentamiento_8myrF9': 'left'
            }
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
            series = [mockSerieOne, mockSerieTwo];
            axisSides = {
                'EMAE2004': 'right',
                'Motos_patentamiento_8myrF9': 'right'
            }
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