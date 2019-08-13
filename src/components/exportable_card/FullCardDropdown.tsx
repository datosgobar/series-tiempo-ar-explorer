import * as React from 'react';
import { formatUrl, viewDatosGobAr } from '../common/linkBuilders';
import FullCardDropdownContainer from '../style/exportable_card/FullCardDropdownContainer';
import LinkShareItem from '../style/Share/LinkShareItem';
import { ICardLinksOptions } from './FullCardLinks';
import { cardWebCode } from '../common/webCodeBuilders';

export default (props: {options: ICardLinksOptions}) =>
    <FullCardDropdownContainer text="Enlaces">
        <LinkShareItem url={viewDatosGobAr(props.options.serieId)} text="Enlace web" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "csv")} text="Enlace CSV" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "json")} text="Enlace JSON" />
        <LinkShareItem url={cardWebCode(props.options)} text="Código web" />
    </FullCardDropdownContainer>

export interface IWebSnippetOptions {
    serieId: string,
    color: string,
    links: string
    hasChart: string,
    chartType?: string,
    title?: string;
    source?: string;
    units?: string;
    hasFrame?: boolean;
    hasColorBar?: boolean;
}