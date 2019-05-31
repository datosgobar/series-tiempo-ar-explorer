import * as React from 'react';


export default (props: {color: string, text: string}) =>
    <span className="exportable-card-percentage" style={{color: props.color}}>{props.text}</span>