import * as React from 'react';

import { Color } from '../Colors/Color';

interface ITagProps extends React.Props<any> {
    pegColor?: Color;
    onClose?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default (props: ITagProps) =>

    <span className={`tag ${props.pegColor ? `tag-${props.pegColor.name}` : ""}`}>
        {props.children}
        <a className="tag-close" onClick={props.onClose}>
            <i className="far fa-times" />
        </a>
    </span>