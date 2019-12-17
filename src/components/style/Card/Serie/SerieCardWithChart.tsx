import * as React from 'react';
import { formattedHits90Days } from '../../../../helpers/common/LocaleValueFormatter';
import { IAbbreviationProps } from '../../../../helpers/common/numberAbbreviation';
import { ConnectedD3SeriesChart, UnconnectedD3SeriesChart } from "../../../d3_charts/D3SeriesChart";
import Row from "../../Common/Row";
import Card from "../Card";
import CardBody from "../CardBody";
import CardSubtitle from "../CardSubtitle";
import CardTitle from "../CardTitle";
import { ISerieCardProps } from "./SerieCard";

interface ISerieCardWithChartProps extends ISerieCardProps {
    connectedChart: boolean;
}

export default (props: ISerieCardWithChartProps) => {

    const abbreviateProps: IAbbreviationProps = {
        decimalsBillion: props.decimalsBillion,
        decimalsMillion: props.decimalsMillion,
        numbersAbbreviate: props.numbersAbbreviate
    }
    const hits90Days = formattedHits90Days(props.locale, abbreviateProps, props.serie.hits90Days);

    let D3SeriesChart = props.connectedChart ? ConnectedD3SeriesChart : UnconnectedD3SeriesChart;
    const seriesChartProps = {
        decimalsBillion: props.decimalsBillion,
        decimalsMillion: props.decimalsMillion,
        frequency: props.serie.accrualPeriodicity,
        laps: {
            Anual: 10,
            Diaria: 90,
            Mensual: 24,
            Semestral: 10,
            Trimestral: 20,
        },
        locale: props.locale,
        maxDecimals: props.maxDecimals,
        numbersAbbreviate: props.numbersAbbreviate,
        serie: props.serie
    };
    if (!props.connectedChart) {
        D3SeriesChart = UnconnectedD3SeriesChart;
        seriesChartProps.laps = {
            Anual: 10,
            Diaria: 90,
            Mensual: 24,
            Semestral: 10,
            Trimestral: 20,
        }
    }


    return(
        <Card title={props.serie.title} {...props}>
        <Row>
            <div className="col-xs-12 p-headers">
                <CardTitle>{props.serie.description}</CardTitle>
                <CardBody>{props.serie.datasetTitle}</CardBody>
            </div>
        </Row>
        <Row>
            <div className="col-sm-8 col-xs-12 p-metadata">
                <CardSubtitle><strong>Publicador: </strong>{props.serie.publisher.name}</CardSubtitle>
                <CardSubtitle><strong>Fuente: </strong>{props.serie.datasetSource}</CardSubtitle>
                <CardSubtitle><strong>Período: </strong>{props.serie.startDate}-{props.serie.endDate}</CardSubtitle>
                <CardSubtitle><strong>Unidades: </strong>{props.serie.units}</CardSubtitle>
                <CardSubtitle><strong>Frecuencia: </strong>{props.serie.accrualPeriodicity}</CardSubtitle>
                <CardSubtitle><strong>Consultas últimos 90 días: </strong>{hits90Days}</CardSubtitle>
                <CardSubtitle><strong>ID: </strong>{props.serie.id}</CardSubtitle>
            </div>

            <div className="col-sm-4 col-xs-12 d3-line-chart-container">
                <D3SeriesChart {...seriesChartProps} />
            </div>
        </Row>
    </Card>
    );

}

