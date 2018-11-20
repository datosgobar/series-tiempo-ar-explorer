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
        <LinkShareItem url={webCodeUrl()} text="Código web" />
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

function webCodeUrl(): string {
    return "<script type='javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@graphic/dist/js/graphic.js'/>\n" +
        "<div id=\"root\"></div>\n" +
        "<script>\n" +
        "    window.onload = function() {\n" +
        "        TSExplorer.render('root', {\n" +
        "            serieIds: [\n" +
        "                \"103.1_I2N_2016_M_15\",\n" +
        "                \"168.1_T_CAMBIOR_D_0_0_26\",\n" +
        "                \"308.1_PIB_IMPORTNES_0_T_17\"\n" +
        "            ],\n" +
        "            seriesApiUri: \"https://apis-stg.datos.gob.ar/series/api\",\n" +
        "            chartOptions: { // Override highstock configs. See https://api.highcharts.com/highstock/\n" +
        "            }\n" +
        "        })\n" +
        "    }\n" +
        "</script>\n"
}