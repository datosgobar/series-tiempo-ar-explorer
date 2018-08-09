import * as moment from 'moment';
import * as React from 'react';
import {IDateRange} from "../../../api/DateSerie";
import {ISerie} from "../../../api/Serie";
import FrequencyPicker from "./FrequencyPicker";
import Graphic from "./Graphic";
import {IGraphicWithDateProps} from "./GraphicAndShare";
import GraphicDatePicker from "./GraphicDatePicker";

export default class GraphicWithDate extends React.Component<IGraphicWithDateProps, any> {

    constructor(props: IGraphicWithDateProps) {
        super(props);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    public handleChangeStart(date: any) {
        if (emptyValue(date)) {
            date = moment(this.firstSerie().data[0].date);
        }

        const newDate = { start: date.format('YYYY-MM-DD'), end: this.endDate() };
        this.props.handleChangeDate(newDate);
    }

    public handleChangeEnd(date: any) {
        if (emptyValue(date)) {
            const lastSerie = this.props.series[this.props.series.length - 1];
            date = moment(lastSerie.data[lastSerie.data.length - 1].date);
        }

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
            frequency = this.firstSerie().frequency || 'year';
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
            start = this.firstSerie().data[0].date;
        }

        return formattedDateString(start);
    }

    public endDate(): string {
        let end = this.props.date.end;

        if ((end === undefined || end === '') && this.props.series.length > 0) {
            end = this.firstSerie().data[this.firstSerie().data.length - 1].date;
        }

        return formattedDateString(end);
    }

    private firstSerie(): ISerie {
        return this.props.series[0];
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