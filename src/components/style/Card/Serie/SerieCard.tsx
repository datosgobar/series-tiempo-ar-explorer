import * as React from 'react';

import Card, { ICardProps } from '../Card';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';

import { ISerie } from '../../../../api/Serie';
import CardSource from "../CardSource";


export interface ISerieCardProps extends ICardProps {
    serie: ISerie;
}


export default (props: ISerieCardProps) =>

    <Card title={props.serie.title} {...props}>
        <CardTitle>{props.serie.title}</CardTitle>
        <CardSubtitle>Publicador: {props.serie.publisher.name}</CardSubtitle>
        <CardBody>{props.serie.description}</CardBody>
        <CardSource>Fuente: {props.serie.datasetSource}</CardSource>
        <CardFooter>{props.serie.id}</CardFooter>
    </Card>
