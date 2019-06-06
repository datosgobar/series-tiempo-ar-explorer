import * as React from 'react';
import { formatUrl, viewDatosGobAr, webCode } from '../common/linkBuilders';
import LinkShareItem from '../style/Share/LinkShareItem';
import ShareDropdownContainer from '../style/Share/ShareDropdownContainer';
import { ICardLinksOptions } from './FullCardLinks';

export default (props: {options: ICardLinksOptions}) =>
    <ShareDropdownContainer text="Enlaces">
        <LinkShareItem url={viewDatosGobAr(props.options.serieId)} text="Enlace web" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "csv")} text="Enlace CSV" />
        <LinkShareItem url={formatUrl(props.options.downloadUrl, "json")} text="Enlace JSON" />
        <LinkShareItem url={webCode(props.options)}
                       text="Código web" />
    </ShareDropdownContainer>
