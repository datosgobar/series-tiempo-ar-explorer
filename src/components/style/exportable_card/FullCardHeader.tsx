import * as React from 'react';

interface IHeaderProps {
    defaultTitle: string;
    override: string;
    date: string;
    color: string;
}

export default (props: IHeaderProps) => {
    if (props.override === "") {
        return(
            <p className="c-span">{props.date}</p>
        )
    }
    const title = props.override === undefined ? props.defaultTitle : props.override
    return(
        <div className="c-head">
            <p className="c-title" style={{borderTop: props.color}}>{title}</p>
            <p className="c-span">{props.date}</p>
        </div>)
}
    
