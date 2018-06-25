import * as React from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import CardBody from './CardBody';
import CardTitle from './CardTitle';

import { ISearchResultItem } from '../../../api/SerieApi';
import randomColor from '../../../helpers/randomColor';


interface ISearchResultCardProps extends React.Props<any> {
    searchResult: ISearchResultItem;
}

export default (props: ISearchResultCardProps) =>

        <Link to={`/view/?ids=${props.searchResult.id}`}>
            <Card title={props.searchResult.title} pegcolor={randomColor()}>
                <CardTitle>{props.searchResult.title}</CardTitle>
                <CardBody>{props.searchResult.description}</CardBody>
            </Card>
        </Link>
