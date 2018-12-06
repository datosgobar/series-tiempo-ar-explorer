export interface ILocale {
    toLocaleString: (value: number) => string;
    decimalSeparator: () => string;
    toFloat: (value: number, decimals?: number) => string;
}

export default class LocaleAR implements ILocale {

    public toLocaleString(value: number): string {
        return value.toLocaleString('es-AR');
    }

    public decimalSeparator(): string {
        return ',';
    }

    public toFloat(value: number, decimals: number = 2): string {
        let result = this.toLocaleString(parseFloat(value.toFixed(decimals)));
        const totalDecimals = result.split(this.decimalSeparator())[1];

        if (totalDecimals.length === 0) {
            result = `${result}00`
        } else if (totalDecimals.length === 1) {
            result = `${result}0`;
        }

        return result;
    }

}

export function buildLocale(locale: string) {
    return new LocaleAR();
}
