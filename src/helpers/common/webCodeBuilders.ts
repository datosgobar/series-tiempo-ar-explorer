import { ISerie } from "../../api/Serie";
import { IWebSnippetOptions } from "../../components/exportable_card/FullCardDropdown";
import { cleanUrl } from "../graphic/graphicLinkBuilders";

export function cardWebCode(options: IWebSnippetOptions): string {

    let htmlScript = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.7.0/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.7.0/dist/css/components.css'/>
<link type='text/css' rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' media='all' />"
<div id="root"></div>
<script>
    window.onload = function() {
        TSComponents.Card.render('root', {
            serieId: "${options.serieId}",
            color: "${options.color}",
            links: "${options.links}",
            hasChart: "${options.hasChart}"`;

    if(options.locale !== undefined)
    {
        htmlScript += `,
            locale: "${options.locale}"`;
    }
    if(options.chartType !== undefined)
    {
        htmlScript += `,
            chartType: "${options.chartType}"`;
    }
    if(options.explicitSign !== undefined)
    {
        htmlScript += `,
            explicitSign: ${options.explicitSign}`;
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
            collapse: "${options.collapse}"`;
    }
    if(options.apiBaseUrl !== undefined)
    {
        htmlScript += `,
            apiBaseUrl: "${options.apiBaseUrl}"`;
    }
    if(options.decimals !== undefined)
    {
        htmlScript += `,
            decimals: ${options.decimals}`;
    }

    htmlScript += `
        })
    }
</script>
`;

    return htmlScript;
}

export function graphicWebCode(url: string, series: ISerie[]): string {

    const graphicUrl = cleanUrl(url);
    const title = calculateChartTitle(series);
    const source = calculateChartSource(series);
    const chartType = calculateChartType(url);

    let htmlScript = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.10/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.10/dist/css/components.css'/>
<div id=\"root\"></div>
<script>
    window.onload = function() {
        TSComponents.Graphic.render('root', {
            graphicUrl: "${graphicUrl}",
            title: "${title}",
            source: "${source}"`;

    if(chartType !== null && chartType !== "line") {
        htmlScript += `,
            chartType: "${chartType}"`;
    }

    htmlScript += `
        })
    }
</script>
`;
    
    return htmlScript;

}

export function calculateChartTitle(series: ISerie[]): string {
    return series.length > 1 ? series[0].datasetTitle : series[0].description;
}

export function calculateChartSource(series: ISerie[]): string {

    const sources = Array.from(new Set(series.map((serie: ISerie) => serie.datasetSource)));
    if(sources.length > 1) {
        const sourcesString = sources.join(', ');
        return `Fuentes: ${sourcesString}`;
    }
    return `Fuente: ${sources[0]}`;

}

export function calculateChartType(url: string): string | null {

    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);
    return urlSearchParams.get('chartType');

}