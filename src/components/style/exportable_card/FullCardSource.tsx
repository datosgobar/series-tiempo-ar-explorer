import * as React from 'react';


export default (props: {source: string, override: string}) => {
    if (props.override === "") {
        return <div/>
    }
    const source = props.override === undefined ? "Fuente: " + props.source : props.override
    return <p className="c-span bt c-source">{source}</p>
}