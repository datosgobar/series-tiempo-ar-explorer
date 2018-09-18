import * as React from 'react';
import FrequencyPickerContainer from "../../style/Graphic/FrequencyPickerContainer";
import {IFrequencyOption} from "./GraphicComplements";


interface IFrequencyPickerProps {
    onChangeFrequency: (value: string) => void;
    frequency: string;
    frequencyOptions: IFrequencyOption[]
}

export default class FrequencyPicker extends React.Component<IFrequencyPickerProps, any> {

    public constructor(props: any) {
        super(props);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
    }

    public handleChangeFrequency(event: any) {
        this.props.onChangeFrequency(event.target.value);
    }

    public render() {
        return (
            <FrequencyPickerContainer labelText="Frecuencia" className="col-xs-12 col-sm-6 col-md-5">
                <select name="frequencyList" id="" className="form-control" onChange={this.handleChangeFrequency} value={this.props.frequency}>
                    {this.props.frequencyOptions.map((option: IFrequencyOption) =>
                        <option key={option.value} value={option.value} disabled={!option.available}>{option.title}</option>
                    )}
                </select>
            </FrequencyPickerContainer>
        )
    }
}