import * as React from 'react';
import { ISerie } from "../../../api/Serie";
import { isHigherFrequency } from "../../../api/utils/periodicityManager";
import OptionsPicker, { IPickerOptionsProps, IPickerStyle } from '../../common/picker/OptionsPicker';
import ShareLinks from '../ShareLinks';


export interface IGraphicComplementsProps {
    series: ISerie[];
    handleChangeFrequency: (value: string) => void;
    handleChangeUnits: (value: string) => void;
    handleChangeAggregation: (value: string) => void;
    handleChangeChartType: (value: string) => void;
    url: string;
    selectedChartType: string;
    selectedUnits: string;
}

export default class GraphicComplements extends React.Component<IGraphicComplementsProps, any> {

    public render() {

        if (this.props.series.length === 0) { return null }

        const unitsPickerStyle: IPickerStyle = {
            width: '24.5%'
        }
        const aggregationPickerStyle: IPickerStyle = {
            width: '16.5%'
        }

        return (
            <div className="row graphic-complements">
                <ShareLinks url={this.props.url} series={this.props.series} />
                <OptionsPicker className="col-sm-2 g-chartType-selector" onChangeOption={this.props.handleChangeChartType} selected={this.props.selectedChartType} availableOptions={this.chartTypeOptions()} label="Tipo de Gráfico" />
                <OptionsPicker className="col-sm-2" onChangeOption={this.props.handleChangeAggregation} selected={this.selectedAggregation()} availableOptions={this.aggregationOptions()} label="Agregación" style={aggregationPickerStyle} />
                <OptionsPicker className="col-sm-2 g-units-selector" onChangeOption={this.props.handleChangeUnits} selected={this.props.selectedUnits} availableOptions={this.unitOptions()} label="Unidades" style={unitsPickerStyle} />
                <OptionsPicker className="col-sm-2" onChangeOption={this.props.handleChangeFrequency} selected={this.frequency()} availableOptions={this.frequencyOptions()} label="Frecuencia" />
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

    public selectedAggregation(): string {
        return this.props.series[0].collapseAggregation;
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
}
