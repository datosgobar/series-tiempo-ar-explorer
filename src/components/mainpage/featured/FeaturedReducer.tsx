import actionTypes from "../../../actions/actionTypes";
import initialState from "../../../store/initialState";
import { ISerie } from "../../common/serie/Serie";

export default function featuredReducer(state: ISerie[] = initialState.featured, action: any): ISerie[] {
    
    switch(action.type){
        case actionTypes.LOAD_FEATURED: return [...action.featured];
    }
    
    return state;
}
