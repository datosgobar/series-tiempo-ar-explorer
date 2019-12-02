import * as React from "react";
import * as ReactDOM from "react-dom";
import PreviewCardExportable from "./components/exportable/PreviewCardExportable";

export interface IPreviewCardExportableConfig {
    apiBaseUrl?: string;
    decimalsBillion?: number;
    decimalsMillion?: number;
    explorerUrl?: string;
    maxDecimals?: number;
    numbersAbbreviate?: boolean;
    serieId: string;
    width?: string;
}

export function render(selector: string, config: IPreviewCardExportableConfig) {

    ReactDOM.render(
        <PreviewCardExportable serieId={config.serieId}
                               apiBaseUrl={config.apiBaseUrl}
                               explorerUrl={config.explorerUrl}
                               maxDecimals={config.maxDecimals}
                               numbersAbbreviate={config.numbersAbbreviate}
                               decimalsBillion={config.decimalsBillion}
                               decimalsMillion={config.decimalsMillion}
                               width={config.width} />,
        document.getElementById(selector) as HTMLElement
    )

}
