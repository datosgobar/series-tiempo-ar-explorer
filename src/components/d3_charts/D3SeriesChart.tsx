import * as React from 'react';
import { RefObject } from 'react';
import { connect } from "react-redux";
import { IDataPoint } from "../../api/DataPoint";
import { ISerie } from '../../api/Serie';
import { shortLocaleDate } from "../../helpers/common/dateFunctions";
import { getTooltipDecimals } from "../../helpers/common/decimalsAmountHandling";
import { IStore } from "../../store/initialState";
import LocaleValueFormatter, { ILocaleValueFormatterConfig } from '../../helpers/common/LocaleValueFormatter';
import { ILapsProps } from "../mainpage/featured/Featured";
import D3LineChart from "./D3LineChart";


interface ID3Chart {
    serie: ISerie;
    frequency: string;
    laps: ILapsProps;
    locale: string;
    maxDecimals: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
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

        const formattedValueOptions: ILastFormattedValueOptions = {
            data,
            decimalsBillion: this.props.decimalsBillion,
            decimalsMillion: this.props.decimalsMillion,
            locale: this.props.locale,
            maxDecimals: this.props.maxDecimals,
            numbersAbbreviate: this.props.numbersAbbreviate,
            serie: this.props.serie
        }

        return (
            <div className="d3-line-chart">
                <div className="units">
                    <div className="date">{shortLocaleDate(this.props.frequency, data[data.length - 1].date)}</div>
                    <div className="value">{lastFormattedValue(formattedValueOptions)}</div>
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

interface ILastFormattedValueOptions {
    data: IDataPoint[];
    decimalsBillion: number;
    decimalsMillion: number;
    locale: string;
    maxDecimals: number;
    numbersAbbreviate: boolean;
    serie: ISerie;
}

function lastFormattedValue(options: ILastFormattedValueOptions): string {

    const dataValue = options.data[options.data.length-1].value || 0;
    const significantFigures = Math.min(options.maxDecimals, options.serie.significantFigures);
    const decimalPlaces = getTooltipDecimals(options.serie.id, significantFigures);
    const decimalsBillion = Math.min(options.maxDecimals, options.decimalsBillion);
    const decimalsMillion = Math.min(options.maxDecimals, options.decimalsMillion);

    const formatterConfig: ILocaleValueFormatterConfig = {
        code: options.locale,
        decimalPlaces,
        decimalsBillion,
        decimalsMillion,
        isPercentage: options.serie.isPercentage,
        numbersAbbreviate: options.numbersAbbreviate
    };
    const formatter = new LocaleValueFormatter(formatterConfig);

    return formatter.formatValue(dataValue);

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

export const UnconnectedD3SeriesChart = D3SeriesChart;
export const ConnectedD3SeriesChart = connect(mapStateToProps)(D3SeriesChart);
