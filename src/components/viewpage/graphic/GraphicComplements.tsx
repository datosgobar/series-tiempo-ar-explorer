import * as React from 'react';
import {ISerie} from "../../../api/Serie";
import {Share} from "../Share";
import FrequencyPicker from "./FrequencyPicker";
import GraphicDatePicker from "./GraphicDatePicker";


export interface IGraphicComplementsProps {
    series: ISerie[];
    start: string;
    end: string;
    handleStartChange: ({}) => void;
    handleEndChange: ({}) => void;
    handleChangeFrequency: (value: string) => void;
    url: string;
}

export default class GraphicComplements extends React.Component<IGraphicComplementsProps, any> {

    public render() {
        return (
            <div className="row">
                <Share url={this.props.url} series={this.props.series} />
                <FrequencyPicker onChangeFrequency={this.props.handleChangeFrequency} frequency={this.frequency()} />
                <GraphicDatePicker start={this.props.start}
                                   end={this.props.end}
                                   onStartChange={this.props.handleStartChange}
                                   onEndChange={this.props.handleEndChange} />
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

}