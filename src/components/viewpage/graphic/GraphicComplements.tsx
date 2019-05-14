import * as React from 'react';
import { ISerie } from "../../../api/Serie";
import { isHigherFrequency } from "../../../api/utils/periodicityManager";
import OptionsPicker, { IPickerOptionsProps } from '../../common/picker/OptionsPicker';
import Share from "../Share";


export interface IGraphicComplementsProps {
    series: ISerie[];
    handleChangeFrequency: (value: string) => void;
    handleChangeUnits: (value: string) => void;
    url: string;
}

export default class GraphicComplements extends React.Component<IGraphicComplementsProps, any> {

    public render() {
        if (this.props.series.length === 0) { return null }

        return (
            <div className="row graphic-complements">
                <Share url={this.props.url} series={this.props.series} />
                <OptionsPicker onChangeOption={this.props.handleChangeUnits} selected={this.selectedUnit()} availableOptions={this.unitOptions()} label="Unidad" />
                <OptionsPicker onChangeOption={this.props.handleChangeFrequency} selected={this.frequency()} availableOptions={this.frequencyOptions()} label="Frecuencia" />
            </div>
        )
    }

    // Initial selected value on select box
    public frequency(): string {
        const validOptions = this.frequencyOptions().filter((e: any) => e.available);
        let minIndex = 99;
        this.props.series.forEach((serie: ISerie) => {
            const index = validOptions.findIndex((option: any) => option.available && option.value === (serie.frequency || 'year'));
            minIndex = Math.min(minIndex, index);
            minIndex = Math.max(0, minIndex); // because findIndex could return -1
        });

        return validOptions[minIndex].value;
    }

    public selectedUnit(): string {
        return this.props.series[0].representationMode;
    }

    public unitOptions(): IPickerOptionsProps[] {
        return [
            { value: "value", title: "Unidades originales", available: true },
            { value: "change", title: "Variación", available: true },
            { value: "change_a_year_ago", title: "Variación interanual", available: true },
            { value: "percent_change", title: "Variación porcentual", available: true },
            { value: "percent_change_a_year_ago", title: "Variación porcentual interanual", available: true }
        ];
    }

    public frequencyOptions(): IPickerOptionsProps[] {
        const accrualPeriodicity = this.appropiatedFrequency();
        // noinspection TsLint
        const options = [
            { value: 'year',     title: 'Anual',      available: false },
            { value: 'semester', title: 'Semestral',  available: false },
            { value: 'quarter',  title: 'Trimestral', available: false },
            { value: 'month',    title: 'Mensual',    available: false },
            { value: 'day',      title: 'Diaria',     available: false },
        ];

        const optionIndex = options.findIndex((option: IPickerOptionsProps) => option.title === accrualPeriodicity);
        options.forEach((option: IPickerOptionsProps) => {
            option.available = options.indexOf(option) <= optionIndex;
        });

        return options;
    }

    private appropiatedFrequency(): string {
        let higherFrequency = this.props.series[0].accrualPeriodicity;
        this.props.series.forEach((serie: ISerie) => {
            if (isHigherFrequency(serie.accrualPeriodicity, higherFrequency)) {
                higherFrequency = serie.accrualPeriodicity;
            }
        });

        return higherFrequency;
    }
}
