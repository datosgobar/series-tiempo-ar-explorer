import * as React from 'react';
import LinkShareItem from '../style/Share/LinkShareItem';
import ShareDropdownContainer from '../style/Share/ShareDropdownContainer';


export default (props: {downloadUrl: string}) =>
    <ShareDropdownContainer text="Enlaces">
        <LinkShareItem url={props.downloadUrl} text="Enlace web" />
        <LinkShareItem url={props.downloadUrl} text="Enlace CSV" />
        <LinkShareItem url={props.downloadUrl} text="Enlace JSON" />
        <LinkShareItem url={props.downloadUrl} text="Código web" />
    </ShareDropdownContainer>
