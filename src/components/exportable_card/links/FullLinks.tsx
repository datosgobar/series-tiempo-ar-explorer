import * as React from 'react';
import FullCardDownload from '../FullCardDownload';
import FullCardDropdown from '../FullCardDropdown';
import { ICardLinksOptions } from '../FullCardLinks';
import FullCardViewMore from '../FullCardViewMore';


export default (props: {options: ICardLinksOptions}) =>
    <div className="full-card-links">
        <FullCardDownload downloadUrl={props.options.downloadUrl} />
        <FullCardViewMore serieId={props.options.serieId} />
        <FullCardDropdown options={props.options} />
    </div>
