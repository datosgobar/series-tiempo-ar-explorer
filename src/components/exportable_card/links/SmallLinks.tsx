import * as React from 'react';
import { ISerie } from '../../../api/Serie';
import FullCardEnlaces from '../FullCardEnlaces';


export default (props: {serie: ISerie}) =>
    <div className="full-card-links">
        <FullCardEnlaces />
    </div>
