import * as React from 'react';
import Shiitake from 'shiitake'

export default (props: {units: string, override: string}) => {
    if (props.override === "") {
        return <div/>
    }
    const units = props.override === undefined ? props.units : props.override
    return <Shiitake lines={2} className="c-units" tagName="p">{units}</Shiitake>
}