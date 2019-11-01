import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphicExportable, {IGraphicExportableProps} from "./components/exportable/GraphicExportable";


export function render(selector: string, config: IGraphicExportableProps) {
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
                           startDate={config.startDate} 
                           endDate={config.endDate} />,
        document.getElementById(selector) as HTMLElement
    )
}
