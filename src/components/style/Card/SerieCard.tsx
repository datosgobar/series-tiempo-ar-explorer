import * as React from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';

import { ISerie } from '../../../api/Serie';


interface ISerieCardProps extends React.Props<any> {
    serie: ISerie;
}


export default (props: ISerieCardProps) =>

    <div className="col-sm-6 col-md-4">
        <Link to={`/view/?ids=${props.serie.id}`}>
            <Card title={props.serie.title} pegcolor={randomColor()}>
                <CardTitle>{props.serie.title}</CardTitle>
                <CardSubtitle>{props.serie.publisher.name}</CardSubtitle>
                <CardBody>{props.serie.description}</CardBody>
                <CardFooter>{props.serie.id}</CardFooter>
            </Card>
        </Link>
    </div>

function randomColor() {
    // tslint:disable-next-line:no-bitwise
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)
}