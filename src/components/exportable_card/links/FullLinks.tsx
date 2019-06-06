import * as React from 'react';
import FullCardDownload from '../FullCardDownload';
import FullCardDropdown from '../FullCardDropdown';
import FullCardViewMore from '../FullCardViewMore';


export default (props: {serieId: string, downloadUrl: string}) =>
    <div className="full-card-links">
        <FullCardDownload downloadUrl={props.downloadUrl} />
        <FullCardViewMore serieId={props.serieId} />
        <FullCardDropdown serieId={props.serieId} downloadUrl={props.downloadUrl} />
    </div>
