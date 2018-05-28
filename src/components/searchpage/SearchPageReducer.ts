import actionTypes from "../../actions/actionTypes";
import { ISearchResultItem } from "../../api/SerieApi";
import initialState from "../../store/initialState";


export default function searchPageReducer(state: ISearchResultItem[] = initialState.searchResults, action: any): ISearchResultItem[] {
    
    switch(action.type){
        case actionTypes.LOAD_SEARCH_RESULTS: return [...action.searchResults];
    }
    
    return state;
}
