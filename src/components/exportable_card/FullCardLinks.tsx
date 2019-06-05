import * as React from 'react';
import { ISerie } from '../../api/Serie';
import FullLinks from './links/FullLinks';
import SmallLinks from './links/SmallLinks';


export default (props: {serie: ISerie, links: string, downloadUrl: string}) => {
    const LinkComponent = linksTypeComponent(props.links, props.serie, props.downloadUrl)

    return <div> {LinkComponent} </div>
}

function linksTypeComponent(link: string, serie: ISerie, downloadUrl: string) {
    const types = {
        'full': <FullLinks serie={serie} downloadUrl={downloadUrl} />,
        'none': null,
        'small': <SmallLinks serie={serie} />,
    }

    return types[link];
}
