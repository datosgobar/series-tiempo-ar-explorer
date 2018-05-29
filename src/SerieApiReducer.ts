import actionTypes from "./actions/actionTypes";
import { ISerieApiAction } from "./actions/seriesActions";
import { ISerieApi } from "./api/SerieApi";
import initialState from "./store/initialState";

export default function seriesApiReducer(state: ISerieApi | null = initialState.seriesApi, action: ISerieApiAction): ISerieApi | null {

    switch (action.type) {
        case actionTypes.SET_SERIES_API: return action.seriesApi;
        default: return state;
    }
}
