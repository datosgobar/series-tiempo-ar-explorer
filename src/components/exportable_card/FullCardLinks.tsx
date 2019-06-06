import * as React from 'react';
import { ICardBaseConfig } from '../../indexCard';
import { IWebSnippetOptions } from '../common/linkBuilders';
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

export default (props: {
    serieId: string, cardOptions:ICardBaseConfig, downloadUrl: string
}) => {
    const LinkComponent = TYPES[props.cardOptions.links]
    const Options = {
        chartType: props.cardOptions.chartType,
        color: props.cardOptions.color,
        downloadUrl: props.downloadUrl,
        hasChart: props.cardOptions.hasChart,
        links: props.cardOptions.links,
        serieId: props.serieId
    }

    return <div> <LinkComponent options={Options} /> </div>
}
