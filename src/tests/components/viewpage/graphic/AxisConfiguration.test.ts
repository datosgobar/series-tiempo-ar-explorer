import { ISerie } from "../../../../api/Serie";
import SerieConfig from "../../../../api/SerieConfig";
import { IYAxisConf, ISeriesAxisSides } from "../../../../components/viewpage/graphic/Graphic";
import { generateYAxisBySeries } from "../../../../components/viewpage/graphic/axisConfiguration";

describe("Axis Configuration functions", () => {

    let mockSerieOne: ISerie;
    let mockSerieTwo: ISerie;
    let series: ISerie[];
    let seriesConfig: SerieConfig[];
    let yAxisBySeries: IYAxisConf;
    const locale = 'AR';
    const formatUnits = false;

    function generateMockSerieOne() {
        return {
            accrualPeriodicity: "Mensual",
            collapseAggregation: "CollapseAgregation",
            data: [{ date: "2018-07-01", value: 145.30019275372558 },
            { date: "2018-08-01", value: 145.96423636915267 },
            { date: "2018-09-01", value: 138.2697148141647 },
            { date: "2018-10-01", value: 142.93901932020637 },
            { date: "2018-11-01", value: 140.9176486292864 },
            { date: "2018-12-01", value: 136.7947106501288 },
            { date: "2019-01-01", value: 135.52989549467978 },
            { date: "2019-02-01", value: 132.32429767911992 },
            { date: "2019-03-01", value: 144.47228283126861 },
            { date: "2019-04-01", value: 151.03561866080827 }],
            datasetSource: "Instituto Nacional de Estadística y Censos (INDEC)",
            datasetTitle: "Estimador Mensual de Actividad Económica (EMAE). Base 2004",
            description: "EMAE. Base 2004",
            distributionTitle: "EMAE. Índice Base 2004.Valores mensuales.",
            downloadURL: "https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=10&format=csv",
            endDate: "2018-07-01",
            frequency: "Mensual",
            id: "TestId",
            isPercentage: false,
            issued: "2017-09-28",
            landingPage: "LandingPage",
            maxValue: 155,
            minValue: 130,
            modified: "Modified",
            publisher: {
                mbox: "Mbox",
                name: "Name"
            },
            representationMode: "value",
            representationModeUnits: "Índice 2004=100",
            startDate: "2019-04-01",
            themes: [{ id: "1", descripcion: "Tema1", label: "Label1" },
            { id: "2", descripcion: "Tema2", label: "Label2" },
            { id: "3", descripcion: "Tema3", label: "Label3" }],
            timeIndexSize: 3,
            title: "EMAE. Base 2004",
            units: "Índice 2004=100",
        };
    }

    function generateMockSerieTwo() {
        return {
            accrualPeriodicity: "Mensual",
            collapseAggregation: "CollapseAgregation",
            data: [{ date: "2018-09-01", value: 33896 },
            { date: "2018-10-01", value: 35567 },
            { date: "2018-11-01", value: 29485 },
            { date: "2018-12-01", value: 25159 },
            { date: "2019-01-01", value: 40256 },
            { date: "2019-02-01", value: 31843 },
            { date: "2019-03-01", value: 30292 },
            { date: "2019-04-01", value: 28645 },
            { date: "2019-05-01", value: 25409 },
            { date: "2019-64-01", value: 20284 }],
            datasetSource: "Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.",
            datasetTitle: "Indicadores Sectoriales de Motos",
            description: "Motos: número de patentamientos de motocicletas",
            distributionTitle: "Motos: número de patentamientos por categoría de motocicleta (series)",
            downloadURL: "https://apis.datos.gob.ar/series/api/series/?ids=Motos_patentamiento_8myrF9&last=10&format=csv",
            endDate: "2018-09-01",
            frequency: "Mensual",
            id: "Motos_patentamiento_8myrF9",
            isPercentage: false,
            issued: "2018-06-12",
            landingPage: "LandingPage",
            maxValue: 45000,
            minValue: 15000,
            modified: "Modified",
            publisher: {
                mbox: "Mbox",
                name: "Name"
            },
            representationMode: "value",
            representationModeUnits: "Unidades",
            startDate: "2019-06-01",
            themes: [{ id: "1", descripcion: "Tema1", label: "Label1" },
            { id: "2", descripcion: "Tema2", label: "Label2" },
            { id: "3", descripcion: "Tema3", label: "Label3" }],
            timeIndexSize: 3,
            title: "Motos: número de patentamientos de motocicletas",
            units: "Unidades",
        };
        
    }

    beforeAll(() => {
        mockSerieOne = generateMockSerieOne();
        mockSerieTwo = generateMockSerieTwo();
        series = [mockSerieOne, mockSerieTwo];
        seriesConfig = [new SerieConfig(mockSerieOne),
                        new SerieConfig(mockSerieTwo)];
    })

    describe("Default axis configuration, without optional parameter", () => {     

        beforeAll(() => {
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale);
        })

        it("Each unit label goes to a different axis", () => {
            expect(yAxisBySeries.TestId.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("Unit label titles are properly written", () => {
            expect(yAxisBySeries.TestId.title.text).toEqual("Índice 2004=100");
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.title.text).toEqual("Unidades");
        });
        it("Each unit values column goes to a different axis", () => {
            expect(yAxisBySeries.TestId.yAxis).toEqual(1);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(0);
        });

    })

    describe("Explicit configuration, switching the default sides", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'TestId': 'left',
                                                  'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Originally left-sided serie goes to the right", () => {
            expect(yAxisBySeries.TestId.opposite).toBe(false);
            expect(yAxisBySeries.TestId.yAxis).toEqual(0);
        });
        it("Originally right-sided serie goes to the left", () => {
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });

    })

    describe("Explicit configuration, both on the left side", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'TestId': 'left',
                                                  'Motos_patentamiento_8myrF9': 'left' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.TestId.opposite).toBe(false);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(false);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.TestId.yAxis).toEqual(0);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(0);
        });

    })

    describe("Explicit configuration, both on the right side", () => {

        beforeAll(() => {
            const axisSides: ISeriesAxisSides = { 'TestId': 'right',
                                                  'Motos_patentamiento_8myrF9': 'right' }
            yAxisBySeries = generateYAxisBySeries(series, seriesConfig, formatUnits, locale, axisSides);
        })

        it("Every unit label goes to the right axis", () => {
            expect(yAxisBySeries.TestId.opposite).toBe(true);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.opposite).toBe(true);
        });
        it("Every unit value to the right axis", () => {
            expect(yAxisBySeries.TestId.yAxis).toEqual(1);
            expect(yAxisBySeries.Motos_patentamiento_8myrF9.yAxis).toEqual(1);
        });

    })

})