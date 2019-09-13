export interface ICardValueFormatterConf {
    decimals: number;
    explicitSign: boolean;
    isPercentage: boolean;
    locale: string;
}

export class CardValueFormatter {

    private decimalSeparator: string;
    private isPercentage: boolean;
    private explicitSign: boolean;
    private decimalPlaces: number;

    constructor(config: ICardValueFormatterConf) {

        this.isPercentage = config.isPercentage;
        this.explicitSign = config.explicitSign;
        this.decimalPlaces = config.decimals;
        this.decimalSeparator = config.locale === "AR" ? "," : "."

    }

    public formattedValue(value: number): string {

        let valueString: string

        valueString = value.toFixed(this.decimalPlaces)
        if (this.isPercentage) {
            valueString = `${(value * 100).toFixed(this.decimalPlaces)}%`
        }
        valueString = valueString.replace(".", this.decimalSeparator)

        if (this.explicitSign && value > 0) {
            return "+" + valueString
        }
        return valueString

    }

}