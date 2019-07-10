import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApiClient } from "./api/ApiClient";
import SerieApi from "./api/SerieApi";
import CardExportable from "./components/exportable/CardExportable";

export interface ICardBaseConfig {
    locale: string;
    links: string;
    color: string;
    hasChart: string;
    chartType: string;
    explicitSign: boolean | false;
    title: string;
    source: string;
    units: string;
    hasFrame?: boolean;
    hasColorBar?: boolean;
}

export interface ICardExportableConfig extends ICardBaseConfig {
    serieId: string;
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
                        explicitSign={config.explicitSign}
                        title={config.title}
                        source={config.source}
                        units={config.units}
                        hasFrame={config.hasFrame}
                        hasColorBar={config.hasColorBar}
                        seriesApi={seriesApi} />,
        document.getElementById(selector) as HTMLElement
    )
}

function getURI(): string {
    return `https://apis.datos.gob.ar/series/api`
}
