import * as React from 'react';
import FullLinks from './links/FullLinks';
import SmallLinks from './links/SmallLinks';


export default (props: {serieId: string, links: string, downloadUrl: string}) => {
    const LinkComponent = linksTypeComponent(props.links, props.serieId, props.downloadUrl)

    return <div> {LinkComponent} </div>
}

function linksTypeComponent(link: string, serieId: string, downloadUrl: string) {
    const types = {
        'full': <FullLinks serieId={serieId} downloadUrl={downloadUrl} />,
        'none': null,
        'small': <SmallLinks downloadUrl={downloadUrl}/>,
    }

    return types[link];
}
