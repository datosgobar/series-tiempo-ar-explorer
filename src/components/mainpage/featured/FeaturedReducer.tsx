import actionTypes from "../../../actions/actionTypes";
import initialState from "../../../store/initialState";
import Serie from "../../common/serie/Serie";

export default function featuredReducer(state: Serie[] = initialState.featured, action: any): Serie[] {
    
    switch(action.type){
        case actionTypes.LOAD_FEATURED: return [...action.featured];
    }
    
    return state;
}
