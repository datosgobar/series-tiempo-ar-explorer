import * as moment from 'moment';
import * as React from 'react';
import { IDateRange } from "../../../api/DateSerie";
import { ISerie } from "../../../api/Serie";
import { Color } from "../../style/Colors/Color";
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
}

export default class GraphicAndShare extends React.Component<IGraphicAndShareProps, any> {

    constructor(props: IGraphicAndShareProps) {
        super(props);
        this.handleZoom = this.handleZoom.bind(this);
        this.chartExtremes = this.chartExtremes.bind(this);
    }

    public handleZoom(extremes: {min: number, max: number}) {
        if (this.props.series.length === 0) {return }

        const start = emptyValue(extremes.min) ? this.firstDateOfSerie() : this.findSerieDate(extremes.min);
        const end = emptyValue(extremes.max) ? this.lastDateOfSerie() : this.findSerieDate(extremes.max);

        this.props.handleChangeDate({ start: formattedMoment(start), end: formattedMoment(end) });
    }

    public render() {
        return (
            <GraphContainer>
                <Graphic series={this.props.series}
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

        const minDataIndex = this.props.series[0].data.findIndex((data) => data.date >= this.props.date.start);
        let maxDataIndex = this.props.series[0].data.findIndex((data) => data.date >= this.props.date.end);
        if (maxDataIndex === 0) { maxDataIndex = this.props.series[0].data.length - 1}

        const min = new Date(this.props.series[0].data[minDataIndex].date).getTime();
        const max = new Date(this.props.series[0].data[maxDataIndex].date).getTime();

        return {min, max};
    }

    public startDate(): string {
        return this.getSelectedDate(this.props.date.start, () => this.firstDateOfSerie());
    }

    public endDate(): string {
        return this.getSelectedDate(this.props.date.end, () => this.lastDateOfSerie());
    }

    private getSelectedDate(selected: string, getDefault: () => string): string {
       let result = selected;

        if ((emptyValue(result)) && this.props.series.length > 0) {
            result = getDefault();
        }

        return formattedDateString(result);
    }

    private findSerieDate(value: number): string {
        const serieData = this.props.series[0].data.find((data) => data.date >= timestampToDateString(value));
        return serieData !== undefined ? serieData.date : '';
    }

    private firstSerie(): ISerie {
        return this.props.series[0];
    }

    private firstDateOfSerie(): string {
        return this.firstSerie().data[0].date;
    }

    private lastDateOfSerie(): string {
        const lastSerie = this.props.series[this.props.series.length - 1];
        return lastSerie.data[lastSerie.data.length - 1].date;
    }

}


// returns a string in format YYYY/MM/DD with the missing parts of date
// '2010' => '2010/01/01
// '2010-03' or '2010/03' => '2010/03/01'
// '2010-03-01' or '2010/03/01' => '2010/03/01'
function formattedDateString(date: string): string {
    const parsedDate  = date.replace(/([\/\-])/g, '-');
    return parsedDate.split('-').length === 1 ? `${parsedDate}-01` : parsedDate;
}

function emptyValue(value: any): boolean {
    return value === '' || value === null || value === undefined
}

function timestampToDateString(value: any): string {
    return formattedMoment(new Date(value));
}

function formattedMoment(date: any): string {
    return moment(date).format('YYYY-MM-DD');
}