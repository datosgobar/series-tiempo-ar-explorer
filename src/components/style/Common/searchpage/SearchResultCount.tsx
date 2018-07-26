import * as React from 'react';


export interface ISearchResultCountProps {
    totalResult: number;
}

export default (props: ISearchResultCountProps) =>
    <h2 className="title-xsm font-1">Cantidad de series encontradas: {props.totalResult}</h2>