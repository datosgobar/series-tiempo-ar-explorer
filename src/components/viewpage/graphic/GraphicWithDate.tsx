import * as React from 'react';
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
            <div>
                <Graphic series={this.props.series} colorFor={this.props.colorFor} date={this.props.date} />
                <GraphicDatePicker start={this.startDate()}
                                   end={this.endDate()}
                                   onStartChange={this.handleChangeStart}
                                   onEndChange={this.handleChangeEnd} />
            </div>
        )
    }

    public startDate() {
        let start = this.props.date.start;
        if ((start === undefined || start === '') && this.props.series.length > 0) {
            start = this.props.series[0].data[0].date;
        }

        return start;
    }

    public endDate() {
        let end = this.props.date.end;

        if ((end === undefined || end === '') && this.props.series.length > 0) {
            end = this.props.series[0].data[this.props.series[0].data.length - 1].date;
        }

        return end;
    }

}