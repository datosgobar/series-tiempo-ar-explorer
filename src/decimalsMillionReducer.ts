import { IDecimalsMillionAction } from "./actions/abbreviationActions";
import actionTypes from "./actions/actionTypes";
import initialState from "./store/initialState";

export default function decimalsMillionReducer(state: number = initialState.decimalsMillion, action: IDecimalsMillionAction): number {

    switch (action.type) {
        case actionTypes.SET_DECIMALS_MILLION: return action.decimalsMillion;
        default: return state;
    }
}