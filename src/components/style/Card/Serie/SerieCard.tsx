import * as React from 'react';
import {ISerie} from '../../../../api/Serie';
import Row from "../../Common/Row";
import Card, {ICardProps} from '../Card';
import CardBody from '../CardBody';
import CardBodySerie from "../CardBodySerie";
import CardTitle from '../CardTitle';


export interface ISerieCardProps extends ICardProps {
    serie: ISerie;
}


export default (props: ISerieCardProps) =>

    <Card title={props.serie.title} {...props}>
        <Row>
            <div className="col-xs-12">
                <CardTitle>{props.serie.title}</CardTitle>
                <CardBody>{props.serie.description}</CardBody>
            </div>
        </Row>
        <Row>
            <div className="col-xs-12">
                <CardBodySerie>
                    <span><strong>Publicador: </strong>{props.serie.publisher.name}</span>
                </CardBodySerie>
                <CardBodySerie>
                    <span><strong>Fuente: </strong>{props.serie.datasetSource}</span>
                </CardBodySerie>
                <CardBodySerie>
                    <span><strong>Período: </strong>{props.serie.startDate}-{props.serie.endDate}</span>
                </CardBodySerie>
                <CardBodySerie>
                    <span><strong>Unidades: </strong>{props.serie.units}</span>
                </CardBodySerie>
                <CardBodySerie>
                    <span><strong>Frecuencia: </strong>{props.serie.accrualPeriodicity}</span>
                </CardBodySerie>
                <br/>
                <CardBodySerie>
                    <strong>ID: </strong> {props.serie.id}
                </CardBodySerie>
            </div>
        </Row>
    </Card>
