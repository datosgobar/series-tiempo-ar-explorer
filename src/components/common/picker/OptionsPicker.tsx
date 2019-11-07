import * as React from 'react';
import OptionsPickerContainer from "../../style/picker/OptionsPickerContainer";


export interface IPickerOptionsProps {
    value: string;
    title: string;
    available: boolean;
}

export interface IPickerStyle {
    width: string;
}

interface IOptionsPickerProps {
    label: string;
    onChangeOption: (value: string) => void;
    selected: string;
    availableOptions: IPickerOptionsProps[];
    className?: string;
    style?: IPickerStyle;
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
            <OptionsPickerContainer labelText={this.props.label} className={this.props.className} style={this.props.style}>
                <select name="frequencyList" className="form-control" onChange={this.handleChangeOption} value={this.props.selected}>
                    {this.props.availableOptions.map((option: IPickerOptionsProps) =>
                        <option key={option.value} value={option.value} disabled={!option.available}>{option.title}</option>
                    )}
                </select>
            </OptionsPickerContainer>
        )
    }
}
