import * as React from 'react';
import { formatUrl } from "../../helpers/card/cardLinkBuilders";


export default (props: { downloadUrl: string }) =>
    <a href={formatUrl(props.downloadUrl, "csv")}>Descargar</a>
