import * as React from 'react';


interface IDetailsTitleProps extends React.Props<any> {
    pegColor?: string;
}

export default (props: IDetailsTitleProps) =>

    <h2 className={`title title-md font-2 ${props.pegColor ? `title-${props.pegColor}` : ""}`}>
    {props.children}
    </h2>
