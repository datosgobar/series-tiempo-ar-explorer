import * as React from "react";
import * as ReactDOM from "react-dom";
import CardRowExportable from "./components/exportable/CardRowExportable";

export interface ICardRowExportableConfig {
    apiBaseUrl?: string;
    collapse?: string;
    color?: string[] | string;
    decimals?: number[] | number;
    decimalsBillion?: number[] | number;
    decimalsMillion?: number[] | number;
    explicitSign?: boolean[] | boolean;
    hasChart: string;
    hasColorBar?: boolean;
    hasFrame?: boolean;
    ids: string[];
    isPercentage?: boolean;
    links: string;
    locale: string;
    numbersAbbreviate?: boolean[] | boolean;
    source: string[] | string;
    title: string[] | string;
    units: string[] | string;
}

export function render(selector: string, config: ICardRowExportableConfig) {

    ReactDOM.render(
        <CardRowExportable ids={config.ids}
                           apiBaseUrl={config.apiBaseUrl}
                           collapse={config.collapse}
                           color={config.color}
                           decimals={config.decimals}
                           decimalsBillion={config.decimalsBillion}
                           decimalsMillion={config.decimalsMillion}
                           explicitSign={config.explicitSign}
                           hasChart={config.hasChart || 'small'}
                           hasColorBar={config.hasColorBar}
                           hasFrame={config.hasFrame}
                           links={config.links || 'full'}
                           locale={config.locale || 'AR'}
                           numbersAbbreviate={config.numbersAbbreviate}
                           source={config.source}
                           title={config.title}
                           units={config.units} />,
        document.getElementById(selector) as HTMLElement
    )

}
