import * as React from 'react';
import { Color } from '../Colors/Color';
import CardCheck from './CardCheck';


export interface ICardProps extends React.HTMLProps<HTMLDivElement> {
    title?: string;
    pegColor?: Color;
    checked?: boolean;
    onRemoveSerie?: (serieId: string) => void;
}

export default (props: ICardProps) =>

    <div onClick={props.onClick}
         title={props.title}
         className={`series-card mg-lg-b ${props.checked ? "card-has-check" : ""}`}
         style={{borderRightColor: props.pegColor ? props.pegColor.code : ''}} >
        {props.children}
        {props.checked && <CardCheck onRemoveSerie={props.onRemoveSerie}/>}
    </div>

