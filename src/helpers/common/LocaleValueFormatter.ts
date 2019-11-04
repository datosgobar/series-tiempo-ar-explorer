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
    numbersAbbreviate?: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
}

interface IFormattingTarget {
    value: number;
    decimalPlaces: number;
}

export const DEFAULT_DECIMALS_BILLION = 2;
export const DEFAULT_DECIMALS_MILLION = 2;

const ONE_BILLION = 1000000000000;
const TEN_MILLION = 10000000;
const ONE_MILLION = 1000000;
const TEN_THOUSAND = 10000;

export default class LocaleValueFormatter {

    private decimalSeparator: string;
    private thousandSeparator: string;
    private decimalPlaces: number;
    private explicitSign: boolean;
    private isPercentage: boolean;
    private numbersAbbreviate?: boolean;
    private decimalsBillion: number;
    private decimalsMillion: number;

    constructor(config: ILocaleValueFormatterConfig) {

        this.decimalSeparator = DECIMAL_SEPARATORS[config.code];
        this.thousandSeparator = THOUSAND_SEPARATORS[config.code];
        this.decimalPlaces = config.decimalPlaces;
        this.explicitSign = config.explicitSign !== undefined ? config.explicitSign : false;
        this.isPercentage = config.isPercentage !== undefined ? config.isPercentage : false;
        this.numbersAbbreviate = config.numbersAbbreviate;
        this.decimalsMillion = config.decimalsMillion;
        this.decimalsBillion = config.decimalsBillion;

    }

    public formatValue(value: number) {

        const target: IFormattingTarget = {
            decimalPlaces: this.decimalPlaces,
            value : this.isPercentage ? value * 100 : value
        };

        const prependage: string = this.explicitSign && target.value > 0 ? '+' : '';
        const appendage: string = this.getAppendage(target.value);

        if (this.isPercentage === false && this.numbersAbbreviate) {
            this.setForAbbreviation(target);
        }

        const separationFixedValue = this.applySeparators(target);
        return `${prependage}${separationFixedValue}${appendage}`;

    }

    private getAppendage(value: number): string {

        if (this.isPercentage) {
            return '%';
        }

        if (this.numbersAbbreviate) {
            if (Math.abs(value) >= ONE_BILLION) {
                return 'B';
            }
            if (Math.abs(value) >= TEN_MILLION) {
                return 'M';
            }
        }
        
        return '';

    }

    private setForAbbreviation(target: IFormattingTarget): void {

        let divider: number = 1;

        if (Math.abs(target.value) >= ONE_BILLION) {
            divider = ONE_BILLION;
            target.decimalPlaces = this.decimalsBillion;
        }
        else if (Math.abs(target.value) >= TEN_MILLION) {
            divider = ONE_MILLION;
            target.decimalPlaces = this.decimalsMillion;
        }

        target.value /= divider;

    }

    private applyDecimalSeparator(target: IFormattingTarget): string {

        const decimalFixedValue = target.value.toFixed(target.decimalPlaces);
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

    private applySeparators(target: IFormattingTarget): string {
        
        const decimalFixedValue = this.applyDecimalSeparator(target);
        if (Math.abs(target.value) < TEN_THOUSAND) {
            return decimalFixedValue;
        }
        return this.applyThousandSeparator(decimalFixedValue);

    }

}