import {Action} from "redux";
import actionTypes from "./actionTypes";

export interface INumbersAbbreviateAction extends Action<string> {
    numbersAbbreviate: boolean;
}

export interface IDecimalsBillionAction extends Action<string> {
    decimalsBillion: number;
}

export interface IDecimalsMillionAction extends Action<string> {
    decimalsMillion: number;
}

export function setNumbersAbbreviate(numbersAbbreviate: boolean): INumbersAbbreviateAction {
    return { type: actionTypes.SET_NUMBERS_ABBREVIATE, numbersAbbreviate };
}

export function setDecimalsBillion(decimalsBillion: number): IDecimalsBillionAction {
    return { type: actionTypes.SET_DECIMALS_BILLION, decimalsBillion };
}

export function setDecimalsMillion(decimalsMillion: number): IDecimalsMillionAction {
    return { type: actionTypes.SET_DECIMALS_MILLION, decimalsMillion };
}