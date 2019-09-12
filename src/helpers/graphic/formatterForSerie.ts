import { buildLocale } from "../../components/common/locale/buildLocale";
export function formatterForSerie(locale: string, isPercentage: boolean, decimalAmount?: number) {
    return {
        formatter(): string {
            // @ts-ignore
            return formatValue(this.value, locale, isPercentage, decimalAmount)
        }
    };
}

export function formatValue(value: number, locale: string, isPercentage: boolean, decimalAmount?: number) {

    const localeObj = buildLocale(locale);
    const sep = localeObj.decimalSeparator();
    const finalValue = isPercentage ? value * 100 : value;
    let valueString = decimalAmount !== undefined ? finalValue.toFixed(decimalAmount) : finalValue.toString();
    valueString = valueString.replace('.', sep);
    const appendage = isPercentage ? '%' : '';
    return `${valueString}${appendage}`

}