import * as React from 'react';

import { Color } from '../Colors/Color';


const pegColor = "pegColor";

interface IDetailsTitleAndActionsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pegColor?: Color;
}

export default (props: IDetailsTitleAndActionsProps) => {

    const divProps = { ...props };
    delete divProps[pegColor];

    return <div className={`title-and-actions mg-b ${props.pegColor ? `title-${props.pegColor.name}` : ""}`} {...divProps} />
}


