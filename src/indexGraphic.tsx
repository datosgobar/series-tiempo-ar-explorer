import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphicExportable, {IGraphicExportableProps} from "./components/exportable/GraphicExportable";


export function render(selector: string, config: IGraphicExportableProps) {
    ReactDOM.render(
        <GraphicExportable graphicUrl={config.graphicUrl}
                                   chartOptions={config.chartOptions}
                                   navigator={config.navigator}
                                   locale={config.locale}
                                   zoom={config.zoom}
                                   exportable={config.exportable}
                                   colors={config.colors} />,
        document.getElementById(selector) as HTMLElement
    )
}
