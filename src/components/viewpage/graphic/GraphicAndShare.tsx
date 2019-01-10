import * as React from 'react';
import {connect} from "react-redux";
import {IDataPoint} from "../../../api/DataPoint";
import {IDateRange} from "../../../api/DateSerie";
import {ISerie} from "../../../api/Serie";
import SerieConfig from "../../../api/SerieConfig";
import {formattedMoment, localTimestamp} from "../../../helpers/dateFunctions";
import {IStore} from "../../../store/initialState";
import {Color} from "../../style/Colors/Color";
import GraphContainer from "../../style/Graphic/GraphContainer";
import Graphic, {IChartExtremeProps} from "./Graphic";
import GraphicComplements from "./GraphicComplements";


export interface IGraphicAndShareProps {
    series: ISerie[];
    colorFor: (serieId: string) => Color;
    date: IDateRange;
    handleChangeDate: (date: {start: string, end: string}) => void;
    handleChangeFrequency: (value: string) => void;
    url: string;
    onReset?: () => void;
    readonly dispatch: (action: object) => void;
    seriesConfig: SerieConfig[];
    formatUnits: boolean;
    locale: string;
}

class GraphicAndShare extends React.Component<IGraphicAndShareProps, any> {

    constructor(props: IGraphicAndShareProps) {
        super(props);
        this.handleZoom = this.handleZoom.bind(this);
    }

    public handleZoom(extremes: IChartExtremeProps) {
        if (this.props.series.length === 0) {return }

        const start = findSerieDate(this.props.series, extremes.min);
        const end = findSerieDate(this.props.series, extremes.max);

        this.props.handleChangeDate({ start: formattedMoment(start), end: formattedMoment(end) });
    }

    public render() {
        return (
            <GraphContainer>
                <Graphic series={this.props.series}
                         seriesConfig={this.props.seriesConfig}
                         formatUnits={this.props.formatUnits}
                         colorFor={this.props.colorFor}
                         range={chartExtremes(this.props.series, this.props.date)}
                         onReset={this.props.onReset}
                         onZoom={this.handleZoom}
                         dispatch={this.props.dispatch}
                         locale={this.props.locale} />

                <GraphicComplements url={this.props.url}
                                    series={this.props.series}
                                    handleChangeFrequency={this.props.handleChangeFrequency} />
            </GraphContainer>
        )
    }
}

// returns the date matching with the passed timestamp if the date exists
function findSerieDate(series: ISerie[], timestamp: number): string {
    const firstSerieData = series[0].data;
    const serieData = firstSerieData.find((data) => data.date >= formattedMoment(localTimestamp(timestamp)));
    return serieData !== undefined ? serieData.date : '';
}

export function chartExtremes(series: ISerie[], dateRange: { start: string, end: string }): IChartExtremeProps {
    if (series.length === 0) {return {min: 0, max: 0}}

    const firstSerieData = series[0].data;
    let minDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.start);
    let maxDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.end);
    if (minDataIndex <= 0) { minDataIndex = 0 }
    if (maxDataIndex <= 0) { maxDataIndex = firstSerieData.length - 1}

    const min = new Date(firstSerieData[minDataIndex].date).getTime();
    const max = new Date(firstSerieData[maxDataIndex].date).getTime();

    return {min, max};
}



function mapStateToProps(state: IStore) {
    return {
        locale: state.locale,
    };
}

export default connect(mapStateToProps, {})(GraphicAndShare);
