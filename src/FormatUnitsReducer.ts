import actionTypes from "./actions/actionTypes";
import {IUnitFormat} from "./actions/seriesActions";
import initialState from "./store/initialState";

export default function formatUnitsReducer(state: boolean = initialState.formatChartUnits, action: IUnitFormat): boolean {

    switch (action.type) {
        case actionTypes.SET_UNIT_FORMAT: return action.formatChartUnits;
        default: return state;
    }
}
