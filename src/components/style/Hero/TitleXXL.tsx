import * as React from 'react';

export default function TitleXXL(props: React.Props<{}>) {
    return (
        <h1 className="title-xxlg font-1 color-w">
            {props.children}
        </h1>
    );
}