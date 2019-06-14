import { buildLocale } from "../../common/locale/buildLocale";
export function formatterForSerie(locale: string) {
    return {
        formatter(): string {
            const localeObj = buildLocale(locale);
            const sep = localeObj.decimalSeparator();
            // @ts-ignore    
            return `${(this.value * 100).toFixed(2).replace('.', sep)}%`;
        }
    };
}
