import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphicExportable, {IGraphicExportableProps} from "./components/exportable/GraphicExportable";


export function render(selector: string, config: IGraphicExportableProps) {
    ReactDOM.render(
        <GraphicExportable serieIds={config.serieIds}
                                   seriesApiUri={config.seriesApiUri}
                                   chartOptions={config.chartOptions} />,
        document.getElementById(selector) as HTMLElement
    )
}
