import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphicExportable, {IGraphicExportableProps} from "./components/exportable/GraphicExportable";
import { DEFAULT_DECIMALS_BILLION, DEFAULT_DECIMALS_MILLION } from "./helpers/common/LocaleValueFormatter";


export function render(selector: string, config: IGraphicExportableProps) {

    const decimalsBillion: number = config.decimalsBillion !== undefined && config.decimalsBillion >= 0 ? config.decimalsBillion : DEFAULT_DECIMALS_BILLION;
    const decimalsMillion: number = config.decimalsMillion !== undefined && config.decimalsMillion >= 0 ? config.decimalsMillion : DEFAULT_DECIMALS_MILLION;

    ReactDOM.render(
        <GraphicExportable graphicUrl={config.graphicUrl}
                           chartOptions={config.chartOptions || {}}
                           navigator={config.navigator}
                           locale={config.locale}
                           zoom={config.zoom}
                           exportable={config.exportable}
                           colors={config.colors}
                           backgroundColor={config.backgroundColor}
                           datePickerEnabled={config.datePickerEnabled}
                           legendField={config.legendField}
                           chartTypes={config.chartTypes || {}}
                           title={config.title}
                           source={config.source}
                           displayUnits={config.displayUnits}
                           legendLabel={config.legendLabel  || {}}
                           seriesAxis={config.seriesAxis || {}}
                           chartType={config.chartType}
                           decimalLeftAxis={config.decimalLeftAxis}
                           decimalRightAxis={config.decimalRightAxis}
                           decimalTooltip={config.decimalTooltip}
                           decimalTooltips={config.decimalTooltips || {}}
                           numbersAbbreviate={config.numbersAbbreviate || true}
                           decimalsBillion={decimalsBillion}
                           decimalsMillion={decimalsMillion} />,
        document.getElementById(selector) as HTMLElement
    )

}
