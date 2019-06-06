import * as React from 'react';
import LinkShareItem from '../style/Share/LinkShareItem';
import ShareDropdownContainer from '../style/Share/ShareDropdownContainer';
import { csvUrl } from './FullCardDownload';
import { viewDatosGobAr } from './FullCardViewMore';


export default (props: {serieId: string, downloadUrl: string}) =>
    <ShareDropdownContainer text="Enlaces">
        <LinkShareItem url={viewDatosGobAr(props.serieId)} text="Enlace web" />
        <LinkShareItem url={csvUrl(props.downloadUrl)} text="Enlace CSV" />
        <LinkShareItem url={jsonUrl(props.downloadUrl)} text="Enlace JSON" />
        <LinkShareItem url={webCode(props.serieId)} text="Código web" />
    </ShareDropdownContainer>


function jsonUrl(url: string): string {
    return `${url}&format=json`
}

function webCode(serieId: string): string {
    return "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0/dist/js/components.js'></script>\n" +
            "<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0/dist/css/components.css'/>\n" +
            "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'> \n" +
            "<script src='https://code.jquery.com/jquery-3.4.1.min.js' integrity='sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=' crossorigin='anonymous'></script> \n" +
            "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' integrity='sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa' crossorigin='anonymous'></script> \n" +
            "<div id=\"root\"></div>\n" +
            "<script>\n" +
            "    window.onload = function() {\n" +
            "        TSComponents.Card.render('root', {\n" +
            "            serieId: '" + serieId +"',\n"+
            "        })\n" +
            "    }\n" +
            "</script>\n"
}
