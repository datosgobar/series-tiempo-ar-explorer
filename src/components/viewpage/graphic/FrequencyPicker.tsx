import * as React from 'react';
import FrequencyPickerContainer from "../../style/Graphic/FrequencyPickerContainer";


interface IFrequencyPickerProps {
    onChangeFrequency: (value: string) => void;
}

export default class FrequencyPicker extends React.Component<IFrequencyPickerProps, any> {

    public constructor(props: any) {
        super(props);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);

        this.state = {
            selected: ''
        }
    }

    public handleChangeFrequency(event: any) {
        this.props.onChangeFrequency(event.target.value);
    }

    public render() {
        return (
            <FrequencyPickerContainer labelText="Frecuencia">
                <select name="frequencyList" id="" className="form-control" onChange={this.handleChangeFrequency}>
                    <option value="year">Anual</option>
                    <option value="month">Mensual</option>
                    <option value="day">Diaria</option>
                </select>
            </FrequencyPickerContainer>
        )
    }
}