import * as React from 'react';

import LinkShareItem from "../../style/Share/LinkShareItem";
import ShareDropdownContainer from "../../style/Share/ShareDropdownContainer";


interface IShareDropdownProps {
    url: string;
    chartTitle: string;
    chartSource: string;
    chartTypes: any;
}

export default (props: IShareDropdownProps) =>
    <ShareDropdownContainer text="Enlaces para compartir">
        <LinkShareItem url={webShareURL(props.url)} text="Enlace web" />
        <LinkShareItem url={csvShareURL(props.url)} text="Enlace CSV" />
        <LinkShareItem url={jsonShareURL(props.url)} text="Enlace JSON" />
        <LinkShareItem url={webCodeUrl(props.url, props.chartTitle, props.chartSource, props.chartTypes)} text="Código web" />
    </ShareDropdownContainer>


function webShareURL(url: string): string {
    return window.location.href;
}

function csvShareURL(url: string): string {
    const urlSearchParams = new URLSearchParams(url);
    urlSearchParams.delete('metadata');
    urlSearchParams.delete('start');

    return `${urlToString(urlSearchParams.toString())}&format=csv`;
}

function jsonShareURL(url: string): string {
    return `${url}&format=json`;
}

function urlToString(url: string): string {
    return url.replace(new RegExp('%2C', 'g'), ',')
              .replace(new RegExp('%3A', 'g'), ':')
              .replace(new RegExp('%2F', 'g'), '/')
              .replace(new RegExp('%3F', 'g'), '?');
}

function webCodeUrl(url: string, chartTitle: string, chartSource: string, chartTypes: any): string {
    return "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_1.18.0/dist/js/components.js'></script>\n" +
        "<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_1.18.0/dist/css/components.css'/>\n" +
        "<div id=\"root\"></div>\n" +
        "<script>\n" +
        "    window.onload = function() {\n" +
        "        TSComponents.Graphic.render('root', {\n" +
        "            graphicUrl: '" + url +"',\n"+
        "            chartOptions: { // Override highstock configs. See https://api.highcharts.com/highstock/\n" +
        "            },\n" +
        "            title: '" + chartTitle + "',\n" +
        "            source: '" + chartSource + "',\n" +
        "            chartTypes: " + JSON.stringify(chartTypes) + ",\n" +
        "        })\n" +
        "    }\n" +
        "</script>\n"
}
