import * as React from 'react';


interface ISeriesCardProps extends React.Props<any> {
    title: string;
    color?: string;
}


export default (props: ISeriesCardProps) =>

    <div className="col-sm-6 col-md-4">
        <a className="series-card mg-lg-b" style={{color: props.color}} title={props.title}>
        {props.children}            
        </a>
    </div>