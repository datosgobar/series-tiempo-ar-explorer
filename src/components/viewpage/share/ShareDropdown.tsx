import * as React from 'react';

import LinkShareItem from "../../style/Share/LinkShareItem";
import ShareDropdownContainer from "../../style/Share/ShareDropdownContainer";
import LinkShare from "./LinkShare";


interface IShareDropdownProps {
    url: string;
}

export default (props: IShareDropdownProps) =>
    <ShareDropdownContainer text="Enlaces para compartir">
        <LinkShareItem><LinkShare url={props.url} text="Enlace web" /></LinkShareItem>
        <LinkShareItem><LinkShare url={props.url} text="Enlace CSV" /></LinkShareItem>
        <LinkShareItem><LinkShare url={props.url} text="Enlace JSON" /></LinkShareItem>
    </ShareDropdownContainer>
