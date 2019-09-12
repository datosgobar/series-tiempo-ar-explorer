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
    private decimalAmount: number;

    constructor(config: ICardValueFormatterConf) {

        this.isPercentage = config.isPercentage;
        this.explicitSign = config.explicitSign;
        this.decimalAmount = config.decimals;
        this.decimalSeparator = config.locale === "AR" ? "," : "."

    }

    public formattedValue(value: number): string {

        let valueString: string

        valueString = value.toFixed(this.decimalAmount)
        if (this.isPercentage) {
            valueString = `${(value * 100).toFixed(this.decimalAmount)}%`
        }
        valueString = valueString.replace(".", this.decimalSeparator)

        if (this.explicitSign && value > 0) {
            return "+" + valueString
        }
        return valueString

    }

}