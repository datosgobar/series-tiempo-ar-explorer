import * as React from 'react';

import CardCheck from './CardCheck';


export interface ICardProps extends React.HTMLProps<HTMLDivElement> {
    title?: string;
    pegColor?: string;
    checked?: boolean;
}

export default (props: ICardProps) =>

    <div
        onClick={props.onClick}
        title={props.title}
        className={`series-card mg-lg-b 
        ${props.checked ? "card-has-check" : ""} 
        ${props.pegColor && `sc-${props.pegColor}`}
        `}>
        {props.children}
        {props.checked && <CardCheck />}
    </div>

