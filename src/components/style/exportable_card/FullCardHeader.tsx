import * as React from 'react';


export default (props: {title: string, date: string, color: string}) =>
    <div className="c-head">
        <p className="c-title" style={{borderTop: props.color}}>{props.title}</p>
        <p className="c-span">{props.date}</p>
    </div>
