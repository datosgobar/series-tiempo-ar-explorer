import * as React from 'react';
import FullCardDropdown from '../FullCardDropdown';
import { ICardLinksOptions } from '../FullCardLinks';


export default (props: {options: ICardLinksOptions}) =>
    <div className="c-foot">
        <FullCardDropdown options={props.options} />
    </div>
