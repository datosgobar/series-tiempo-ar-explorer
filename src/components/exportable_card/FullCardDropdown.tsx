import * as React from 'react';
import { formatUrl, viewDatosGobAr } from '../common/linkBuilders';
import FullCardDropdownContainer from '../style/exportable_card/FullCardDropdownContainer';
import LinkShareItem from '../style/Share/LinkShareItem';
import { ICardLinksOptions } from './FullCardLinks';

export default (props: {options: ICardLinksOptions}) =>
    <FullCardDropdownContainer text="Enlaces">
        <LinkShareItem url={viewDatosGobAr(props.options.serieId)} text="Enlace web" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "csv")} text="Enlace CSV" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "json")} text="Enlace JSON" />
        <LinkShareItem url={webCode(props.options)} text="Código web" />
    </FullCardDropdownContainer>

export interface IWebSnippetOptions {
    serieId: string,
    color: string,
    links: string
    hasChart: string,
    chartType: string,
    title: string;
    source: string;
    units: string;
    hasFrame: boolean;
    hasColorBar: boolean;
}

function webCode(options: IWebSnippetOptions): string {

    let htmlScript = `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0.4/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0.4/dist/css/components.css'/>
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
            hasFrame: "${options.hasFrame}"`;
    }
    if(options.hasColorBar !== undefined)
    {
        htmlScript += `,
            hasColorBar: "${options.hasColorBar}"`;
    }

    htmlScript += `
        })
    }
</script>
`

    return htmlScript
}