import * as React from 'react';
import { formatUrl } from '../common/linkBuilders';


export default (props: { downloadUrl: string }) =>
    <a href={formatUrl(props.downloadUrl, "csv")}>Descargar</a>
