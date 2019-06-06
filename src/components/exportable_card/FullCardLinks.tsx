import * as React from 'react';
import FullLinks from './links/FullLinks';
import NullLinks from './links/NullLinks';
import SmallLinks from './links/SmallLinks';


const TYPES = {
    'full': FullLinks,
    'none': NullLinks,
    'small': SmallLinks,
}

export default (props: {serieId: string, links: string, downloadUrl: string}) => {
    const LinkComponent = TYPES[props.links]

    return <div> <LinkComponent  serieId={props.serieId} downloadUrl={props.downloadUrl}/> </div>
}
