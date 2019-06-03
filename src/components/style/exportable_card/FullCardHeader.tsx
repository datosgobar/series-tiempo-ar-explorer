import * as React from 'react';


export default (props: {title: string, date: string, color: string}) =>
    <div className="full-card-header">
        <h3 className="title" style={{borderTop: props.color}}>{props.title}</h3>
        <h4 className="date">{props.date}</h4>
    </div>
