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
    </ShareDropdownContainer>


function webShareURL(url: string): string {
    return window.location.href;
}


function csvShareURL(url: string): string {
    return `${url}&format=csv`;
}


function jsonShareURL(url: string): string {
    return `${url}&format=json`;
}