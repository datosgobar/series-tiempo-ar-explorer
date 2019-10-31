import * as React from "react";
import * as ReactDOM from "react-dom";
import CardExportable from "./components/exportable/CardExportable";
import { getCardColor } from "./components/style/Colors/Color";
import { DEFAULT_DECIMALS_BILLION, DEFAULT_DECIMALS_MILLION } from "./helpers/common/LocaleValueFormatter";

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
    collapse?: string;
    apiBaseUrl?: string;
    decimals?: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
}

export interface ICardExportableConfig extends ICardBaseConfig {
    serieId: string;
}

export function render(selector: string, config: ICardExportableConfig) {

    const decimalsBillion: number = config.decimalsBillion !== undefined && config.decimalsBillion >= 0 ? config.decimalsBillion : DEFAULT_DECIMALS_BILLION;
    const decimalsMillion: number = config.decimalsMillion !== undefined && config.decimalsMillion >= 0 ? config.decimalsMillion : DEFAULT_DECIMALS_MILLION;    

    ReactDOM.render(
        <CardExportable serieId={config.serieId}
                        locale={config.locale || 'AR'}
                        links={config.links || 'full'}
                        color={getCardColor(config.color)}
                        hasChart={config.hasChart || 'small'}
                        chartType={config.chartType}
                        explicitSign={config.explicitSign}
                        title={config.title}
                        source={config.source}
                        units={config.units}
                        hasFrame={config.hasFrame}
                        hasColorBar={config.hasColorBar}
                        collapse={config.collapse}
                        apiBaseUrl={config.apiBaseUrl}
                        decimals={config.decimals}
                        numbersAbbreviate={config.numbersAbbreviate || true}
                        decimalsBillion={decimalsBillion}
                        decimalsMillion={decimalsMillion} />,
        document.getElementById(selector) as HTMLElement
    )

}
