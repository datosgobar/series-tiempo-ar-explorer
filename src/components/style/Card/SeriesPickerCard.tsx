import * as React from 'react';

import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';

import SearchResult from '../../../api/SearchResult';


export interface ISeriesPickerCardProps extends React.Props<{}> {
    searchResult: SearchResult;
    pegcolor?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    checked?: boolean;
}


export default (props: ISeriesPickerCardProps) =>

    <Card
        pegcolor={props.pegcolor}
        checked={props.checked}
        title={props.searchResult.title}
        onClick={props.onClick}
        key={props.searchResult.id}>
        <CardTitle>{props.searchResult.title}</CardTitle>
        <CardSubtitle>{props.searchResult.description}</CardSubtitle>
        <CardBody>
            {props.searchResult.description}
        </CardBody>
        <CardFooter>Visitado n veces</CardFooter>
    </Card>