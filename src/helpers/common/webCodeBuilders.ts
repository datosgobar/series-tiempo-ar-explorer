import { IWebSnippetOptions } from "../../components/exportable_card/FullCardDropdown";
import { ISerie } from "../../api/Serie";
import ChartTypeSelector from "../../api/ChartTypeSelector";
import { cleanUrl } from "../graphic/graphicLinkBuilders";

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

    return "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.1/dist/js/components.js'></script>\n" +
    "<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.1/dist/css/components.css'/>\n" +
    "<div id=\"root\"></div>\n" +
    "<script>\n" +
    "    window.onload = function() {\n" +
    "        TSComponents.Graphic.render('root', {\n" +
    "            graphicUrl: '" + cleanUrl(url) +"',\n"+
    "            title: '" + calculateChartTitle(series) + "',\n" +
    "            source: '" + calculateChartSource(series) + "',\n" +
    "            chartTypes: " + JSON.stringify(calculateChartTypes(url, series)) + ",\n" +
    "        })\n" +
    "    }\n" +
    "</script>\n"

}

function calculateChartTitle(series: ISerie[]): string {
    return series.length > 1 ? series[0].datasetTitle : series[0].description;
}

function calculateChartSource(series: ISerie[]): string {
    return Array.from(new Set(series.map((serie: ISerie) => serie.datasetSource))).join(', ')
}

function calculateChartTypes(url: string, series: ISerie[]): any {
    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);

    const chartTypeSelector = new ChartTypeSelector(series, urlSearchParams);
    return chartTypeSelector.getChartTypesBySeries();
}