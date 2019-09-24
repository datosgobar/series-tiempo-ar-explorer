import { ISerie } from "../../../api/Serie";
import { IWebSnippetOptions } from "../../../components/exportable_card/FullCardDropdown";
import { calculateChartSource, calculateChartTitle, cardWebCode, calculateChartType, graphicWebCode } from "../../../helpers/common/webCodeBuilders";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageYearMockSerie } from "../../support/mockers/seriesMockers";

describe('Generation of copyable web code for the Card component', () => {

    let options: IWebSnippetOptions;
    let expectedScript: string;
    let generatedCode: string;

    beforeEach(() => {
        options = {
            color: 'F9A822',
            links: 'small',
            hasChart: 'small',
            serieId: '42.3_EPH_PUNTUATAL_0_M_30',
        };
    })

    it('Only mandatory parameters specified', () => {
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Locale specified as well', () => {
        options.locale = 'US';
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            locale: "US"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('ChartType specified as well', () => {
        options.chartType = 'small';
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            chartType: "small"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Explicit Sign specified as well', () => {
        options.explicitSign = true;
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            explicitSign: true
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Title specified as well', () => {
        options.title = 'Desocupacion';
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            title: "Desocupacion"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Source specified as well', () => {
        options.source = 'INDEC';
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            source: "INDEC"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Units specified as well', () => {
        options.units = '';
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            units: ""
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('HasFrame specified as well', () => {
        options.hasFrame = true;
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            hasFrame: true
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('HasColorBar specified as well', () => {
        options.hasColorBar = false;
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            hasColorBar: false
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Collapse specified as well', () => {
        options.collapse = "month";
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            collapse: "month"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Api Base URL specified as well', () => {
        options.apiBaseUrl = "myUrl.com";
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            apiBaseUrl: "myUrl.com"
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

    it('Decimals amount specified as well', () => {
        options.decimals = 3;
        expectedScript = `<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "42.3_EPH_PUNTUATAL_0_M_30",
            color: "F9A822",
            links: "small",
            hasChart: "small",
            decimals: 3
        })
    }
</script>
`;
        generatedCode = cardWebCode(options);
        expect(generatedCode).toContain(expectedScript);
    });

})

describe("Generation of copyable web code for the Graphic component", () => {

    let serieOne: ISerie;
    let serieTwo: ISerie;
    let serieThree: ISerie;
    let series: ISerie[];

    beforeAll(() => {
        serieOne = generateCommonMockSerieEMAE();
        serieTwo = generateCommonMockSerieMotos();
        serieThree = generatePercentageYearMockSerie();
    })

    describe("Obtainment of the chart's title, upon the series involved", () => {

        let title: string;

        it("If there is only one serie, its description is used as title", () => {
            series = [serieOne];
            title = calculateChartTitle(series);
            expect(title).toEqual("EMAE. Base 2004");
        });
        it("If there are multiple series, the title of the first one's dataset is used as title", () => {
            series = [serieThree, serieTwo];
            title = calculateChartTitle(series);
            expect(title).toEqual("Estimador Mensual de Actividad Económica (EMAE). Base 2004");
        });

    })

    describe("Obtainment of the chart's source text, upon the series involved", () => {

        let source: string;

        it("If there is only one serie, the source of its dataset is used as text", () => {
            series = [serieTwo];
            source = calculateChartSource(series);
            expect(source).toEqual("Fuente: Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.");
        });
        it("If there are multiple series, text is pluralized and separates dataset sources with ',' characters", () => {
            series = [serieOne, serieTwo];
            source = calculateChartSource(series);
            expect(source).toEqual("Fuentes: Instituto Nacional de Estadística y Censos (INDEC), Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.");
        });
        it("If every series have the same dataset source, it is written only once and text is singular", () => {
            series = [serieOne, serieThree];
            source = calculateChartSource(series);
            expect(source).toEqual("Fuente: Instituto Nacional de Estadística y Censos (INDEC)");
        });
        it("If some series have the same dataset source, text is pluralized and the source of such is written only once", () => {
            series = [serieOne, serieTwo, serieThree];
            source = calculateChartSource(series);
            expect(source).toEqual("Fuentes: Instituto Nacional de Estadística y Censos (INDEC), Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.");
        });

    })

    describe("Obtainment of the series' chartType, upon the URL", () => {

        let url: string;
        let chartType: string | null;

        it("If the URL has a chartType query param, it is returned", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=116.3_TCRMA_0_M_36&chartType=column";
            chartType = calculateChartType(url);
            expect(chartType).toEqual("column");
        });
        it("If the URL has no chartType query param, null is returned", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=328.1_ELECTRICIDGUA__21";
            chartType = calculateChartType(url);
            expect(chartType).toBeNull();
        });

    })

    describe("Generation of the whole copyable web content for the component", () => {

        let url: string;
        let expectedTitle: string;
        let expectedSource: string;
        let expectedURL: string;
        let expectedChartType: string;
        let generatedCode: string;
        
        beforeAll(() => {
            series =  [serieOne, serieTwo, serieThree];
            expectedURL = `graphicUrl: "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21,143.3_NO_PR_2004_A_21:percent_change_a_year_ago,Motos_patentamiento_8myrF9&limit=5000",`
            expectedTitle = `"Estimador Mensual de Actividad Económica (EMAE). Base 2004",`;
            expectedSource = `"Fuentes: Instituto Nacional de Estadística y Censos (INDEC), Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo."`;
        })

        function expectGeneration() {
            expect(generatedCode).toContain(expectedURL);
            expect(generatedCode).toContain(expectedTitle);
            expect(generatedCode).toContain(expectedSource);
        }

        it("With no chartType specified at URL", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21,143.3_NO_PR_2004_A_21:percent_change_a_year_ago,Motos_patentamiento_8myrF9&limit=5000";
            generatedCode = graphicWebCode(url, series);
            expectGeneration();
        });
        it("With line chartType specified at URL, it does not append the parameter to the code", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21,143.3_NO_PR_2004_A_21:percent_change_a_year_ago,Motos_patentamiento_8myrF9&limit=5000&chartType=line";
            generatedCode = graphicWebCode(url, series);
            expect(generatedCode).not.toContain(`chartType: "`);
            expectGeneration();
        });
        it("With not-line chartType specified, the parameter is appended to the code, and a ',' character as well", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21,143.3_NO_PR_2004_A_21:percent_change_a_year_ago,Motos_patentamiento_8myrF9&limit=5000&chartType=area";
            generatedCode = graphicWebCode(url, series);
            expectedChartType = `chartType: "area"`;
            expectedSource = `"Fuentes: Instituto Nacional de Estadística y Censos (INDEC), Ministerio de Producción. Secretaría de la Transformación Productiva. Subsecretaría de Desarrollo y Planeamiento Productivo.",`;
            expectGeneration();
            expect(generatedCode).toContain(expectedChartType);
        });

    })

})