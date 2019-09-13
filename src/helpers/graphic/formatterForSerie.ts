import { buildLocale } from "../../components/common/locale/buildLocale";
export function formatterForSerie(locale: string, isPercentage: boolean, decimalPlaces?: number) {
    return {
        formatter(): string {
            // @ts-ignore
            return formatSerieValue(this.value, locale, isPercentage, decimalPlaces)
        }
    };
}

export function formatSerieValue(value: number, locale: string, isPercentage: boolean, decimalPlaces?: number) {

    const localeObj = buildLocale(locale);
    const sep = localeObj.decimalSeparator();
    const finalValue = isPercentage ? value * 100 : value;
    let valueString = decimalPlaces !== undefined ? finalValue.toFixed(decimalPlaces) : finalValue.toString();
    valueString = valueString.replace('.', sep);
    const appendage = isPercentage ? '%' : '';
    return `${valueString}${appendage}`

}