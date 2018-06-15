import * as React from 'react';
import { Link } from 'react-router-dom';

import { ISerie } from '../../../api/Serie';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';


interface ISerieCardProps extends React.Props<any> {
    serie: ISerie;
}


export default (props: ISerieCardProps) =>

    <Link to={`/view/?ids=${props.serie.id}`}>
        <Card title={props.serie.title} color={randomColor()}>
            <CardTitle>{props.serie.title}</CardTitle>
            <CardSubtitle>{props.serie.publisher.name}</CardSubtitle>
            <CardBody>{props.serie.description}</CardBody>
            <CardFooter>{props.serie.id}</CardFooter>
        </Card>
    </Link>

function randomColor() {
    // tslint:disable-next-line:no-bitwise
    return "#"+((1<<24)*Math.random()|0).toString(16)
}