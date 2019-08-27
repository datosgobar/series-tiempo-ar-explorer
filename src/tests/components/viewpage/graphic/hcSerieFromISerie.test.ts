import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { generateYAxisBySeries, generateYAxisArray } from "../../../../helpers/graphic/axisConfiguration";
import { generateCommonMockSerieMotos, generateCommonMockSerieEMAE, generatePercentageYearMockSerie } from "../../../support/mockers/seriesMockers";
import { IHcSeriesFromISerie, HcSerieFromISerie } from "../../../../helpers/graphic/hcSerieFromISerie";
import { IHCSeries } from "../../../../components/viewpage/graphic/highcharts";
import Colors from "../../../../components/style/Colors/Color";

describe("High chart Series from ISerie functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let mockSerieThree: ISerie;
    let mockConfig: SerieConfig[];
    let iHcSeries: IHCSeries[];
    const locale = 'AR';
    const formatUnits = false;

    beforeAll(() => {
        mockSerieOne = generateCommonMockSerieEMAE();
        mockSerieTwo = generateCommonMockSerieMotos();
        mockSerieThree = generatePercentageYearMockSerie();

        mockConfig = [new SerieConfig(mockSerieOne), new SerieConfig(mockSerieTwo)];
    })

    describe("Test HcSerieFromISerie with Mock series Emae and motos", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo];
            const yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
            const iHcSeriesFromISerie: IHcSeriesFromISerie = {
                chartTypes: { "Motos_patentamiento_8myrF9": "column"},
                colors: undefined,
                legendLabel: undefined,
                legendField: undefined,
                series,
                yAxisBySeries,
            }
            iHcSeries = series.map((serie) => new HcSerieFromISerie(iHcSeriesFromISerie)
                                                .hcSerieFromISerie(
                                                    serie, 
                                                    generateYAxisArray(yAxisBySeries), 
                                                    {}
                                                ));
        })

        it("Cada serie tiene su nombre y serie correspondiente", () => {
            expect(iHcSeries[0].serieId).toEqual("EMAE2004");
            expect(iHcSeries[0].name).toEqual("EMAE. Base 2004 (izq)");
            expect(iHcSeries[1].serieId).toEqual("Motos_patentamiento_8myrF9");
            expect(iHcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas (der)");
        });
        it("Cada serie tiene su chartType correspondiente", () => {
            expect(iHcSeries[0].type).toEqual(undefined);
            expect(iHcSeries[1].type).toEqual("column");
        });
        it("Cada serie tiene su yAxis correspondiente", () => {
            expect(iHcSeries[0].yAxis).toEqual(0);
            expect(iHcSeries[1].yAxis).toEqual(1);
        });
        it("Cada serie tiene su color correspondiente", () => {
            const colorArray = (Object as any).values(Colors);
            expect(iHcSeries[0].color).toEqual(colorArray[0].code);
            expect(iHcSeries[1].color).toEqual(colorArray[1].code);
        });

    })


    describe("Test HcSerieFromISerie with Mock series Emae, Emae:pecent_change_a_year_ago and motos ", () => {

        beforeAll(() => {
            const series: ISerie[] = [mockSerieOne, mockSerieTwo, mockSerieThree];
            const yAxisBySeries = generateYAxisBySeries(series, mockConfig, formatUnits, locale);
            const iHcSeriesFromISerie: IHcSeriesFromISerie = {
                chartTypes: { "Motos_patentamiento_8myrF9": "column"},
                colors: undefined,
                legendLabel: undefined,
                legendField: undefined,
                series,
                yAxisBySeries,
            }
            iHcSeries = series.map((serie) => new HcSerieFromISerie(iHcSeriesFromISerie)
                                                .hcSerieFromISerie(
                                                    serie, 
                                                    generateYAxisArray(yAxisBySeries), 
                                                    {}
                                                ));
        })

        it("Cada serie tiene su nombre y serie correspondiente", () => {
            expect(iHcSeries[0].serieId).toEqual("EMAE2004");
            expect(iHcSeries[0].name).toEqual("EMAE. Base 2004 (izq)");
            expect(iHcSeries[1].serieId).toEqual("Motos_patentamiento_8myrF9");
            expect(iHcSeries[1].name).toEqual("Motos: número de patentamientos de motocicletas (der)");
            expect(iHcSeries[2].serieId).toEqual("EMAE2004:percent_change_a_year_ago");
            expect(iHcSeries[2].name).toEqual("EMAE. Base 2004 (izq)");
        });
        it("Cada serie tiene su chartType correspondiente", () => {
            expect(iHcSeries[0].type).toEqual(undefined);
            expect(iHcSeries[1].type).toEqual("column");
            expect(iHcSeries[2].type).toEqual(undefined);
        });
        it("Cada serie tiene su yAxis correspondiente", () => {
            expect(iHcSeries[0].yAxis).toEqual(0);
            expect(iHcSeries[1].yAxis).toEqual(1);
            expect(iHcSeries[2].yAxis).toEqual(0);
        });
        it("Cada serie tiene su color correspondiente", () => {
            const colorArray = (Object as any).values(Colors);
            expect(iHcSeries[0].color).toEqual(colorArray[0].code);
            expect(iHcSeries[1].color).toEqual(colorArray[1].code);
            expect(iHcSeries[2].color).toEqual(colorArray[2].code);
        });

    })

})