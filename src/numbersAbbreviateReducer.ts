import { INumbersAbbreviateAction } from "./actions/abbreviationActions";
import initialState from "./store/initialState";
import actionTypes from "./actions/actionTypes";

export default function numbersAbbreviateReducer(state: boolean = initialState.numbersAbbreviate, action: INumbersAbbreviateAction): boolean {

    switch (action.type) {
        case actionTypes.SET_NUMBERS_ABBREVIATE: return action.numbersAbbreviate;
        default: return state;
    }
}