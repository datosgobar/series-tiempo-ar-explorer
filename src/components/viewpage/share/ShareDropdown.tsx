import * as React from 'react';
import { ISerie } from '../../../api/Serie';
import { csvShareURL, jsonShareURL, webShareURL } from "../../../helpers/graphic/graphicLinkBuilders";
import { graphicWebCode } from '../../../helpers/common/webCodeBuilders';
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
        <LinkShareItem url={graphicWebCode(props.url, props.series)} text="Código web" />
    </ShareDropdownContainer>
