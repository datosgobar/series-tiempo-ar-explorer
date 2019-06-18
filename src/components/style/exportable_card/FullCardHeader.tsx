import * as React from 'react';
import Shiitake from 'shiitake';

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
        <div className="c-head" style={{borderTop: props.color}}>
            <Shiitake lines={2} className="c-title" tagName="p">{title}</Shiitake>
            <p className="c-span">{props.date}</p>
        </div>)
}
    
