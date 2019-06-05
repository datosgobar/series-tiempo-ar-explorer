import * as React from 'react';
import FullCardEnlaces from '../FullCardEnlaces';


export default (props: {downloadUrl: string}) =>
    <div className="full-card-links">
        <FullCardEnlaces downloadUrl={props.downloadUrl} />
    </div>
