import * as React from 'react';


export default (props: {title: string, date: string, color: string}) =>
    <div className="full-card-header">
        <span className="title" style={{borderTop: props.color}}>{props.title}</span>
        <span className="date">{props.date}</span>
    </div>
