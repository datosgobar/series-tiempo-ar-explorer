import * as React from "react";
import * as ReactDOM from "react-dom";
import CardExportable, { ICardExportableProps } from "./components/exportable/CardExportable";


export function render(selector: string, config: ICardExportableProps) {
    ReactDOM.render(
        <CardExportable serieId={config.serieId}
                        locale={config.locale || 'AR'}
                        links={config.links || 'full'}
                        color={config.color || '#0072BB'}
                        hasChart={config.hasChart || 'full'}
                        chartType={config.chartType}
                        title={config.title}
                        source={config.source} />,
        document.getElementById(selector) as HTMLElement
    )
}
