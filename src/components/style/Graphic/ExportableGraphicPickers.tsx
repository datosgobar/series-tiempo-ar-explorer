import * as React from "react";
import { ISerie } from "../../../api/Serie";
import { CHART_TYPE_OPTIONS, AGGREGATION_OPTIONS, UNIT_OPTIONS, frequencyOptions, appropiatedFrequency } from "../../../helpers/graphic/optionPickers";
import OptionsPicker from "../../common/picker/OptionsPicker";

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
    presentSelectorsAmount: number;
    parentWidth: number;
}

const FREQUENCY_MAPPING = {
    "Diaria": "day",
    "Mensual": "month",
    "Trimestral": "quarter",
    "Semestral": "semester",
    "Anual": "year"
}

interface IPickerStyle {
    width: string
}

const WIDTHS_PER_PRESENT_SELECTORS = ['0%', '80%', '40%', '30%', '20%']

export default class ExportableGraphicPickers extends React.Component<IExportableGraphicPickersProps, any> {

    public render() {

        if(this.props.series.length === 0) {
            return null;
        }

        const initialFrequency = this.props.selectedFrequency === '' ? this.highestFrequency() : this.props.selectedFrequency;
        const emptyDiv = <div style={{width: '0px'}}/>;

        const containerStyle = this.getContainerStyle();
        const pickerStyle = this.getPickersWidthStyle();

        return (
            <div className="g-pickers-container" style={containerStyle}>
                { this.props.chartTypeSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                 onChangeOption={this.props.handleChangeChartType}
                                                                 selected={this.props.selectedChartType}
                                                                 availableOptions={CHART_TYPE_OPTIONS}
                                                                 label="Tipo de Gráfico"
                                                                 style={pickerStyle} />)
                                               : emptyDiv 
                }
                { this.props.aggregationSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                   onChangeOption={this.props.handleChangeAggregation}
                                                                   selected={this.props.selectedAggregation}
                                                                   availableOptions={AGGREGATION_OPTIONS}
                                                                   label="Agregación"
                                                                   style={pickerStyle} />)
                                                 : emptyDiv 
                }
                { this.props.unitsSelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                             onChangeOption={this.props.handleChangeUnits}
                                                             selected={this.props.selectedUnits}
                                                             availableOptions={UNIT_OPTIONS}
                                                             label="Unidades"
                                                             style={pickerStyle} />)
                                                 : emptyDiv 
                }
                { this.props.frequencySelector ? (<OptionsPicker className="col-xs-12 col-md-3 col-lg-3 g-picker"
                                                                 onChangeOption={this.props.handleChangeFrequency}
                                                                 selected={initialFrequency}
                                                                 availableOptions={frequencyOptions(this.props.series)}
                                                                 label="Frecuencia"
                                                                 style={pickerStyle} />)
                                                 : emptyDiv 
                }
            </div>
        )

    }

    private highestFrequency(): string {

        const frequencyTitle = appropiatedFrequency(this.props.series);
        return FREQUENCY_MAPPING[frequencyTitle];

    }

    private getContainerStyle(): React.CSSProperties {

        const containerStyle = {
            alignItems: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-around'
        } as React.CSSProperties;

        if (this.props.parentWidth < 1500) {
            containerStyle.alignItems = 'center';
            containerStyle.flexDirection = 'column';
            containerStyle.justifyContent = 'flex-start';
        }  

        return containerStyle

    }

    private getPickersWidthStyle(): IPickerStyle {

        if (this.props.parentWidth < 1500) {
            return {
                width: '70%'
            }
        }

        return {
            width: WIDTHS_PER_PRESENT_SELECTORS[this.props.presentSelectorsAmount]
        }

    }

}