import * as React from 'react';
import ChartTypeSelector from '../../../api/ChartTypeSelector';
import { ISerie } from '../../../api/Serie';
import LinkShareItem from "../../style/Share/LinkShareItem";
import ShareDropdownContainer from "../../style/Share/ShareDropdownContainer";


interface IShareDropdownProps {
    url: string;
    series: ISerie[]
}

export default (props: IShareDropdownProps) =>
    <ShareDropdownContainer text="Enlaces para compartir">
        <LinkShareItem url={webShareURL()} text="Enlace web" />
        <LinkShareItem url={csvShareURL(props.url)} text="Enlace CSV" />
        <LinkShareItem url={jsonShareURL(props.url)} text="Enlace JSON" />
        <LinkShareItem url={webCodeUrl(props.url, props.series)} text="Código web" />
    </ShareDropdownContainer>


function webShareURL(): string {
    return window.location.href;
}

function csvShareURL(url: string): string {
    const host = url.split('?')[0];
    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);
    urlSearchParams.delete('metadata');
    urlSearchParams.delete('start');
    urlSearchParams.delete('chartType');

    return `${urlToString(`${host}?${urlSearchParams.toString()}`)}&format=csv`;
}

function jsonShareURL(url: string): string {
    return `${cleanUrl(url)}&format=json`;
}

function urlToString(url: string): string {
    return url.replace(new RegExp('%2C', 'g'), ',')
              .replace(new RegExp('%3A', 'g'), ':')
              .replace(new RegExp('%2F', 'g'), '/')
              .replace(new RegExp('%3F', 'g'), '?');
}

function webCodeUrl(url: string, series: ISerie[]): string {
    return "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.0/dist/js/components.js'></script>\n" +
        "<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.0/dist/css/components.css'/>\n" +
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

function cleanUrl(url: string): string {
    const host = url.split('?')[0];
    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);
    urlSearchParams.delete('chartType');

    return `${urlToString(`${host}?${urlSearchParams.toString()}`)}`;
}
