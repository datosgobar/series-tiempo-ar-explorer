import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { IYAxisConf, ISeriesAxisSides, IYAxis, ILegendLabel } from "../../../../components/viewpage/graphic/Graphic";
import { generateYAxisBySeries, generateYAxisArray } from "../../../../helpers/graphic/axisConfiguration";
import { generateCommonMockSerieMotos, generateCommonMockSerieEMAE, generatePercentageMockSerie, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import { IHCSeries } from "../../../../components/viewpage/graphic/highcharts";
import { IHighchartsSerieBuilderOptions, HighchartsSerieBuilder } from "../../../../helpers/graphic/hcSerieFromISerie";
import Colors, { Color } from "../../../../components/style/Colors/Color";

describe("Axis Configuration functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let mockSeriePercentChange: ISerie;
    let mockSeriePercentChangeYearAgo: ISerie;
    let axisSides: ISeriesAxisSides;
    let yAxisBySeries: IYAxisConf;
    let hcSeries: IHCSeries[];
    const locale = 'AR';
    const formatUnits = false;

    function getHcSeriesBySeries(series: ISerie[], legendLabel?: ILegendLabel, colors?: Color[]) : IHCSeries[] {
        const yAxisArray = generateYAxisArray(yAxisBySeries);
        const options: IHighchartsSerieBuilderOptions = {
            chartTypes: { "Motos_patentamiento_8myrF9": "column"},
            colors,
            legendLabel,
            legendField: undefined,
            series,
            yAxisBySeries,
            yAxisArray
        }
        return series.map((serie) => new HighchartsSerieBuilder(options)
                                            .buildFromSerie(serie));
    }

    function areInOppositeSides(yAxisConfOne: IYAxis, yAxisConfTwo: IYAxis) {
        expect(yAxisConfOne.opposite).toBe(false);
        expect(yAxisConfTwo.opposite).toBe(true);
    }

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
        mockSeriePercentChange = generatePercentageMockSerie();
        mockSeriePercentChangeYearAgo = generatePercentageYearMockSerie();
    })


    describe("Test HcSerieFromISerie with Mock series Emae and motos", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)]
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
            hcSeries = getHcSeriesBySeries(series);
        })
        it("Cada serie tiene su nombre y serie correspondiente", () => {
            expect(hcSeries[0].name).toEqual("EMAE. Base 2004 (izq)");
            expect(hcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas (der)");
        });
        it("Cada serie tiene su chartType correspondiente", () => {
            expect(hcSeries[0].type).toEqual(undefined);
            expect(hcSeries[1].type).toEqual("column");
        });
        it("Cada serie tiene su yAxis correspondiente", () => {
            expect(hcSeries[0].yAxis).toEqual(0);
            expect(hcSeries[1].yAxis).toEqual(1);
        });
        it("Cada serie tiene su color correspondiente", () => {
            const colorArray = (Object as any).values(Colors);
            expect(hcSeries[0].color).toEqual(colorArray[0].code);
            expect(hcSeries[1].color).toEqual(colorArray[1].code);
        });

    })


    describe("Test HcSerieFromISerie with Mock series Emae, Emae:pecent_change_a_year_ago and motos ", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo, mockSeriePercentChangeYearAgo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo),
                                                new SerieConfig(mockSeriePercentChangeYearAgo)]
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
            hcSeries = getHcSeriesBySeries(series);
        })
        it("Cada serie tiene su nombre y serie correspondiente", () => {
            expect(hcSeries[2].name).toEqual("EMAE. Base 2004 (izq)");
            expect(hcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas (der)");
            expect(hcSeries[0].name).toEqual("EMAE. Base 2004 (izq)");
        });
        it("Cada serie tiene su chartType correspondiente", () => {
            expect(hcSeries[2].type).toEqual(undefined);
            expect(hcSeries[0].type).toEqual(undefined);
            expect(hcSeries[1].type).toEqual("column");
        });
        it("Cada serie tiene su yAxis correspondiente", () => {
            expect(hcSeries[1].yAxis).toEqual(1);
            expect(hcSeries[0].yAxis).toEqual(0);
            expect(hcSeries[2].yAxis).toEqual(0);
        });
        it("Cada serie tiene su color correspondiente", () => {
            const colorArray = (Object as any).values(Colors);
            expect(hcSeries[1].color).toEqual(colorArray[1].code);
            expect(hcSeries[0].color).toEqual(colorArray[0].code);
            expect(hcSeries[2].color).toEqual(colorArray[2].code);
        });

    })

    describe("Default axis configuration, without optional parameter", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)];
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
            hcSeries = getHcSeriesBySeries(series);
        })

        it("Each unit label goes to a different axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Unit label titles are properly written", () => {
            expect(yAxisBySeries.EMAE2004.title.text).toEqual("Índice 2004=100");
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.title.text).toEqual("Unidades");
        });
        it("Legend labels below the graphic are properly written", () => {  
            expect(hcSeries[0].name).toContain("(izq)");
            expect(hcSeries[1].name).toContain("(der)");
        });

    })

    describe("Explicit configuration, switching the default sides", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)]
            axisSides = {
                'EMAE2004': 'left',
                'Motos_patentamiento_8myrF9': 'right'
            }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
            hcSeries = getHcSeriesBySeries(series);
        })
        it("Series have opposite side each other because outOfScale", () => {
            areInOppositeSides(yAxisBySeries.EMAE2004, yAxisBySeries.Motos_patentamiento_8myrF9)
        });
        it("Legend labels below the graphic are properly written", () => {
            expect(hcSeries[0].name).toContain("(izq)");
            expect(hcSeries[1].name).toContain("(der)");
        });
    })

    describe("Explicit configuration, one without axis side and without out of scale", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSeriePercentChange, mockSeriePercentChangeYearAgo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSeriePercentChange),
                                                new SerieConfig(mockSeriePercentChangeYearAgo)];
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
            hcSeries = getHcSeriesBySeries(series);
        })
        it("Both series goes to the left side because same scale of percentage.", () => {
            expect(yAxisBySeries["EMAE2004:percent_change"].opposite).toBe(false);
            expect(yAxisBySeries["EMAE2004:percent_change_a_year_ago"].opposite).toBe(false);
        });
        it("Legend labels are both on the left side", () => {
            expect(hcSeries[0].name).toEqual("EMAE. Base 2004");
            expect(hcSeries[1].name).toContain("EMAE. Base 2004");
        });
    })

    describe("Explicit configuration, one without axis side and with out of scale", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)];
            axisSides = { 'EMAE2004': 'left' }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
        })
        it("Series have opposite side each other", () => {
            areInOppositeSides(yAxisBySeries.EMAE2004, yAxisBySeries.Motos_patentamiento_8myrF9)
        });
    })

    describe("Explicit configuration, axis empty, each goes to opposite side", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)];
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, {});
        })
        it("Series have opposite side each other", () => {
            areInOppositeSides(yAxisBySeries.EMAE2004, yAxisBySeries.Motos_patentamiento_8myrF9)
        });
    })

    describe("Explicit configuration, both on the left side", () => {
        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)];
            axisSides = {
                'EMAE2004': 'left',
                'Motos_patentamiento_8myrF9': 'left'
            }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
            hcSeries = getHcSeriesBySeries(series);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("As there are no series on the auxiliar axes, no text is appended to legend labels", () => {
            expect(hcSeries[0].name).toEqual("EMAE. Base 2004");
            expect(hcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas");
        });

    })

    describe("Explicit configuration, both on the right side", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const mockConfig: SerieConfig[] = [ new SerieConfig(mockSerieOne),
                                                new SerieConfig(mockSerieTwo)]
            axisSides = {
                'EMAE2004': 'right',
                'Motos_patentamiento_8myrF9': 'right'
            }
            yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale, axisSides);
            hcSeries = getHcSeriesBySeries(series);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.EMAE2004.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Legend labels below the graphic are properly written", () => {
            expect(hcSeries[0].name).toEqual("EMAE. Base 2004 (der)");
            expect(hcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas (der)");
        });

    })
})