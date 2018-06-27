import * as React from 'react';


interface IDetailsTitleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    pegColor?: string;
}

export default (props: IDetailsTitleProps) =>

    <h2 className={`title title-md font-2 ${props.pegColor ? `title-${props.pegColor}` : ""}`} {...props} />
