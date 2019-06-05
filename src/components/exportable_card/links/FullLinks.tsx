import * as React from 'react';
import { ISerie } from '../../../api/Serie';
import FullCardDownload from '../FullCardDownload';
import FullCardEnlaces from '../FullCardEnlaces';
import FullCardViewMore from '../FullCardViewMore';


export default (props: {serie: ISerie}) =>
    <div className="full-card-links">
        <FullCardDownload />
        <FullCardViewMore />
        <FullCardEnlaces />
    </div>
