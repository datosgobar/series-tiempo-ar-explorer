import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApiClient } from "./api/ApiClient";
import SerieApi from "./api/SerieApi";
import CardExportable from "./components/exportable/CardExportable";


export interface ICardExportableConfig {
    serieId: string;
    locale: string;
    links: string;
    color: string;
    hasChart: string;
    chartType: string;
    title?: string;
    source?: string;
}

export function render(selector: string, config: ICardExportableConfig) {
    const seriesApi = new SerieApi(new ApiClient(getURI(), 'ts-components-card'));

    ReactDOM.render(
        <CardExportable serieId={config.serieId}
                        locale={config.locale || 'AR'}
                        links={config.links || 'full'}
                        color={config.color || '#0072BB'}
                        hasChart={config.hasChart || 'full'}
                        chartType={config.chartType}
                        title={config.title}
                        source={config.source}
                        seriesApi={seriesApi} />,
        document.getElementById(selector) as HTMLElement
    )
}

function getURI(): string {
    return `https://apis.datos.gob.ar/series/api`
}
