import { IDecimalsBillionAction } from "./actions/abbreviationActions";
import actionTypes from "./actions/actionTypes";
import initialState from "./store/initialState";

export default function decimalsBillionReducer(state: number = initialState.decimalsBillion, action: IDecimalsBillionAction): number {

    switch (action.type) {
        case actionTypes.SET_DECIMALS_BILLION: return action.decimalsBillion;
        default: return state;
    }
}