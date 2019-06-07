import * as React from 'react';


export default (props: {color: string, text: string}) =>
    <div className="c-data">
        <p className="c-main" style={{color: props.color}}>{props.text}</p>
    </div>