import * as React from 'react';
import FrequencyPickerContainer from "../../style/picker/OptionsPickerContainer";


export interface IPickerOptionsProps {
    value: string;
    title: string;
    available: boolean;
}

interface IOptionsPickerProps {
    label: string;
    onChangeOption: (value: string) => void;
    selected: string;
    availableOptions: IPickerOptionsProps[]
}

export default class OptionsPicker extends React.Component<IOptionsPickerProps, any> {

    public constructor(props: any) {
        super(props);
        this.handleChangeOption = this.handleChangeOption.bind(this);
    }

    public handleChangeOption(event: any) {
        this.props.onChangeOption(event.target.value);
    }

    public render() {
        return (
            <FrequencyPickerContainer labelText={this.props.label} className="col-xs-4 share">
                <select name="frequencyList" id="" className="form-control" onChange={this.handleChangeOption} value={this.props.selected}>
                    {this.props.availableOptions.map((option: IPickerOptionsProps) =>
                        <option key={option.value} value={option.value} disabled={!option.available}>{option.title}</option>
                    )}
                </select>
            </FrequencyPickerContainer>
        )
    }
}
