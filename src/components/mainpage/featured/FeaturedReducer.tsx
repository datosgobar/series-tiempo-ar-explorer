import actionTypes from "../../../actions/actionTypes";
import { ISeriesAction } from "../../../actions/seriesActions";
import { ISerie } from "../../../api/Serie";
import initialState from "../../../store/initialState";


export default function featuredReducer(state: ISerie[] = initialState.featured, action: ISeriesAction): ISerie[] {
    
    switch(action.type){
        case actionTypes.LOAD_FEATURED: return [...action.series];
        default: return state;
    }
}
