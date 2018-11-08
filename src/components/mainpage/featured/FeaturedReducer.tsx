import actionTypes from "../../../actions/actionTypes";
import {IFeaturedIdsAction} from "../../../actions/seriesActions";
import initialState from "../../../store/initialState";


export default function featuredReducer(state: string[] = initialState.featured, action: IFeaturedIdsAction): string[] {
    switch(action.type){
        case actionTypes.LOAD_FEATURED_IDS: return action.featuredIds;
        default: return state;
    }
}
