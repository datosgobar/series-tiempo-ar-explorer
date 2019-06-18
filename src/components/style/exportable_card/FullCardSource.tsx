import * as React from 'react';
import Shiitake from 'shiitake'

export default (props: {source: string, override: string}) => {
    if (props.override === "") {
        return <div/>
    }
    const source = props.override === undefined ? "Fuente: " + props.source : props.override
    return <Shiitake lines={2} className="c-span bt c-source" tagName="p">{source}</Shiitake>
}