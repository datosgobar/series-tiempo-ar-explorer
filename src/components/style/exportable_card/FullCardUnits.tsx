import * as React from 'react';


export default (props: {units: string, override: string}) => {
    if (props.override === "") {
        return <div/>
    }
    const units = props.override === undefined ? props.units : props.override
    return <p className="c-main-title">{units}</p>
}