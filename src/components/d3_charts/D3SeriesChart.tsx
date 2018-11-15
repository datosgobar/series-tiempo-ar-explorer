import * as React from 'react';
import {RefObject} from 'react';
import {IDataPoint} from "../../api/DataPoint";
import {parseFormatDate} from "../../api/utils/periodicityManager";
import {smartMinAndMaxFinder} from "../viewpage/graphic/Graphic";
import D3LineChart from "./D3LineChart";


interface ID3Chart {
    data: IDataPoint[];
    frequency: string;
}

const LAPS = 24;

export default class D3SeriesChart extends React.Component<ID3Chart, any> {

    private readonly myRef: RefObject<any>;

    public constructor(props: ID3Chart) {
        super(props);

        this.myRef = React.createRef();
    }

    public render() {
        const data = shortDataList(this.props.data);
        if (data.length === 0) { return <div className="d3-line-chart">Esta serie no trajo datos</div> }

        return (
            <div className="d3-line-chart">
                <div className="units">
                    <div className="date">{parseFormatDate(this.props.frequency, data[data.length - 1].date)}</div>
                    <div className="value">{lastFormattedValue(data)}</div>
                </div>
                <D3LineChart renderTo={this.myRef} data={data} />
                <div className="frequency">{`ÚLTIMOS ${LAPS} ${periodFromFrequency(this.props.frequency)}`}</div>
            </div>
        )
    }
}


function periodFromFrequency(frequency: string): string {
    const options = {
        'Anual': 'años',
        'Diaria': 'días',
        'Mensual': 'meses',
        'Semestral': 'semestres',
        'Trimestral': 'trimestres'
    };

    return options[frequency].toUpperCase()
}

function lastFormattedValue(data: IDataPoint[]): string {
    const minAndMax = smartMinAndMaxFinder(data);
    const value = intTwoDecimals(data[data.length-1].value);

    return (minAndMax.min > -1 && minAndMax.max < 1) ? `${value}%` : `${value}`;
}

function intTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100
}

function shortDataList(data: IDataPoint[]): IDataPoint[] {
    return data.slice(Math.max(data.length - LAPS, 0));
}
