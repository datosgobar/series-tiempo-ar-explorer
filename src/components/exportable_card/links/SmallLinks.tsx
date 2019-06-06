import * as React from 'react';
import FullCardEnlaces from '../FullCardEnlaces';


export default (props: {serieId: string, downloadUrl: string}) =>
    <div className="full-card-links">
        <FullCardEnlaces serieId={props.serieId} downloadUrl={props.downloadUrl} />
    </div>
