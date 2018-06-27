import * as React from 'react';

interface ITagProps extends React.Props<any> {
    pegColor?: string;
    onClose?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default (props: ITagProps) =>

    <span className={`tag ${props.pegColor ? `tag-${props.pegColor}` : ""}`}>
        {props.children}
        <a className="tag-close" onClick={props.onClose}>
            <i className="far fa-times" />
        </a>
    </span>