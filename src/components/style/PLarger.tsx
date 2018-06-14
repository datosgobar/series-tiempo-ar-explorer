import * as React from 'react';

export default function PLarger(props: React.Props<{}>) {
    return (
        <p className="larger color-w mg-b">
            {props.children}
        </p>
    );
}