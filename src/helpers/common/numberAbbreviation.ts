import { DEFAULT_DECIMALS_BILLION, DEFAULT_DECIMALS_MILLION } from "./LocaleValueFormatter";

export interface IAbbreviationProps {
    decimalsBillion: number;
    decimalsMillion: number;
    numbersAbbreviate: boolean;
}

export function buildAbbreviationProps(numbersAbbreviate?: boolean, decimalsBillion?: number, decimalsMillion?: number): IAbbreviationProps {

    return {
        decimalsBillion : decimalsBillion !== undefined && decimalsBillion >= 0 ? decimalsBillion : DEFAULT_DECIMALS_BILLION,
        decimalsMillion : decimalsMillion !== undefined && decimalsMillion >= 0 ? decimalsMillion : DEFAULT_DECIMALS_MILLION,
        numbersAbbreviate: numbersAbbreviate === undefined ? true : numbersAbbreviate
    }

}