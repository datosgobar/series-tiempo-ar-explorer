import * as React from 'react';

import LinkShareItem from "../../style/Share/LinkShareItem";
import ShareDropdownContainer from "../../style/Share/ShareDropdownContainer";


interface IShareDropdownProps {
    url: string;
}

export default (props: IShareDropdownProps) =>
    <ShareDropdownContainer text="Enlaces para compartir">
        <LinkShareItem url={webShareURL(props.url)} text="Enlace web" />
        <LinkShareItem url={csvShareURL(props.url)} text="Enlace CSV" />
        <LinkShareItem url={jsonShareURL(props.url)} text="Enlace JSON" />
        <LinkShareItem url={webCodeUrl(props.url)} text="Código web" />
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

function webCodeUrl(url: string): string {
    return "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_1.4/dist/js/components.js'></script>\n" +
        "<div id=\"root\"></div>\n" +
        "<script>\n" +
        "    window.onload = function() {\n" +
        "        TSComponents.Graphic.render('root', {\n" +
        "            graphicUrl: '" + url +"',\n"+
        "            chartOptions: { // Override highstock configs. See https://api.highcharts.com/highstock/\n" +
        "            },\n" +
        "            navigator: false,\n" +
        "            locale: 'AR',\n" +
        "            zoom: true,\n" +
        "            datePickerEnabled: true,\n" +
        "            exportable: true,\n" +
        "            colors: ['#0072BB', '#2E7D33', '#C62828', '#F9A822', '#6A1B99'],\n" +
        "            backgroundColor: '#ffffff00',\n" +
        "            legendField: 'description',\n" +
        "        })\n" +
        "    }\n" +
        "</script>\n"
}