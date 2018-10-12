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