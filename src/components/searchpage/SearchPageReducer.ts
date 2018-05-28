import actionTypes from "../../actions/actionTypes";
import { ISearchResultsAction } from "../../actions/seriesActions";
import { ISearchResultItem } from "../../api/SerieApi";
import initialState from "../../store/initialState";


export default function searchPageReducer(state: ISearchResultItem[] = initialState.searchResults, action: ISearchResultsAction): ISearchResultItem[] {
    
    switch(action.type){
        case actionTypes.LOAD_SEARCH_RESULTS: return [...action.searchResults];
        default: return state;
    }
}
