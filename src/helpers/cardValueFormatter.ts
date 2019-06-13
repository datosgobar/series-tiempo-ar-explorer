import { ILocale } from "../components/common/locale/LocaleDefault";

export class CardValueFormatter {

    private locale: ILocale;
    private isPercentage: boolean;
    private explicitSign: boolean;

    constructor(locale: ILocale, isPercentage: boolean, explicitSign: boolean) {
        this.locale = locale;
        this.isPercentage = isPercentage;
        this.explicitSign = explicitSign;
    }

    public formattedValue(value: number): string {

        let valueString: string

        valueString = this.locale.toDecimalString(value, 2);
        if (this.isPercentage) {
            valueString = `${(value * 100).toFixed(2)}%`
            valueString = valueString.replace(".", this.locale.decimalSeparator)
        }

        if (this.explicitSign && value > 0) {
            return "+" + valueString
        }
        return valueString

    }

}