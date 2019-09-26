import initialState from "./store/initialState";
import { IMaxDecimalsAction } from "./actions/seriesActions";
import actionTypes from "./actions/actionTypes";

export default function maxDecimalsReducer(state: number = initialState.maxDecimals, action: IMaxDecimalsAction): number {

    switch (action.type) {
        case actionTypes.SET_MAX_DECIMALS: return action.maxDecimals;
        default: return state;
    }
}