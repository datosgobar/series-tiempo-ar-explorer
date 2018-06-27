import * as React from 'react';

import { Color } from '../Colors/Color';
import CardCheck from './CardCheck';


export interface ICardProps extends React.HTMLProps<HTMLDivElement> {
    title?: string;
    pegColor?: Color;
    checked?: boolean;
}

export default (props: ICardProps) =>

    <div
        onClick={props.onClick}
        title={props.title}
        className={`series-card mg-lg-b 
        ${props.checked ? "card-has-check" : ""} 
        ${props.pegColor ? `sc-${props.pegColor.name}` : ""}
        `}>
        {props.children}
        {props.checked && <CardCheck />}
    </div>

