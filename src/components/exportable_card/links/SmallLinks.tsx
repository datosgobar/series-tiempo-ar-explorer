import * as React from 'react';
import FullCardDropdown from '../FullCardDropdown';


export default (props: {serieId: string, downloadUrl: string}) =>
    <div className="full-card-links">
        <FullCardDropdown serieId={props.serieId} downloadUrl={props.downloadUrl} />
    </div>
