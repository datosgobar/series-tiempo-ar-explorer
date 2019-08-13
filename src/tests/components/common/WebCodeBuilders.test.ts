import { IWebSnippetOptions } from "../../../components/exportable_card/FullCardDropdown";
import { cardWebCode } from "../../../components/common/webCodeBuilders";

describe('Generation of copyable web code for components', () => {

    describe('Copyable web code for a Card component', () => {

        let options: IWebSnippetOptions;
        let expectedCode: string;

        beforeEach(() => {
            options = {
                color: 'F9A822',
                links: 'small',
                hasChart: 'small',
                serieId: '42.3_EPH_PUNTUATAL_0_M_30',
            };
        })

        it('Only mandatory parameters specified', () => {
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('ChartType specified as well', () => {
            options['chartType'] = 'small';
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('Title specified as well', () => {
            options['title'] = 'Desocupacion';
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('Source specified as well', () => {
            options['source'] = 'INDEC';
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('Units specified as well', () => {
            options['units'] = '';
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('HasFrame specified as well', () => {
            options['hasFrame'] = true;
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });
        it('HasColorBar specified as well', () => {
            options['hasColorBar'] = false;
            expectedCode = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.2.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
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
            const actualCode = cardWebCode(options);
            expect(actualCode).toEqual(expectedCode);
        });

    })

})