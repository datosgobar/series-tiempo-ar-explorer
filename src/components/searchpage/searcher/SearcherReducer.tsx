import actionTypes from "../../../actions/actionTypes";
import { ISearchAction } from "../../../actions/searchActions";
import initialState from "../../../store/initialState";
import { ISearchParams } from "./Searcher";


export default function searcherReducer(state: ISearchParams = initialState.searchParams, action: ISearchAction): ISearchParams {

    switch (action.type) {
        case actionTypes.SET_SEARCH_PARAMS: return {...action.searchParams};
        default: return state;
    }
}
