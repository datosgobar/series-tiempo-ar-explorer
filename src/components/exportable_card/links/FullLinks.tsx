import * as React from 'react';
import FullCardDownload from '../FullCardDownload';
import FullCardEnlaces from '../FullCardEnlaces';
import FullCardViewMore from '../FullCardViewMore';


export default (props: {serieId: string, downloadUrl: string}) =>
    <div className="full-card-links">
        <FullCardDownload downloadUrl={props.downloadUrl} />
        <FullCardViewMore serieId={props.serieId} />
        <FullCardEnlaces downloadUrl={props.downloadUrl} />
    </div>
