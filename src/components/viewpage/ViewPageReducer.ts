import actionTypes from "../../actions/actionTypes";
import { ISerie } from "../../api/Serie";
import initialState from "../../store/initialState";


export default function featuredReducer(state: ISerie[] = initialState.viewSeries, action: any): ISerie[] {
    
    switch(action.type){
        case actionTypes.LOAD_VIEW_SERIES: return [...action.series];
        default: return state;
    }
}
