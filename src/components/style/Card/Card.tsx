import * as React from 'react';


interface ISeriesCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pegcolor?: string;
}

export default (props: ISeriesCardProps) =>

        <div className="series-card mg-lg-b" style={{borderRightColor: props.pegcolor}} {...props}>
        {props.children}            
        </div>
