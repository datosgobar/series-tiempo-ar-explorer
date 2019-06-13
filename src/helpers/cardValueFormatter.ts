export class CardValueFormatter {

    private decimalSeparator: string;
    private isPercentage: boolean;
    private explicitSign: boolean;

    constructor(locale: string, isPercentage: boolean, explicitSign: boolean) {

        this.isPercentage = isPercentage;
        this.explicitSign = explicitSign;

        if(locale === "AR") {
            this.decimalSeparator = ","
        }
        else {
            this.decimalSeparator = "."
        }

    }

    public formattedValue(value: number): string {

        let valueString: string

        valueString = value.toFixed(2)
        if (this.isPercentage) {
            valueString = `${(value * 100).toFixed(2)}%`
        }
        valueString = valueString.replace(".", this.decimalSeparator)

        if (this.explicitSign && value > 0) {
            return "+" + valueString
        }
        return valueString

    }

}