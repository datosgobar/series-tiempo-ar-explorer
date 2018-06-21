import * as React from 'react';
import CardCheck from './CardCheck';


interface ISeriesCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pegcolor?: string;
    checked?: boolean;
}

export default (props: ISeriesCardProps) =>

        <div className={`series-card mg-lg-b ${props.checked? "card-has-check" : ""}`} style={{borderRightColor: props.pegcolor}} {...props} >
        {props.children}
        {props.checked && <CardCheck/>}
        </div>

