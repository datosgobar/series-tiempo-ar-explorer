import * as React from 'react';

interface ITagProps extends React.Props<any> {
    pegcolor?: string;
    onClose?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default (props: ITagProps) =>

    <span className="tag" style={{ borderLeftColor: props.pegcolor }}>
        {props.children}
        <a className="tag-close" onClick={props.onClose}>
            <i className="far fa-times" />
        </a>
    </span>