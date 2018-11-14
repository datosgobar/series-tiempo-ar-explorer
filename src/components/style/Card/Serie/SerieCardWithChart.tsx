import * as React from 'react';
import D3SeriesChart from "../../../d3_charts/D3SeriesChart";
import Row from "../../Common/Row";
import Card from "../Card";
import CardBody from "../CardBody";
import CardSubtitle from "../CardSubtitle";
import CardTitle from "../CardTitle";
import {ISerieCardProps} from "./SerieCard";


export default (props: ISerieCardProps) =>
    <Card title={props.serie.title} {...props}>
        <Row>
            <div className="col-xs-12">
                <CardTitle>{props.serie.title}</CardTitle>
                <CardBody>{props.serie.description}</CardBody>
            </div>
        </Row>
        <Row>
            <div className="col-xs-9">
                <CardSubtitle><strong>Publicador: </strong>{props.serie.publisher.name}</CardSubtitle>
                <CardSubtitle><strong>Fuente: </strong>{props.serie.datasetSource}</CardSubtitle>
                <CardSubtitle><strong>Período: </strong>{props.serie.startDate}-{props.serie.endDate}</CardSubtitle>
                <CardSubtitle><strong>Unidades: </strong>{props.serie.units}</CardSubtitle>
                <CardSubtitle><strong>Frecuencia: </strong>{props.serie.accrualPeriodicity}</CardSubtitle>
                <CardSubtitle><strong>ID: </strong>{props.serie.id}</CardSubtitle>
            </div>

            <div className="col-xs-3">
                <D3SeriesChart serie={props.serie} />
            </div>
        </Row>
    </Card>