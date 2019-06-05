import * as React from 'react';
import { ISerie } from '../../api/Serie';
import FullLinks from './links/FullLinks';
import SmallLinks from './links/SmallLinks';


export default (props: {serie: ISerie, links: string}) => {
    const LinkComponent = linksTypeComponent(props.links, props.serie)

    return <div> {LinkComponent} </div>
}

function linksTypeComponent(link: string, serie: ISerie) {
    const types = {
        'full': <FullLinks serie={serie} />,
        'none': null,
        'small': <SmallLinks serie={serie} />,
    }

    return types[link];
}
