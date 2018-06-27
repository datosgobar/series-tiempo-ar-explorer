import * as React from 'react';


interface IDetailsTitleAndActionsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pegColor?: string
}

export default (props: IDetailsTitleAndActionsProps) =>

    <div className={`title-and-actions mg-b ${props.pegColor ? `title-${props.pegColor}` : ""}`} {...props} />
