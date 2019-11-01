import * as React from "react";
import * as ReactDOM from "react-dom";
import CardExportable from "./components/exportable/CardExportable";
import { getCardColor } from "./components/style/Colors/Color";
import { buildAbbreviationProps } from "./helpers/common/numberAbbreviation";

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
    numbersAbbreviate?: boolean;
    decimalsBillion?: number;
    decimalsMillion?: number;
}

export interface ICardExportableConfig extends ICardBaseConfig {
    serieId: string;
}

export function render(selector: string, config: ICardExportableConfig) {

    const abbreviationProps = buildAbbreviationProps(config.numbersAbbreviate, config.decimalsBillion, config.decimalsMillion);

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
                        numbersAbbreviate={abbreviationProps.numbersAbbreviate}
                        decimalsBillion={abbreviationProps.decimalsBillion}
                        decimalsMillion={abbreviationProps.decimalsMillion} />,
        document.getElementById(selector) as HTMLElement
    )

}
