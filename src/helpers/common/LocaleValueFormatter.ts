export const DECIMAL_SEPARATORS = {
    'AR': ',',
    'US': '.'
}

export const THOUSAND_SEPARATORS = {
    'AR': '.',
    'US': ','
}

export interface ILocaleValueFormatterConfig {
    code: string;
    decimalPlaces: number;
    explicitSign?: boolean;
    isPercentage?: boolean;
}

export default class LocaleValueFormatter {

    private decimalSeparator: string;
    private thousandSeparator: string;
    private decimalPlaces: number;
    private explicitSign: boolean;
    private isPercentage: boolean;

    constructor(config: ILocaleValueFormatterConfig) {

        this.decimalSeparator = DECIMAL_SEPARATORS[config.code];
        this.thousandSeparator = THOUSAND_SEPARATORS[config.code];
        this.decimalPlaces = config.decimalPlaces;
        this.explicitSign = config.explicitSign !== undefined ? config.explicitSign : false;
        this.isPercentage = config.isPercentage !== undefined ? config.isPercentage : false;

    }

    public formatValue(value: number) {

        const shiftedValue: number = this.isPercentage ? value * 100 : value;
        const prependage: string = this.explicitSign ? '+' : '';
        const appendage: string = this.isPercentage ? '%' : '';
        const separationFixedValue = this.applySeparators(shiftedValue);
        return `${prependage}${separationFixedValue}${appendage}`;

    }

    private applyDecimalSeparator(value: number): string {

        const decimalFixedValue = value.toFixed(this.decimalPlaces);
        return decimalFixedValue.replace(".", this.decimalSeparator);

    }

    private applyThousandSeparator(value: string): string {
        
        const parts = value.split(this.decimalSeparator);
        let integerPart = parts[0];
        const fractionaryPart = parts.length > 1 ? parts[1] : '';

        const signOffset = integerPart[0] === '-' ? 2 : 1;
        const thousandsAmount = Math.floor((integerPart.length - signOffset) / 3);

        for(let i: number = 1; i <= thousandsAmount; i++) {
            const length = integerPart.length;
            // maximumIndex - digitsSeparated - separationsDone + correction = (length - 1) - (3*i) - (i-1) + 1 =
            const separationIndex = length - (4*i) + 1;
            const head = integerPart.slice(0, separationIndex);
            const tail = integerPart.slice(separationIndex);
            integerPart = `${head}${this.thousandSeparator}${tail}`
        }

        if (fractionaryPart !== '') {
            return `${integerPart}${this.decimalSeparator}${fractionaryPart}`;
        }
        return integerPart;

    }

    private applySeparators(value: number): string {
        
        const decimalFixedValue = this.applyDecimalSeparator(value);
        if (Math.abs(value) < 10000) {
            return decimalFixedValue;
        }
        return this.applyThousandSeparator(decimalFixedValue);

    }

}