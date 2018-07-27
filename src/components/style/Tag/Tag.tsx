import * as React from 'react';

import {Color} from '../Colors/Color';
import RemoveTagBtn from "./RemoveTagBtn";

interface ITagProps extends React.Props<any> {
    pegColor?: Color;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default (props: ITagProps) => {
    let removeBtn;
    if (props.onClose) {
        removeBtn = <RemoveTagBtn onClose={props.onClose} />
    }

    return (
        <span className={`tag ${props.pegColor ? `tag-${props.pegColor.name}` : ""}`}>
            {props.children}
            {removeBtn}
        </span>
    )
}
