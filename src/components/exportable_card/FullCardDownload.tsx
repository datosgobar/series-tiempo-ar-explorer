import * as React from 'react';


export default (props: {downloadUrl: string}) =>
    <a href={csvUrl(props.downloadUrl)} className="full-card-download">Descargar</a>


export function csvUrl(url: string): string {
    return `${url}&format=csv`
}
