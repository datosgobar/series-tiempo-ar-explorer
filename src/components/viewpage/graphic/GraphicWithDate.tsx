import * as React from 'react';
import {IDateRange} from "../../../api/DateSerie";
import FrequencyPicker from "./FrequencyPicker";
import Graphic from "./Graphic";
import {IGraphicAndShareProps} from "./GraphicAndShare";
import GraphicDatePicker from "./GraphicDatePicker";

export default class GraphicWithDate extends React.Component<IGraphicAndShareProps, any> {

    constructor(props: IGraphicAndShareProps) {
        super(props);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    public handleChangeStart(date: any) {
        const newDate = { start: date.format('YYYY-MM-DD'), end: this.endDate() };
        this.props.handleChangeDate(newDate);
    }

    public handleChangeEnd(date: any) {
        const newDate = { start: this.startDate(), end: date.format('YYYY-MM-DD') };
        this.props.handleChangeDate(newDate);
    }

    public render() {
        return(
            <div className="row">
                <Graphic series={this.props.series} colorFor={this.props.colorFor} date={this.parsedDate()} />
                <div style={{float: 'right'}} className="row">
                    <FrequencyPicker onChangeFrequency={this.props.handleChangeFrequency} frequency={this.frequency()} />
                    <GraphicDatePicker start={this.startDate()}
                                       end={this.endDate()}
                                       onStartChange={this.handleChangeStart}
                                       onEndChange={this.handleChangeEnd} />
                </div>
            </div>
        )
    }

    public frequency(): string {
        let frequency = 'year';
        if (this.props.series.length > 0) {
            frequency = this.props.series[0].frequency || 'year';
        }

        return frequency;
    }

    public parsedDate(): IDateRange {
        return {
            end: this.endDate(),
            start: this.startDate()
        }
    }

    public startDate(): string {
        let start = this.props.date.start;
        if ((start === undefined || start === '') && this.props.series.length > 0) {
            start = this.props.series[0].data[0].date;
        }

        return formattedDateString(start);
    }

    public endDate(): string {
        let end = this.props.date.end;

        if ((end === undefined || end === '') && this.props.series.length > 0) {
            end = this.props.series[0].data[this.props.series[0].data.length - 1].date;
        }

        return formattedDateString(end);
    }

}

// returns a string in format YYYY/MM/DD with the missing parts of date
// '2010' => '2010/01/01
// '2010-03' or '2010/03' => '2010/03/01'
// '2010-03-01' or '2010/03/01' => '2010/03/01'
function formattedDateString(date: string): string {
    const parsedDate  = date.replace(/([\/\-])/g, '/');
    return parsedDate.split('/').length === 1 ? `${parsedDate}/01` : parsedDate;
}
