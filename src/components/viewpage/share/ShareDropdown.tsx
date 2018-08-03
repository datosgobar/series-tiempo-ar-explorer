import * as React from 'react';

import LinkShareItem from "../../style/Share/LinkShareItem";
import ShareDropdownContainer from "../../style/Share/ShareDropdownContainer";


interface IShareDropdownProps {
    url: string;
}

export default (props: IShareDropdownProps) =>
    <ShareDropdownContainer text="Enlaces para compartir">
        <LinkShareItem url={props.url} text="Enlace web" />
        <LinkShareItem url={props.url} text="Enlace CSV" />
        <LinkShareItem url={props.url} text="Enlace JSON" />
    </ShareDropdownContainer>
