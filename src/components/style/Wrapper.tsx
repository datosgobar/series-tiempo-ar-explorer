import * as React from 'react';

export default function Wrapper(props: React.Props<{}>) {
    return (
        <div className="wrapper">
            {props.children}
        </div>
    );
}