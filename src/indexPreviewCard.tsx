import * as React from "react";
import * as ReactDOM from "react-dom";
import PreviewCardExportable from "./components/exportable/PreviewCardExportable";

export interface IPreviewCardExportableConfig {
    apiBaseUrl?: string;
    explorerUrl?: string;
    serieId: string;
}

export function render(selector: string, config: IPreviewCardExportableConfig) {

    ReactDOM.render(
        <PreviewCardExportable serieId={config.serieId}
                               apiBaseUrl={config.apiBaseUrl}
                               explorerUrl={config.explorerUrl} />,
        document.getElementById(selector) as HTMLElement
    )

}
