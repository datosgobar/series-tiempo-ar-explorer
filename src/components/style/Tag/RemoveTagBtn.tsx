import * as React from 'react';

interface IRemoveTagProps {
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default (props: IRemoveTagProps) =>
    <span>
        <button className="btn btn-link tag-close" onClick={props.onClose}>
            <i className="far fa-times" />
        </button>
    </span>
