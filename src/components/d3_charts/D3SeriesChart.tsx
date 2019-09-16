import * as React from 'react';
import { RefObject } from 'react';
import { connect } from "react-redux";
import { IDataPoint } from "../../api/DataPoint";
import { ISerie, DEFAULT_SIGNIFICANT_FIGURES } from '../../api/Serie';
import { shortLocaleDate } from "../../helpers/common/dateFunctions";
import { IStore } from "../../store/initialState";
import { buildLocale } from "../common/locale/buildLocale";
import { ILapsProps } from "../mainpage/featured/Featured";
import D3LineChart from "./D3LineChart";


interface ID3Chart {
    serie: ISerie;
    frequency: string;
    laps: ILapsProps;
    locale: string;
}

class D3SeriesChart extends React.Component<ID3Chart, any> {

    private readonly myRef: RefObject<any>;

    public constructor(props: ID3Chart) {
        super(props);
        this.myRef = React.createRef();
    }

    public render() {
        const data = this.shortDataList(this.props.serie.data);
        if (data.length === 0) { return <div className="d3-line-chart">Esta serie no trajo datos</div> }

        return (
            <div className="d3-line-chart">
                <div className="units">
                    <div className="date">{shortLocaleDate(this.props.frequency, data[data.length - 1].date)}</div>
                    <div className="value">{lastFormattedValue(this.props.serie, data, this.props.locale)}</div>
                </div>
                <D3LineChart renderTo={this.myRef} data={data} />
                <div className="frequency">{`ÚLTIMOS ${this.getLaps()} ${findPeriod(this.props.frequency)}`}</div>
            </div>
        )
    }

    private shortDataList(data: IDataPoint[]): IDataPoint[] {
        const result = data.slice(Math.max(data.length - this.getLaps(), 0));

        return notNullData(result);
    }

    private getLaps(): number {
        return this.props.laps[this.props.frequency];
    }
}


function findPeriod(frequency: string): string {
    const options = {
        'Anual': 'años',
        'Diaria': 'días',
        'Mensual': 'meses',
        'Semestral': 'semestres',
        'Trimestral': 'trimestres'
    };

    return options[frequency].toUpperCase()
}

function lastFormattedValue(serie: ISerie, data: IDataPoint[], locale: string): string {

    const dataValue = data[data.length-1].value;
    const value = serie.isPercentage ? dataValue * 100 : dataValue;
    const decimalPlaces = serie.significantFigures !== undefined ? serie.significantFigures : DEFAULT_SIGNIFICANT_FIGURES;

    const result = buildLocale(locale).toDecimalString(value, decimalPlaces);
    return serie.isPercentage ? `${result}%` : `${result}`;

}

function notNullData(data: IDataPoint[]): IDataPoint[] {
    return data.filter((d: IDataPoint) => d.value !== null);
}

function mapStateToProps(state: IStore) {
    return {
        laps: state.laps,
        locale: state.locale,
    };
}


export default connect(mapStateToProps)(D3SeriesChart);
