import OptionsPicker, { IPickerOptionsProps } from "../../common/picker/OptionsPicker";
import * as React from "react";
import { ISerie } from "../../../api/Serie";
import { isHigherFrequency } from "../../../api/utils/periodicityManager";

export interface IExportableGraphicPickersProps {
    series: ISerie[];
    handleChangeFrequency: (value: string) => void;
    handleChangeUnits: (value: string) => void;
    handleChangeAggregation: (value: string) => void;
    handleChangeChartType: (value: string) => void;
    selectedFrequency: string;
    selectedUnits: string;
    selectedAggregation: string;
    selectedChartType: string;
    chartTypeSelector: boolean;
    aggregationSelector: boolean;
    unitsSelector: boolean;
    frequencySelector: boolean;
}

const FREQUENCY_MAPPING = {
    "Diaria": "day",
    "Mensual": "month",
    "Trimestral": "quarter",
    "Semestral": "semester",
    "Anual": "year"
}

export default class ExportableGraphicPickers extends React.Component<IExportableGraphicPickersProps, any> {

    public render() {

        if(this.props.series.length === 0) {
            return null;
        }

        const initialFrequency = this.props.selectedFrequency === '' ? this.highestFrequency() : this.props.selectedFrequency;
        const emptyDiv = <div className="col-xs-12 col-md-3 col-lg-3"/>;

        return (
            <div className="g-pickers-container">
                { this.props.chartTypeSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                 onChangeOption={this.props.handleChangeChartType}
                                                                 selected={this.props.selectedChartType}
                                                                 availableOptions={this.chartTypeOptions()}
                                                                 label="Tipo de Gráfico" />)
                                               : emptyDiv 
                }
                { this.props.aggregationSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                   onChangeOption={this.props.handleChangeAggregation}
                                                                   selected={this.props.selectedAggregation}
                                                                   availableOptions={this.aggregationOptions()}
                                                                   label="Agregación" />)
                                                 : emptyDiv 
                }
                { this.props.unitsSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                             onChangeOption={this.props.handleChangeUnits}
                                                             selected={this.props.selectedUnits}
                                                             availableOptions={this.unitOptions()}
                                                             label="Unidades" />)
                                                 : emptyDiv 
                }
                { this.props.frequencySelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                 onChangeOption={this.props.handleChangeFrequency}
                                                                 selected={initialFrequency}
                                                                 availableOptions={this.frequencyOptions()}
                                                                 label="Frecuencia" />)
                                                 : emptyDiv 
                }
            </div>
        )

    }

    public chartTypeOptions(): IPickerOptionsProps[] {
        return [
            { value: "line", title: "Líneas", available: true },
            { value: "column", title: "Columnas", available: true },
            { value: "area", title: "Áreas", available: true }
        ];
    }

    public unitOptions(): IPickerOptionsProps[] {
        return [
            { value: "value", title: "Unidades originales", available: true },
            { value: "change", title: "Variación", available: true },
            { value: "change_a_year_ago", title: "Variación interanual", available: true },
            { value: "change_since_beginning_of_year", title: "Variación acumulada anual", available: true },
            { value: "percent_change", title: "Variación porcentual", available: true },
            { value: "percent_change_a_year_ago", title: "Variación porcentual interanual", available: true },
            { value: "percent_change_since_beginning_of_year", title: "Variación porcentual acumulada anual", available: true }
        ];
    }

    public aggregationOptions(): IPickerOptionsProps[] {
        return [
            { value: "avg", title: "Promedio", available: true },
            { value: "sum", title: "Suma", available: true },
            { value: "min", title: "Mínimo", available: true },
            { value: "max", title: "Máximo", available: true },
            { value: "end_of_period", title: "Último valor del período", available: true }
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

    private highestFrequency(): string {

        const frequencyTitle = this.appropiatedFrequency();
        return FREQUENCY_MAPPING[frequencyTitle];

    }

}