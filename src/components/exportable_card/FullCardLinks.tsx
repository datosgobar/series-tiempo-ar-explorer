import * as React from 'react';
import { ICardBaseConfig } from '../../indexCard';
import { IWebSnippetOptions } from './FullCardDropdown';
import FullLinks from './links/FullLinks';
import NullLinks from './links/NullLinks';
import SmallLinks from './links/SmallLinks';


const TYPES = {
    'full': FullLinks,
    'none': NullLinks,
    'small': SmallLinks,
}

export interface ICardLinksOptions extends IWebSnippetOptions {
    downloadUrl: string
}

interface IFullCardLinksOptions extends ICardBaseConfig {
    serieId: string,
    downloadUrl: string
}

export default (props: { options: IFullCardLinksOptions }) => {
    const LinkComponent = TYPES[props.options.links]

    return <div> <LinkComponent options={props.options} /> </div>
}
