import * as React from 'react';
import { ISerie } from "../../../api/Serie";
import OptionsPicker, { IPickerStyle } from '../../common/picker/OptionsPicker';
import ShareLinks from '../ShareLinks';
import { CHART_TYPE_OPTIONS, AGGREGATION_OPTIONS, UNIT_OPTIONS, frequencyOptions } from '../../../helpers/graphic/optionPickers';


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
                <OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-chartType-selector"
                               onChangeOption={this.props.handleChangeChartType}
                               selected={this.props.selectedChartType}
                               availableOptions={CHART_TYPE_OPTIONS}
                               label="Tipo de Gráfico" />
                <OptionsPicker className="col-xs-12 col-md-3 col-lg-3"
                               onChangeOption={this.props.handleChangeAggregation}
                               selected={this.selectedAggregation()}
                               availableOptions={AGGREGATION_OPTIONS}
                               label="Agregación"
                               style={aggregationPickerStyle} />
                <OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-units-selector"
                               onChangeOption={this.props.handleChangeUnits}
                               selected={this.props.selectedUnits}
                               availableOptions={UNIT_OPTIONS}
                               label="Unidades"
                               style={unitsPickerStyle} />
                <OptionsPicker className="col-xs-12 col-md-3 col-lg-3"
                               onChangeOption={this.props.handleChangeFrequency}
                               selected={this.frequency()}
                               availableOptions={frequencyOptions(this.props.series)}
                               label="Frecuencia" />
            </div>
        )
    }

    // Initial selected value on select box
    public frequency(): string {
        const validOptions = frequencyOptions(this.props.series).filter((e: any) => e.available);
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
 
}
