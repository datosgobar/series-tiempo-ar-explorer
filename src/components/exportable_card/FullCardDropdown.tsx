import * as React from 'react';
import { formatUrl, viewDatosGobAr } from "../../helpers/card/cardLinkBuilders";
import FullCardDropdownContainer from '../style/exportable_card/FullCardDropdownContainer';
import LinkShareItem from '../style/Share/LinkShareItem';
import { ICardLinksOptions } from './FullCardLinks';
import { cardWebCode } from '../../helpers/common/webCodeBuilders';

export default (props: {options: ICardLinksOptions}) =>
    <FullCardDropdownContainer text="Enlaces">
        <LinkShareItem url={viewDatosGobAr(props.options.serieId, props.options.collapse)} text="Enlace web" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "csv")} text="Enlace CSV" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "json")} text="Enlace JSON" />
        <LinkShareItem url={cardWebCode(props.options)} text="Código web" />
    </FullCardDropdownContainer>

export interface IWebSnippetOptions {
    serieId: string;
    color: string;
    links: string;
    hasChart: string;
    locale?: string;
    chartType?: string;
    explicitSign?: boolean;
    title?: string;
    source?: string;
    units?: string;
    hasFrame?: boolean;
    hasColorBar?: boolean;
    collapse?: string;
    apiBaseUrl?: string;
    decimals?: number;
}