import * as React from 'react';


interface ISeriesCardProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    pegColor?: string;
}

export default (props: ISeriesCardProps) =>

        <a className="series-card mg-lg-b" style={{borderRightColor: props.pegColor}} {...props}>
        {props.children}            
        </a>
