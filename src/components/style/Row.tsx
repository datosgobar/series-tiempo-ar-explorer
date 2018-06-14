import * as React from 'react';

export default function Row(props: React.Props<{}>) {
    return (
        <div className="row">
            {props.children}
        </div>
    );
}