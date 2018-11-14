import * as React from 'react';
import {RefObject} from 'react';
import {IDataPoint} from "../../api/DataPoint";
import {ISerie} from "../../api/Serie";
import D3LineChart from "./D3LineChart";


interface ID3Chart {
    serie: ISerie;
}

const LAPS = 24;

export default class D3SeriesChart extends React.Component<ID3Chart, any> {

    private readonly myRef: RefObject<any>;

    public constructor(props: ID3Chart) {
        super(props);

        this.myRef = React.createRef();
    }

    public render() {
        const data = notNullData(this.props.serie.data);

        return (
            <div className="d3-line-chart">
                <div className="units">
                    <div className="date">{data[data.length - 1].date}</div>
                    <div className="value">{roundTwo(data[data.length - 1].value)}</div>
                </div>
                <D3LineChart renderTo={this.myRef} data={data} laps={LAPS}/>
                <div className="frequency">{`ÚLTIMOS ${LAPS} ${periodFromFrequency(this.props.serie.accrualPeriodicity)}`}</div>
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

function roundTwo(value: number): number {
    return Math.round(value * 100) / 100
}

function notNullData(data: IDataPoint[]): IDataPoint[] {
    return data.filter((d: IDataPoint) => d.value !== null);
}
