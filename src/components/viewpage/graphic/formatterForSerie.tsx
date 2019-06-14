import { buildLocale } from "../../common/locale/buildLocale";
export function formatterForSerie(locale: string) {
    return {
        formatter(): string {
            // @ts-ignore
            return formatValue(this.value, locale)
        }
    };
}

export function formatValue(value: number, locale: string) {
    const localeObj = buildLocale(locale);
    const sep = localeObj.decimalSeparator();
    return `${(value * 100).toFixed(2).replace('.', sep)}%`;

}