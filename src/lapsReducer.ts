import actionTypes from "./actions/actionTypes";
import {ILapsAction} from "./actions/seriesActions";
import {ILapsProps} from "./components/mainpage/featured/Featured";
import initialState from "./store/initialState";

export default function lapsReducer(state: ILapsProps = initialState.laps, action: ILapsAction): ILapsProps {

    switch (action.type) {
        case actionTypes.SET_LAPS: return action.laps;
        default: return state;
    }
}
