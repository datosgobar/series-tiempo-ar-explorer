import * as React from 'react';
import D3SeriesChart from "../../../d3_charts/D3SeriesChart";
import Row from "../../Common/Row";
import Card from "../Card";
import CardBody from "../CardBody";
import CardSubtitle from "../CardSubtitle";
import CardTitle from "../CardTitle";
import { ISerieCardProps } from "./SerieCard";


export default (props: ISerieCardProps) =>
    <Card title={props.serie.title} {...props}>
        <Row>
            <div className="col-xs-12">
                <CardTitle>{props.serie.description}</CardTitle>
                <CardBody>{props.serie.datasetTitle}</CardBody>
            </div>
        </Row>
        <Row>
            <div className="col-xs-8">
                <CardSubtitle><strong>Publicador: </strong>{props.serie.publisher.name}</CardSubtitle>
                <CardSubtitle><strong>Fuente: </strong>{props.serie.datasetSource}</CardSubtitle>
                <CardSubtitle><strong>Período: </strong>{props.serie.startDate}-{props.serie.endDate}</CardSubtitle>
                <CardSubtitle><strong>Unidades: </strong>{props.serie.units}</CardSubtitle>
                <CardSubtitle><strong>Frecuencia: </strong>{props.serie.accrualPeriodicity}</CardSubtitle>
                <CardSubtitle><strong>Consultas últimos 90 días: </strong>{props.serie.hits90Days}</CardSubtitle>
                <CardSubtitle><strong>ID: </strong>{props.serie.id}</CardSubtitle>
            </div>

            <div className="col-xs-4 d3-line-chart-container">
                <D3SeriesChart serie={props.serie}
                               frequency={props.serie.accrualPeriodicity} 
                               maxDecimals={props.maxDecimals} 
                               numbersAbbreviate={props.numbersAbbreviate} 
                               decimalsBillion={props.decimalsBillion} 
                               decimalsMillion={props.decimalsMillion} />
            </div>
        </Row>
    </Card>
