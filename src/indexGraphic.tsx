import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphicExportable, {IGraphicExportableProps} from "./components/exportable/GraphicExportable";


export function render(selector: string, config: IGraphicExportableProps) {
    ReactDOM.render(
        <GraphicExportable graphicUrl={config.graphicUrl}
                                   chartOptions={config.chartOptions}
                                   navigator={config.navigator} />,
        document.getElementById(selector) as HTMLElement
    )
}
