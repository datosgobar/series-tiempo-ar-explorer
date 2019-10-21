import { DEFAULT_SIGNIFICANT_FIGURES } from "../../api/Serie";
import LocaleValueFormatter, { ILocaleValueFormatterConfig } from "../../components/common/locale/LocaleValueFormatter";
export function formatterForSerie(locale: string, isPercentage: boolean, decimalPlaces?: number) {

    const localeFormatterConfig: ILocaleValueFormatterConfig = {
        code: locale,
        decimalPlaces: decimalPlaces !== undefined ? decimalPlaces : DEFAULT_SIGNIFICANT_FIGURES,
        isPercentage
    };
    const localeFormatter = new LocaleValueFormatter(localeFormatterConfig);
    return {
        formatter(): string {
            // @ts-ignore
            return localeFormatter.formatValue(this.value);
        }
    };

}