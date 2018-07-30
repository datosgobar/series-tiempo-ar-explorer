import * as React from 'react';

import DatePicker from './DatePicker';

export interface IGraphicDatePickerProps {
    start: string;
    end: string;
    onStartChange: (date: any) => void;
    onEndChange: (date: any) => void;
}

export default class GraphicDatePicker extends React.Component<IGraphicDatePickerProps, any> {

    public render() {
        return (
            <div style={{float: 'right'}} className="col-xs-6">
                <div className="col-xs-6 inline">
                    <DatePicker date={this.props.start} onDateChange={this.props.onStartChange} labelText="Del " />
                </div>
                <div className="col-xs-6 inline">
                    <DatePicker date={this.props.end} onDateChange={this.props.onEndChange} labelText="Hasta " />
                </div>
            </div>
        )
    }

}