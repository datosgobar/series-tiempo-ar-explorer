import * as React from 'react';

interface IRemoveTagProps {
    onClose?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default (props: IRemoveTagProps) =>
    <span>
        <a className="tag-close" onClick={props.onClose}>
            <i className="far fa-times" />
        </a>
    </span>
