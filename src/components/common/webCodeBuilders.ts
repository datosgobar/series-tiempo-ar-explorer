import { IWebSnippetOptions } from "../exportable_card/FullCardDropdown";

export function cardWebCode(options: IWebSnippetOptions): string {

    let htmlScript = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.1/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.1/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "${options.serieId}",
            color: "${options.color}",
            links: "${options.links}",
            hasChart: "${options.hasChart}"`;

    if(options.chartType !== undefined)
    {
        htmlScript += `,
            chartType: "${options.chartType}"`;
    }
    if(options.title !== undefined)
    {
        htmlScript += `,
            title: "${options.title}"`;
    }
    if(options.source !== undefined)
    {
        htmlScript += `,
            source: "${options.source}"`;
    }
    if(options.units !== undefined)
    {
        htmlScript += `,
            units: "${options.units}"`;
    }
    if(options.hasFrame !== undefined)
    {
        htmlScript += `,
            hasFrame: ${options.hasFrame}`;
    }
    if(options.hasColorBar !== undefined)
    {
        htmlScript += `,
            hasColorBar: ${options.hasColorBar}`;
    }
    if(options.collapse !== undefined)
    {
        htmlScript += `,
            collapse: '${options.collapse}'`;
    }

    htmlScript += `
        })
    }
</script>
`;

    return htmlScript;
}