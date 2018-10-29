import * as React from 'react';
import {IDataPoint} from "../../../api/DataPoint";
import {IDateRange} from "../../../api/DateSerie";
import {ISerie} from "../../../api/Serie";
import SerieConfig from "../../../api/SerieConfig";
import {formattedMoment, localDate} from "../../../helpers/dateFunctions";
import {Color} from "../../style/Colors/Color";
import GraphContainer from "../../style/Graphic/GraphContainer";
import Graphic from "./Graphic";
import GraphicComplements from "./GraphicComplements";


export interface IGraphicAndShareProps {
    series: ISerie[];
    colorFor: (serie: ISerie) => Color;
    date: IDateRange;
    handleChangeDate: (date: {start: string, end: string}) => void;
    handleChangeFrequency: (value: string) => void;
    url: string;
    onReset?: () => void;
    seriesConfig: SerieConfig[];
    formatUnits: boolean;
}

export default class GraphicAndShare extends React.Component<IGraphicAndShareProps, any> {

    constructor(props: IGraphicAndShareProps) {
        super(props);
        this.handleZoom = this.handleZoom.bind(this);
        this.chartExtremes = this.chartExtremes.bind(this);
    }

    public handleZoom(extremes: {min: number, max: number}) {
        if (this.props.series.length === 0) {return }

        const start = this.findSerieDate(extremes.min);
        const end = this.findSerieDate(extremes.max);

        this.props.handleChangeDate({ start: formattedMoment(start), end: formattedMoment(end) });
    }

    public render() {
        return (
            <GraphContainer>
                <Graphic series={this.props.series}
                         seriesConfig={this.props.seriesConfig}
                         formatUnits={this.props.formatUnits}
                         colorFor={this.props.colorFor}
                         range={this.chartExtremes()}
                         onReset={this.props.onReset}
                         onZoom={this.handleZoom} />

                <GraphicComplements url={this.props.url}
                                    series={this.props.series}
                                    handleChangeFrequency={this.props.handleChangeFrequency} />
            </GraphContainer>
        )
    }

    public chartExtremes(): {min: number, max: number} {
        if (this.props.series.length === 0) {return {min: 0, max: 0}}

        let minDataIndex = this.firstSerieData().findIndex((data) => data.date >= this.props.date.start);
        let maxDataIndex = this.firstSerieData().findIndex((data) => data.date >= this.props.date.end);
        if (minDataIndex <= 0) { minDataIndex = 0 }
        if (maxDataIndex <= 0) { maxDataIndex = this.firstSerieData().length - 1}

        const min = new Date(this.firstSerieData()[minDataIndex].date).getTime();
        const max = new Date(this.firstSerieData()[maxDataIndex].date).getTime();

        return {min, max};
    }

    private findSerieDate(timestamp: number): string {
        const serieData = this.firstSerieData().find((data) => data.date >= formattedMoment(localDate(timestamp)));
        return serieData !== undefined ? serieData.date : '';
    }

    private firstSerieData(): IDataPoint[] {
        return this.props.series[0].data;
    }

}

