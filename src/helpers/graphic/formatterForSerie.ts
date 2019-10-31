import { DEFAULT_SIGNIFICANT_FIGURES } from "../../api/Serie";
import LocaleValueFormatter, { ILocaleValueFormatterConfig } from "../common/LocaleValueFormatter";

export interface IFormatterForSerieConfig {
    decimalPlaces?: number;
    decimalsBillion: number;
    decimalsMillion: number;
    isPercentage: boolean;
    locale: string;
    numbersAbbreviate: boolean;
}

export function formatterForSerie(config: IFormatterForSerieConfig) {

    const localeFormatterConfig: ILocaleValueFormatterConfig = {
        code: config.locale,
        decimalPlaces: config.decimalPlaces !== undefined ? config.decimalPlaces : DEFAULT_SIGNIFICANT_FIGURES,
        decimalsBillion: config.decimalsBillion,
        decimalsMillion: config.decimalsMillion,
        isPercentage: config.isPercentage,
        numbersAbbreviate: config.numbersAbbreviate
    };
    const localeFormatter = new LocaleValueFormatter(localeFormatterConfig);
    return {
        formatter(): string {
            // @ts-ignore
            return localeFormatter.formatValue(this.value);
        }
    };

}