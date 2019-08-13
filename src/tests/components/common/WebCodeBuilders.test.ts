import { IWebSnippetOptions } from "../../../components/exportable_card/FullCardDropdown";
import { cardWebCode } from "../../../components/common/webCodeBuilders";

describe('Generation of copyable web code for components', () => {

    describe('Copyable web code for a Card component', () => {

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

    })

})