import * as React from 'react';


export default (props: {title: string, override: string, date: string, color: string}) => {
    if (props.override === "") {
        return <div/>
    }
    const title = props.override === undefined ? props.title : props.override
    return(
        <div className="c-head">
            <p className="c-title" style={{borderTop: props.color}}>{title}</p>
            <p className="c-span">{props.date}</p>
        </div>)
}
    
