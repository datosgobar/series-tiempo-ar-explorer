import * as React from 'react';

import Card, { ICardProps } from '../Card';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';

import { ISerie } from '../../../../api/Serie';


export interface ISerieCardProps extends ICardProps {
    serie: ISerie;
}


export default (props: ISerieCardProps) =>

    <Card title={props.serie.title} {...props}>
        <CardTitle>{props.serie.title}</CardTitle>
        <CardSubtitle>{props.serie.publisher.name}</CardSubtitle>
        <CardBody>{props.serie.description}</CardBody>

        <CardSubtitle>Fuente: {props.serie.datasetSource}</CardSubtitle>
        <CardFooter>{props.serie.id}</CardFooter>
    </Card>
