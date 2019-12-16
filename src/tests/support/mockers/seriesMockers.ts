export function generateCommonMockSerieEMAE() {

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
        frequency: "month",
        hits90Days: 323,
        id: "EMAE2004",
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
        significantFigures: 2,
        startDate: "2019-04-01",
        themes: [{ id: "1", descripcion: "Tema1", label: "Label1" },
        { id: "2", descripcion: "Tema2", label: "Label2" },
        { id: "3", descripcion: "Tema3", label: "Label3" }],
        timeIndexSize: 3,
        title: "EMAE. Base 2004",
        units: "Índice 2004=100",
    };
}

export function generateCommonMockSerieMotos() {

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
        { date: "2019-04-01", value: 20284 }],
        datasetSource: "Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.",
        datasetTitle: "Indicadores Sectoriales de Motos",
        description: "Motos: número de patentamientos de motocicletas",
        distributionTitle: "Motos: número de patentamientos por categoría de motocicleta (series)",
        downloadURL: "https://apis.datos.gob.ar/series/api/series/?ids=Motos_patentamiento_8myrF9&last=10&format=csv",
        endDate: "2018-09-01",
        frequency: "month",
        hits90Days: 48,
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
        significantFigures: 2,
        startDate: "2019-06-01",
        themes: [{ id: "1", descripcion: "Tema1", label: "Label1" },
        { id: "2", descripcion: "Tema2", label: "Label2" },
        { id: "3", descripcion: "Tema3", label: "Label3" }],
        timeIndexSize: 3,
        title: "Motos: número de patentamientos de motocicletas",
        units: "Unidades",
    };
    
}

export function generatePercentageMockSerie() {

    const serie = generateCommonMockSerieEMAE();
    serie.representationMode = "percent_change";
    return serie;

}

export function generatePercentageYearMockSerie() {

    const serie = generateCommonMockSerieEMAE();
    serie.representationMode = "percent_change_a_year_ago";
    return serie;

}

export function generateYearlyFrequencySerie() {
    const serie = generateCommonMockSerieEMAE();
    serie.accrualPeriodicity = "Anual";
    return serie;
}

export function generateDailyFrequencySerie() {
    const serie = generateCommonMockSerieEMAE();
    serie.accrualPeriodicity = "Diaria";
    return serie;
}

export function generateEmptySerie() {

    const serie = generateCommonMockSerieEMAE();
    serie.data = [];
    return serie;

}