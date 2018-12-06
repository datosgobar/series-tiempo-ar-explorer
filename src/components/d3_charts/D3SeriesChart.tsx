import * as React from 'react';
import {RefObject} from 'react';
import {connect} from "react-redux";
import {IDataPoint} from "../../api/DataPoint";
import {parseFormatDate} from "../../api/utils/periodicityManager";
import {isInt, toFixedDecimals} from "../../helpers/commonFunctions";
import {IStore} from "../../store/initialState";
import {ILapsProps} from "../mainpage/featured/Featured";
import {smartMinAndMaxFinder} from "../viewpage/graphic/Graphic";
import D3LineChart from "./D3LineChart";


interface ID3Chart {
    data: IDataPoint[];
    frequency: string;
    laps: ILapsProps;
}

class D3SeriesChart extends React.Component<ID3Chart, any> {

    private readonly myRef: RefObject<any>;

    public constructor(props: ID3Chart) {
        super(props);

        this.myRef = React.createRef();
    }

    public render() {
        const data = this.shortDataList(this.props.data);
        if (data.length === 0) { return <div className="d3-line-chart">Esta serie no trajo datos</div> }

        return (
            <div className="d3-line-chart">
                <div className="units">
                    <div className="date">{parseFormatDate(this.props.frequency, data[data.length - 1].date)}</div>
                    <div className="value">{lastFormattedValue(data)}</div>
                </div>
                <D3LineChart renderTo={this.myRef} data={data} />
                <div className="frequency">{`ÚLTIMOS ${this.getLaps()} ${findPeriod(this.props.frequency)}`}</div>
            </div>
        )
    }

    private shortDataList(data: IDataPoint[]): IDataPoint[] {
        return data.slice(Math.max(data.length - this.getLaps(), 0));
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

function lastFormattedValue(data: IDataPoint[]): string {
    const minAndMax = smartMinAndMaxFinder(data);
    const value = formattedPercentage(data[data.length-1].value);

    return (minAndMax.min > -1 && minAndMax.max < 1) ? `${value}%` : `${value}`;
}

function formattedPercentage(value: number): string {
    const result = isInt(value) ? value : toFixedDecimals(value, 2);

    // @ts-ignore
    return result < 1 && result > -1 ? toFixedDecimals(result * 100, 2) : result;
}

function mapStateToProps(state: IStore) {
    return {
        laps: state.laps,
    };
}


export default connect(mapStateToProps)(D3SeriesChart);
